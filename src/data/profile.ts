import phdPhoto from '../assets/career/phd-manchester.jpg';
import kclPhoto from '../assets/career/kcl-lab.jpg';
import oxfordPhoto from '../assets/career/oxford-group.jpg';

// Everything about you that appears around the site.
// Positions, education and awards are from ORCID 0000-0002-5540-3398.

export const profile = {
  name: 'Kristian Gurashi',
  title: 'Dr Kristian Gurashi',
  role: 'Postdoctoral computational biologist',
  tagline: 'Single-cell & multi-omics · myeloid leukaemia',
  location: 'Oxford, United Kingdom',
  employer: 'University of Oxford',
  email: 'kristian.gurashi@gmail.com',
  description:
    'Computational biologist with 7+ years in cancer research, combining lab experiments and data science to understand how cancers develop and respond to treatment.',
};

// Homepage intro. `statement` is the large line; `summary` is one paragraph per item.
export const intro = {
  statement:
    'Enthusiastic about data-driven discovery and translational science, bringing lab experiments and computational analysis together.',
  summary: [
    "I'm a scientist who studies cancer with computers. I started out in the lab, and for more than seven years I've combined that hands-on experience with data analysis, working closely with doctors, biologists, statisticians and computer scientists so that what we learn can one day help patients.",
    "My work spans cancer biology, with a particular focus on leukaemia in children and ageing adults: how chronic cancers change into acute, dangerous phases, how faulty cells cross-talk and compete with healthy ones, how tumours interact with their microenvironment and the immune system, how the genes we inherit affect our risk, and why treatment works for some people but not others. I'm now widening this to a more systems-level view, looking at how the whole body responds to disease, infection and other stresses.",
  ],
};

// Profile icons (homepage and footer), in this order.
export const links = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kristiangurashi', icon: 'linkedin' },
  { label: 'X', href: 'https://twitter.com/krgurashi', icon: 'x' },
  { label: 'GitHub', href: 'https://github.com/EspressoKris', icon: 'github' },
  { label: 'Google Scholar', href: 'https://scholar.google.com/citations?hl=en&user=X2D8HogAAAAJ', icon: 'scholar' },
  { label: 'Email', href: `mailto:${profile.email}`, icon: 'mail' },
] as const;

export const orcidUrl = 'https://orcid.org/0000-0002-5540-3398';

export type TimelineItem = { title: string; org: string; dates?: string };

// One row per role on the homepage, in plain language (source: LinkedIn, Nov 2026).
// `highlights` are key projects: a short title, one or two sentences, and an optional tag
//   (talk, poster, award or paper). The first two show; the rest sit behind "more projects".
// `papers` are publication file names (without .md) from src/content/publications/.
// `links` are optional extra links (site paths without a leading slash, or full URLs).
export type Highlight = { title: string; text: string; tag?: string };
// `photo` is an optional picture from that time of your career (put it in src/assets/career/,
//   cropped to 4:5, and import it at the top of this file) with `photoAlt` describing it.
export type ExperienceItem = TimelineItem & {
  place: string;
  label?: string;
  photo?: ImageMetadata;
  photoAlt?: string;
  summary: string;
  highlights?: Highlight[];
  papers?: string[];
  links?: { label: string; href: string }[];
};

