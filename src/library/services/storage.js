import { observable } from 'mobx';

export class Storage {
  #cache = observable.map();
  #store = Storage.Factory(window.localStorage);

  get(key) {
    if (!this.#cache.has(key)) {
      this.#cache.set(key, this.#store.get(key));
    }
    return this.#cache.get(key);
  }

  set(key, value) {
    this.#store.set(key, value);
    this.#cache.set(key, value);
  }

  remove(key) {
    this.#store.remove(key);
    this.#cache.delete(key);
  }

  clear() {
    this.#store.clear();
    this.#cache.clear();
  }

  static Factory(storage) {
    return {
      get(key) {
        try {
          const item = storage.getItem(key);
          return item ? JSON.parse(item) : null;
        } catch (error) {
          return null;
        }
      },
      set(key, val) {
        if (typeof val !== 'undefined' && val !== null) {
          storage.setItem(key, JSON.stringify(val));
        }
      },
      remove: key => storage.removeItem(key),
      clear: () => storage.clear(),
    };
  }
}
