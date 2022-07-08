import { ColumnDef, flexRender, getCoreRowModel, RowData, useReactTable } from "@tanstack/react-table"
import { useEffect, useMemo } from "react"
import { useInView } from "react-intersection-observer"

export default function UniversalTable<T extends RowData>(props: {
  data?: T[]
  // totalCount: number
  // pageInfo: Partial<PageInfo>
  // setCursor: (cursor: string | null) => void
  fetchNextPage: () => void
  hasNextPage: boolean
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

  const { ref, inView } = useInView({ threshold: 0.5 })

  useEffect(() => {
    if (inView) {
      console.log("Is in view, fetching")
      props.fetchNextPage()
    }
  }, [inView])

  return (
    <div className={"flex flex-col"}>
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
          {table.getRowModel().rows.map((row, index) => (
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
      <button
        className={"bg-green-600 border border-white rounded text-white px-4 p-2 disabled:bg-gray-400 m-auto w-fit"}
        ref={ref}
        disabled={!props.hasNextPage}
        onClick={async () => {
          await props.fetchNextPage()
        }}
      >
        Next page
      </button>
    </div>
  )
}