export const experience: ExperienceItem[] = [
  {
    title: 'Postdoctoral Computational Biologist',
    org: 'MRC Weatherall Institute of Molecular Medicine',
    place: 'University of Oxford',
    dates: 'Jan 2024 – present',
    photo: oxfordPhoto,
    photoAlt: 'Kristian with his research group on a staircase in Oxford',
    papers: ['2026-02-23-comBO'],
    summary:
      'I lead and co-lead projects that study blood cancers cell by cell: reading which genes are active in tens of thousands of individual cells, and mapping where those cells sit inside the bone marrow.',
    highlights: [
      {
        title: 'What keeps a childhood leukaemia alive (co-lead)',
        text: 'In juvenile myelomonocytic leukaemia (JMML) we found that immune cells in the bone marrow help leukaemic stem cells survive. Blocking that signal with an existing drug, gilteritinib, led to remission in a patient whose disease had stopped responding to treatment.',
        tag: 'Talk · ASH 2024',
      },
      {
        title: 'Predicting who benefits from luspatercept (lead)',
        text: 'Luspatercept helps some people with lower-risk MDS stop needing blood transfusions, but there was no way to know in advance who. I found a gene-activity pattern in developing red blood cells that predicts response, confirmed in more than 400 patients.',
        tag: 'EHA 2025',
      },
      {
        title: 'Seeing which mutations share a cell (co-lead)',
        text: 'Standard sequencing blends millions of cells together, so it cannot tell whether two TP53 faults sit in the same cancer cell. I wrote software that reads DNA and proteins one cell at a time, revealing complexity that bulk tests miss.',
        tag: 'Poster · ASH 2024',
      },
      {
        title: 'Inherited DNA behind a blood cancer risk (lead)',
        text: 'A common inherited version of the JAK2 gene raises the risk of myeloproliferative neoplasms, but the exact DNA changes responsible are unknown. I combined single-cell data with AI models of DNA to narrow down the likely culprits, in a way that works for other risk genes too.',
      },
      {
        title: 'Testing a lab-grown bone marrow',
        text: 'I showed that a bone marrow "organoid" grown in the lab reproduces the cell types of real adult marrow.',
        tag: 'Cell Stem Cell 2026',
      },
      {
        title: 'Reusable tools',
        text: 'Pipelines that turn raw single-cell data into analysis-ready results with one command on the computing cluster, and a statistical method to rank which RNAs the protein PCBP2 binds.',
      },
    ],
  },
  {
    title: 'External Bioinformatics Collaborator',
    org: "King's College London",
    place: 'Remote',
    label: 'Voluntary',
    dates: 'Jan 2025 – present',
    summary:
      'A collaboration I sought out to learn how antibodies are discovered, a field outside my own, working with a former MRes coursemate.',
    highlights: [
      {
        title: 'Matching antibodies to their target (SARS-CoV-2)',
        text: 'I helped design the experiment and built the analysis for 22,564 immune B cells from seven donors, sorting about 2,500 antibody families by which part of the virus they recognise. Promising antibodies were made and tested in the lab, and the data now help train AI models that design antibodies.',
      },
    ],
  },
  {
    title: 'Postdoctoral Research Associate',
    org: 'Cancer Research UK Manchester Institute',
    place: 'University of Manchester',
    dates: 'Oct 2023 – Jan 2024',
    summary: 'A short post after my PhD to take our blast-phase CMML study through to publication.',
    highlights: [
      {
        title: 'Sorting an aggressive leukaemia into treatable groups (lead)',
        text: 'Blast-phase CMML is usually treated like any other acute leukaemia. Combining clinical, laboratory and gene-activity data from 42 patients with machine learning, I found two subtypes that respond to different drugs, confirmed in patient cells, and built a simple classifier to tell them apart.',
      },
    ],
    papers: ['2025-01-31-CRM'],
  },
  {
    title: 'PhD, Cancer Sciences (Predoctoral Fellow)',
    org: 'Cancer Research UK Manchester Institute',
    place: 'University of Manchester',
    dates: 'Jan 2019 – Oct 2023',
    photo: phdPhoto,
    photoAlt: 'Kristian at his desk at the Cancer Research UK Manchester Institute during his PhD',
    summary:
      'Mostly lab-based, I also generated and analysed single-cell and bulk data on chronic myelomonocytic leukaemia (CMML), a blood cancer that can turn into aggressive acute leukaemia.',
    highlights: [
      {
        title: 'Why CMML turns into acute leukaemia (lead)',
        text: "About 30% of patients see CMML turn into a hard-to-treat acute leukaemia. Following patients' cells over time, I found that stem-cell-like clones take over, and that combining two drugs works better against them than either alone.",
        tag: 'ASH 2022 Abstract Achievement Award',
      },
      {
        title: 'KIT mutations in CMML with mastocytosis (co-lead)',
        text: 'KIT mutations turned out to be in only part of the cancer, and the cells without them grow when patients take KIT-blocking drugs.',
        tag: 'EHA 2023',
      },
      {
        title: 'How the cancer quietens the immune system',
        text: 'Gene-activity data from blood cells of older donors showed how a signal called resistin switches on genes that dampen immunity.',
        tag: 'J Clin Invest 2026',
      },
      {
        title: 'Faulty gene splicing in SRSF2-mutant cells',
        text: 'Found that the gene CHD8 is spliced incorrectly, matching weak points found in a separate drug-target screen.',
        tag: 'ASH 2025',
      },
      {
        title: 'EspressoPro',
        text: 'A Python package that automatically labels cell types from single-cell protein measurements, used across CMML and MDS patient groups.',
      },
    ],
    papers: ['2026-10-15-JCI', '2026-04-28-CAS', '2020-08-01-EBM', '2023-06-01-CSC', '2023-04-05-BJH', '2023-11-02-Leukemia', '2024-07-12-BCJ', '2024-10-04-Leukemia'],
  },
  {
    title: 'Business Development Associate',
    org: 'Innovation Forum',
    place: 'Manchester',
    label: 'Voluntary',
    dates: 'Jan 2022 – Jan 2023',
    summary:
      'A volunteer role alongside my PhD to learn how scientific discoveries become products and treatments: commercialisation, technology transfer and the route to industry and the clinic.',
    highlights: [
      {
        title: 'UK genomics market and accelerator events',
        text: 'I met people working in technology transfer, biotech and the NHS, helped run events with investors and patent attorneys, and wrote the branch’s analysis of the UK genomics market.',
      },
    ],
    links: [{ label: 'The UK genomics market (blog post)', href: 'blog/uk-genomics-market/' }],
  },
  {
    title: 'Research Associate',
    org: 'Randall Centre for Cell & Molecular Biophysics',
    place: "King's College London",
    dates: 'Jan 2018 – Jan 2019',
    photo: kclPhoto,
    photoAlt: "Kristian in a lab coat during his time as a research associate at King's College London",
    summary:
      'My MRes project, continued as a research assistant: mostly lab work, with my first steps in computational analysis.',
    highlights: [
      {
        title: 'Switches behind cellular ageing',
        text: 'I studied how a protein called Meox2 turns on genes that drive cellular ageing (senescence), predicting where it binds DNA with computational tools and confirming it with lab experiments.',
      },
    ],
  },
];

