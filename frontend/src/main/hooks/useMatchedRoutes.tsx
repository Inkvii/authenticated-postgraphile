import { matchRoutes, RouteObject, useLocation } from "react-router-dom"
import routes, { Route } from "main/router/routes"

export default function useMatchedRoutes(): Route[] {
  const routeObjects: RouteObject[] = Object.values(routes).map((route) => {
    return {
      path: route.path,
    }
  })

  const location = useLocation()
  const matchedRoute = matchRoutes(routeObjects, location)

  const r1: (Route | null)[] =
    matchedRoute?.map((m) => Object.values(routes).find((r) => m.route.path === r.path) ?? null) ?? []

  return (r1.filter((r) => r !== null) as Route[]) ?? []
}
