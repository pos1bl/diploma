import { Box, Card, Typography, Button } from '@mui/material';
import { OutlinedButton } from '@components/shared/OutlinedButton';
import { formatSessionDateCard, formatSessionTimeCard } from '@utils/user/Homepage';
import { useQuery } from '@tanstack/react-query';
import { sessionQueryOptions } from '@utils/QueryOptioms';
import { Route } from '@routes/_authenticated/specialist/appointment/$appointmentId/route';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useAuthStore } from '@hooks/useStore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { getLabel, getStatusIcon } from '@utils/user/Appointment';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
import 'dayjs/locale/uk'
dayjs.extend(utc)
dayjs.locale('uk')
import { Link } from '@tanstack/react-router';
import { SESSION_STATUSES } from '@models/ISession';
import SessionsService from '@services/SessionsService';
import { useState } from 'react';
import { toast } from 'react-toastify';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { ButtonLoadingState } from '@utils/specialist/Appointment';
import { Loader } from '@components/shared/Loader';
import { NotesSection } from '@components/specialist/Appointment/Notes';


export const AppointmentPage = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const appointmentId = useParams({
    from: Route.id,
    select: (params) => params.appointmentId 
  })
  const { data: session, isLoading, isError, refetch } = useQuery(sessionQueryOptions(user.role, appointmentId));
  const [buttonLoading, setButtonLoading] = useState<ButtonLoadingState>({
    complete: false,
    noShow: false,
    cancel: false,
  });

  if (isError) {
    navigate({ to: "/specialist/clients" })
  }


  if (isLoading || !session) {
    return <Loader />
  }

  const now = dayjs().format('DD.MM.YYYY HH:mm');
  const dateIn10Minutes = dayjs().add(10, 'm').format('DD.MM.YYYY HH:mm');
  const sceduledDateIn15Minutes = dayjs.utc(session.scheduledAt).add(15, 'm').format('DD.MM.YYYY HH:mm');
  const sceduledDateIn50Minutes = dayjs.utc(session.scheduledAt).add(50, 'm').format('DD.MM.YYYY HH:mm');
  const formattedScheduledDate = dayjs.utc(session.scheduledAt).format('DD.MM.YYYY HH:mm');
  const endDate = dayjs.utc(session.scheduledAt).add(1, 'hour').format('DD.MM.YYYY HH:mm');

  const disabledCancelled = now > formattedScheduledDate || session.status !== SESSION_STATUSES.SCHEDULED;
  const disabledJoin = dateIn10Minutes < formattedScheduledDate || now > endDate || session.status !== SESSION_STATUSES.SCHEDULED;
  const disabledNoShow = now < sceduledDateIn15Minutes || session.status !== SESSION_STATUSES.SCHEDULED;
  const disabledEndSession = now < sceduledDateIn50Minutes || session.status !== SESSION_STATUSES.SCHEDULED;

  const handleCancel = async () => {
    setButtonLoading(prev => ({ ...prev, cancel: true }));
      try {
        await SessionsService.refundSession(user.role, appointmentId);
        toast("Зустріч скасовано", { type: "info" });
      } finally {
        setButtonLoading(prev => ({ ...prev, cancel: false }));
      }

    await refetch();
  }

  const handleChangeStatus = async (status: SESSION_STATUSES) => {
    setButtonLoading(prev => ({
      ...prev,
      complete: status === SESSION_STATUSES.COMPLETED,
      noShow: status === SESSION_STATUSES.NO_SHOW,
    }));

    try {
      await SessionsService.changeSessionStatus(appointmentId, status);
      toast("Зустріч завершено", { type: "info" });
    } finally {
      setButtonLoading(prev => ({
        ...prev,
        complete: false,
        noShow: false,
      }));
    }

    await refetch();
  }

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', my: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Link to='/specialist/clients/$clientId/appointments'  params={{ clientId: session.userId }} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
          <ArrowBackIcon sx={{ mr: 1 }} />
          <Typography variant="h6">Назад до сеансів</Typography>
        </Link>
      </Box>

      <Card sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h5" fontWeight={600}>
            {typeof session.user === 'string'
              ? "Користувач"
              : session.user.name
            }
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <WbSunnyIcon sx={{ color: "#AC98D1" }} fontSize="small" />
            <Typography variant="body1">
              {formatSessionDateCard(session.scheduledAt)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AccessTimeIcon sx={{ color: "#AC98D1" }} fontSize="small" />
            <Typography variant="body1">
              {formatSessionTimeCard(session.scheduledAt)} (за Києвом)
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {getStatusIcon(session.status)}
            <Typography
              variant="body1"
              color={[SESSION_STATUSES.CANCELLED, SESSION_STATUSES.CANCELLED_WITH_REFUND].includes(session.status) ? 'error' : 'success.main'}
              fontWeight={700}
            >
              {getLabel(session.status)}
            </Typography>
          </Box>
           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AutoAwesomeIcon sx={{ color: "#AC98D1" }} fontSize="small" />
            <Typography variant="body1">
              Персональний
            </Typography>
          </Box>
        </Box>

        <Link to="/specialist/video-call/$appointmentId" params={{ appointmentId }}>
          <OutlinedButton fullWidth sx={{ mb: 3, borderRadius: '50px' }} disabled={disabledJoin}>
            Приєднатись
          </OutlinedButton>
        </Link>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mb: 3 }}>
          <Button
            fullWidth
            variant="outlined"
            color="success"
            disabled={disabledEndSession}
            loading={buttonLoading.complete || buttonLoading.cancel || buttonLoading.noShow}
            onClick={() => handleChangeStatus(SESSION_STATUSES.COMPLETED)}
          >
            Завершити сесію
          </Button>
          <Button
            fullWidth
            variant="outlined"
            color="info"
            disabled={disabledNoShow || buttonLoading.complete || buttonLoading.cancel}
            loading={buttonLoading.noShow}
            onClick={() => handleChangeStatus(SESSION_STATUSES.NO_SHOW)}
          >
            Клієнт не з'явився
          </Button>
          <Button
            fullWidth
            variant="outlined"
            color="error"
            disabled={disabledCancelled || buttonLoading.complete || buttonLoading.noShow}
            loading={buttonLoading.cancel}
            onClick={handleCancel}
          >
            Скасувати
          </Button>
        </Box>

        <Box sx={{ mb: 3 }}>
          <NotesSection id={session._id} notes={session.notes} refetch={refetch} />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
          <InfoOutlinedIcon color="info" sx={{ mt: '2px', color: '#AC98D1' }} />
          <Typography variant="body2">
            Ви можете перенести сеанс не пізніше ніж за 12 годин до його початку
          </Typography>
        </Box>
      </Card>
    </Box>
  )
};
