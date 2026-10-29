import { EducationPage } from '@pages/specialist/EducationPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/specialist/education')({
  component: EducationPage,
})
