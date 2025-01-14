import React, { useState, useEffect } from 'react'
import api from '../services/api'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Paper from '@mui/material/Paper'

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

export const FormDataComponent = () => {
  const [formData, setFormData] = useState<FormData[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/form-data')
        setFormData(response.data.data.formData)
      } catch (err) {
        console.error('Error fetching form data', err)
      }
    }
    fetchData()
  }, [])

  const columns: GridColDef[] = [
    { field: 'question', headerName: 'Question', width: 700 },
    { field: 'answer', headerName: 'Answer', width: 600 },
    {
      field: 'queries',
      headerName: 'Queries',
      width: 100,
    },
  ]

  const rows = formData.map((data, index) => ({
    id: index + 1,
    question: data.question,
    answer: data.answer,
  }))

  return (
    <div>
      <h1>Form Data</h1>
      <Paper sx={{ height: '100%', width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
        />
      </Paper>
    </div>
  )
}
