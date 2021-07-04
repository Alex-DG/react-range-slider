export const formatValue = (value: number) => {
  const fractionDigits = value % 1 ? value?.toString().split('.')[1].length : 0
  return value.toFixed(fractionDigits)
}
