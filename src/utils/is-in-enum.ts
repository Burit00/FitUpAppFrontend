export function isInEnum(value: string | number, enumObj: unknown): boolean {
  return Object.values(enumObj).includes(value);
}
