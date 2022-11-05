import { styled } from '@linaria/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

export function DefaultLayout(props) {
  const [isOpen, setOpen] = useState(true);
  return (
    <Container
      {...props}
      {...animationProps}
      animate={isOpen ? 'sidebarExpanded' : 'sidebarCollapsed'}
    >
      <DefaultLayout.Sidebar>
        <DefaultLayout.SidebarToggle onClick={() => setOpen(!isOpen)} />
      </DefaultLayout.Sidebar>
      <DefaultLayout.Content>
        <Outlet />
      </DefaultLayout.Content>
    </Container>
  );
}

const animationProps = {
  initial: false,
  variants: {
    sidebarCollapsed: { '--sidebar-width': '64px' },
    sidebarExpanded: { '--sidebar-width': '264px' },
  },
  transition: { type: 'tween', duration: 0.4 },
};

const Container = styled(motion.div)`
  display: grid;
  min-height: 100vh;
  grid-template-areas: 'sidebar content';
  grid-template-columns: var(--sidebar-width) 1fr;
  overflow: hidden;
`;

DefaultLayout.Content = styled.main`
  grid-area: content;
  height: 100vh;
`;

DefaultLayout.Sidebar = styled.aside`
  grid-area: sidebar;
  position: relative;
  z-index: 1;
  border-right: 1px solid black;
`;

DefaultLayout.SidebarToggle = styled.span`
  position: absolute;
  top: 8px;
  right: -16px;
  width: 32px;
  height: 32px;
  border: 1px solid black;
  border-radius: 100vmax;
  background-color: white;
  cursor: pointer;
`;
