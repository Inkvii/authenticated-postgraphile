import { useGetAllAccountsQuery } from "generated/graphql/types"
import DefaultPageLayout from "main/component/layout/DefaultPageLayout"
import { useState } from "react"

export default function AccountsListPage() {
  const [cursor, setCursor] = useState<null | string>(null)

  const accountsList = useGetAllAccountsQuery({ cursor })

  return (
    <DefaultPageLayout className={"p-8"}>
      <table className={"table table-auto w-full"}>
        <thead>
          <tr className={"bg-blue-500 text-white"}>
            <th className={"px-4 py-2 text-left border"}>Account id</th>
            <th className={"px-4 py-2 text-left border"}>Name</th>
            <th className={"px-4 py-2 text-left border"}>Age</th>
          </tr>
        </thead>
        <tbody>
          {accountsList.data &&
            accountsList.data.accounts?.nodes.map((account) => {
              return (
                <tr
                  key={account.accountId}
                  className={
                    "odd:bg-blue-100 even:bg-blue-200 hover:brightness-125 hover:cursor-pointer transition-all"
                  }
                >
                  <td className={"px-4 py-2 text-left border"}>{account.accountId}</td>
                  <td className={"px-4 py-2 text-left border"}>{account.name}</td>
                  <td className={"px-4 py-2 text-left border"}>{account.age}</td>
                </tr>
              )
            })}
        </tbody>
      </table>
      <div className={"flex gap-4 bg-blue-400 text-white font-semibold px-4 py-2 justify-between items-center"}>
        <div className={"flex gap-4"}>
          <p>Total count:</p>
          <p>{accountsList.data?.accounts?.totalCount}</p>
        </div>
        <button
          className={"bg-blue-600 border border-white rounded text-white px-4 p-2 disabled:bg-gray-400"}
          disabled={!accountsList.data?.accounts?.pageInfo.hasNextPage}
          onClick={() => {
            setCursor(accountsList.data?.accounts?.pageInfo.endCursor)
          }}
        >
          Next page
        </button>
      </div>
    </DefaultPageLayout>
  )
}
