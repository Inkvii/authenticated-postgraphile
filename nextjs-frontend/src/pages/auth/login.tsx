import {
  browserLocalPersistence,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut,
} from "firebase/auth"

import { useAuthState } from "react-firebase-hooks/auth"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { auth } from "components/Firebase"
import routes from "router/routes"
import Link from "next/link"

export default function LoginPage() {
  const [user, loading, error] = useAuthState(auth)
  const router = useRouter()

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState<string>("")

  useEffect(() => {
    if (user) {
      router.replace(routes.dashboard.path)
    }
  }, [loading])

  return (
    <div className={"flex flex-col p-4 gap-4"}>
      <button
        className={"bg-green-700 text-white py-2 px-4 rounded"}
        onClick={async () => {
          await auth.setPersistence(browserLocalPersistence)
          const googleProvider = new GoogleAuthProvider()
          googleProvider.setCustomParameters({
            prompt: "select_account",
          })
          await signInWithRedirect(auth, googleProvider)
        }}
      >
        Google provider
      </button>
      {user && (
        <button className={"bg-gray-500 text-white py-2 px-4 rounded"} onClick={() => signOut(auth)}>
          Sign out
        </button>
      )}

      <form
        className={"flex flex-col gap-2 w-1/2 m-auto shadow  p-6 bg-slate-100 rounded"}
        onSubmit={async (e) => {
          e.preventDefault()
          try {
            const credentials = await signInWithEmailAndPassword(auth, email, password)
            console.log(credentials)
            router.replace(routes.dashboard.path)
          } catch (err) {
            const error = err as { message: string; code: string; customData: object }
            switch (error.code) {
              case "auth/invalid-email":
                setErrorMessage("Invalid email or password")
                return
              case "auth/user-not-found":
                setErrorMessage("User with this email was not found.")
                return
              default:
                setErrorMessage("Unexpected error " + error.code)
            }
          }
        }}
      >
        <label htmlFor={"email"}>Email</label>
        <input
          className={"border px-2 py-1 border"}
          id={"email"}
          type={"email"}
          autoComplete={"email"}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor={"password"}>Password</label>
        <input
          className={"border px-2 py-1 border"}
          id={"password"}
          type={"password"}
          autoComplete={"password"}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={"flex gap-2 py-2"}>
          <button className={"bg-green-700 text-white py-2 px-4 rounded w-full"} type={"submit"}>
            Log in
          </button>
          <Link href={routes.register.path}>
            <button
              className={"border-2 border-green-700 text-green-800 font-semibold text-center py-2 px-4 rounded w-full"}
            >
              Register
            </button>
          </Link>
        </div>

        <p>{errorMessage}</p>
      </form>

      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  )
}
