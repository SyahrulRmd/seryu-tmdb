import { useEffect, useState } from "react";

export type GetApiType = typeof useQuery
export type ListPagination<T> = {
  dates: {
    maximum: string
    minimum: string
  }
  results: T
  page: number
  total_pages: number
  total_results: number
}

const useQuery = <T>(endpoint: string, useLater?: boolean) => {
  const [isLoading, setIsLoading] = useState<boolean>(useLater ? false : true)
  const [error, setError] = useState<number>()
  const [data, setData] = useState<T>()

  const fetchData = (querySearchParam: string = '') => {
    setIsLoading(true)
    const apiUrl = endpoint + querySearchParam
  
    fetch(import.meta.env.VITE_BASE_URL + apiUrl, {
      headers: {
        'Accept': 'application/json',
        Authorization: 'Bearer ' + import.meta.env.VITE_ACCESS_TOKEN
      }
    })
      .then(response => {
        if (response.status === 200) {
          return response.json()
        }
        throw response.status
      })
      .then(data => setData(data))
      .catch(error => setError(error))
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    if (!useLater) {
      fetchData()
    }
  }, [useLater, endpoint])

  return {
    data, error, isLoading, fetchData
  }
}

export default useQuery;
