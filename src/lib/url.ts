// Prefix a site path with the base (/Portfolio/). Pass paths without a leading slash.
export const url = (path = '') => {
  const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
  return base + path.replace(/^\//, '');
};

// "**Gurashi K**, Smith J" -> HTML with your name in <strong>
export const authorsHtml = (authors: string) =>
  authors
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
