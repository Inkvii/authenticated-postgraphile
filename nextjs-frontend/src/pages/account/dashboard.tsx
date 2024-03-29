import { signOut } from "firebase/auth"
import Link from "next/link"
import { auth } from "components/Firebase"
import routes from "router/routes"
import { useAuthState } from "react-firebase-hooks/auth"
import nookies from "nookies"
import { GetServerSidePropsContext } from "next"
import { firebaseAdmin } from "backend/firebaseAdmin"
import { generateCsrfCookie } from "backend/csrf"

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
      <div className={"grid grid-cols-2 gap-4"}>
        <div>
          Click me to test csrf without header
          <button
            className={"bg-yellow-600 text-white rounded py-2 px-4"}
            onClick={async () => {
              generateCsrfCookie()
              const res = await fetch("/api/hello", { method: "POST" })
              console.log(res.json())
            }}
          >
            No CSRF clicker
          </button>
        </div>
        <div>
          Click me to test proper csrf
          <button
            className={"bg-yellow-500 text-white rounded py-2 px-4"}
            onClick={async () => {
              const csrf = generateCsrfCookie()
              const res = await fetch("/api/hello", { method: "POST", headers: { "xsrf-token": csrf } })
              console.log(res.json())
            }}
          >
            CSRF clicker
          </button>
        </div>
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
    return {
      props: {} as never,
      redirect: {
        destination: routes.login.path,
        permanent: false,
      },
    }
  }
}
