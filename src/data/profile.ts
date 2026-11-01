// Everything about you that appears around the site.
// Positions, education and awards are from ORCID 0000-0002-5540-3398.

export const profile = {
  name: 'Kristian Gurashi',
  title: 'Dr. Kristian Gurashi',
  role: 'Postdoctoral computational biologist',
  tagline: 'Single-cell & multi-omics · myeloid leukaemia',
  location: 'Oxford, United Kingdom',
  employer: 'University of Oxford',
  email: 'kristian.gurashi@gmail.com',
  description:
    'Computational biologist at the University of Oxford working on single-cell and multi-omic analysis of myeloid leukaemia (CMML, MDS, AML).',
};

export const links = [
  { label: 'Email', href: `mailto:${profile.email}`, icon: 'mail' },
  { label: 'Google Scholar', href: 'https://scholar.google.com/citations?hl=en&user=X2D8HogAAAAJ', icon: 'scholar' },
  { label: 'ORCID', href: 'https://orcid.org/0000-0002-5540-3398', icon: 'orcid' },
  { label: 'GitHub', href: 'https://github.com/EspressoKris', icon: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kristiangurashi', icon: 'linkedin' },
  { label: 'ResearchGate', href: 'https://www.researchgate.net/profile/Kristian-Gurashi', icon: 'researchgate' },
  { label: 'X', href: 'https://twitter.com/krgurashi', icon: 'x' },
] as const;

export type TimelineItem = { title: string; org: string; dates?: string };

// One row per role on the homepage. `summary` is written for a general reader.
// `papers` are publication file names (without .md) from src/content/publications/.
// `links` are optional extra links (site paths without a leading slash, or full URLs).
export type ExperienceItem = TimelineItem & {
  place: string;
  summary: string;
  papers?: string[];
  links?: { label: string; href: string }[];
};

export const experience: ExperienceItem[] = [
  {
    title: 'Postdoctoral Researcher, Computational Biology',
    org: 'MRC Weatherall Institute of Molecular Medicine',
    place: 'University of Oxford',
    dates: '2024 – present',
    summary:
      'I analyse large single-cell and multi-omic datasets from blood and bone marrow. The aim is to understand how blood cancers develop, find weak points that new drugs could target, and recognise early the patterns that make some patients resistant to treatment.',
    links: [{ label: 'How I clean single-cell data (CellBender tutorial)', href: 'tutorials/transcriptomics/single-cell/cellbender/' }],
  },
  {
    title: 'Research Associate',
    org: 'Cancer Research UK Manchester Institute',
    place: 'University of Manchester',
    dates: '2023 – 2024',
    summary:
      'I completed our study of blast-phase CMML and worked with haematologists at National Taiwan University Hospital on large patient groups, testing which genetic and gene-activity markers predict how people with MDS, CMML and myelofibrosis will fare, and which treatments might work for them.',
    papers: ['2025-01-31-CRM', '2023-11-02-Leukemia', '2024-07-12-BCJ', '2024-10-04-Leukemia'],
  },
  {
    title: 'PhD, Cancer Sciences',
    org: 'Cancer Research UK Manchester Institute',
    place: 'University of Manchester',
    dates: '2019 – 2023',
    summary:
      'I studied chronic myelomonocytic leukaemia (CMML), a blood cancer that can suddenly turn into aggressive acute leukaemia. By reading which genes are switched on in individual leukaemia stem cells, and combining this with clinical and laboratory data, I found ways to group patients by how their disease behaves and which drugs it is likely to respond to.',
    papers: ['2020-08-01-EBM', '2023-04-05-BJH', '2023-06-01-CSC'],
  },
  {
    title: 'Research Associate',
    org: 'Randall Centre for Cell & Molecular Biophysics',
    place: "King's College London",
    dates: '2018 – 2019',
    summary:
      'Working at the bench, I studied how chemical tags on DNA and the proteins that package it (epigenetics) control cellular ageing, known as senescence, and how the cancer-linked metabolite 2-HG interferes with them.',
  },
];

export const positions: TimelineItem[] = experience
  .filter((e) => !e.title.startsWith('PhD'))
  .map(({ title, org, place, dates }) => ({ title, org: `${org}, ${place}`, dates }));

export const education: TimelineItem[] = [
  { title: 'PhD, Cancer Sciences', org: 'Cancer Research UK Manchester Institute, University of Manchester', dates: '2019 – 2023' },
  { title: 'MRes, Biomedical and Molecular Sciences Research', org: "King's College London", dates: '2016 – 2018' },
  { title: 'BSc, Biological Sciences', org: 'University of Perugia', dates: '2012 – 2015' },
];

// The first award is shown in the homepage highlights.
export const awards: TimelineItem[] = [
  { title: 'ASH Abstract Achievement Award', org: 'American Society of Hematology', dates: '2022' },
  {
    title: 'Research award — "Integrative Analysis of Blast Phase CMML Reveals Distinct Transformation Phenotypes Predictive of Drug Response"',
    org: 'British Association for Cancer Research; University of Manchester',
  },
  {
    title: 'Research award — "Multiomic Single-Cell Sequencing Reveals Patterns of Disease Evolution and Acute Transformation in CMML"',
    org: 'University of Manchester',
  },
];

export const research = [
  {
    icon: 'cells',
    title: 'Single-cell & multi-omics',
    text: 'Single-cell transcriptomic and multiomic profiling of haematopoietic and leukaemic stem cells to map disease heterogeneity.',
  },
  {
    icon: 'route',
    title: 'Leukaemic transformation',
    text: 'How chronic myeloid neoplasms such as CMML and MDS evolve and transform into acute leukaemia.',
  },
  {
    icon: 'tree',
    title: 'Stratification & drug response',
    text: 'Machine-learning approaches that combine clinical, immunophenotype and transcriptome data to predict therapeutic vulnerabilities.',
  },
];

export const nav = [
  { label: 'Publications', href: 'publications/' },
  { label: 'Tutorials', href: 'tutorials/' },
  { label: 'Blog', href: 'blog/' },
];
