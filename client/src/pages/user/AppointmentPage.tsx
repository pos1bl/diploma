import { Box, Card, Typography, Button } from '@mui/material';
import { OutlinedButton } from '@components/shared/OutlinedButton';
import { formatSessionDateCard, formatSessionTimeCard } from '@utils/user/Homepage';
import { useQuery } from '@tanstack/react-query';
import { sessionQueryOptions } from '@utils/QueryOptioms';
import { Route } from '@routes/_authenticated/user/appointments/$appointmentId/route';
import { useParams } from '@tanstack/react-router';
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
import { SESSION_STATUSES, SESSION_TYPES } from '@models/ISession';
import SessionsService from '@services/SessionsService';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { MoveSection } from '@components/user/Appointment/MoveSection';
import { ActionInfo } from '@components/user/Appointment/ActionInfo';
import { Loader } from '@components/shared/Loader';

export const AppointmentPage = () => {
  const { user } = useAuthStore();
  const appointmentId = useParams({
    from: Route.id,
    select: (params) => params.appointmentId 
  })
  const { data: session, isLoading, refetch } = useQuery(sessionQueryOptions(user.role, appointmentId));
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const [isMoved, setIsMoved] = useState<boolean>(false);

  if (isLoading || !session) {
    return <Loader />
  }

  const now = dayjs().format('DD.MM.YYYY HH:mm');
  const dateIn10Minutes = dayjs().add(10, 'm').format('DD.MM.YYYY HH:mm');
  const dateIn12hours = dayjs().add(12, 'hours').format('DD.MM.YYYY HH:mm');
  const dateIn24hours = dayjs().add(24, 'hours').format('DD.MM.YYYY HH:mm');
  const formattedScheduledDate = dayjs.utc(session.scheduledAt).format('DD.MM.YYYY HH:mm');
  const endDate = dayjs.utc(session.scheduledAt).add(1, 'hour').format('DD.MM.YYYY HH:mm');

  const disabledTransfer = dateIn12hours > formattedScheduledDate || session.status !== SESSION_STATUSES.SCHEDULED || session.isMoved;
  const disabledCancelled = now > formattedScheduledDate || session.status !== SESSION_STATUSES.SCHEDULED;
  const disabledJoin = dateIn10Minutes < formattedScheduledDate || now > endDate || session.status !== SESSION_STATUSES.SCHEDULED;
  const cancelLabel = dateIn24hours < formattedScheduledDate && !session.isMoved && session.type === SESSION_TYPES.PAID ? "Скасувати та повернути кошти" : "Скасувати без повернення коштів";

  const handleCancel = async () => {
    setIsButtonLoading(true);

    if (cancelLabel === "Скасувати та повернути кошти") {
      try {
        await SessionsService.refundSession(user.role, appointmentId);
        toast("Запит на повернення коштів успішно створено", { type: "info" });
      } finally {
        setIsButtonLoading(false);
      }
    } else {
      try {
        await SessionsService.cancelSession(appointmentId);
        toast("Зустріч скасовано", { type: "info" });
      } finally {
        setIsButtonLoading(false);
      }
    }

    await refetch();
  }

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', my: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Link to="/user/appointments" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
          <ArrowBackIcon sx={{ mr: 1 }} />
          <Typography variant="h6">Назад до сеансів</Typography>
        </Link>
      </Box>

      <Card sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Link
            to={`/specialists/${session.specialist?._id}` as '/specialists/$specialistId'}
            params={{ specialistId: session.specialistId }}
          >
            <Typography variant="h5" fontWeight={600}>
              {session.specialist?.user.name}
            </Typography>
          </Link>
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

        <Link to="/user/video-call/$appointmentId" params={{ appointmentId }}>
          <OutlinedButton fullWidth sx={{ mb: 3, borderRadius: '50px' }} disabled={disabledJoin}>
            Приєднатись
          </OutlinedButton>
        </Link>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mb: 3 }}>
          <Button fullWidth variant="text" sx={{ color: "#AC98D1" }} disabled={disabledTransfer} onClick={() => setIsMoved(!isMoved)}>
            {isMoved ? "Відмінити перенос" : "Перенести"}
          </Button>
          <Button fullWidth variant="text" sx={{ color: "#AC98D1" }} disabled={disabledCancelled} loading={isButtonLoading} onClick={handleCancel}>
            {cancelLabel}
          </Button>
        </Box>

        {isMoved && (
          <MoveSection
            appointmentId={appointmentId}
            refetch={refetch}
            specialistId={session.specialist?._id as string}
            setIsMoved={setIsMoved}
          />
        )}

        <ActionInfo />
      </Card>
    </Box>
  )
};
