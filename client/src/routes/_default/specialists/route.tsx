import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_default/specialists')({
  component: Outlet,
})
