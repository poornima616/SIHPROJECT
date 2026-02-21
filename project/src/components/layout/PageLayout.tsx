import { ReactNode, useState } from 'react';
import { Box, Container } from '@mui/material';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { motion } from 'framer-motion';

interface PageLayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
}

export const PageLayout = ({ children, showSidebar = true, maxWidth = 'lg' }: PageLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar onMenuClick={handleSidebarToggle} />

      <Box sx={{ display: 'flex', flex: 1 }}>
        {showSidebar && <Sidebar open={sidebarOpen} onClose={handleSidebarToggle} />}

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${showSidebar ? 260 : 0}px)` },
          }}
        >
          <Container
            maxWidth={maxWidth}
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </Container>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};
