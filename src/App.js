//router
import { createBrowserRouter, Outlet, useLocation } from "react-router-dom"

//components
import Body from "./components/Body"
import Browse from "./components/Browse"
import Login from "./components/Login"
import Header from "./components/Header"
import MovieDetails from "./components/MovieDetails"
import MyLists from "./components/MyLists"
import ListRecommendations from "./components/ListRecommendations"
import AlgoliaSearch from "./components/AlgoliaSearch"
import HeaderDemo from "./components/HeaderDemo"

//redux
import appStore from "./utils/redux/appStore"
import { Provider } from "react-redux"
import ActorDetails from "./components/ActorDetails"
import GeminiSearch from "./components/GeminiSearch"
import BrowseTV from "./components/Series/BrowseTV"
import SeriesDetails from "./components/Series/SeriesDetails"
import Categories from "./components/Categories"
import Footer from "./components/Footer"
import { AuthProvider } from "./utils/AuthContext"
import usePreferences from "./hooks/usePreferences"
import { createContext } from "react"

export const PreferencesContext = createContext()

const PreferencesProvider = ({ children }) => {
  const preferences = usePreferences()
  return (
    <PreferencesContext.Provider value={preferences}>
      {children}
    </PreferencesContext.Provider>
  )
}

const AppContent = () => {
  const location = useLocation();
  const isHeaderDemo = location.pathname === '/header-demo';

  return (
    <div>
      {!isHeaderDemo && <Header />}
      <main className="container mx-auto pt-16">
        <Outlet />
      </main>
      {!isHeaderDemo && <Footer />}
    </div>
  );
};

const App = () => (
  <Provider store={appStore}>
    <AuthProvider>
      <PreferencesProvider>
        <AppContent />
      </PreferencesProvider>
    </AuthProvider>
  </Provider>
)

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
        path: "search",
        element: <AlgoliaSearch />,
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
      },
      {
        path:'header-demo',
        element: <HeaderDemo />
      }
    ] 
  }
])

export default App;