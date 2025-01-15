import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Box, Typography, Paper } from '@mui/material'
import useFormDataApi from '../hooks/useFormDataApi'
import GenerateTableColumns from './GenerateTableColumns'
import logoUrl from '../assets/vial-logo.svg'
import CreateQueryModal from './Modal/CreateQueryModal'
import SavedQueryModal from './Modal/SavedQueryModal'
import useQueriesApi from '../hooks/useQueriesApi'

export const FormDataComponent = () => {
  const [formData, loading, refetch] = useFormDataApi()
  const [openModal, setOpenModal] = useState(false)
  const [selectedRow, setSelectedRow] = useState<any>(null)
  const [openStatusModal, setOpenStatusModal] = useState(false)
  const [queryDetails, setQueryDetails] = useState<any>(null)
  const { createQuery, updateStatusQuery } = useQueriesApi()

  const handleCloseModal = () => {
    setOpenModal(false)
    setSelectedRow(null)
  }

  const handleCloseStatusModal = () => {
    setOpenStatusModal(false)
    setQueryDetails(null)
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

  const handleResolveQuery = async (queryId: string) => {
    await updateStatusQuery(queryId, 'RESOLVED')
    refetch()
    handleCloseStatusModal()
  }

  const columns = GenerateTableColumns({
    onCreateQuery: (rowData: any) => {
      setSelectedRow(rowData)
      setOpenModal(true)
    },
    onOpenStatusRowData: (rowData: any) => {
      setQueryDetails({
        queryId: rowData.id,
        status: rowData.status,
        description: rowData.description,
        title: rowData.title,
        createdAt: rowData.createdAt,
        updatedAt: rowData.updatedAt,
      })
      setOpenStatusModal(true)
    },
  })

  const rows = formData?.map((data, index) => ({
    id: index + 1,
    question: data.question,
    answer: data.answer,
    formDataId: data.id,
    queries: data.queries || null,
    status: data.status,
    description: data.description,
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
        Query Management Application
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
            '& .MuiDataGrid-selectedRowCount': {
              display: 'none',
            },
          }}
        />
      </Paper>
      {openStatusModal && queryDetails && (
        <SavedQueryModal
          open={openStatusModal}
          onClose={handleCloseStatusModal}
          queryDetails={queryDetails}
          onUpdateStatus={handleResolveQuery}
        />
      )}
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
