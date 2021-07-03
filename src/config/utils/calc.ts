// Calculate percentage
export const getPercentage = (current: number, max: number) =>
  (100 * current) / max

// New left position
export const getLeft = (percentage: number) => `calc(${percentage}% - 5px)`
