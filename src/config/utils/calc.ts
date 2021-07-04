// Calculate percentage
export const getPercentage = (current: number, min: number, max: number) =>
  ((current - min) / (max - min)) * 100

export const getWidth = (value: number, max: number) => {
  if (value === max) return `100%`

  const newValue = Number.isInteger(value) ? value : value * 100
  return newValue <= 25 ? `calc(${newValue}% + 25px)` : `${newValue}%`
}

export const getValue = (
  percentage: number,
  min: number,
  max: number,
  step: number,
) => {
  const fullRange = max - min

  const correctedDecimals = step % 1 ? step?.toString().split('.')[1].length : 0

  const result = Number(
    (percentage * (fullRange / 100) + min).toFixed(correctedDecimals),
  )
  return result
}
