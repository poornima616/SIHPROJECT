import { useState } from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { PageLayout } from '../../components/layout/PageLayout';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export const ResumeUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
      }
    },
  });

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setUploaded(true);
      toast.success('Resume uploaded successfully!');
    }, 2000);
  };

  return (
    <PageLayout>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Upload Resume
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Upload your resume to get AI-powered job recommendations
      </Typography>

      <Paper
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        sx={{ p: 4 }}
      >
        <Box
          {...getRootProps()}
          sx={{
            border: 2,
            borderColor: isDragActive ? 'primary.main' : 'divider',
            borderStyle: 'dashed',
            borderRadius: 2,
            p: 6,
            textAlign: 'center',
            cursor: 'pointer',
            bgcolor: isDragActive ? 'action.hover' : 'transparent',
            transition: 'all 0.2s',
            '&:hover': {
              borderColor: 'primary.main',
              bgcolor: 'action.hover',
            },
          }}
        >
          <input {...getInputProps()} />
          <Upload size={64} style={{ marginBottom: 16, opacity: 0.5 }} />
          <Typography variant="h6" gutterBottom>
            {isDragActive ? 'Drop your resume here' : 'Drag & drop your resume'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            or click to browse (PDF, DOC, DOCX)
          </Typography>
        </Box>

        {file && (
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            sx={{
              mt: 3,
              p: 3,
              border: 1,
              borderColor: 'divider',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <FileText size={32} color="#0052CC" />
              <Box>
                <Typography variant="body1" fontWeight={600}>
                  {file.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {(file.size / 1024).toFixed(2)} KB
                </Typography>
              </Box>
            </Box>
            {uploaded && <CheckCircle size={32} color="#00C853" />}
          </Box>
        )}

        {file && !uploaded && (
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={handleUpload}
            disabled={uploading}
            sx={{ mt: 3 }}
            component={motion.button}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {uploading ? 'Uploading...' : 'Upload Resume'}
          </Button>
        )}
      </Paper>
    </PageLayout>
  );
};
