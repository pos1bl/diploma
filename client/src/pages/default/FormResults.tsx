import { useEffect, useState } from 'react'
import { Box, Grid } from '@mui/material'
import { SpecialistCard } from '@components/default/Specialists/SpecialistCard'
import { ISpecialist } from '@models/ISpecialist'
import { Loader } from '@components/shared/Loader'
import { StyledTitle } from '@components/styled/base'
import { ContainedButton } from '@components/shared/ContainedButton'
import { Link } from '@tanstack/react-router'

export const FormResults = () => {
  const [specialists, setSpecialists] = useState<ISpecialist[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('find_results')

    if (stored) {
      setSpecialists(JSON.parse(stored))
    }
  }, [])

  if (!specialists.length) {
    return <Loader />
  }

  return (
    <Grid container spacing={2}>
      <Box width="100%" display="flex" flexDirection={{ xs: "column", md: "row" }} alignItems="center" justifyContent="space-between">
        <StyledTitle>
          Найбільш підходящі фахівці
        </StyledTitle>
        <Link to="/specialists"><ContainedButton>Ознайомитись зі всіма спеціалістами</ContainedButton></Link>
      </Box>
      <Grid container spacing={2}>
        {specialists.map(s => (
          <Box key={s._id}>
            <SpecialistCard specialist={s}/>
          </Box>
        ))}
      </Grid>
    </Grid>
  )
}
