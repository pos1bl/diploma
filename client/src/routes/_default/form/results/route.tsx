import { FormResults } from '@pages/default/FormResults'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_default/form/results')({
  component: FormResults,
})
