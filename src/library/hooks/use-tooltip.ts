import type { Placement, Strategy } from '@floating-ui/dom';
import {
  flip as flipMiddleware,
  shift as shiftMiddleware,
  arrow as arrowMiddleware,
  offset as offsetMiddleware,
  useFloating,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react-dom-interactions';
import {
  Children,
  cloneElement,
  HTMLProps,
  ReactElement,
  Ref,
  useRef,
  useState,
} from 'react';
import * as React from 'react';
import { mergeRefs } from 'react-merge-refs';

type ElementProps = HTMLProps<HTMLElement> | undefined;

export interface ITooltipOptions {
  placement?: Placement;
  strategy?: Strategy;
  visible?: boolean;
  offset?: number;
}

export function useTooltip({
  placement,
  strategy,
  offset,
  visible,
}: ITooltipOptions) {
  const arrowRef = useRef();
  const [open, onOpenChange] = useState(false);
  const isVisible = visible ?? open;
  const middleware = [
    flipMiddleware(),
    shiftMiddleware(),
    offset && offsetMiddleware(offset),
    arrowMiddleware({ element: arrowRef }),
  ].filter(Boolean);

  const {
    reference,
    floating,
    context,
    x: left = 0,
    y: top = 0,
    strategy: position,
    middlewareData: { arrow },
  } = useFloating({
    open: isVisible,
    middleware,
    placement,
    strategy,
    onOpenChange,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context),
    useRole(context),
  ]);

  return {
    isVisible,
    decorateElement: (element: ReactElement & { ref: Ref<Element> }) => {
      const onlyChild = Children.only(element);
      return cloneElement(
        onlyChild,
        getReferenceProps({
          ...onlyChild.props,
          ref: mergeRefs([reference, onlyChild.ref]),
        })
      );
    },
    getFloatingProps: (props?: ElementProps) =>
      getFloatingProps({
        ...props,
        ref: floating,
        style: { position, top, left },
        'data-placement': context.placement,
      } as React.HTMLProps<HTMLElement> & { 'data-placement': Placement }),
    getArrowProps: (props?: ElementProps): Record<string, unknown> => ({
      ...props,
      ref: arrowRef,
      style: { top: arrow?.y, left: arrow?.x },
    }),
  };
}
