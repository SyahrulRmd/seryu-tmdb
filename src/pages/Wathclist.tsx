import { useMemo } from 'react';

import { MovieList } from '../components/MovieList';
import { Skeleton } from '../components/Skeleton';
import useQuery, { ListPagination } from '../lib/use-query';
import { IMovie } from '../types/movie';

function WatchlistPage() {
  const watchlistMovie = useQuery<ListPagination<IMovie[]>>('/account/20896063/watchlist/movies')

  const watchlists = useMemo(() => {
    const temp = watchlistMovie.data?.results
    if (temp && temp.length > 0) {
      temp.forEach(fv => {
        fv.is_watchlist = true
      })
    }
    return temp
  }, [watchlistMovie.data?.results])

  return (
    <div className="container">
      <section className="my-10">
        <h1 className="mb-6 text-white">Your Favorite Movies</h1>
        {watchlistMovie.isLoading ? (
          <div className="flex gap-6">
            {Array(6).fill(0).map((_, key) => (
              <Skeleton className="w-[200px] h-[300px]" key={key} />
            ))}
          </div>
        ) : watchlistMovie.error ? (
          <div className="text-white">Sorry, something went wrong</div>
        ) : watchlists && (
          <MovieList movies={watchlists} withFavorite={false} withWatchlist={true} />
        )}
      </section>
    </div>
  );
}

export default WatchlistPage
