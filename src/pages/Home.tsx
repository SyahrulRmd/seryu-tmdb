import { useMemo } from 'react';

import { MovieList, MovieListHorizontal } from '../components/MovieList';
import { Skeleton } from '../components/Skeleton';
import useQuery, { ListPagination } from '../lib/use-query';
import { IMovie } from '../types/movie';

function HomePage() {
  const nowPlaying = useQuery<ListPagination<IMovie[]>>('/movie/now_playing')
  const topRated = useQuery<ListPagination<IMovie[]>>('/movie/top_rated')
  const favoritedMovie = useQuery<ListPagination<IMovie[]>>('/account/20896063/favorite/movies')
  const watchlistMovie = useQuery<ListPagination<IMovie[]>>('/account/20896063/watchlist/movies')

  const nowPlayingCvt = useMemo(() => {
    const favorites = favoritedMovie.data?.results
    const nowPlayings = nowPlaying.data?.results
    const watchlists = watchlistMovie.data?.results

    if (favorites && favorites?.length > 0 && nowPlayings && nowPlayings.length > 0) {
      nowPlayings.forEach(np => {
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

    return nowPlayings
  }, [favoritedMovie.data?.results, nowPlaying.data?.results, watchlistMovie.data?.results])

  const topRatedCvt = useMemo(() => {
    const favorites = favoritedMovie.data?.results
    const topRateds = topRated.data?.results
    const watchlists = watchlistMovie.data?.results

    if (favorites && favorites?.length > 0 && topRateds && topRateds.length > 0) {
      topRateds.forEach(np => {
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
      })
    }

    return topRateds
  }, [favoritedMovie.data?.results, topRated.data?.results, watchlistMovie.data?.results])

  return (
    <div>
      <div className="container">
        <section className="my-10">
          <h1 className="mb-6 text-white">Now Playing</h1>
          {nowPlaying.isLoading ? (
            <div className="flex gap-6">
              {Array(6).fill(0).map((_, key) => (
                <Skeleton className="w-[200px] h-[300px]" key={key} />
              ))}
            </div>
          ) : nowPlaying.error ? (
            <div className="text-white">Sorry, something went wrong</div>
          ) : nowPlayingCvt && (
            <MovieListHorizontal movies={nowPlayingCvt} />
          )}
        </section>
        <section className="pt-10 my-10">
          <h1 className="mb-6 text-white">Top Rated</h1>
          {topRated.isLoading ? (
            <div className="flex gap-6">
              {Array(6).fill(0).map((_, key) => (
                <Skeleton className="w-[200px] h-[300px]" key={key} />
              ))}
            </div>
          ) : topRated.error ? (
            <div className="text-white">Sorry, something went wrong</div>
          ) : topRatedCvt && (
            <MovieList movies={topRatedCvt} withFavorite withWatchlist />
          )}
        </section>
        <div className="h-20" />
      </div>
    </div>
  )
}

export default HomePage
