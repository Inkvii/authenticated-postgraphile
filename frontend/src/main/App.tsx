import { QueryClient, QueryClientProvider } from "react-query"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import routes from "main/route/routes"
import { ReactQueryDevtools } from "react-query/devtools"

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
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
