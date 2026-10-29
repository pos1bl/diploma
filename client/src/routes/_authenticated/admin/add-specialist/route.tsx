import { AddSpecialistPage } from '@pages/admin/AddSpecialistPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/admin/add-specialist')({
  component: AddSpecialistPage,
})
