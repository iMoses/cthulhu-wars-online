import { FloatingPortal } from '@floating-ui/react-dom-interactions';
import { styled } from '@linaria/react';
import type { ReactElement, ReactNode, Ref } from 'react';
import { ITooltipOptions, useTooltip } from '@src/library/hooks/use-tooltip';

type ITooltipProps = {
  content: ReactNode;
  children: ReactElement & { ref: Ref<Element> };
} & ITooltipOptions;

export function Tooltip({
  content,
  placement = 'top',
  strategy = 'fixed',
  offset = 10,
  visible,
  children,
}: ITooltipProps) {
  const { isVisible, decorateElement, getFloatingProps, getArrowProps } =
    useTooltip({
      placement,
      strategy,
      visible,
      offset,
    });
  return (
    <>
      {decorateElement(children)}
      <FloatingPortal>
        {isVisible && (
          <Popper {...getFloatingProps()}>
            <Arrow {...getArrowProps()} />
            {content}
          </Popper>
        )}
      </FloatingPortal>
    </>
  );
}

const Popper = styled.div`
  padding: 4px 8px;
  color: var(--color-white);
  border-radius: 2px;
  background-color: #21263f;
`;

const Arrow = styled.span`
  position: absolute;
  width: 8px;
  height: 8px;
  transform: rotate(45deg);
  background-color: #21263f;

  [data-placement^='top'] > & {
    bottom: -4px;
  }
  [data-placement^='right'] > & {
    left: -4px;
  }
  [data-placement^='bottom'] > & {
    top: -4px;
  }
  [data-placement^='left'] > & {
    right: -4px;
  }
`;
