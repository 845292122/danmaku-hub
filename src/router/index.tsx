import { ROUTER } from '~/types/route'
import Login from '~/pages/login'
import { createHashRouter, Navigate } from 'react-router'

// * 导入路由
const metaRoutes = import.meta.glob('./modules/*.tsx', { eager: true })

// * 读取路由到bizRoutes
export const bizRoutes: Array<ROUTER.RouteType> = []
Object.keys(metaRoutes).forEach(item => {
  const routes = metaRoutes[item] as Record<string, unknown>
  if (typeof routes === 'object' && routes !== null) {
    Object.keys(routes).forEach((key: string) => {
      if (Array.isArray(routes[key])) {
        bizRoutes.push(...(routes[key] as ROUTER.RouteType[]))
      }
    })
  }
})

export const routes: ROUTER.RouteType[] = [
  {
    path: '/login',
    element: <Login />,
    meta: {
      title: '登录',
      key: 'login'
    }
  },
  ...bizRoutes,
  {
    path: '*',
    element: <Navigate to="/404" />
  }
]

const appRouter = createHashRouter(routes)

export default appRouter
