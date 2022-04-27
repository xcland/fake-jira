import React from "react"
import { useAuth } from "context/auth-context"
import { ErrorBoundary } from "./components/error-boundary"
import { FullPageErrorFallback, FullPageLoading } from "./components/lib"
import "./App.css"

const AuthenticatedApp = React.lazy(() => import("authenticated-app"))
const UnAuthenticatedApp = React.lazy(
  () => import("screens/unauthenticated-app")
)

function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        <React.Suspense fallback={<FullPageLoading />}>
          {user ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
        </React.Suspense>
      </ErrorBoundary>
    </div>
  )
}

export default App
