import { useAuthStore } from '~/store'

const checkAuth = async () => {
  const token = useAuthStore.getState().token

  if (!token) {
    throw new Response('Not certified', { status: 401 })
  }

  return null
}

export default checkAuth
