import { Box, Typography, Chip, FormHelperText } from '@mui/material';
import { Delete, Upload } from '@mui/icons-material';
import { FC } from 'react';

type Props = {
  file: File | null;
  onFileChange: (file: File) => void;
  onClear: () => void;
  error?: boolean;
  helperText?: string;
}

export const FilesUploadField:FC<Props> = ({ file, onFileChange, onClear, error, helperText } ) => (
  <Box>
      <Box
        component="label"
        sx={{
          border: '2px dashed',
          borderColor: error ? 'error.main' : '#AC98D1',
          borderRadius: 3,
          width: '100%',
          minHeight: 180,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#fdf9ff',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': { bgcolor: '#f6f0ff' },
        }}
      >
        <input
          type="file"
          hidden
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onFileChange(f);
          }}
        />

        {!file ? (
          <>
            <Upload sx={{ fontSize: 40, color: error ? 'error.main' : '#AC98D1' }} />
            <Typography mt={1} fontWeight={500} color={error ? 'error.main' : 'inherit'}>
              Завантажити файл
            </Typography>
          </>
        ) : (
          <Chip
            label={file.name}
            onDelete={onClear}
            deleteIcon={<Delete sx={{ color: '#fff' }} />}
            sx={{
              bgcolor: error ? 'error.main' : '#AC98D1',
              color: '#fff',
              borderRadius: 5,
              px: 2,
              py: 1,
              fontSize: 14,
            }}
          />
        )}
      </Box>

      {helperText && (
        <FormHelperText error={error} sx={{ ml: 1.5, mt: 0.5 }}>
          {helperText}
        </FormHelperText>
      )}
    </Box>
);
