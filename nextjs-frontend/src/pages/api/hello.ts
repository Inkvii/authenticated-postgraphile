// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { verifyCsrfCookie } from "backend/csrf"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const isCsrfVerified = verifyCsrfCookie(req.headers, req.cookies)
  if (!isCsrfVerified) {
    return res.status(401).json({ msg: "CSRF not verified" })
  }

  return res.status(200).json({ name: "John Doe" })
}
