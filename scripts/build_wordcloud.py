"""Build public/images/wordcloud.png from the `keywords:` of every publication.

Runs automatically in the GitHub Actions build. To run it locally:
    pip install -r scripts/requirements.txt
    python3 scripts/build_wordcloud.py
"""
from pathlib import Path
import re

import numpy as np
from PIL import Image
from wordcloud import STOPWORDS, ImageColorGenerator, WordCloud

REPO = Path(__file__).resolve().parent.parent
PUBLICATIONS = REPO / "src" / "content" / "publications"
MASK = REPO / "scripts" / "assets" / "oxford_mask.png"
WORDCLOUD = REPO / "public" / "images" / "wordcloud.png"

def white_to_transparent(rgb: np.ndarray) -> Image.Image:
    """Turn the white background transparent, keeping anti-aliased edges smooth
    (so the same image works on light and dark pages)."""
    rgb = rgb.astype(np.float32)
    alpha = (255 - rgb).max(axis=2)
    safe = np.where(alpha == 0, 1, alpha)[..., None]
    colour = 255 - (255 - rgb) * 255 / safe
    rgba = np.dstack([np.clip(colour, 0, 255), alpha]).astype(np.uint8)
    return Image.fromarray(rgba, "RGBA")


def build_wordcloud() -> None:
    keyword_line = re.compile(r"^keywords:\s*(.*)$", re.MULTILINE)
    keywords = []
    for md in sorted(PUBLICATIONS.glob("*.md")):
        match = keyword_line.search(md.read_text(encoding="utf-8"))
        if match:
            keywords += [k.strip() for k in match.group(1).split(",") if k.strip() and "TODO" not in k]
    if not keywords:
        print("wordcloud  skipped (no keywords found)")
        return

    mask = np.array(Image.open(MASK))
    cloud = WordCloud(
        width=900,
        height=200,
        background_color="white",
        mask=mask,
        contour_width=1.5,
        contour_color="black",
        stopwords=STOPWORDS,
        random_state=42,  # same keywords -> same picture
    ).generate(", ".join(keywords))
    rgb = np.array(cloud.recolor(color_func=ImageColorGenerator(mask)).to_image().convert("RGB"))
    white_to_transparent(rgb).save(WORDCLOUD, optimize=True)
    print(f"wordcloud  {WORDCLOUD.relative_to(REPO)} ({len(keywords)} keywords)")


if __name__ == "__main__":
    build_wordcloud()
