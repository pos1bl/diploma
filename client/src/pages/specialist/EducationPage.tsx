import queryClient from "@api/queryClient";
import { ContainedButton } from "@components/shared/ContainedButton";
import { Loader } from "@components/shared/Loader";
import { CourseDialog } from "@components/specialist/Education/CourseDialog";
import { DiplomDialog } from "@components/specialist/Education/DiplomDialog";
import { StyledSubtitle, StyledTitle } from "@components/styled/base";
import { Box, Card, CardContent, CardMedia, Container, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query"
import { educationDataQueryOptions } from "@utils/QueryOptioms"
import { DIALOG_TYPE } from "@utils/specialist/Education";
import { useState } from "react";

export const EducationPage = () => {
  const { data, isLoading } = useQuery(educationDataQueryOptions());

  const [openDialog, setOpenDialog] = useState<DIALOG_TYPE>(DIALOG_TYPE.DEFAULT);

  const handleOpen = (type: DIALOG_TYPE) => setOpenDialog(type);
  const handleClose = () => setOpenDialog(DIALOG_TYPE.DEFAULT);
  const onSuccess = () => {
    handleClose();
    queryClient.invalidateQueries({ queryKey: ['education']});
  };

  if (isLoading) {
    return <Loader />
  }

  return (
    <Container>
      <StyledTitle>Освіта</StyledTitle>
      <Box my={4} sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          p: 2,
          bgcolor: 'background.paper'
      }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <StyledSubtitle>Дипломи</StyledSubtitle>
          <ContainedButton variant="contained" onClick={() => handleOpen(DIALOG_TYPE.DIPLOM)}>Додати диплом</ContainedButton>
        </Box>
        <Box display="flex" flexWrap="wrap" gap={2} mt={1} alignItems="stretch">
          {data!.diploms.map(d => (
            <Box key={d._id} flex="1 1 calc(33% - 16px)" maxWidth="400px" display="flex" flexDirection="column">
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardMedia component="img" height="140" image={d.imageUrl} alt={d.title} />
                <CardContent>
                  <Typography variant="h6">{d.title}</Typography>
                  <Typography>{d.specialty} ({d.degree})</Typography>
                  <Typography>{d.year} р.</Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
          {!data!.diploms.length && <Typography variant="body1">Дипломи відсутні</Typography>}
        </Box>
      </Box>
      <Box my={4} sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        p: 2,
        bgcolor: 'background.paper'
      }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <StyledSubtitle>Курси</StyledSubtitle>
          <ContainedButton onClick={() => handleOpen(DIALOG_TYPE.COURSE)}>Додати курс</ContainedButton>
        </Box>
        <Box display="flex" flexWrap="wrap" gap={2} mt={1} alignItems="stretch">
          {data!.courses.map(c => (
            <Box key={c._id} flex="1 1 calc(33% - 16px)" maxWidth="400px" display="flex" flexDirection="column">
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardMedia component="img" height="140" image={c.imageUrl} alt={c.title} />
                <CardContent>
                  <Typography variant="h6">{c.title}</Typography>
                  <Typography>{c.provider}, {c.hours && `${c.hours} годин, `}{c.year}</Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
          {!data!.courses.length && <Typography variant="body1">Курси відсутні</Typography>}
        </Box>
      </Box>
      <DiplomDialog open={DIALOG_TYPE.DIPLOM === openDialog} onClose={handleClose} onSuccess={onSuccess} />
      <CourseDialog open={DIALOG_TYPE.COURSE === openDialog} onClose={handleClose} onSuccess={onSuccess} />
    </Container>
  )
}
