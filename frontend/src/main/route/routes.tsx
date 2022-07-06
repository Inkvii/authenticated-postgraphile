import { ReactElement } from "react"
import HomePage from "main/page/home"
import ProfilePage from "main/page/account/profile"
import AccountsListPage from "main/page/account/accountsList"

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

const accountsList: Route = {
  path: "/account/accountsList",
  component: <AccountsListPage/>
}

export default {
  home,
  profile,
  accountsList
}
