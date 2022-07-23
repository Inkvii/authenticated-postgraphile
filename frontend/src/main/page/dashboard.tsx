import DefaultPageLayout from "main/component/layout/DefaultPageLayout"
import routes from "main/route/routes"
import { Link } from "react-router-dom"
import { auth } from "main/App"
import { signOut } from "firebase/auth"

export default function DashboardPage() {
  return (
    <DefaultPageLayout className={"p-8 flex flex-col gap-4"}>
      <div>
        <h1 className={"text-4xl"}>Dashboard</h1>
      </div>
      <div className={"flex gap-4"}>
        <Link className={"bg-blue-700 text-white rounded py-2 px-4"} to={routes.home.path}>Home</Link>
        <Link className={"bg-blue-700 text-white rounded py-2 px-4"} to={routes.login.path}>Login</Link>
        <Link className={"bg-blue-700 text-white rounded py-2 px-4"} to={routes.accountsPaginatedList.path}>Paginated list</Link>
        <Link className={"bg-blue-700 text-white rounded py-2 px-4"} to={routes.accountsInfiniteList.path}>Infinite list</Link>
        <button className={"bg-gray-400 rounded py-2 px-4"} onClick={() => signOut(auth)}>Sign out</button>

      </div>
    </DefaultPageLayout>
    )
}
