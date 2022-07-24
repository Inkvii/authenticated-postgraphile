import { ReactElement, useEffect } from "react"
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom"
import routes, { Route } from "main/router/routes"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)


export default function Authenticator(props: { route: Route; children: ReactElement }) {
  const [user, loading, error] = useAuthState(auth)

  const navigate = useNavigate()

  useEffect(() => {
    console.log("Triggered Authenticator on paths: ", props.route)

    if (props.route.authenticated && !loading && !user) {
      navigate(routes.login.path, { replace: true })
    }
  }, [!!user, props.route, loading])

  if (loading || !user) {
    return <div>Loading...</div>
  }

  return <>{props.children}</>
}
