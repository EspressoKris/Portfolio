// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://espressokris.github.io',
  base: '/Portfolio',
  trailingSlash: 'always',
  // Keep normal HTML whitespace between inline elements
  compressHTML: true,

  // Old Jekyll URLs keep working
  redirects: {
    '/about/': '/Portfolio/',
    '/year-archive/': '/Portfolio/blog/',
    '/publications-year-archive/': '/Portfolio/publications/',
    '/posts/2022/02/uk-genomics-market/': '/Portfolio/blog/uk-genomics-market/',
    '/posts/2022/03/uk-genomics-market/': '/Portfolio/blog/uk-genomics-market/',
  },

  integrations: [
    // Starlight only powers /tutorials/ (docs live in src/content/docs/tutorials/)
    starlight({
      title: 'Tutorials · Kristian Gurashi',
      description: 'Hands-on bioinformatics tutorials: bulk and single-cell RNA-seq, genomes and genotyping.',
      logo: { src: './src/assets/logo.svg', alt: 'KG' },
      favicon: '/favicon.svg',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/EspressoKris' },
      ],
      customCss: ['./src/styles/fonts.css', './src/styles/starlight.css'],
      components: {
        SiteTitle: './src/components/StarlightSiteTitle.astro',
      },
      sidebar: [
        { label: 'Welcome', slug: 'tutorials' },
        {
          label: 'Transcriptomics',
          items: [
            { label: 'Overview', slug: 'tutorials/transcriptomics' },
            {
              label: 'Single-cell RNA-seq',
              items: [{ label: 'CellBender', slug: 'tutorials/transcriptomics/single-cell/cellbender' }],
            },
          ],
        },
        {
          label: 'More on GitBook',
          link: 'https://espressokris.gitbook.io/tutorials',
          attrs: { target: '_blank', rel: 'noopener' },
        },
      ],
      disable404Route: true,
      editLink: { baseUrl: 'https://github.com/EspressoKris/Portfolio/edit/master/' },
      lastUpdated: true,
    }),
  ],
});
