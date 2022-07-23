import { ReactElement } from "react"
import HomePage from "main/page/home"
import AccountDetailPage from "main/page/account/accountDetail"
import AccountsPaginatedViewListPage from "main/page/account/accountsPaginatedViewList"
import AccountsInfiniteViewListPage from "main/page/account/accountsInfiniteViewList"
import LoginPage from "main/page/auth/login"
import DashboardPage from "main/page/dashboard"

interface Route {
  path: string
  component: ReactElement
}

const home: Route = {
  path: "/",
  component: <HomePage />,
}

const accountDetail: Route = {
  path: "/account/:id",
  component: <AccountDetailPage />,
}

const accountsInfiniteList: Route = {
  path: "/account/list/infinite",
  component: <AccountsInfiniteViewListPage/>
}
const accountsPaginatedList: Route = {
  path: "/account/list/paginated",
  component: <AccountsPaginatedViewListPage/>
}

const login: Route = {
  path: "/auth/login",
  component: <LoginPage/>
}

const dashboard: Route = {
  path: "/dashboard",
  component: <DashboardPage/>
}

export default {
  dashboard,
  home,
  accountDetail,
  accountsInfiniteList,
  accountsPaginatedList,
  login
}
