// src/utils/safeJson.ts
export function safeParseJSON<T = unknown>(value: string | null | undefined, fallback: T | null = null): T | null {
  if (value == null) return fallback;                 // null or undefined
  const s = String(value).trim();
  if (!s || s === 'undefined' || s === 'null') return fallback;
  try {
    return JSON.parse(s) as T;
  } catch (err) {
    console.error('Invalid JSON:', s, err);
    return fallback;
  }
}

export function safeStringifyJSON(value: any): string {
  try {
    return JSON.stringify(value ?? null);
  } catch (err) {
    console.error('Could not stringify value:', value, err);
    return 'null';
  }
}
