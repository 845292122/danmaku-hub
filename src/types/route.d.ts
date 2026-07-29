import React from 'react'
import { LoaderFunction } from 'react-router'

export namespace ROUTER {
  export type RouteMetaType = {
    title: string
    key?: string
    layout?: React.FC
  }

  export type RouteType = {
    path?: string
    loader?: LoaderFunction
    errorElement?: React.ReactNode
    element?: React.ReactNode
    meta?: RouteMetaType
    children?: RouteType[]
  }
}
