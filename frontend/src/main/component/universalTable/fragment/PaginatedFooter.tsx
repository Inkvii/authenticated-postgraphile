import { useMemo } from "react"
import { TablePagination } from "@mui/material"

export default function PaginatedFooter(props: {
  totalCount: number
  countPerPage: number
  currentOffset: number
  setCurrentOffset: (offset: number) => void
  setCountPerPage: (count: number) => void
}) {
  const currentPageNumber = useMemo(() => {
    if (props.currentOffset === 0) return 0
    return Math.ceil(props.currentOffset / props.countPerPage)
  }, [props.totalCount, props.countPerPage, props.currentOffset])

  return (
    <div>
      <TablePagination
        component={"div"}
        count={props.totalCount}
        page={currentPageNumber}
        onPageChange={(event, page) => props.setCurrentOffset(page * props.countPerPage)}
        rowsPerPage={props.countPerPage}
        onRowsPerPageChange={(event) => {
          props.setCountPerPage(parseInt(event.target.value))
        }}
        showFirstButton={true}
        showLastButton={true}
      />
    </div>
  )
}
