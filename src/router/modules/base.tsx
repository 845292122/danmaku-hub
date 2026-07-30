import Layout from '~/layout'
import Analytics from '~/pages/analytics'
import Orders from '~/pages/orders'
import Print from '~/pages/print'
import { ROUTER } from '~/types/route'
import { Navigate } from 'react-router'
// import checkAuth from '../helper/checkAuth'
import ErrorPage from '../helper/ErrorPage'

const baseRoutes: Array<ROUTER.RouteType> = [
  {
    element: <Layout />,
    // loader: checkAuth,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Navigate to="/live" replace />,
      },
      {
        path: '/live',
        element: <></>,
        meta: { title: '直播', key: 'live' }
      },
      {
        path: '/print',
        element: <Print />,
        meta: { title: '打印', key: 'print' }
      },
      {
        path: '/orders',
        element: <Orders />,
        meta: { title: '订单', key: 'orders' }
      },
      {
        path: '/analytics',
        element: <Analytics />,
        meta: { title: '数据', key: 'analytics' }
      }
    ]
  }
]

export default baseRoutes
