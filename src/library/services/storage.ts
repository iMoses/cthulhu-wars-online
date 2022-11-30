import { action, makeObservable, observable } from 'mobx';
import { storageFactory } from '@src/library/storage-factory';
import { subscribeToEvent } from '@src/library/utils/dom-utils';

export class Storage {
  #cache = observable.map(null, { deep: false });
  #store = storageFactory(Storage.storageArea);

  constructor() {
    makeObservable(this, {
      set: action,
      remove: action,
      clear: action,
    });
    Storage.subscribeToStorage(event =>
      event.key !== null
        ? this.#cache.set(event.key, this.#store.get(event.key))
        : this.#cache.clear()
    );
  }

  get(key: string) {
    if (!this.#cache.has(key)) {
      this.#cache.set(key, this.#store.get(key));
    }
    return this.#cache.get(key);
  }

  set(key: string, value: unknown) {
    this.#store.set(key, value);
    this.#cache.set(key, value);
  }

  remove(key: string) {
    this.#store.remove(key);
    this.#cache.delete(key);
  }

  clear() {
    this.#store.clear();
    this.#cache.clear();
  }

  static storageArea = window.localStorage;

  static subscribeToStorage(
    callback: (event: StorageEvent) => void,
    storageArea = Storage.storageArea
  ) {
    return subscribeToEvent(window, 'storage', event => {
      if (event.storageArea === storageArea) {
        callback(event);
      }
    });
  }
}
