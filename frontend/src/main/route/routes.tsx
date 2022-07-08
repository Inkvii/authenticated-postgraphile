import { ReactElement } from "react"
import HomePage from "main/page/home"
import AccountDetailPage from "main/page/account/accountDetail"
import AccountsPaginatedViewListPage from "main/page/account/accountsPaginatedViewList"
import AccountsInfiniteViewListPage from "main/page/account/accountsInfiniteViewList"

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

export default {
  home,
  accountDetail,
  accountsInfiniteList,
  accountsPaginatedList
}
