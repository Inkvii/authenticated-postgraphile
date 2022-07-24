import { QueryClient, QueryClientProvider } from "react-query"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import routes from "main/router/routes"
import { ReactQueryDevtools } from "react-query/devtools"
import Authenticator from "main/router/Authenticator"

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {Object.values(routes).map((route) => {
            if (route.authenticated) {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<Authenticator route={route}>{route.component}</Authenticator>}
                />
              )
            }
            return <Route key={route.path} path={route.path} element={route.component} />
          })}
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
