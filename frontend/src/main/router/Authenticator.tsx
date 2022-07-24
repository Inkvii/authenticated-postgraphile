import { ReactElement, useEffect } from "react"
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom"
import useMatchedRoutes from "main/hooks/useMatchedRoutes"
import routes from "main/router/routes"

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

export default function Authenticator(props: { children: ReactElement }) {
  const [user, loading, error] = useAuthState(auth)

  const matchedRoutes = useMatchedRoutes()
  const navigate = useNavigate()

  useEffect(() => {
    console.log("Triggered Authenticator on paths: ", matchedRoutes)

    if (matchedRoutes.length === 0) {
      console.warn("No matched routes found for current location")
      return
    }

    if (matchedRoutes[0].authenticated && !loading && !user) {
      navigate(routes.login.path, {replace: true})
    }

  }, [!!user, matchedRoutes])


  return <>{props.children}</>
}
