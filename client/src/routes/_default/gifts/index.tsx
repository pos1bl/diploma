import { GiftsPage } from '@pages/default/GiftsPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_default/gifts/')({
  component: GiftsPage,
})
