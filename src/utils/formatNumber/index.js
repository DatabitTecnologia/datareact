export function formatNumber(value, decimalPlaces = 2) {
  if (isNaN(value)) {
    return parseFloat(0).toFixed(decimalPlaces);
  } else {
    return parseFloat(value).toFixed(decimalPlaces);
  }
}
