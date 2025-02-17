import os
import re
from pathlib import Path
from wordcloud import WordCloud
import matplotlib.pyplot as plt
from collections import Counter

# Path to publications directory
pub_dir = Path('_publications')

# Combine all text from publications
all_text = []
for file in pub_dir.glob('*.md'):
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
        # Remove YAML front matter
        content = re.sub(r'---.*?---', '', content, flags=re.DOTALL)
        # Remove HTML tags
        content = re.sub(r'<[^>]+>', '', content)
        # Remove URLs
        content = re.sub(r'http\S+|www.\S+', '', content)
        # Remove markdown formatting
        content = re.sub(r'[#>*\[\]`]', '', content)
        all_text.append(content)

text = ' '.join(all_text)

# Create and configure the WordCloud object
wordcloud = WordCloud(
    width=800, 
    height=400,
    background_color='white',
    max_words=100,
    collocations=False,
    stopwords={'published', 'in', 'the', 'and', 'or', 'to', 'of', 'for', 'with', 'citation'}
).generate(text)

# Create the figure
plt.figure(figsize=(10, 5))
plt.imshow(wordcloud, interpolation='bilinear')
plt.axis('off')

# Save the word cloud
plt.savefig('images/publication_wordcloud.png', bbox_inches='tight', dpi=300) 