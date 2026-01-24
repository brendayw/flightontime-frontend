const isValidIsoDate = (dateStr) => {
  if (!dateStr) return false;

  const date = new Date(dateStr);

  // Invalid Date
  if (isNaN(date.getTime())) return false;

  // Comparar contra el string original (evita 2025-02-30 → 2025-03-02)
  return date.toISOString().startsWith(dateStr.slice(0, 10));
};

export default isValidIsoDate;