export const positions: TimelineItem[] = experience
  .filter((e) => !e.title.startsWith('PhD') && !e.label)
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

// `anim` picks the small animation on each card (see src/components/ResearchAnim.astro).
export const research: { icon: string; anim: 'clusters' | 'evolution' | 'tree' | 'risk' | 'niche' | 'response' | 'clones' | 'antibody' | 'pipeline'; title: string; text: string }[] = [
  {
    icon: 'cells',
    anim: 'clusters',
    title: 'Single-cell & multi-omics',
    text: 'Single-cell transcriptomic and multiomic profiling of haematopoietic and leukaemic stem cells to map disease heterogeneity.',
  },
  {
    icon: 'cells',
    anim: 'niche',
    title: 'Cell cross-talk in space',
    text: 'Single-cell and spatial maps of how leukaemic stem cells talk to the immune and stromal cells around them, and which of those signals drugs can block.',
  },
  {
    icon: 'tree',
    anim: 'tree',
    title: 'Stratification & drug response',
    text: 'Machine-learning approaches that combine clinical, immunophenotype and transcriptome data to predict therapeutic vulnerabilities.',
  },
  {
    icon: 'cells',
    anim: 'risk',
    title: 'Genetic risk & multiome',
    text: 'Reading how open the DNA is and which genes are switched on in the same single cells, to find the inherited changes that raise the risk of blood cancer.',
  },
  {
    icon: 'route',
    anim: 'evolution',
    title: 'Leukaemic transformation',
    text: 'How chronic myeloid neoplasms such as CMML and MDS evolve and transform into acute leukaemia.',
  },
  {
    icon: 'cells',
    anim: 'clones',
    title: 'Clones, cell by cell',
    text: 'Reading DNA and proteins one cell at a time to see which mutations sit together in the same cancer cell, something bulk sequencing cannot show.',
  },
  {
    icon: 'tree',
    anim: 'response',
    title: 'Treatment response',
    text: 'Following how blood cells mature (differentiate) to pinpoint the gene-activity signature unique to the disease, then using it to predict which patients will respond to treatment.',
  },
  {
    icon: 'cells',
    anim: 'antibody',
    title: 'Antibodies & infection',
    text: 'Matching immune B cells, and the antibodies they make, to the parts of a virus they recognise, to help discover and design new antibodies.',
  },
  {
    icon: 'tree',
    anim: 'pipeline',
    title: 'Reproducible pipelines',
    text: 'Automated analysis pipelines that take raw sequencing data to results the same way every time, scaled across large computing clusters.',
  },
];

export const nav = [
  { label: 'Publications', href: 'publications/' },
  { label: 'Tutorials', href: 'tutorials/' },
  { label: 'Blog', href: 'blog/' },
];
