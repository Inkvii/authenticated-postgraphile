import "styles/App.css"
import { QueryClient, QueryClientProvider, useQuery } from "react-query"
import request, { gql } from "graphql-request"

import getAllAccountsQuery from "main/graphql/getAllAccounts.graphql?raw"

const queryClient = new QueryClient()

export default function App() {


  return (
    <QueryClientProvider client={queryClient}>
      <Testing />
    </QueryClientProvider>)
}

function Testing(props: {}) {

  const getAllAccounts = useQuery("get-all-accounts", async () => {
    return await request("http://localhost:5000/graphql",
      gql`${getAllAccountsQuery}`,
    )
  })


  return (
    <div>
      <h1 className={"text-4xl font-light"}>Testing react query graphql</h1>
      <p>This is a test for graphql postgraphile</p>
      <div>
        {getAllAccounts.isError && <div>
          <p>
            Error:
          </p>
          <pre>
            {JSON.stringify(getAllAccounts.error, null, 2)}
          </pre>
        </div>
        }
        {!getAllAccounts.isLoading &&
          <div>
            <p>Response:</p>
            <pre>
            {JSON.stringify(getAllAccounts.data, null, 2)}

              </pre>
          </div>
        }

      </div>
    </div>
  )
}
