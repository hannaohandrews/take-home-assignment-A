import { useState, useEffect } from 'react'
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
  query: Query[]
}

const useFormDataApi = (): [FormData[], boolean] => {
  const [formData, setFormData] = useState<FormData[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await api.get('/form-data')
        setFormData(response.data.data.formData)
      } catch (err) {
        console.error('Error fetching form data', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return [formData, loading]
}

export default useFormDataApi
