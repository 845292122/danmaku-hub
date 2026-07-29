import { Suspense } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const lazyLoad = (Component: React.LazyExoticComponent<any>): React.ReactNode => {
  return (
    // TODO 回调组件需要修改
    <Suspense fallback={<div>2123123</div>}>
      <Component />
    </Suspense>
  )
}

export default lazyLoad
