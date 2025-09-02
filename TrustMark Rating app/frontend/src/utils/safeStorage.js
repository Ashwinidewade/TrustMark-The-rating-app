export const safeStorage = {
  getItem: <T>(key: string, defaultValue: T): T => {
    try {
      const value = localStorage.getItem(key);
      return value ? (JSON.parse(value) as T) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  setItem: (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore errors
    }
  },

  removeItem: (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch {
      // ignore errors
    }
  }
};
