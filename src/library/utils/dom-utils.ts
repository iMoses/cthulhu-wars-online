type EventMap = HTMLElementEventMap & WindowEventMap & DocumentEventMap;
type ListenerElements = HTMLElement | Window | Document;

export function dataAttr(
  condition: boolean,
  value = '',
  defaultValue: string | null = null
) {
  return condition ? value : defaultValue;
}

export function subscribeToEvent<T extends keyof EventMap>(
  target: ListenerElements,
  eventName: T,
  callback: (event: EventMap[T]) => void
): () => void {
  target.addEventListener(eventName, callback);
  return () => target.removeEventListener(eventName, callback);
}
