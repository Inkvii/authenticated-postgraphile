import nookies from "nookies"
import { initializeApp } from "@firebase/app"
import { getAuth } from "@firebase/auth"
import { CookieSerializeOptions } from "next/dist/server/web/types"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

auth.onIdTokenChanged(async (user) => {
  if (!user) {
    nookies.set(undefined, "token", "", { path: "/", secure: true  } as CookieSerializeOptions)
  } else {
    const token = await user.getIdToken()
    nookies.set(undefined, "token", token, { path: "/", secure: true } as CookieSerializeOptions)
  }
})


