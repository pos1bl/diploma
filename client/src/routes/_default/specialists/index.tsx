import { SpecialistsPage } from '@pages/default/SpecialistsPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_default/specialists/')({
  component: SpecialistsPage,
})
