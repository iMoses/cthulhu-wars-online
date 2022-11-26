import { styled } from '@linaria/react';
import { motion } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';
import { useStorage } from '@src/library/hooks/use-storage';

export const TabletopLayout = observer(TabletopLayoutMain);

function TabletopLayoutMain(props) {
  const [isOpen, setOpen] = useStorage('sideDraw.open', false);
  return (
    <Container
      {...props}
      {...animationProps}
      animate={isOpen ? 'sideDrawExpanded' : 'sideDrawCollapsed'}
    >
      <TabletopLayout.Content>
        <Outlet />
      </TabletopLayout.Content>
      <TabletopLayout.Sidebar>
        <TabletopLayout.SidebarToggle
          onClick={() => setOpen(isOpen => !isOpen)}
        />
      </TabletopLayout.Sidebar>
    </Container>
  );
}

const animationProps = {
  initial: false,
  variants: {
    sideDrawCollapsed: { '--side-draw-size': '64px' },
    sideDrawExpanded: { '--side-draw-size': '264px' },
  },
  transition: { type: 'tween', duration: 0.4 },
};

const Container = styled(motion.div)`
  min-height: 100vh;
  font-family: var(--font-special-elite);
  overflow: hidden;
`;

TabletopLayout.Content = styled.main`
  height: calc(100vh - var(--side-draw-size));
  overflow: auto;
`;

TabletopLayout.Sidebar = styled.aside`
  position: absolute;
  inset: auto 0 0;
  z-index: 1;
  height: var(--side-draw-size);
  border-top: 1px solid black;
`;

TabletopLayout.SidebarToggle = styled.span`
  position: absolute;
  top: -16px;
  left: 50%;
  width: 64px;
  height: 16px;
  border: 1px solid black;
  background-color: white;
  cursor: pointer;
`;
