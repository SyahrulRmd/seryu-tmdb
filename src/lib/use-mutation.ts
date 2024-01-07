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

const useMutation = <T>(endpoint: string, method: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<number>()
  const [data, setData] = useState<T>()

  const mutate = (body: any) => {
    setIsLoading(true)

    fetch(import.meta.env.VITE_BASE_URL + endpoint, {
      method,
      body: body ? JSON.stringify(body) : null,
      headers: {
        'Accept': 'application/json',
        'content-type': 'application/json',
        Authorization: 'Bearer ' + import.meta.env.VITE_ACCESS_TOKEN
      }
    })
      .then(response => {
        if (response.status === 201) {
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

  return {
    data, error, isLoading, mutate
  }
}

export default useMutation
