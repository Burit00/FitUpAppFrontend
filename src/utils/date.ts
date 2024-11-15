export function toDateOnly(date: Date): string {
  const dateOnly = new Date(date);
  dateOnly.setMinutes(dateOnly.getMinutes() - dateOnly.getTimezoneOffset());

  return dateOnly.toISOString().split('T')[0];
}
