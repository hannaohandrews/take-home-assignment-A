import { useState } from 'react'
import api from '../services/api'

interface Query {
  id: string
  title: string
  description?: string
  status: 'OPEN' | 'RESOLVED'
  formDataId: string
}

const useQueriesApi = () => {
  const [error, setError] = useState<string | null>(null)

  const createQuery = async (payload: {
    title: string
    description: string
    formDataId: string
  }): Promise<Query> => {
    try {
      const response = await api.post('/queries', payload)
      return response.data
    } catch (err) {
      setError('Failed to create query. Please try again.')
      console.error('Error creating query', err)
      throw err
    }
  }

  return {
    createQuery,
    error,
  }
}

export default useQueriesApi
