import { ReactElement } from "react"
import HomePage from "main/page/home"
import ProfilePage from "main/page/account/profile"

interface Route {
  path: string
  component: ReactElement
}

const home: Route = {
  path: "/",
  component: <HomePage />,
}

const profile: Route = {
  path: "/account/profile",
  component: <ProfilePage />,
}

export default {
  home,
  profile,
}
