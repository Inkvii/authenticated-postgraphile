import { createUserWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { useRouter } from "next/router"
import { auth } from "components/Firebase"
import routes from "router/routes"


export default function RegisterPage() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState<string>("")

  const router = useRouter()

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        try {
          const credentials = await createUserWithEmailAndPassword(auth, email, password)
          router.replace(routes.dashboard.path)
        } catch (err) {
          const error = err as { message: string; code: string; customData: object }
          switch (error.code) {
            case "auth/invalid-email":
              setErrorMessage("Invalid email")
              return
            case "auth/weak-password":
              setErrorMessage("Password is too weak. It should contain at least 6 characters")
              return
            case "auth/email-already-in-use":
              setErrorMessage("Email is already registered, try logging in instead")
              return
            default:
              setErrorMessage("Unexpected error " + error.code)
              return
          }
        }
      }}
      className={"flex flex-col gap-2 w-1/2 m-auto shadow  p-6 bg-slate-100 rounded"}
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

      <button className={"bg-green-700 text-white py-2 px-4 rounded"} type={"submit"}>
        Register account
      </button>
      <p>{errorMessage}</p>
    </form>
  )
}
