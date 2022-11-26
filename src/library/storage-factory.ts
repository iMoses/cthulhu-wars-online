interface StorageAdapter {
  get: (key: string) => unknown;
  set: (key: string, value: unknown) => void;
  remove: (key: string) => void;
  clear: () => void;
}

export function storageFactory(storage: Storage): StorageAdapter {
  return {
    get(key) {
      try {
        const item = storage.getItem(key);
        return item ? JSON.parse(item) : null;
      } catch (error) {
        return null;
      }
    },
    set(key, value) {
      if (typeof value !== 'undefined' && value !== null) {
        storage.setItem(key, JSON.stringify(value));
      }
    },
    remove: key => storage.removeItem(key),
    clear: () => storage.clear(),
  };
}
