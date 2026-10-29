import { HomePage } from '@pages/default/HomePage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_default/homepage')({
  component: HomePage,
})
