export function formatTwoDigits(num: number): string {
  return num.toString().padStart(2, "0");
}
