// Calculate percentage
export const getPercentage = (current: number, min: number, max: number) =>
  ((current - min) / (max - min)) * 100

export const getValue = (percentage: number, min: number, max: number) =>
  ((max - min) / 100) * percentage + min

// New left position
export const getLeft = (percentage: number) => `calc(${percentage}% - 25px)`

export const getWidth = (percentage: number) => `${percentage}%`
