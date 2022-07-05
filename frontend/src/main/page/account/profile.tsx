import DefaultPageLayout from "main/component/layout/DefaultPageLayout"
import { useGetAccountByIdQuery } from "generated/graphql/types"

export default function ProfilePage() {
  const account = useGetAccountByIdQuery({ accountId: "1" })

  return (
    <DefaultPageLayout>
      <div>Hello</div>
      <pre>{account.data && JSON.stringify(account.data, null, 2)}</pre>
    </DefaultPageLayout>
  )
}
