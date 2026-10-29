import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import ModeStandbyIcon from '@mui/icons-material/ModeStandby';
import EventNoteIcon from '@mui/icons-material/EventNote';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import SchoolIcon from '@mui/icons-material/School';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { FC, useState } from "react";
import { IFetchSpecialistResponse } from "@models/response/SpecialistsResponse";
import { calculateAge } from "@helpers/calculateAge";
import { ContainedButton } from "@components/shared/ContainedButton";

type Props = {
  specialist: IFetchSpecialistResponse;
};

export const SpecialistMain: FC<Props> = ({ specialist }) => {
  const [preview, setPreview] = useState<{ open: boolean; imageUrl: string; title: string }>({
    open: false,
    imageUrl: "",
    title: ""
  });

  const handleOpenPreview = (imageUrl: string, title: string) => {
    setPreview({ open: true, imageUrl, title });
  };

  const handleClosePreview = () => {
    setPreview({ open: false, imageUrl: "", title: "" });
  };

  return (
    <>
      <Box
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          bgcolor: 'background.paper',
          p: { xs: 2, md: 4 },
        }}
      >
        <Box
          display="flex"
          flexDirection={{ xs: 'column', md: 'row' }}
          alignItems="center"
          gap={2}
        >
          <Avatar
            src={specialist.avatarUrl}
            alt={specialist.name}
            sx={{
              width: 300,
              height: 300,
              borderRadius: 2,
            }}
          />
          <Box
            mt={{ xs: 2, md: 0 }}
            textAlign={{ xs: 'center', md: 'left' }}
            width="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap={2}
          >
            <Typography variant="h4" color="#AC98D1" fontWeight={600} textAlign="center">
              {specialist.name}
            </Typography>
            <Box display="flex" gap={3} >
              <Typography fontSize="20px" display="flex" alignItems="center">
                <PersonIcon sx={{ fontSize: 32, color: '#AC98D1', mr: 1 }} />
                Вік: {calculateAge(specialist.dateOfBirth)}
              </Typography>
              <Typography fontSize="20px" display="flex" alignItems="center">
                <WorkIcon sx={{ fontSize: 32, color: '#AC98D1', mr: 1 }} />
                Досвід: {calculateAge(specialist.dateOfStart)} р.
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box mt={4}>
          <Typography variant="h5" color="#AC98D1" fontWeight={600} mb={2}>
            Напрямки роботи
          </Typography>

          {[
            { label: 'Основна експертиза', data: specialist.mainAreas, Icon: ModeStandbyIcon },
            { label: 'Я також працюю з', data: specialist.secondaryAreas, Icon: WorkIcon },
            { label: 'Мої методи роботи', data: specialist.methods, Icon: EventNoteIcon },
            { label: 'З чим я не працюю', data: specialist.excludedAreas, Icon: DoNotDisturbOnIcon },
          ].map(({ label, data, Icon }) =>
            data?.length ? (
              <Accordion
                key={label}
                disableGutters
                variant="outlined"
                sx={{
                  mb: 2,
                  borderRadius: 1,
                  "&:before": { display: "none" },
                  borderColor: "#E0E0E0",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: "#AC98D1" }} />}
                  sx={{
                    px: 2,
                    py: 2,
                    "& .MuiAccordionSummary-content": { display: "flex", alignItems: "center", gap: 1, margin: 0 },
                    borderBottom: "1px solid #E0E0E0",
                  }}
                >
                  <Icon sx={{ color: "#AC98D1" }} />
                  <Typography sx={{ fontSize: 18,  }}>
                    {label}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 2, py: 1 }}>
                  <List disablePadding>
                    {data.map((item) => (
                      <ListItem key={item} disableGutters sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 24 }}>
                          <FiberManualRecordIcon sx={{ fontSize: 8, color: "#AC98D1" }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={item}
                          primaryTypographyProps={{ fontSize: 16, color: "#333" }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            ) : null
          )}
        </Box>

        {/* Освіта */}
        <Box mt={4}>
          <Typography variant="h5" color="#AC98D1" fontWeight={600} mb={2}>
            Освіта
          </Typography>

          <Accordion
            disableGutters
            variant="outlined"
            sx={{
              mb: 2,
              borderRadius: 1,
              "&:before": { display: "none" },
              borderColor: "#E0E0E0",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "#AC98D1" }} />}
              sx={{
                px: 2,
                py: 2,
                "& .MuiAccordionSummary-content": { display: "flex", alignItems: "center", gap: 1, margin: 0 },
                borderBottom: "1px solid #E0E0E0",
              }}
            >
              <SchoolIcon sx={{ color: "#AC98D1" }} />
              <Typography sx={{ fontSize: 18,  }}>
                Вища та професійна освіта
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 2, py: 1 }}>
              <Box display="flex" flexDirection="column" gap={2}>
                {specialist.diploms?.length
                  ? specialist.diploms.map(d =>
                      <Card key={d._id} variant="outlined" sx={{ p: 1 }}>
                        <CardContent sx={{ p: 1 }}>
                          <Typography variant="subtitle1" fontWeight={500}>
                            {d.title || d.institution}
                          </Typography>
                          <Typography variant="body2">Спеціальність: {d.institution}</Typography>
                          <Typography variant="body2">Спеціалізація: {d.specialty}</Typography>
                          <Typography variant="body2">Ступінь: {d.degree}</Typography>
                          <Typography variant="body2">{d.year} р.</Typography>
                          <Box mt={1} textAlign="right">
                            <ContainedButton sx={{ px: 2, py: 1 }} onClick={() => handleOpenPreview(d.imageUrl, d.title || d.institution)}>
                              Переглянути
                            </ContainedButton>
                          </Box>
                        </CardContent>
                      </Card>
                    )
                  : <Typography color="text.secondary">Дипломи відсутні</Typography>
                }
              </Box>
            </AccordionDetails>
          </Accordion>

          <Accordion
            disableGutters
            variant="outlined"
            sx={{
              mb: 2,
              borderRadius: 1,
              "&:before": { display: "none" },
              borderColor: "#E0E0E0",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "#AC98D1" }} />}
              sx={{
                px: 2,
                py: 2,
                "& .MuiAccordionSummary-content": { display: "flex", alignItems: "center", gap: 1, margin: 0 },
                borderBottom: "1px solid #E0E0E0",
              }}
            >
              <HistoryEduIcon sx={{ color: "#AC98D1" }} />
              <Typography sx={{ fontSize: 18,  }}>
                Професійні курси
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 2, py: 1 }}>
              <Box display="flex" flexDirection="column" gap={2}>
                {specialist.courses?.length
                  ? specialist.courses.map(c =>
                      <Card key={c._id} variant="outlined" sx={{ p: 1 }}>
                        <CardContent sx={{ p: 1 }}>
                          <Typography variant="subtitle1" fontWeight={500}>{c.title}</Typography>
                          <Typography variant="body2">{c.provider}</Typography>
                          {c.hours != null && <Typography variant="body2">{c.hours} год.</Typography>}
                          <Typography variant="body2">{c.year} р.</Typography>
                          <Box mt={1} textAlign="right">
                            <ContainedButton sx={{ px: 2, py: 1 }} onClick={() => handleOpenPreview(c.imageUrl, c.title)}>
                              Переглянути
                            </ContainedButton>
                          </Box>
                        </CardContent>
                      </Card>
                    )
                  : <Typography color="text.secondary">Курси не знайдено</Typography>
                }
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>

        {/* Біо */}
        <Box mt={4}>
          <Typography variant="h5" color="#AC98D1" fontWeight={600} mb={2}>
            Про спеціаліста
          </Typography>
          <Box
            sx={{
              bgcolor: '#fff',
              p: 2,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
            }}
          >
            <Typography>{specialist.bio}</Typography>
          </Box>
        </Box>
      </Box>

      <Dialog
        open={preview.open}
        onClose={handleClosePreview}
        PaperComponent={Paper}
        fullWidth
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          {preview.title}
        </DialogTitle>
        <DialogContent dividers>
          <Box component="img" src={preview.imageUrl} alt={preview.title} sx={{ width: '100%', height: 'auto' }} />
        </DialogContent>
      </Dialog>
    </>
  )
};
