import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ProtectedRoute } from './ProtectedRoute';
import { Box, CircularProgress } from '@mui/material';

const Loading = () => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
    }}
  >
    <CircularProgress size={60} />
  </Box>
);

const Landing = lazy(() => import('../pages/public/Landing').then(m => ({ default: m.Landing })));
const Login = lazy(() => import('../pages/public/Login').then(m => ({ default: m.Login })));
const Register = lazy(() => import('../pages/public/Register').then(m => ({ default: m.Register })));

const Dashboard = lazy(() => import('../pages/dashboard/Dashboard').then(m => ({ default: m.Dashboard })));
const Profile = lazy(() => import('../pages/dashboard/Profile').then(m => ({ default: m.Profile })));
const MyApplications = lazy(() => import('../pages/dashboard/MyApplications').then(m => ({ default: m.MyApplications })));
const Recommendations = lazy(() => import('../pages/dashboard/Recommendations').then(m => ({ default: m.Recommendations })));
const PMInternships = lazy(() => import('../pages/dashboard/PMInternships').then(m => ({ default: m.PMInternships })));
const ResumeUpload = lazy(() => import('../pages/dashboard/ResumeUpload').then(m => ({ default: m.ResumeUpload })));

const JobsList = lazy(() => import('../pages/jobs/JobsList').then(m => ({ default: m.JobsList })));
const JobDetail = lazy(() => import('../pages/jobs/JobDetail').then(m => ({ default: m.JobDetail })));

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Loading />}>
        <Landing />
      </Suspense>
    ),
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<Loading />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '/register',
    element: (
      <Suspense fallback={<Loading />}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<Loading />}>
          <Dashboard />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<Loading />}>
          <Profile />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/applications',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<Loading />}>
          <MyApplications />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/recommendations',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<Loading />}>
          <Recommendations />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/pm-internships',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<Loading />}>
          <PMInternships />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/resume-upload',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<Loading />}>
          <ResumeUpload />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/jobs',
    element: (
      <Suspense fallback={<Loading />}>
        <JobsList />
      </Suspense>
    ),
  },
  {
    path: '/jobs/:id',
    element: (
      <Suspense fallback={<Loading />}>
        <JobDetail />
      </Suspense>
    ),
  },
]);
