import { Account } from "generated/graphql/types"

export default function AccountInfo(props: { account?: Account }) {
  return (
    <div>
      <table className={"table table-auto"}>
        <thead>
          <tr className={"bg-blue-500 text-white"}>
            <th className={"px-4 py-2 text-left border"}>Account id</th>
            <th className={"px-4 py-2 text-left border"}>Name</th>
            <th className={"px-4 py-2 text-left border"}>Age</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={"px-4 py-2 text-left border"}>{props.account?.accountId ?? "Loading"}</td>
            <td className={"px-4 py-2 text-left border"}>{props.account?.name ?? "Loading"}</td>
            <td className={"px-4 py-2 text-left border"}>{props.account?.age ?? "Loading"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
