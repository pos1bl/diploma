import { FC, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
  styled,
} from '@mui/material';
import { ISpecialistCard } from '@models/ISpecialist';
import { calculateAge } from '@helpers/calculateAge';
import { OutlinedButton } from '@components/shared/OutlinedButton';
import { Link } from '@tanstack/react-router';
import { ContainedButton } from '@components/shared/ContainedButton';

type Props = { specialist: ISpecialistCard };

const BioText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'clamp',
})<{ clamp?: number }>(({ clamp }) =>
  clamp !== undefined
    ? {
        display: '-webkit-box',
        WebkitLineClamp: clamp,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }
    : {}
);

export const SpecialistCard: FC<Props> = ({ specialist }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [expanded, setExpanded] = useState(false);

  const age = calculateAge(specialist.dateOfBirth);
  const yearsOfExperience = calculateAge(specialist.dateOfStart);

  return (
    <Card sx={{ px: { md: 7 }, py: { md: 2 }, borderRadius: 2, boxShadow: 3 }}>
      {isMobile ? (
        <Box textAlign="center" p={2}>
          <Typography variant="h4" mb={2} fontWeight={700} color="#AC98D1">
            {specialist.user?.name}
          </Typography>

          <CardMedia
            component="img"
            src={specialist.avatarUrl}
            alt={specialist.user?.name}
            sx={{ width: 150, height: 150, borderRadius: 5, mx: 'auto', marginBottom: "20px" }}
          />

          <Box mb={2} display="flex" justifyContent="center" gap={1}>
            <Chip sx={{ fontSize: 16, padding: 2, backgroundColor: "#AC98D1", color: "#fff", fontWeight: 600 }} label={`Вік: ${age}`} size="small" />
            <Chip sx={{ fontSize: 16, padding: 2, backgroundColor: "#AC98D1", color: "#fff", fontWeight: 600 }} label={`Досвід: ${yearsOfExperience}`} size="small" />
          </Box>

          <Box mb={2}>
            <Typography variant="h6" fontWeight="600" mb={1}>
              Мої методи роботи
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={0.5} justifyContent="center">
              {specialist.methods.map((m) => (
                <Chip sx={{ fontSize: 14, padding: 2, borderColor: "#AC98D1" }} key={m} label={m} variant="outlined" size="small" />
              ))}
            </Box>
          </Box>

          <Box px={1} mb={2}>
            <BioText clamp={expanded ? undefined : 3} variant="body2">
              {specialist.bio}
            </BioText>
            {specialist.bio.length > 200 && (
              <Button sx={{ color: "AC98D1" }} size="small" onClick={() => setExpanded(!expanded)}>
                {expanded ? 'згорнути' : 'розгорнути'}
              </Button>
            )}
          </Box>
          <Box display="flex" justifyContent="center">
            <Link to={specialist._id}>
              <ContainedButton>
                Переглянути профіль
              </ContainedButton>
            </Link>
          </Box>
        </Box>
      ) : (
        <Box display="flex" p={2}>
          <Box flex={1} display="flex" flexDirection="column" alignItems="center">
            <CardMedia
              component="img"
              src={specialist.avatarUrl}
              alt={specialist.user?.name}
              sx={{ width: 260, height: 260, borderRadius: 5 }}
            />

            <Box mt={1} display="flex" justifyContent="center" gap={1}>
              <Chip sx={{ fontSize: 20, padding: 3, backgroundColor: "#AC98D1", color: "#fff", fontWeight: 600 }} label={`Вік: ${age}`}  />
              <Chip sx={{ fontSize: 20, padding: 3, backgroundColor: "#AC98D1", color: "#fff", fontWeight: 600 }} label={`Досвід: ${yearsOfExperience}`} />
            </Box>

            <Box mt={2} display="flex" justifyContent="center">
              <Link to={`${specialist._id}` as '/'}>
                <OutlinedButton>
                  Переглянути профіль
                </OutlinedButton>
              </Link>
            </Box>
          </Box>

          <CardContent sx={{ flex: 2, pl: 3 }}>
            <Typography variant="h3" color="#AC98D1" fontWeight="700" gutterBottom>
              {specialist.user?.name}
            </Typography>
            <Typography variant="h5" fontWeight="600">
              Мої методи роботи
            </Typography>
            <Box mt={1} display="flex" flexWrap="wrap" gap={0.5}>
              {specialist.methods.map((m) => (
                <Chip sx={{ fontSize: 18, padding: 2.5, borderColor: "#AC98D1" }} key={m} label={m} variant="outlined"  />
              ))}
            </Box>
            <Box mt={2}>
              <BioText clamp={expanded ? undefined : 3} variant="body1">
                {specialist.bio}
              </BioText>
              {specialist.bio.length > 200 && (
                <Button size="small" onClick={() => setExpanded(!expanded)}>
                  {expanded ? 'згорнути' : 'розгорнути'}
                </Button>
              )}
            </Box>
          </CardContent>
        </Box>
      )}
    </Card>
  );
};
