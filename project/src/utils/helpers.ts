export const getMatchScoreColor = (score: number): string => {
  if (score >= 80) return '#00C853';
  if (score >= 60) return '#FF9933';
  if (score >= 40) return '#FF9800';
  return '#F44336';
};

export const getStatusColor = (status: string): 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'warning';
    case 'under_review':
      return 'info';
    case 'shortlisted':
      return 'success';
    case 'accepted':
      return 'success';
    case 'rejected':
      return 'error';
    default:
      return 'default';
  }
};

export const calculateProfileCompleteness = (profile: {
  fullName?: string;
  email?: string;
  phone?: string;
  education?: unknown[];
  experience?: unknown[];
  skills?: string[];
  resumeUrl?: string;
  preferences?: unknown;
}): number => {
  let score = 0;
  const fields = 7;

  if (profile.fullName) score++;
  if (profile.email) score++;
  if (profile.phone) score++;
  if (profile.education && profile.education.length > 0) score++;
  if (profile.skills && profile.skills.length > 0) score++;
  if (profile.resumeUrl) score++;
  if (profile.preferences) score++;

  return Math.round((score / fields) * 100);
};

export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

export const debounce = <T extends (...args: unknown[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const generateAvatarColor = (name: string): string => {
  const colors = [
    '#0052CC',
    '#FF9933',
    '#00C853',
    '#2196F3',
    '#9C27B0',
    '#FF5722',
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

export const isValidURL = (str: string): boolean => {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
};

export const downloadFile = (url: string, filename: string): void => {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
