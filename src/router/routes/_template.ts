import type { RouteObject } from 'react-router-dom'
import type { RouteMeta } from '../route-meta'

import { Template } from '@/views'

const template = {
  index: true,
  Component: Template,
  handle: { pageTitle: 'app.routes.template' } satisfies RouteMeta,
} satisfies RouteObject

export default template
