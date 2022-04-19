import React from "react"
import { AuthenticatedApp } from "authenticated-app"
import { useAuth } from "context/auth-context"
import { UnAuthenticatedApp } from "screens/unauthenticated-app"
import { ErrorBoundary } from "./components/error-boundary"
import { FullPageErrorFallback } from "./components/lib"
import "./App.css"

function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
      </ErrorBoundary>
    </div>
  )
}

export default App
