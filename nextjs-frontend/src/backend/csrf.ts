import nookies from "nookies"
import { uuidv4 } from "@firebase/util"
import { CookieSerializeOptions } from "next/dist/server/web/types"
import { IncomingHttpHeaders } from "http"

export function generateCsrfCookie() {
  const csrfValue = uuidv4()
  nookies.set(undefined, "xsrf-token", csrfValue, {
    path: "/",
    httpOnly: false,
    secure: false,
    maxAge: 60,
  } as CookieSerializeOptions)
  return csrfValue
}

export function verifyCsrfCookie(
  headers: IncomingHttpHeaders,
  cookies: Partial<{
    [key: string]: string
    }>
) {
  console.group("Verify csrf cookie")
  console.log(headers, cookies)
  console.groupEnd()

  const csrf: string | null = cookies["xsrf-token"] ?? null
  if (csrf === null) {
    console.error("Token not found in the cookies")
    return false
  }

  const requestHeaderCsrf: string | null = (headers["xsrf-token"] as string | undefined | null) ?? null

  if (requestHeaderCsrf === null) {
    console.error("Token not found in the header")
    return false
  }

  return csrf === requestHeaderCsrf
}
