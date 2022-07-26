import * as firebaseAdminSdk from "firebase-admin"
import serviceAccount from "../../firebase-cert.json"

function init() {
  if (!firebaseAdminSdk.apps.length) {
    const app: firebaseAdminSdk.app.App = firebaseAdminSdk.initializeApp({
      credential: firebaseAdminSdk.credential.cert({
        privateKey: serviceAccount.private_key,
        clientEmail: serviceAccount.client_email,
        projectId: serviceAccount.project_id,
      }),
    })
    return app
  }
  return firebaseAdminSdk.apps[0] as firebaseAdminSdk.app.App
}

export const firebaseAdmin = init()

