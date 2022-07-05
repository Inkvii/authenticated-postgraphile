import "styles/App.css"
import { QueryClient, QueryClientProvider } from "react-query"
// import request, { gql } from "graphql-request"
// import { getAllAccountsQuery } from "main/graphql/queries"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import routes from "main/route/routes"

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {Object.values(routes).map((route) => (
            <Route key={route.path} path={route.path} element={route.component} />
          ))}
        </Routes>
        {/*<Testing />*/}
      </BrowserRouter>
    </QueryClientProvider>
  )
}

// function Testing(props: {}) {
//   const getAllAccounts = useQuery("get-all-accounts", async () => {
//     return await request("http://localhost:5000/graphql", getAllAccountsQuery)
//   })
//
//   return (
//     <div>
//       <h1 className={"text-4xl font-light"}>Testing react query graphql</h1>
//       <p>This is a test for graphql postgraphile</p>
//       <pre>
//         {gql`
//           ${getAllAccountsQuery}
//         `}
//       </pre>
//       <div>
//         {getAllAccounts.isError && (
//           <div>
//             <p>Error:</p>
//             <pre>{JSON.stringify(getAllAccounts.error, null, 2)}</pre>
//           </div>
//         )}
//         {!getAllAccounts.isLoading && (
//           <div>
//             <p>Response:</p>
//             <pre>{JSON.stringify(getAllAccounts.data, null, 2)}</pre>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }
