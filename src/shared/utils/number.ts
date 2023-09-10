export function asNumber(value: any, fallbackValue: number | null = null) {
  const num = Number(value);
  return Number.isNaN(num) ? fallbackValue : num;
}
