import { ReactElement } from "react"
import HomePage from "main/page/home"
import AccountDetailPage from "main/page/account/accountDetail"
import AccountsPaginatedViewListPage from "main/page/account/accountsPaginatedViewList"
import AccountsInfiniteViewListPage from "main/page/account/accountsInfiniteViewList"
import LoginPage from "main/page/auth/login"
import DashboardPage from "main/page/dashboard"
import RegisterPage from "main/page/auth/register"

export interface Route {
  path: string
  component: ReactElement
  authenticated: boolean
}

const home: Route = {
  path: "/",
  component: <HomePage />,
  authenticated: false
}

const accountDetail: Route = {
  path: "/account/:id",
  component: <AccountDetailPage />,
  authenticated: true
}

const accountsInfiniteList: Route = {
  path: "/account/list/infinite",
  component: <AccountsInfiniteViewListPage/>,
  authenticated: true
}
const accountsPaginatedList: Route = {
  path: "/account/list/paginated",
  component: <AccountsPaginatedViewListPage/>,
  authenticated: true
}

const login: Route = {
  path: "/auth/login",
  component: <LoginPage/>,
  authenticated: false
}

const register: Route = {
  path: "/auth/register",
  component: <RegisterPage/>,
  authenticated: false
}

const dashboard: Route = {
  path: "/dashboard",
  component: <DashboardPage/>,
  authenticated: true
}

export default {
  dashboard,
  home,
  accountDetail,
  accountsInfiniteList,
  accountsPaginatedList,
  login,
  register
}
