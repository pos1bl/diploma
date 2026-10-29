import { BookingFlow } from '@components/default/Specialist/BookingFlow';
import { SpecialistMain } from '@components/default/Specialist/SpecialistMain';
import { Container, Box, Breadcrumbs } from '@mui/material'
import { Route } from '@routes/_default/specialists/$specialistId/route'
import { Link, useParams } from '@tanstack/react-router';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useQuery } from '@tanstack/react-query';
import { specialistQueryOptions } from '@utils/QueryOptioms';
import { useAuthStore } from '@hooks/useStore';
import { Loader } from '@components/shared/Loader';

export const SpecialistPage = () => {
  const { user } = useAuthStore();
  const specialistId = useParams({
    from: Route.id,
    select: (params) => params.specialistId 
  })
  const { data: employeeInfo, isLoading, isError  } = useQuery(specialistQueryOptions(specialistId, user.id))

  if (isLoading || !employeeInfo) {
    return <Loader />
  }

  if (isError) {
    return <div>Сталася помилка при завантаженні спеціаліста</div>
  }

  return (
    <Container maxWidth="lg">
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
        <Link
          color="inherit"
          to="/specialists"
        >
          <Box display="flex" alignItems="center" sx={{ fontSize: 18 }} >
            <ChevronLeftIcon />
            Фахівці Платформи / {employeeInfo.name}
          </Box>
        </Link>
      </Breadcrumbs>

      <Box
        display="flex"
        flexDirection={{ xs: 'column-reverse', md: 'row' }}
        gap={4}
      >
        <SpecialistMain specialist={employeeInfo} />
        <BookingFlow specialistId={employeeInfo._id} availabilityByDay={employeeInfo.availabilities} />
      </Box>
    </Container>
  )
}
