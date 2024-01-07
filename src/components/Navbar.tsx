import * as Dialog from '@radix-ui/react-dialog';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import LogoutIcon from '../assets/logout.png';
import TmdbLogo from '../assets/tmdb-logo.png';
import { useAuth } from '../context/use-auth';
import useQuery from '../lib/use-query';
import { Skeleton } from './Skeleton';

export const Navbar = () => {
  const [searchParams] = useSearchParams()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [searchInput, setSearchInput] = useState<string>(searchParams.get('q') ?? '')
  const auth = useAuth()
  const navigate = useNavigate()

  const loginUrl = `https://www.themoviedb.org/authenticate`
  const newRequestToken = useQuery<{
    "success": boolean,
    "expires_at": string,
    "request_token": string
  }>('/authentication/token/new', true)

  const checkUserAuth = (event: React.MouseEvent<HTMLAnchorElement>, targetPath: string) => {
    event.preventDefault()

    if (!auth.sessionId) {
      setIsOpen(true)
      newRequestToken.fetchData()
    } else {
      navigate(targetPath)
    }
  }

  const search = (input: string) => {
    setSearchInput(input)

    if (input) {
      navigate(`/search?q=${input}`, { replace: true })
    } else {
      navigate('/')
    }
  }

  return (
    <header className="bg-primary">
      <div className='container flex items-center justify-between py-2 text-white'>
        <div>
          <Link to={'/'} onClick={() => setSearchInput('')}>
            <h1 className="font-black tracking-[0.2em]">CINEMA</h1>
          </Link>
        </div>
        <div className='flex items-center gap-10 xs:gap-5 sm:gap-5 md:gap-5 lg:gap-10'>
          <div className='relative'>
            <label htmlFor='search-movie' className='absolute right-2 top-2'>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </label>
            <input
              id='search-movie'
              placeholder='Search...'
              value={searchInput}
              onChange={(e) => search(e.target.value)}
              className='px-3 py-2 text-sm bg-transparent rounded-md outline-none ring-1 ring-white focus:ring-2 placeholder:text-white/80 placeholder:text-sm'
            />
          </div>
          <ul className="flex items-center gap-10 xs:gap-5 sm:gap-5 md:gap-5 lg:gap-10 md:flex xs:hidden">
            <li className="text-lg xs:text-base sm:text-base md:text-base lg:text-lg">
              <Link
                to={'/favorite'}
                onClick={(e) => {
                  checkUserAuth(e, '/favorite')
                  setSearchInput('')
                }}
              >
                Favorite
              </Link>
            </li>
            <li className="text-lg xs:text-base sm:text-base md:text-base lg:text-lg">
              <Link
                to={'/watchlist'}
                onClick={(e) => {
                  checkUserAuth(e, '/watchlist')
                  setSearchInput('')
                }}
              >
                Watchlist
              </Link>
            </li>
            {auth.sessionId && (
              <li>
                <div className='w-5 h-5 cursor-pointer' onClick={auth.logout}>
                  <img src={LogoutIcon} alt="Logout" />
                </div>
              </li>
            )}
          </ul>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger className='md:hidden'>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" x2="21" y1="6" y2="6" />
                <line x1="3" x2="21" y1="12" y2="12" />
                <line x1="3" x2="21" y1="18" y2="18" />
              </svg>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content side='bottom' sideOffset={8} className='min-w-[220px] bg-primary rounded-md p-[5px] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade"'>
                <DropdownMenu.Item className='px-2 py-2'>
                  <Link
                    to={'/favorite'}
                    onClick={(e) => {
                      checkUserAuth(e, '/favorite')
                      setSearchInput('')
                    }}
                    className='inline-block w-full text-white'
                  >
                    Favorite
                  </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item className='px-2 py-2'>
                  <Link
                    to={'/watchlist'}
                    onClick={(e) => {
                      checkUserAuth(e, '/watchlist')
                      setSearchInput('')
                    }}
                    className='inline-block w-full text-white'
                  >
                    Watchlist
                  </Link>
                </DropdownMenu.Item>
                {auth.sessionId && (
                  <DropdownMenu.Item className='px-2 py-2'>
                    <div className='w-5 h-5 cursor-pointer' onClick={auth.logout}>
                      <img src={LogoutIcon} alt="Logout" />
                    </div>
                  </DropdownMenu.Item>
                )}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>

        </div>

        <Dialog.Root open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
          <Dialog.Portal>
            <Dialog.Overlay className="bg-black/30 data-[state=open]:animate-overlayShow fixed inset-0" />
            <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] z-50 max-h-[85vh] w-[232px] h-[232px] max-w-[300px] translate-x-[-50%] translate-y-[-50%] rounded-3xl bg-white p-4 pt-6 focus:outline-none aspect-square grid place-items-center">
              {newRequestToken.isLoading ? (
                <Skeleton className='w-40 h-40' />
              ) : newRequestToken.error ? (
                <div className="text-white">Sorry, something went wrong</div>
              ) : newRequestToken.data && (
                <a href={loginUrl + `/${newRequestToken.data.request_token}?redirect_to=http://localhost:5173`} className='flex flex-col items-center gap-2 cursor-pointer'>
                  <img src={TmdbLogo} />
                  <p className='text-sm'>Login with TMDB</p>
                </a>
              )}
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  )
}
