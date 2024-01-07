import { useAuth } from "../context/use-auth"
import { IMovie } from "../types/movie"
import useMutation from "./use-mutation"

const useCollection = (movie: IMovie) => {
  const auth = useAuth()
  const addFavoriteMutation = useMutation(`/account/20896063/favorite${auth.sessionId ? `?session_id=${auth.sessionId}` : ''}`, 'POST')
  const addWatchlistMutation = useMutation(`/account/20896063/watchlist${auth.sessionId ? `?session_id=${auth.sessionId}` : ''}`, 'POST')

  const addFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    
    const data = {
      media_type: 'movie',
      media_id: movie.id,
      favorite: movie.is_favorite ? false : true
    }

    addFavoriteMutation.mutate(data)

    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }

  const addWatchlist = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    const data = {
      media_type: 'movie',
      media_id: movie.id,
      watchlist: movie.is_watchlist ? false : true
    }

    addWatchlistMutation.mutate(data)

    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }

  return {
    addFavorite, addWatchlist
  }
}

export default useCollection
