import { useMemo } from "react"
import range from "lodash-es/range"
import clsx from "clsx"

export default function PaginatedFooter(props: {
  totalCount: number
  countPerPage: number
  currentOffset: number
  setCurrentOffset: (offset: number) => void
}) {
  const numberOfPages = useMemo(() => {
    if (props.totalCount === 0) return 1
    return Math.ceil(props.totalCount / props.countPerPage)
  }, [props.totalCount, props.countPerPage])

  const currentPageNumber = useMemo(() => {
    if (props.currentOffset === 0) return 0
    return Math.ceil(props.currentOffset / props.countPerPage)
  }, [props.totalCount, props.countPerPage, props.currentOffset])

  return (
    <div>
      <Pagination
        numberOfPages={numberOfPages}
        currentPageNumber={currentPageNumber}
        setCurrentPageNumber={(page) => props.setCurrentOffset(page * props.countPerPage)}
      />
    </div>
  )
}

function Pagination(props: {
  numberOfPages: number
  currentPageNumber: number
  setCurrentPageNumber: (cursor: number) => void
}) {

  return (
    <div className={"flex gap-1 items-center justify-center w-fit px-8 py-2 m-auto"}>
      {range(1, props.numberOfPages + 1).map((page) => {
        return (
          <button
            key={"page-"+page}
            className={clsx(
              "w-8 h-8",
              "text-center font-light text-md",
              "rounded border shadow",
              "hover:brightness-110",
              page - 1 === props.currentPageNumber ? ["bg-blue-200 border-blue-400"] : ["bg-gray-200 border-gray-400"]
            )}
            onClick={() => props.setCurrentPageNumber(page - 1)}
          >
            {page}
          </button>
        )
      })}
    </div>
  )
}
