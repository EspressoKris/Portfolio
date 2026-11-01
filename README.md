# Kristian Gurashi — academic website

Source for **[espressokris.github.io/Portfolio](https://espressokris.github.io/Portfolio/)**: research, publications and CV of Kristian Gurashi, computational biologist at the MRC Weatherall Institute of Molecular Medicine, University of Oxford.

Built with [Jekyll](https://jekyllrb.com) on the [Academic Pages](https://github.com/academicpages/academicpages.github.io) template (a fork of Minimal Mistakes) and published with GitHub Pages.

## Where things live

| What | File |
| --- | --- |
| Homepage (intro, research, selected papers) | `_pages/about.md` |
| Positions, education, awards | `_data/cv.yml` (used by the homepage and `/cv/`) |
| Publications | `_publications/*.md`, one file per paper |
| Blog posts | `_posts/*.md` |
| Sidebar profile and links | `author:` block in `_config.yml` |
| Top navigation | `_data/navigation.yml` |
| Site styles | `_sass/_custom.scss` (colours and fonts in `_sass/_variables.scss`) |

## Adding a publication

Create `_publications/YYYY-MM-DD-short-name.md`:

```yaml
---
title: "Paper title"
collection: publications
date: 2026-01-31
venue: 'Journal Name'
volume: '12'
pages: '345–356'
paperurl: https://doi.org/10.xxxx/xxxxx
codeurl: https://github.com/EspressoKris/repo   # optional
authors: "Smith J, **Gurashi K**, Doe A"         # bold marks you
role: First author                               # or Co-author
image: /images/GraphicalAbstracts/file.jpg       # optional, full size
thumbnail: /images/GraphicalAbstracts/thumbs/file.jpg
excerpt: "One sentence on the main finding (also used by search engines)."
featured: true                                   # show on the homepage
keywords: CMML, scRNAseq, Leukemia
---

## Key findings
- ...

## Summary
...
```

The citation, buttons and PlumX metrics are generated from these fields. To make a thumbnail, resize the image to about 640 px wide and save it in `images/GraphicalAbstracts/thumbs/`.

Re-run `python scripts/generate_wordcloud.py` after adding papers to refresh the keyword cloud.

## Running locally

With Docker (no Ruby install needed):

```bash
docker run --rm -p 4000:4000 -v "$PWD":/srv/site -v portfolio_bundle:/usr/local/bundle -w /srv/site ruby:3.1 \
  bash -c "bundle install && bundle exec jekyll serve --host 0.0.0.0 --force_polling --destination /tmp/_site"
```

Then open <http://0.0.0.0:4000/Portfolio/>. Changes to `_config.yml` need a restart.

Or with Ruby 3.x installed: `bundle install && bundle exec jekyll serve`.

## License

Content © Kristian Gurashi. Template code is MIT-licensed; see `LICENSE`.
