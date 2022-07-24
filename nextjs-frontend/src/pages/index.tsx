import Link from "next/link"
import routes from "router/routes"

export default function HomePage() {
  return (
    <div className={"flex flex-col gap-4"}>
      Hello world
      <Link href={routes.dashboard.path}>
        <button className={"bg-blue-600 text-white py-2 px-8 rounded border-white border"}>Go to dashboard</button>
      </Link>
    </div>
  )
}
