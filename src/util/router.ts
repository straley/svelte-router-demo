export type RoutePath = {path: string, name: string}
export type AddPath = (routePath: RoutePath) => void 
export type RouteMatch = {
  pattern: string,
  params: Object
}