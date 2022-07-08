import DefaultPageLayout from "main/component/layout/DefaultPageLayout"
import { useInfiniteGetAllAccountsQuery } from "generated/graphql/types"
import UniversalTable from "main/component/UniversalTable"
import InfiniteFooter from "main/component/universalTable/fragment/InfiniteFooter"

export default function AccountsInfiniteViewListPage() {
  const accountsList = useInfiniteGetAllAccountsQuery(
    "cursor",
    {},
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.accounts?.pageInfo.hasNextPage) {
          return { cursor: lastPage.accounts?.pageInfo.endCursor as string }
        }
      },
      keepPreviousData: true,
    }
  )

  return (
    <DefaultPageLayout className={"p-8"}>
      {accountsList.data?.pages.flatMap((page) => page.accounts?.nodes) && (
        <UniversalTable data={accountsList.data.pages.flatMap((page) => page.accounts!.nodes)}>
          <InfiniteFooter fetchNextPage={accountsList.fetchNextPage} hasNextPage={accountsList.hasNextPage ?? false} />
        </UniversalTable>
      )}
    </DefaultPageLayout>
  )
}

