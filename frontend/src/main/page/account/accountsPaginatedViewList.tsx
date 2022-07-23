import DefaultPageLayout from "main/component/layout/DefaultPageLayout"
import { useGetAllAccountsQuery } from "generated/graphql/types"
import UniversalTable from "main/component/UniversalTable"
import { useState } from "react"
import PaginatedFooter from "main/component/universalTable/fragment/PaginatedFooter"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "main/App"
import { useNavigate } from "react-router-dom"
import routes from "main/route/routes"

export default function AccountsPaginatedViewListPage() {
  const [user, loading, error] = useAuthState(auth)
  const navigate = useNavigate()
  const [offset, setOffset] = useState<number>(0)
  const [countPerPage, setCountPerPage] = useState<number>(10)

  const accountsList = useGetAllAccountsQuery({ countPerPage, offset }, { keepPreviousData: true })

  if (loading) {
    return <div>"Loading..."</div>
  }

  if (!user) {
    console.log("Redirecting to home because user is not authenticated")
    navigate(routes.home.path)
    return null
  }

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

