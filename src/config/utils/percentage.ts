/**
 * Get the percentage of a value in a range
 * between a min and a max
 *
 * @param value
 * @param min range
 * @param max range
 * @returns percantage
 */
export const rangePercentage = (value: number, min: number, max: number) => {
  const fullRange = max - min;
  const correctedStartValue = value - min;
  const result = (correctedStartValue * 100) / fullRange;

  return result;
};

/**
 * Convert percentage to the input value in a given
 * range between a min an a max
 *
 * @param percentage
 * @param min range
 * @param max range
 * @param step <=> max - min!
 * @returns value
 */
export const rangeValue = (
  percentage: number,
  min: number,
  max: number,
  step: number
) => {
  const fullRange = max - min;

  const correctedDecimals =
    step % 1 ? step?.toString().split(".")[1].length : 0;

  const result = Number(
    (percentage * (fullRange / 100) + min).toFixed(correctedDecimals)
  );
  return result;
};
