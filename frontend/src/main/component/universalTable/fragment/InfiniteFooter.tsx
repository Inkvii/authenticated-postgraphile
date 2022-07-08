import { useInView } from "react-intersection-observer"
import { useEffect } from "react"

export default function InfiniteFooter(props: { fetchNextPage: () => void; hasNextPage: boolean; className?: string }) {
  const { ref, inView } = useInView({ threshold: 0.5 })

  useEffect(() => {
    if (inView) {
      console.log("Is in view, fetching")
      props.fetchNextPage()
    }
  }, [inView])

  return (
    <div className={props.className}>
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
