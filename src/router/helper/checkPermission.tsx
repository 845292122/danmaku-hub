import { useAuthStore } from '~/store'

const checkPermission = (permission: string) => async () => {
  const permissions = useAuthStore.getState().permissions

  if (!permissions?.includes(permission)) {
    throw new Response('Unauthorized', { status: 403 })
  }

  return null
}

export default checkPermission
