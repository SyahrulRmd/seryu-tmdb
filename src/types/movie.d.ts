export interface IMovie {
  adult: false
  backdrop_path: string
  genre_ids: [878]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: false
  vote_average: number
  vote_count: number
  is_favorite: boolean
  is_watchlist: boolean
  runtime: number
  genres: { id: string, name: string }[]
  tagline: string
}
