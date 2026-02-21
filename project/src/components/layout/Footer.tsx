import { Box, Container, Grid, Typography, Link, Stack } from '@mui/material';
import { motion } from 'framer-motion';

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom fontWeight={700}>
              PM Internship
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Empowering India's youth through quality internship opportunities under the Pradhan Mantri Internship Scheme.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Quick Links
            </Typography>
            <Stack spacing={1}>
              <Link href="/about" color="text.secondary" underline="hover">
                About Us
              </Link>
              <Link href="/jobs" color="text.secondary" underline="hover">
                Browse Jobs
              </Link>
              <Link href="/pm-internships" color="text.secondary" underline="hover">
                PM Scheme
              </Link>
              <Link href="/contact" color="text.secondary" underline="hover">
                Contact
              </Link>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Resources
            </Typography>
            <Stack spacing={1}>
              <Link href="/faq" color="text.secondary" underline="hover">
                FAQ
              </Link>
              <Link href="/guidelines" color="text.secondary" underline="hover">
                Guidelines
              </Link>
              <Link href="/support" color="text.secondary" underline="hover">
                Support
              </Link>
              <Link href="/blog" color="text.secondary" underline="hover">
                Blog
              </Link>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Legal
            </Typography>
            <Stack spacing={1}>
              <Link href="/privacy" color="text.secondary" underline="hover">
                Privacy Policy
              </Link>
              <Link href="/terms" color="text.secondary" underline="hover">
                Terms of Service
              </Link>
              <Link href="/disclaimer" color="text.secondary" underline="hover">
                Disclaimer
              </Link>
            </Stack>
          </Grid>
        </Grid>
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          sx={{ mt: 5, pt: 3, borderTop: 1, borderColor: 'divider' }}
        >
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} PM Internship Scheme. All rights reserved. | Government of India Initiative
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
