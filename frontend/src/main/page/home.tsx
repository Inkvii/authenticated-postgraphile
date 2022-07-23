import DefaultPageLayout from "main/component/layout/DefaultPageLayout"
import { Link } from "react-router-dom"
import routes from "main/route/routes"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "main/App"

export default function HomePage() {
  const [user, loading, error] = useAuthState(auth)

  return (
    <DefaultPageLayout header={<Title />}>
      <div className={"flex justify-center gap-4 p-4"}>
        {!user && (
          <Link to={routes.login.path} className={"bg-green-700 text-white rounded py-2 px-4"}>
            Login
          </Link>
        )}
      </div>
      <div className={"columns-3 p-8"}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet at beatae dolore dolorum eaque eius eos eum harum
        ipsam ipsum laboriosam libero magnam natus necessitatibus officia omnis, praesentium provident quae quisquam
        recusandae repellat similique, sint temporibus veritatis voluptas voluptate voluptatem voluptatum. A accusamus
        alias architecto at, blanditiis commodi distinctio dolore doloremque eligendi eos et eum expedita hic id illo
        illum impedit magni maxime minima, minus molestiae nemo nihil nostrum officia praesentium provident quisquam
        reiciendis repellendus sed tempora temporibus ut velit voluptate. Consequatur fugit incidunt iure sit tenetur.
        Cum iusto minus nostrum sequi ut? Accusamus at harum inventore ipsam quam reiciendis!
      </div>
    </DefaultPageLayout>
  )
}

function Title(props: { className?: string }) {
  return (
    <div className={props.className}>
      <div className={"bg-gradient-to-r from-blue-500 to-blue-400 p-8 flex flex-col gap-4"}>
        <h1 className={"text-white text-4xl font-light"}>Welcome to the page</h1>
        <p className={"text-white text-lg"}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquid aperiam assumenda consectetur
          consequuntur culpa delectus dignissimos dolor dolorem doloremque, ea eaque enim esse eum fuga inventore iusto
          labore laudantium minima minus officiis placeat possimus provident qui quidem quisquam ratione repellendus,
          sed similique temporibus tenetur vero voluptas voluptatem! At, veniam?
        </p>
        <Link
          className={"bg-blue-600 text-white py-2 px-8 w-fit place-self-end rounded border-white border"}
          to={routes.dashboard.path}
        >
          Go to dashboard
        </Link>
      </div>
    </div>
  )
}
