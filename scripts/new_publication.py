"""Create a publication page from a DOI.

    python scripts/new_publication.py 10.1016/j.xcrm.2025.101933
    python scripts/new_publication.py 10.1016/j.xcrm.2025.101933 --image ~/Downloads/abstract.jpg --featured

Fetches title, journal, date, volume, pages, authors and (when available) the
abstract from Crossref, then writes src/content/publications/YYYY-MM-DD-<slug>.md.
Afterwards, open the file and fill in `excerpt` and `keywords`.
No extra packages needed.
"""
from pathlib import Path
import argparse
import html
import json
import re
import shutil
import sys
import urllib.parse
import urllib.request

REPO = Path(__file__).resolve().parent.parent
PUBLICATIONS = REPO / "src" / "content" / "publications"
ABSTRACTS = REPO / "src" / "assets" / "abstracts"
MY_SURNAME = "Gurashi"


def fetch(doi: str) -> dict:
    url = "https://api.crossref.org/works/" + urllib.parse.quote(doi)
    req = urllib.request.Request(url, headers={"User-Agent": "portfolio-site (mailto:kristian.gurashi@gmail.com)"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.load(resp)["message"]


def initials(given: str) -> str:
    return "".join(part[0] for part in re.split(r"[\s\-.]+", given) if part)


def author_list(authors: list) -> tuple[str, bool]:
    names, first = [], False
    for i, a in enumerate(authors):
        family = a.get("family") or a.get("name", "")
        name = f"{family} {initials(a.get('given', ''))}".strip()
        if family.lower() == MY_SURNAME.lower():
            name = f"**{name}**"
            first = i == 0
        names.append(name)
    if len(names) > 20:  # keep long consortium lists readable
        mine = next((n for n in names if n.startswith("**")), None)
        names = names[:6] + (["…", mine] if mine and mine not in names[:6] else []) + ["…", names[-1]]
    return ", ".join(names), first


def pub_date(msg: dict) -> str:
    for key in ("published-online", "published-print", "issued"):
        parts = (msg.get(key) or {}).get("date-parts", [[]])[0]
        if parts:
            y, m, d = (parts + [1, 1])[:3]
            return f"{y:04d}-{m:02d}-{d:02d}"
    sys.exit("No publication date in Crossref record")


def clean_abstract(jats: str) -> str:
    text = re.sub(r"<jats:title>.*?</jats:title>", "", jats, flags=re.S)
    text = re.sub(r"</jats:p>\s*", "\n\n", text)
    text = re.sub(r"<[^>]+>", "", text)
    return html.unescape(re.sub(r"[ \t]+", " ", text)).strip()


def slugify(text: str, words: int = 6) -> str:
    return "-".join(re.findall(r"[a-z0-9]+", text.lower())[:words])


def yaml_str(text: str) -> str:
    return '"' + text.replace("\\", "\\\\").replace('"', '\\"') + '"'


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("doi", help="DOI, with or without https://doi.org/")
    ap.add_argument("--image", type=Path, help="graphical abstract to copy into src/assets/abstracts/")
    ap.add_argument("--code", help="URL of the code repository")
    ap.add_argument("--featured", action="store_true", help="show on the homepage")
    args = ap.parse_args()

    doi = re.sub(r"^https?://(dx\.)?doi\.org/", "", args.doi.strip())
    msg = fetch(doi)
    title = html.unescape(re.sub(r"<[^>]+>", "", msg["title"][0])).strip()
    venue = (msg.get("container-title") or [""])[0]
    date = pub_date(msg)
    authors, first = author_list(msg.get("author", []))
    pages = msg.get("page") or msg.get("article-number") or ""

    out = PUBLICATIONS / f"{date}-{slugify(title)}.md"
    if out.exists():
        sys.exit(f"{out.relative_to(REPO)} already exists")

    lines = [
        "---",
        f"title: {yaml_str(title)}",
        f"date: {date}",
        f"venue: {yaml_str(venue)}",
        f"volume: {yaml_str(msg.get('volume', ''))}",
        f"pages: {yaml_str(pages.replace('-', '–'))}",
        f"paperurl: https://doi.org/{doi}",
    ]
    if args.code:
        lines.append(f"codeurl: {args.code}")
    lines += [f"authors: {yaml_str(authors)}", f"role: {'First author' if first else 'Co-author'}"]
    if args.image:
        dest = ABSTRACTS / f"{date[:4]}_{slugify(venue, 2) or 'paper'}_{slugify(title, 3)}{args.image.suffix.lower()}"
        shutil.copy(args.image.expanduser(), dest)
        lines.append(f"image: ../../assets/abstracts/{dest.name}")
    lines += [
        'excerpt: "TODO: one sentence on the main finding."',
        *(["featured: true"] if args.featured else []),
        "keywords: TODO, comma, separated",
        "---",
        "",
    ]
    if msg.get("abstract"):
        lines += ["## Summary", "", clean_abstract(msg["abstract"]), ""]

    out.write_text("\n".join(lines), encoding="utf-8")
    print(f"Created {out.relative_to(REPO)}")
    print("Next: fill in `excerpt` and `keywords`, optionally add a '## Key findings' list, then commit.")


if __name__ == "__main__":
    main()
