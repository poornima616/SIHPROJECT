import { Chip } from '@mui/material';
import { getStatusColor } from '../../utils/helpers';
import { capitalizeFirstLetter } from '../../utils/formatters';

interface StatusChipProps {
  status: string;
  size?: 'small' | 'medium';
}

export const StatusChip = ({ status, size = 'small' }: StatusChipProps) => {
  return (
    <Chip
      label={capitalizeFirstLetter(status.replace('_', ' '))}
      color={getStatusColor(status)}
      size={size}
      sx={{ fontWeight: 500 }}
    />
  );
};
