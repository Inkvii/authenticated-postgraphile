import { ReactNode } from "react"
import clsx from "clsx"

export default function DefaultPageLayout(props: {
  className?: string
  children: ReactNode
  header?: ReactNode
  footer?: ReactNode
}) {
  return (
    <div className={clsx("max-w-6xl", "flex flex-col m-auto", "bg-white rounded shadow")}>
      {props.header && <header>{props.header}</header>}
      <main className={clsx("min-h-[70vh]", props.className)}>{props.children}</main>
      <Footer />
    </div>
  )
}

function Footer(props: {}) {
  return (
    <footer className={"bg-gray-100 p-12"}>
      <p>Copyright &copy; 2022</p>
      <div className={"grid grid-cols-3 gap-4 mt-4"}>
        <div className={"flex flex-col "}>
          <p>asdasdasdasdas</p>
          <p>asdasdasdasdas asds dsads</p>
          <p>asdasdasdasdas asds </p>
        </div>
        <div className={"flex flex-col "}>
          <p>asdasd dsads</p>
          <p>asdasda jkdsa jkldasdsa</p>
          <p>asdasdasdasdas asds</p>
        </div>
        <div className={"flex flex-col "}>
          <p>asdasdasdasdas asds dsads asdas das d</p>
          <p>asdasdasdasdas asds dsads</p>
          <p>asdasdasdasdas asds dsads</p>
        </div>
      </div>
    </footer>
  )
}
