import { signOut } from "firebase/auth"
import Link from "next/link"
import { auth } from "components/Firebase"
import routes from "router/routes"
import { useAuthState } from "react-firebase-hooks/auth"
import nookies from "nookies"
import { GetServerSidePropsContext } from "next"
import { firebaseAdmin } from "backend/firebaseAdmin"

export default function DashboardPage(props: { uid: string; email: string }) {
  const [user, loading, error] = useAuthState(auth)

  return (
    <div className={"p-8 flex flex-col gap-4"}>
      <div>
        <h1 className={"text-4xl"}>Dashboard</h1>
      </div>
      <div>
        <p>User state exists: {!!user}</p>
      </div>

      <div>
        <h2 className={"text-2xl"}>Stuff from get server side props</h2>
        <p>UID: {props.uid}</p>
        <p>Email: {props.email}</p>
      </div>

      <div className={"flex gap-4"}>
        <Link href={routes.home.path}>
          <button className={"bg-blue-700 text-white rounded py-2 px-4"}>Home</button>
        </Link>
        <Link href={routes.login.path}>
          <button className={"bg-blue-700 text-white rounded py-2 px-4"}>Login</button>
        </Link>
        <button className={"bg-gray-400 rounded py-2 px-4"} onClick={() => signOut(auth)}>
          Sign out
        </button>
      </div>
    </div>
  )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(context)
    const { uid, email } = await firebaseAdmin.auth().verifyIdToken(cookies.token)

    return {
      props: {
        uid,
        email,
      },
    }
  } catch (err) {
    console.error("Get server side props error " + err)
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    context.res.writeHead(302, { Location: routes.login.path })
    context.res.end()
    return {
      props: {} as never,
    }
  }
}
