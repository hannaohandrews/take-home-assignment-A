import { useState, useEffect, useCallback } from 'react'
import api from '../services/api'

interface Query {
  id: string
  title: string
  description?: string
  status: 'OPEN' | 'RESOLVED'
}

interface FormData {
  id: number
  question: string
  answer: string
  queries: Query[]
}

const useFormDataApi = (): [FormData[], boolean, () => void] => {
  const [formData, setFormData] = useState<FormData[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const response = await api.get('/form-data')
      setFormData(response.data.data.formData)
    } catch (err) {
      console.error('Error fetching form data', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const refetch = () => {
    fetchData()
  }

  return [formData, loading, refetch]
}

export default useFormDataApi
