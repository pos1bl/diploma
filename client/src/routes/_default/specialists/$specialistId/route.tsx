import { SpecialistPage } from '@pages/default/SpecialistPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_default/specialists/$specialistId')({
  component: SpecialistPage,
})


