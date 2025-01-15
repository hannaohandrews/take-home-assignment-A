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

  const updateStatusQuery = async (
    queryId: string,
    status: 'OPEN' | 'RESOLVED'
  ): Promise<Query | null> => {
    try {
      const response = await api.put(`/queries/${queryId}`, { status })
      return response.data
    } catch (err) {
      setError('Failed to update query status. Please try again.')
      console.error('Error updating query status:', err)
      return null
    }
  }

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
    updateStatusQuery,
    error,
  }
}

export default useQueriesApi
