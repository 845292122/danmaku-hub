import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import { AUTH } from '~/types/auth'

export const useAuthStore = create<AUTH.AuthState>()(
  devtools(
    persist(
      set => ({
        token: '',
        userInfo: undefined,
        permissions: ['home'],
        setToken: tokenVal => set({ token: tokenVal }),
        setUserInfo: info => set({ userInfo: info }),
        setPermissions: permissions => set({ permissions })
      }),
      {
        name: 'auth-storage',
        storage: createJSONStorage(() => sessionStorage)
      }
    ),
    { name: 'AuthStore' }
  )
)
