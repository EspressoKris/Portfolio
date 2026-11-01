---
permalink: /
title: ""
description: "Kristian Gurashi — computational biologist at the University of Oxford working on single-cell and multi-omic analysis of myeloid leukaemia."
author_profile: true
redirect_from:
  - /about/
  - /about.html
---

{% include base_path %}

<section class="hero">
  <p class="hero__eyebrow">Computational biology · Haemato-oncology</p>
  <h1 class="hero__title">I use single-cell and multi-omic data to understand how myeloid leukaemias evolve and respond to treatment.</h1>
  <p class="hero__lead">
    I'm a postdoctoral computational biologist at the
    <a href="https://www.imm.ox.ac.uk/">MRC Weatherall Institute of Molecular Medicine</a>, University of Oxford.
    I trained first as a wet-lab scientist in leukaemia stem cell biology, then moved into computational work during my
    PhD at the Cancer Research UK Manchester Institute.
  </p>
  <p class="hero__actions">
    <a class="btn btn--primary" href="{{ base_path }}/publications/">Publications</a>
    <a class="btn btn--inverse" href="{{ base_path }}/cv/">CV</a>
    <a class="btn btn--inverse" href="{{ site.author.googlescholar }}">Google Scholar</a>
    <a class="btn btn--inverse" href="mailto:{{ site.author.email }}">Get in touch</a>
  </p>
</section>

## Research

<div class="interest-grid">
  <div class="interest">
    <h3><i class="fas fa-dna" aria-hidden="true"></i> Single-cell &amp; multi-omics</h3>
    <p>Single-cell transcriptomic and multiomic profiling of haematopoietic and leukaemic stem cells to map disease heterogeneity.</p>
  </div>
  <div class="interest">
    <h3><i class="fas fa-route" aria-hidden="true"></i> Leukaemic transformation</h3>
    <p>How chronic myeloid neoplasms such as CMML and MDS evolve and transform into acute leukaemia.</p>
  </div>
  <div class="interest">
    <h3><i class="fas fa-diagram-project" aria-hidden="true"></i> Stratification &amp; drug response</h3>
    <p>Machine-learning approaches that combine clinical, immunophenotype and transcriptome data to predict therapeutic vulnerabilities.</p>
  </div>
</div>

<figure class="wordcloud">
  <img src="{{ base_path }}/images/wordcloud.png" alt="Word cloud of keywords from my publications, including leukemia, CMML, stem cells and scRNA-seq" loading="lazy">
  <figcaption>Keywords across my publications</figcaption>
</figure>

## Selected publications

{% assign featured = site.publications | where: "featured", true | sort: "date" | reverse %}
<div class="pub-list">
{% for post in featured %}
  {% include pub-card.html %}
{% endfor %}
</div>

<p><a href="{{ base_path }}/publications/">All publications <i class="fas fa-arrow-right" aria-hidden="true"></i></a></p>

## Experience

{% include cv-timeline.html items=site.data.cv.positions %}
