export const formatDateTime = (isoString) => {
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

// convert near Timestamp to July 16, 2025 format
export const formatDate = (Timestamp) => {
  const nearTimestamp = Timestamp;
  const date = new Date(Number(nearTimestamp) / 1_000_000);

  const formatted = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return formatted;
};

export const getTimeRemaining = (targetDate, options = {}) => {
  // Parse input date (handle both Date objects and ISO strings)
  const endDate =
    typeof targetDate === "string"
      ? new Date(targetDate)
      : new Date(targetDate);
  const now = new Date();

  // Validate input
  if (isNaN(endDate.getTime())) {
    throw new Error("Invalid target date");
  }

  // Check if date is in the past
  if (endDate <= now) {
    return "Ended";
  }

  // Calculate time difference in milliseconds
  const diff = endDate - now;

  // Default options
  const { showSeconds = diff < 3600000, precision = 2 } = options;

  // Calculate time units
  const timeUnits = [
    { value: Math.floor(diff / (1000 * 60 * 60 * 24 * 365)), unit: "year" },
    {
      value: Math.floor((diff / (1000 * 60 * 60 * 24 * 30)) % 12),
      unit: "month",
    },
    {
      value: Math.floor((diff / (1000 * 60 * 60 * 24 * 7)) % 52),
      unit: "week",
    },
    { value: Math.floor((diff / (1000 * 60 * 60 * 24)) % 7), unit: "day" },
    { value: Math.floor((diff / (1000 * 60 * 60)) % 24), unit: "hour" },
    { value: Math.floor((diff / (1000 * 60)) % 60), unit: "minute" },
    { value: Math.floor((diff / 1000) % 60), unit: "second" },
  ];

  // Filter relevant units based on showSeconds and precision
  const relevantUnits = timeUnits
    .filter((unit, index) => {
      // Always show the first non-zero unit
      if (index === 0 && unit.value > 0) return true;
      // Show seconds only if enabled
      if (unit.unit === "second" && !showSeconds) return false;
      // Show only up to the specified precision
      return index < precision + timeUnits.findIndex((u) => u.value > 0);
    })
    .filter((unit) => unit.value > 0); // Remove zero-value units

  // Format the output string
  if (relevantUnits.length === 0) {
    return "Less than a minute";
  }

  return relevantUnits
    .map((unit) => `${unit.value} ${unit.unit}${unit.value !== 1 ? "s" : ""}`)
    .join(", ");
};

/**
 * Determines the status of a vote based on current time
 * @param {Date|string} startTime - The vote start time (Date object or ISO string)
 * @param {Date|string} endTime - The vote end time (Date object or ISO string)
 * @returns {string} - Vote status: 'upcoming', 'active', or 'ended'
 */
export const getVoteStatus = (startTime, endTime) => {
  // Convert inputs to Date objects if they aren't already
  const start = new Date(startTime);
  const end = new Date(endTime);
  const now = new Date();

  // Validate dates
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error("Invalid date parameters");
  }

  if (end < start) {
    throw new Error("End time cannot be before start time");
  }

  // Determine status
  if (now < start) {
    return "upcoming";
  } else if (now >= start && now <= end) {
    return "active";
  } else {
    return "ended";
  }
};

export const camelCaseToNormal = (text) => {
  return text
    .replace(/([A-Z])/g, " $1") // insert space before capital letters
    .replace(/^./, (str) => str.toUpperCase()); // capitalize first letter
};
