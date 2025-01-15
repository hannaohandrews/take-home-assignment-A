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
      console.log('entered useQueriesApi')
      console.log(payload, 'payload')
      const response = await api.post('/queries', payload)
      console.log('do you get here?')
      console.log('response', response)
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
