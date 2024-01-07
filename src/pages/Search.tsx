import { useSearchParams } from 'react-router-dom'
import useQuery, { ListPagination } from '../lib/use-query'
import { IMovie } from '../types/movie'
import { useEffect, useMemo } from 'react'
import { Skeleton } from '../components/Skeleton'
import { MovieList } from '../components/MovieList'

function SearchPage() {
  const [searchParams] = useSearchParams()
  
  const favoritedMovie = useQuery<ListPagination<IMovie[]>>('/account/20896063/favorite/movies')
  const watchlistMovie = useQuery<ListPagination<IMovie[]>>('/account/20896063/watchlist/movies')

  const searchResults = useQuery<ListPagination<IMovie[]>>(
    `/search/movie?query=${encodeURIComponent(searchParams.get('q') ?? '')}&api_key=${import.meta.env.VITE_API_KEY}`,
    true
  )

  const searchResultsCvt = useMemo(() => {
    const favorites = favoritedMovie.data?.results
    const searchRes = searchResults.data?.results
    const watchlists = watchlistMovie.data?.results

    if (favorites && favorites?.length > 0 && searchRes && searchRes.length > 0) {
      searchRes.forEach(np => {
        favorites.forEach(fv => {
          if (np.id === fv.id) {           
            np.is_favorite = true
          }
        })
        watchlists?.forEach(wl => {
          if (np.id === wl.id) {           
            np.is_watchlist = true
          }
        })
        return np
      })
    }

    return searchRes
  }, [favoritedMovie.data?.results, searchResults.data?.results, watchlistMovie.data?.results])


  useEffect(() => {
    if (searchParams.get('q')) {
      searchResults.fetchData()
    }
  }, [searchParams])

  return (
    <div className="container" >
      <section className="my-10" >
        <h3 className="mb-6 text-xl text-white" >Search for "{searchParams.get('q')}"</h3>
        {searchResults.isLoading ? (
          <div className="flex gap-6">
            {Array(6).fill(0).map((_, key) => (
              <Skeleton className="w-[200px] h-[300px]" key={key} />
            ))}
          </div>
        ) : searchResults.error ? (
          <div className="text-white">Sorry, something went wrong</div>
        ) : searchResultsCvt && (
          <MovieList movies={searchResultsCvt} withFavorite withWatchlist />
        )}
      </section>
    </div>
  )
}

export default SearchPage
