/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-vue-router. ‼️ DO NOT MODIFY THIS FILE ‼️
// It's recommended to commit this file.
// Make sure to add this file to your tsconfig.json file as an "includes" or "files" entry.

declare module 'vue-router/auto-routes' {
  import type {
    RouteRecordInfo,
    ParamValue,
    ParamValueOneOrMore,
    ParamValueZeroOrMore,
    ParamValueZeroOrOne,
  } from 'vue-router'

  /**
   * Route name map generated by unplugin-vue-router
   */
  export interface RouteNamedMap {
    '/': RouteRecordInfo<'/', '/', Record<never, never>, Record<never, never>>,
    '/[...catchAll]': RouteRecordInfo<'/[...catchAll]', '/:catchAll(.*)', { catchAll: ParamValue<true> }, { catchAll: ParamValue<false> }>,
    '/login': RouteRecordInfo<'/login', '/login', Record<never, never>, Record<never, never>>,
    '/projects/': RouteRecordInfo<'/projects/', '/projects', Record<never, never>, Record<never, never>>,
    '/projects/[...catchAll]': RouteRecordInfo<'/projects/[...catchAll]', '/projects/:catchAll(.*)', { catchAll: ParamValue<true> }, { catchAll: ParamValue<false> }>,
    '/projects/[slug]': RouteRecordInfo<'/projects/[slug]', '/projects/:slug', { slug: ParamValue<true> }, { slug: ParamValue<false> }>,
    '/register': RouteRecordInfo<'/register', '/register', Record<never, never>, Record<never, never>>,
    '/reports/': RouteRecordInfo<'/reports/', '/reports', Record<never, never>, Record<never, never>>,
    '/reports/[...catchAll]': RouteRecordInfo<'/reports/[...catchAll]', '/reports/:catchAll(.*)', { catchAll: ParamValue<true> }, { catchAll: ParamValue<false> }>,
    '/reports/[id]': RouteRecordInfo<'/reports/[id]', '/reports/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    '/users/[username]': RouteRecordInfo<'/users/[username]', '/users/:username', { username: ParamValue<true> }, { username: ParamValue<false> }>,
  }
}
