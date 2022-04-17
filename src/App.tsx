import { AuthenticatedApp } from "authenticated-app"
import { useAuth } from "context/auth-context"
import { UnAuthenticatedApp } from "screens/unauthenticated-app"
import "./App.css"

function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
    </div>
  )
}

export default App
