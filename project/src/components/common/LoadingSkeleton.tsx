import { Skeleton, Stack, Card, CardContent, Box, Grid } from '@mui/material';

export const CardSkeleton = () => (
  <Card>
    <CardContent>
      <Skeleton variant="text" width="60%" height={32} />
      <Skeleton variant="text" width="40%" height={24} sx={{ mt: 1 }} />
      <Skeleton variant="rectangular" height={100} sx={{ mt: 2, borderRadius: 2 }} />
      <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
        <Skeleton variant="rounded" width={80} height={32} />
        <Skeleton variant="rounded" width={80} height={32} />
        <Skeleton variant="rounded" width={80} height={32} />
      </Stack>
    </CardContent>
  </Card>
);

export const DashboardSkeleton = () => (
  <Box>
    <Skeleton variant="text" width={300} height={48} sx={{ mb: 3 }} />
    <Grid container spacing={3}>
      {[1, 2, 3, 4].map((i) => (
        <Grid item xs={12} sm={6} md={3} key={i}>
          <Card>
            <CardContent>
              <Skeleton variant="circular" width={48} height={48} />
              <Skeleton variant="text" width="70%" height={32} sx={{ mt: 2 }} />
              <Skeleton variant="text" width="40%" height={24} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    <Box sx={{ mt: 4 }}>
      <Skeleton variant="text" width={200} height={32} sx={{ mb: 2 }} />
      <Stack spacing={2}>
        {[1, 2, 3].map((i) => (
          <CardSkeleton key={i} />
        ))}
      </Stack>
    </Box>
  </Box>
);

export const TableSkeleton = () => (
  <Stack spacing={2}>
    {[1, 2, 3, 4, 5].map((i) => (
      <Skeleton key={i} variant="rectangular" height={60} sx={{ borderRadius: 2 }} />
    ))}
  </Stack>
);
