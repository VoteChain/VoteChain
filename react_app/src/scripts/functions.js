export const formatDate = (isoString) => {
  const date = new Date(isoString);

  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  // Format date like "May 22, 2025, 8:30 AM"
  const formatted = date.toLocaleString("en-US", options);

  // Add ordinal suffix to the day (e.g., 22 → 22nd)
  const day = date.getDate();
  const suffix = ((d) => {
    if (d > 3 && d < 21) return "th";
    switch (d % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  })(day);

  return formatted.replace(`${day}`, `${day}${suffix}`);
};

// Example:
// const result = formatDate("2025-05-22T08:30:00Z");
// console.log(result); // "May 22nd, 2025, 8:30 AM"
