//router
import { createBrowserRouter, Outlet } from "react-router-dom"

//components
import Body from "./components/Body"
import Browse from "./components/Browse"
import Login from "./components/Login"
import Header from "./components/Header"


const App = () => {
  return (
    <div>
      <Header />

      <Outlet />
    </div>
  )
}
export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children:[
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/browse",
        element: <Browse />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ] 
  }
])



export default App;