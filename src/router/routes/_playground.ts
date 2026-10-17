import type { RouteObject } from 'react-router-dom'
import type { RouteMeta } from '../route-meta'

const playground = {
  path: 'playground',
  lazy: async () => {
    const { PlaygroundView } = await import('@/views/playground/PlaygroundView')
    return { Component: PlaygroundView }
  },
  handle: { pageTitle: 'app.routes.playground' } satisfies RouteMeta,
} satisfies RouteObject

export default playground
