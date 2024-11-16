export function deepCopy<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) satisfies T as T;
}
