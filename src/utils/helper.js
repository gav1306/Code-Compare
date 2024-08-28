export const highlightSearchTerm = (paragraph, searchTerm) => {
  const regex = new RegExp(`(${searchTerm})`, "gi");
  return paragraph.replace(regex, '<span class="highlight">$1</span>');
};
