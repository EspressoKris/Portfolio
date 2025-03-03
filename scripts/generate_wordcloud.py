import os
import re
import numpy as np
from PIL import Image
from wordcloud import WordCloud, STOPWORDS, ImageColorGenerator
import matplotlib.pyplot as plt

# Directory containing the markdown files, adjusted to be one level up
publications_dir = os.path.join('..', '_publications')

# Collect all keywords from markdown files
keywords = []

# Regex pattern to extract keywords
keyword_pattern = re.compile(r'keywords:\s*(.*)')

# Iterate over all markdown files in the directory
for filename in os.listdir(publications_dir):
    if filename.endswith('.md'):
        with open(os.path.join(publications_dir, filename), 'r') as file:
            content = file.read()
            match = keyword_pattern.search(content)
            if match:
                # Split keywords by comma and strip whitespace
                keywords.extend([kw.strip() for kw in match.group(1).split(',')])

# Path to the mask image
mask_path = '/Users/kgurashi/GitHub/Portfolio/images/oxford_mask_v2_coloured.png'
mask_image = np.array(Image.open(mask_path))

# Generate a word cloud with the mask
wordcloud = WordCloud(
    width=796,
    height=300,
    background_color='white',
    mask=mask_image,
    contour_width=4,
    contour_color='black',
    stopwords=STOPWORDS
).generate(', '.join(keywords))

# Create coloring from the image
image_colors = ImageColorGenerator(mask_image)

# Save the word cloud image
wordcloud_image_path = 'wordcloud.png'
wordcloud.recolor(color_func=image_colors).to_file(wordcloud_image_path)

# Display the word cloud
plt.imshow(wordcloud.recolor(color_func=image_colors), interpolation="bilinear")
plt.axis('off')
plt.show()

# Update the about.md file to include the word cloud image
about_md_path = os.path.join('..', '_pages', 'about.md')
with open(about_md_path, 'r') as file:
    about_content = file.read()

# Add the word cloud image to the about.md content
wordcloud_md = f'\n\n### Keywords Word Cloud\n![Word Cloud]({wordcloud_image_path})\n'
if '### Keywords Word Cloud' not in about_content:
    about_content += wordcloud_md

# Write the updated content back to the about.md file
with open(about_md_path, 'w') as file:
    file.write(about_content)