import DefaultPageLayout from "main/component/layout/DefaultPageLayout"
import { useMemo, useState } from "react"
import { ColumnDef, flexRender, getCoreRowModel, RowData, useReactTable } from "@tanstack/react-table"
import { PageInfo, useGetAllAccountsQuery } from "generated/graphql/types"

export default function AccountsListPage() {
  const [cursor, setCursor] = useState<null | string>(null)

  const accountsList = useGetAllAccountsQuery({ cursor })

  return (
    <DefaultPageLayout className={"p-8"}>
      {accountsList.data?.accounts && (
        <UniversalTable
          data={accountsList.data.accounts?.nodes}
          pageInfo={accountsList.data.accounts.pageInfo}
          setCursor={setCursor}
          totalCount={accountsList.data.accounts.totalCount ?? 0}
        />
      )}
    </DefaultPageLayout>
  )
}

function UniversalTable<T extends RowData>(props: {
  data?: T[]
  totalCount: number
  pageInfo: Partial<PageInfo>
  setCursor: (cursor: string | null) => void
}) {
  if (!props.data || props.data.length === 0) {
    return null
  }

  const columns: ColumnDef<T>[] = useMemo(() => {
    return Object.keys(props.data![0]).map((col) => {
      const name = col
        // insert a space between lower & upper
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        // space before last upper in a sequence followed by lower
        .replace(/\b([A-Z]+)([A-Z])([a-z])/, "$1 $2$3")
        // uppercase the first character
        .replace(/^./, function (str) {
          return str.toUpperCase()
        })

      return {
        accessorKey: col,
        header: name,
      }
    })
  }, [props.data])

  const table = useReactTable({
    data: props.data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div>
      <table className={"table table-auto w-full"}>
        <thead>
          {table.getHeaderGroups().map((group) => (
            <tr key={group.id} className={"bg-blue-500 text-white"}>
              {group.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan} className={"px-4 py-2 text-left border"}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className={"odd:bg-blue-100 even:bg-blue-200 hover:brightness-125 hover:cursor-pointer transition-all"}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={"px-4 py-2 text-left border"}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className={"flex gap-4 bg-blue-400 text-white font-semibold px-4 py-2 justify-between items-center"}>
        <div className={"flex gap-4"}>
          <p>Total count:</p>
          <p>{props.totalCount}</p>
        </div>
        <button
          className={"bg-blue-600 border border-white rounded text-white px-4 p-2 disabled:bg-gray-400"}
          disabled={!props.pageInfo.hasNextPage}
          onClick={() => {
            props.setCursor(props?.pageInfo.endCursor)
          }}
        >
          Next page
        </button>
      </div>
    </div>
  )
}
