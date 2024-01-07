import { useMemo } from 'react';

import { MovieList } from '../components/MovieList';
import { Skeleton } from '../components/Skeleton';
import useQuery, { ListPagination } from '../lib/use-query';
import { IMovie } from '../types/movie';

function FavoritePage() {
  const favoritedMovie = useQuery<ListPagination<IMovie[]>>('/account/20896063/favorite/movies')

  const favorites = useMemo(() => {
    const temp = favoritedMovie.data?.results
    if (temp && temp.length > 0) {
      temp.forEach(fv => {
        fv.is_favorite = true
      })
    }
    return temp
  }, [favoritedMovie.data?.results])

  return (
    <div className="container">
      <section className="my-10">
        <h1 className="mb-6 text-white">Your Favorite Movies</h1>
        {favoritedMovie.isLoading ? (
          <div className="flex gap-6">
            {Array(6).fill(0).map((_, key) => (
              <Skeleton className="w-[200px] h-[300px]" key={key} />
            ))}
          </div>
        ) : favoritedMovie.error ? (
          <div className="text-white">Sorry, something went wrong</div>
        ) : favorites && (
          <MovieList movies={favorites} withFavorite={true} withWatchlist={false} />
        )}
      </section>
    </div>
  );
}

export default FavoritePage
