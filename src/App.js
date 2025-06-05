//router
import { createBrowserRouter, Outlet } from "react-router-dom"

//components
import Body from "./components/Body"
import Browse from "./components/Browse"
import Login from "./components/Login"
import Header from "./components/Header"
import MovieDetails from "./components/MovieDetails"
import MyLists from "./components/MyLists"
import ListRecommendations from "./components/ListRecommendations"

//redux
import appStore from "./utils/redux/appStore"
import { Provider } from "react-redux"
import ActorDetails from "./components/ActorDetails"
import GeminiSearch from "./components/GeminiSearch"
import BrowseTV from "./components/Series/BrowseTV"
import SeriesDetails from "./components/Series/SeriesDetails"
import Categories from "./components/Categories"
import Footer from "./components/Footer"


const App = () => {
  return (
    <Provider store={appStore}>
      <div className="bg-gray-900">
        <Header />

        <Outlet />

        <Footer />
      </div>
    </Provider>
  )
}
export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children:[
      {
        index: true,
        element: <Body />,
      },
      {
        path: "browse",
        element: <Browse />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "gptsearch",
        element: <GeminiSearch />,
      },
      {
        path:'movies/:movId',
        element: <MovieDetails />
      },
      {
        path:'shows/:movId',
        element: <SeriesDetails />
      },
      {
        path:'cast/:castId',
        element: <ActorDetails />
      },
      {
        path:'shows',
        element: <BrowseTV />
      },
      {
        path:'categories',
        element: <Categories />
      },
      {
        path:'mylists',
        element: <MyLists />
      },
      {
        path:'recommendations',
        element: <ListRecommendations />
      }
    ] 
  }
])



export default App;