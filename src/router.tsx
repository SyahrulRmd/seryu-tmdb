import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import FavoritePage from "./pages/Favorite";
import AuthProvider from "./context/auth";
import MovieDetailPage from "./pages/MovieDetail";
import WatchlistPage from "./pages/Wathclist";
import SearchPage from "./pages/Search";

export const router = createBrowserRouter([
  {
    element: <AuthProvider />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/favorite',
        element: <FavoritePage />,
      },
      {
        path: '/watchlist',
        element: <WatchlistPage />,
      },
      {
        path: '/movie/:movieId',
        element: <MovieDetailPage />,
      },
      {
        path: '/search',
        element: <SearchPage />,
      },
    ]
  },
]);
