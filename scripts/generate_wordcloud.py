"""Build images/wordcloud.png from the `keywords:` line of every publication.

Usage (from anywhere):
    pip install wordcloud pillow numpy
    python scripts/generate_wordcloud.py
"""
from pathlib import Path
import re

import numpy as np
from PIL import Image
from wordcloud import STOPWORDS, ImageColorGenerator, WordCloud

REPO = Path(__file__).resolve().parent.parent
PUBLICATIONS = REPO / "_publications"
MASK = REPO / "images" / "oxford_mask_v2_coloured.png"
OUTPUT = REPO / "images" / "wordcloud.png"

keyword_line = re.compile(r"^keywords:\s*(.*)$", re.MULTILINE)

keywords = []
for md in sorted(PUBLICATIONS.glob("*.md")):
    match = keyword_line.search(md.read_text(encoding="utf-8"))
    if match:
        keywords += [k.strip() for k in match.group(1).split(",") if k.strip()]

mask = np.array(Image.open(MASK))
cloud = WordCloud(
    width=900,
    height=200,
    background_color="white",
    mask=mask,
    contour_width=1.5,
    contour_color="black",
    stopwords=STOPWORDS,
).generate(", ".join(keywords))

cloud.recolor(color_func=ImageColorGenerator(mask)).to_file(str(OUTPUT))
print(f"Wrote {OUTPUT.relative_to(REPO)} from {len(keywords)} keywords")
