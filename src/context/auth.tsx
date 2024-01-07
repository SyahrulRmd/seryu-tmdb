import { createContext, useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { Outlet, useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { Navbar } from '../components/Navbar';
import useQuery from '../lib/use-query';
import useMutation from '../lib/use-mutation';

export const AuthContext = createContext<{
  sessionId: string,
  login: (sessionId: string) => void,
  logout: () => void
}>({
  sessionId: '',
  login: () => { },
  logout: () => {},
})

const AuthProvider = () => {
  const cookies = new Cookies()
  const location = useLocation()
  const [searchParams] = useSearchParams()

  const [sessionId, setSessionId] = useState<string>(cookies.get('session_id') ?? '')
  const navigate = useNavigate()

  const deleteSession = useMutation<{ success: boolean }>('/authentication/session', 'DELETE')

  const login = (sessionId: string) => {
    cookies.set('session_id', sessionId)
    setSessionId(sessionId)
  }

  const logout = () => {
    deleteSession.mutate({ session_id: sessionId })
    cookies.remove('session_id')
    setSessionId('')

    if (location.pathname === '/favorite' || location.pathname === '/watchlist') {
      navigate('/')
    }
  }

  useEffect(() => {
    if (!sessionId && (location.pathname === '/favorite' || location.pathname === '/watchlist')) {
      return navigate('/')
    }
  }, [location.pathname, navigate, sessionId])

  const getSession = useQuery<{ session_id: string }>('/authentication/session/new', true)

  useEffect(() => {
    const requestToken = searchParams.get('request_token')
    const approved = searchParams.get('approved')

    if (requestToken && approved) {
      getSession.fetchData(`?api_key=${import.meta.env.VITE_API_KEY}&request_token=${requestToken}`)
    }
  }, [searchParams])

  useEffect(() => {
    if (getSession.data) {
      login(getSession.data.session_id)
    }
  }, [getSession.data])

  return (
    <AuthContext.Provider value={{ sessionId, login, logout }}>
      <Navbar />
      <Outlet />
    </AuthContext.Provider>
  )
}

export default AuthProvider
