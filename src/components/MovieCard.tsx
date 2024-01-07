import { cn } from '../lib/cn';
import useCollection from '../lib/use-collection';
import { IMovie } from '../types/movie';
import { TooltipContent, TooltipProvider, TooltipTrigger } from './Tooltip';
import { Link } from 'react-router-dom'

export const MovieCard = ({ movie, className, withFavorite, withWatchlist }: {
  movie: IMovie
  withFavorite: boolean
  withWatchlist: boolean
  className?: string
}) => {
  const { addFavorite, addWatchlist } = useCollection(movie)

  return (
    <Link to={`/movie/${movie.id}`} className={cn("w-[200px] rounded-lg overflow-hidden select-none flex-grow", className)}>
      <div className="relative">
        <img
          src={'https://image.tmdb.org/t/p/original' + movie.poster_path}
          alt="Movie Poster"
          className="object-cover aspect-[2/3]"
        />
        <div className="absolute flex gap-2 bottom-3 right-3">
          {withWatchlist && (
            <TooltipProvider>
              <TooltipTrigger asChild>
                <button className="p-1" onClick={addWatchlist}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={movie.is_watchlist ? 'white' : 'none'} stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                  </svg>
                </button>
              </TooltipTrigger>
              <TooltipContent>
                {movie.is_watchlist ? 'Remove from ' : 'Add to '} Watchlist
              </TooltipContent>
            </TooltipProvider>
          )}
          {withFavorite && (
            <TooltipProvider>
              <TooltipTrigger asChild>
                <button className="p-1" onClick={addFavorite}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={movie.is_favorite ? 'white' : 'none'} stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </button>
              </TooltipTrigger>
              <TooltipContent>
              {movie.is_favorite ? 'Remove from ' : 'Add to '} Favorite
              </TooltipContent>
            </TooltipProvider>
          )}
        </div>
      </div>
      <div className="px-4 py-3 bg-[hsl(198_57%_5%)]">
        <h2 className="overflow-hidden text-lg text-secondary text-ellipsis text-nowrap">{movie.title}</h2> {/* TODO: make 1 line */}
        <p className="text-sm text-secondary/50">{movie.release_date}</p>
      </div>
    </Link>
  )
}
