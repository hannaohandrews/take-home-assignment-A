import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Box, Typography, Paper } from '@mui/material'
import useFormDataApi from '../hooks/useFormDataApi'
import GenerateTableColumns from './GenerateTableColumns'
import logoUrl from '../assets/vial-logo.svg'
import CreateQueryModal from './CreateQueryModal'
import useQueriesApi from '../hooks/useQueriesApi'

export const FormDataComponent = () => {
  const [formData, loading, refetch] = useFormDataApi()
  const [openModal, setOpenModal] = useState(false)
  const [selectedRow, setSelectedRow] = useState<any>(null)
  const { createQuery } = useQueriesApi()

  const handleCloseModal = () => {
    setOpenModal(false)
    setSelectedRow(null)
  }

  const handleCreateQuery = async (formData: {
    title: string
    description: string
    formDataId: string
  }) => {
    await createQuery(formData)
    refetch()
    handleCloseModal()
  }

  const columns = GenerateTableColumns({
    onCreateQuery: (rowData: any) => {
      setSelectedRow(rowData)
      setOpenModal(true)
    },
  })

  const rows = formData?.map((data, index) => ({
    id: index + 1,
    question: data.question,
    answer: data.answer,
    formDataId: data.id,
    queries: data.queries || null,
  }))

  return (
    <Box sx={{ padding: 4 }}>
      <img src={logoUrl} alt="Vial Logo" />
      <Typography
        variant="h4"
        sx={{
          fontSize: '45px',
          fontWeight: 600,
          marginTop: 2,
          marginBottom: 2,
          lineHeight: '1.36em',
          color: '#454754',
        }}
      >
        Form Data
      </Typography>
      <Paper
        sx={{ height: '100%', width: '100%', boxShadow: 3, borderRadius: 3 }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10]}
          loading={loading}
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              color: 'black',
              fontWeight: '900',
              backgroundColor: '#1976d2',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontSize: '16px',
              fontWeight: 'bold',
              color: 'black',
            },
            '& .MuiDataGrid-cell': {
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
              whiteSpace: 'normal',
              padding: '8px 16px ',
              borderBottom: '1px solid #ddd',
            },
            '& .MuiDataGrid-root': {
              fontFamily: '"Poppins", sans-serif',
            },
            '& .MuiDataGrid-columnSeparator': {
              visibility: 'hidden',
            },
          }}
        />
      </Paper>
      {openModal && (
        <CreateQueryModal
          open={openModal}
          onClose={handleCloseModal}
          onSubmit={handleCreateQuery}
          rowData={selectedRow}
        />
      )}
    </Box>
  )
}
