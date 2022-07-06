import { ReactElement } from "react"
import HomePage from "main/page/home"
import AccountsListPage from "main/page/account/accountsList"
import AccountDetailPage from "main/page/account/accountDetail"

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

const accountsList: Route = {
  path: "/account/list",
  component: <AccountsListPage/>
}

export default {
  home,
  accountDetail,
  accountsList
}
