import DefaultPageLayout from "main/component/layout/DefaultPageLayout"
import { Account, useGetAccountByIdQuery } from "generated/graphql/types"
import AccountInfo from "main/page/account/fragment/AccountInfo"

export default function ProfilePage() {
  const account = useGetAccountByIdQuery({ accountId: "1" })

  return (
    <DefaultPageLayout className={"p-4"}>
      <div>Hello</div>
      <AccountInfo account={account.data?.account as Account} />
    </DefaultPageLayout>
  )
}
