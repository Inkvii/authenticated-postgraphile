
export interface Route {
  path: string
  authenticated: boolean
}

const home: Route = {
  path: "/",
  authenticated: false
}

const login: Route = {
  path: "/auth/login",
  authenticated: false
}

const register: Route = {
  path: "/auth/register",
  authenticated: false
}

const dashboard: Route = {
  path: "/account/dashboard",
  authenticated: true
}

export default {
  dashboard,
  home,
  login,
  register
}
