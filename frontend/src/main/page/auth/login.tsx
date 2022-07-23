import { signInWithRedirect, signOut } from "firebase/auth"
import firebase from "firebase/compat"
import { auth } from "main/App"
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom"
import routes from "main/route/routes"
import { useEffect } from "react"
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider

const googleProvider = new GoogleAuthProvider()

export default function LoginPage() {
  const [user, loading, error] = useAuthState(auth)
  const navigate = useNavigate()

  useEffect(() => {
    if(user) {
      navigate(routes.dashboard.path, {replace: true})
    }
  },[loading])


  return (
    <div className={"flex flex-col p-4 gap-4"}>
      <button className={"bg-green-700 text-white py-2 px-4 rounded"} onClick={() => signInWithRedirect(auth, googleProvider)}>Google provider</button>
      {user && <button className={"bg-gray-500 text-white py-2 px-4 rounded"} onClick={() => signOut(auth)}>Sign out</button>}
      <pre>
        {
          JSON.stringify(user, null, 2)
        }
      </pre>
    </div>
  )
}

