import { useCallback } from 'react';
import { useInject } from '@src/library/hooks/use-inject';

export function useStorage(itemKey: string, defaultValue: unknown) {
  const { storage } = useInject();
  return [
    storage.get(itemKey) ?? defaultValue,
    useCallback(
      (newValue: unknown) =>
        storage.set(
          itemKey,
          typeof newValue === 'function'
            ? newValue(storage.get(itemKey))
            : newValue
        ),
      [itemKey]
    ),
    useCallback(() => storage.remove(itemKey), [itemKey]),
  ];
}
