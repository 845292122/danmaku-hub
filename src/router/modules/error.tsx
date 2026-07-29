import React from 'react'
import Layout from '~/layout'
import { ROUTER } from '~/types/route'
import lazyLoad from '../helper/lazyLoad'

const errorRoutes: Array<ROUTER.RouteType> = [
  {
    element: <Layout />,
    children: [
      {
        path: '/403',
        element: lazyLoad(React.lazy(() => import('~/pages/error/403'))),
        meta: {
          title: '未授权',
          key: '403'
        }
      },
      {
        path: '/404',
        element: lazyLoad(React.lazy(() => import('~/pages/error/404'))),
        meta: {
          title: '页面飞走了~',
          key: '404'
        }
      }
    ]
  }
]

export default errorRoutes
