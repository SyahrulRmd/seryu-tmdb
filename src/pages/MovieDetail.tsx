import { useParams } from 'react-router-dom';

import { MovieListHorizontal } from '../components/MovieList';
import { Skeleton } from '../components/Skeleton';
import { TooltipContent, TooltipProvider, TooltipTrigger } from '../components/Tooltip';
import useQuery, { ListPagination } from '../lib/use-query';
import { IMovie } from '../types/movie';
import useCollection from '../lib/use-collection';
import { useMemo } from 'react';

function MovieDetailPage() {
  const param = useParams()
  const movieDetail = useQuery<IMovie>(`/movie/${param.movieId}`)
  const movieRecommendation = useQuery<ListPagination<IMovie[]>>(`/movie/${param.movieId}/recommendations`)
  const favoritedMovie = useQuery<ListPagination<IMovie[]>>('/account/20896063/favorite/movies')
  const watchlistMovie = useQuery<ListPagination<IMovie[]>>('/account/20896063/watchlist/movies')
  const { addFavorite, addWatchlist } = useCollection(movieDetail.data!)

  const movieDetailCvt = useMemo(() => {
    const details = movieDetail.data
    const favorites = favoritedMovie.data?.results
    const watchlists = watchlistMovie.data?.results

    if (favorites && favorites?.length > 0 && details) {
      favorites.forEach(fv => {
        if (details.id === fv.id) {
          details.is_favorite = true
        }
      })
      watchlists?.forEach(wl => {
        if (details.id === wl.id) {
          details.is_watchlist = true
        }
      })
    }

    return details
  }, [favoritedMovie.data?.results, movieDetail.data, watchlistMovie.data?.results])

  return (
    <div>
      <section className="">
        {!movieDetail || movieDetail.isLoading ? (
          <div className="container flex gap-4 py-10">
            <Skeleton className="w-[200px] aspect-[2/3]" />
            <div className="flex-grow">
              <Skeleton className="w-1/4 h-10 mb-3" />
              <Skeleton className="w-3/4 h-5 mb-3" />
              <Skeleton className="w-3/4 h-5" />
            </div>
          </div>
        ) : movieDetail.data && (
          <div className="relative">
            <div className="absolute top-0 max-h-[400px] overflow-hidden flex items-center shadow-[inset_0_0_0_400px_hsla(0,0%,0%,0.4)]">
              <img
                src={'https://image.tmdb.org/t/p/original' + movieDetail.data?.backdrop_path}
                alt="Backdrop"
                className="object-cover w-full -z-[10]"
              />
            </div>
            <div className="container relative z-10 flex w-full h-full gap-4 py-10 text-white">
              <img
                src={'https://image.tmdb.org/t/p/original' + movieDetail.data?.poster_path}
                className="object-cover rounded-md aspect-[2/3] w-[200px]"
                alt="Poster"
              />
              <div>
                <h2 className="font-bold text-[32px]">{movieDetail.data?.title} <span className="font-normal">({movieDetail.data?.release_date.split('-')[0]})</span></h2>
                <ul className="flex gap-6">
                  <li>{movieDetail.data?.release_date}</li>
                  <li className="list-disc">
                    {movieDetail.data.genres.map((genre, key) => (genre.name + `${key+1 < movieDetail.data!.genres.length ? ', ' : ''}`))}
                  </li>
                  <li className="list-disc">{movieDetail.data.runtime}</li>
                </ul>
                <div className="flex items-center gap-2 mt-4">
                  <div>{movieDetail.data.vote_average.toPrecision(2)} <span className="text-xs w-fit">User Score</span></div>
                  <TooltipProvider>
                    <TooltipTrigger asChild>
                      <button className="p-1" onClick={addWatchlist}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={movieDetail.data.is_watchlist ? 'white' : 'none'} stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                        </svg>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {movieDetail.data.is_watchlist ? 'Remove from ' : 'Add to '} Watchlist
                    </TooltipContent>
                  </TooltipProvider>
                  <TooltipProvider>
                    <TooltipTrigger asChild>
                      <button className="p-1" onClick={addFavorite}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={movieDetailCvt?.is_favorite ? 'white' : 'none'} stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        </svg>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {movieDetailCvt?.is_favorite ? 'Remove from ' : 'Add to '} Favorite
                    </TooltipContent>
                  </TooltipProvider>
                </div>
                <div className="mt-4">
                  <p className="mb-2 text-sm italic">{movieDetail.data.tagline}</p>
                  <h4 className="mb-2 text-sm font-bold">Overview</h4>
                  <p className="text-sm">{movieDetail.data.overview}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      <section className="container my-20">
        <h3 className="mb-6 text-lg font-bold text-white">Recommendations</h3>
        {movieRecommendation.isLoading ? (
          <div className="flex gap-6">
            {Array(6).fill(0).map((_, key) => (
              <Skeleton className="w-[200px] h-[300px]" key={key} />
            ))}
          </div>
        ) : movieRecommendation.error ? (
          <div className="text-white">Sorry, something went wrong</div>
        ) : movieRecommendation.data?.results && (
          <MovieListHorizontal movies={movieRecommendation.data?.results} />
        )}
      </section>
    </div>
  )
}

export default MovieDetailPage
