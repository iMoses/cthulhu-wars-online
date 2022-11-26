import {
  useFloating,
  FloatingPortal,
  useInteractions,
  useHover,
  useRole,
} from '@floating-ui/react-dom-interactions';
import { useState, Children, cloneElement } from 'react';
import { mergeRefs } from 'react-merge-refs';

export const Tooltip = ({ children }) => {
  const child = Children.only(children);
  const [open, onOpenChange] = useState(false);
  const { x, y, reference, floating, strategy, context } = useFloating({
    open,
    onOpenChange,
    strategy: 'fixed',
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context),
    useRole(context),
    // useDismiss(context)
  ]);

  // console.log({ x, y, reference, floating, strategy, context });

  return (
    <>
      {cloneElement(
        Children.only(children),
        getReferenceProps({
          ...child.props,
          ref: mergeRefs([reference, child.ref]),
        })
      )}
      <FloatingPortal>
        {open && (
          <div
            ref={floating}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
            }}
            {...getFloatingProps()}
          >
            Tooltip
          </div>
        )}
      </FloatingPortal>
    </>
  );
};
