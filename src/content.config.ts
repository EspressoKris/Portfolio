import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

// One Markdown file per paper in src/content/publications/.
// The file name (without .md) becomes the URL: /publications/<file-name>/
const publications = defineCollection({
  loader: glob({
    base: './src/content/publications',
    pattern: '*.md',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      venue: z.string(),
      volume: z.coerce.string().optional(),
      pages: z.coerce.string().optional(),
      paperurl: z.url(),
      codeurl: z.url().optional(),
      authors: z.string(),
      role: z.enum(['First author', 'Co-author']).default('Co-author'),
      image: image().optional(),
      excerpt: z.string(),
      featured: z.boolean().default(false),
      keywords: z
        .string()
        .transform((s) => s.split(',').map((k) => k.trim()).filter((k) => k && !k.includes('TODO'))),
    }),
});

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '*.md' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string().optional(),
    keywords: z.string().optional(),
  }),
});

export const collections = {
  publications,
  blog,
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
};
