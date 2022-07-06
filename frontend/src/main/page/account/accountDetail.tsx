import DefaultPageLayout from "main/component/layout/DefaultPageLayout"
import { Account, useGetAccountByIdQuery } from "generated/graphql/types"
import AccountInfo from "main/page/account/fragment/AccountInfo"
import { useParams } from "react-router-dom"

export default function AccountDetailPage() {
  const { id } = useParams()

  const account = useGetAccountByIdQuery({ accountId: id ?? null })

  return (
    <DefaultPageLayout className={"p-4"}>
      <div>Hello</div>
      <AccountInfo account={account.data?.account as Account} />
    </DefaultPageLayout>
  )
}
