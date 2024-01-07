import { IMovie } from "../types/movie"
import { MovieCard } from "./MovieCard"


export const MovieListHorizontal = ({ movies }: { movies: IMovie[] }) => {
  if (!!movies && movies.length === 0) {
    return (
      <div>There is no Movies at the moment</div>
    )
  }

  return (
    <div className="flex items-start gap-4 pb-6 overflow-x-scroll">
      {movies.map((movie, key) => (
        <MovieCard movie={movie} key={key} withFavorite withWatchlist className="min-w-[200px]" />
      ))}
    </div>
  )
}

export const MovieList = ({ movies, withFavorite, withWatchlist }: {
  movies: IMovie[],
  withFavorite: boolean,
  withWatchlist: boolean,
}) => {
  if (!!movies && movies.length === 0) {
    return (
      <div>There is no Movies at the moment</div>
    )
  }

  return (
    <div className="grid grid-cols-12 gap-x-4 gap-y-14">
      {movies.map((movie, key) => (
        <MovieCard movie={movie} key={key} className="col-span-2 xs:col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2" withFavorite={withFavorite} withWatchlist={withWatchlist} />
      ))}
    </div>
  )
}
