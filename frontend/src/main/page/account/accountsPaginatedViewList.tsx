import DefaultPageLayout from "main/component/layout/DefaultPageLayout"
import { useGetAllAccountsQuery } from "generated/graphql/types"
import UniversalTable from "main/component/UniversalTable"
import { useState } from "react"

export default function AccountsPaginatedViewListPage() {
  const [cursor, setCursor] = useState<null | string>(null)

  const accountsList = useGetAllAccountsQuery({ cursor }, { keepPreviousData: true })

  return (
    <DefaultPageLayout className={"p-8"}>
      {accountsList.data && (
        <UniversalTable
          data={accountsList.data.accounts?.nodes}
          fetchNextPage={() => setCursor(accountsList.data?.accounts?.pageInfo.endCursor)}
          hasNextPage={accountsList.data?.accounts?.pageInfo.hasNextPage ?? false}
        />
      )}
    </DefaultPageLayout>
  )
}

