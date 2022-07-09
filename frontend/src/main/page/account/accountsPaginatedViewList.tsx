import DefaultPageLayout from "main/component/layout/DefaultPageLayout"
import { useGetAllAccountsQuery } from "generated/graphql/types"
import UniversalTable from "main/component/UniversalTable"
import { useState } from "react"
import PaginatedFooter from "main/component/universalTable/fragment/PaginatedFooter"

export default function AccountsPaginatedViewListPage() {
  const [offset, setOffset] = useState<number>(0)
  const [countPerPage, setCountPerPage] = useState<number>(10)

  const accountsList = useGetAllAccountsQuery({ countPerPage, offset }, { keepPreviousData: true })

  return (
    <DefaultPageLayout className={"p-8"}>
      {accountsList.data && (
        <UniversalTable data={accountsList.data.accounts?.nodes}>
          <PaginatedFooter
            totalCount={accountsList.data.accounts?.totalCount ?? 0}
            countPerPage={countPerPage}
            currentOffset={offset}
            setCurrentOffset={setOffset}
            setCountPerPage={setCountPerPage}
          />
        </UniversalTable>
      )}
    </DefaultPageLayout>
  )
}

