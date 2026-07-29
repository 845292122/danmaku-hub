import { Navigate, useRouteError } from 'react-router'

type RouteError = {
  status: number
  message?: string
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError

  if (error.status === 401) {
    return <Navigate to="/login" replace />
  }

  if (error.status === 403) {
    return <Navigate to="/403" />
  }

  return <div>{error?.message}</div>
}
