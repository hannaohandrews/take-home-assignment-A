import React from 'react'
import { Box, Modal, Button, Typography } from '@mui/material'
import useQueriesApi from '../hooks/useQueriesApi'

interface SavedQueryModalProps {
  open: boolean
  onClose: () => void
  queryDetails: {
    queryId: string
    status: string
    description: string
    title: string
    createdAt: string
    updatedAt: string
  }
  onUpdateStatus: (queryId: string) => void
}

const SavedQueryModal = ({
  open,
  onClose,
  queryDetails,
  onUpdateStatus,
}: SavedQueryModalProps) => {
  const { queryId, status, title, description, createdAt, updatedAt } =
    queryDetails
  const { updateStatusQuery } = useQueriesApi()

  const handleResolve = async () => {
    try {
      await updateStatusQuery(queryDetails.queryId, 'RESOLVED')
      onUpdateStatus(queryId)
      onClose()
    } catch (error) {
      console.error('Failed to resolve query:', error)
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 700,
          bgcolor: 'background.paper',
          boxShadow: 2,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Box sx={{ marginTop: 2 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, color: 'text.primary' }}
          >
            Query: <span style={{ fontWeight: 400 }}>{title}</span>
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 2, fontWeight: 500 }}>
            <strong>Status: </strong> {status}
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 2, fontWeight: 500 }}>
            <strong>Description:</strong> {description}
          </Typography>

          <Typography
            variant="body2"
            sx={{ marginTop: 2, color: 'text.secondary' }}
          >
            <strong>Created at:</strong> {new Date(createdAt).toLocaleString()}
          </Typography>

          <Typography
            variant="body2"
            sx={{ marginTop: 1, color: 'text.secondary' }}
          >
            <strong>Updated at:</strong> {new Date(updatedAt).toLocaleString()}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 3,
          }}
        >
          <Button onClick={onClose} color="warning">
            CLOSE
          </Button>
          {status === 'OPEN' ? (
            <Button variant="contained" onClick={handleResolve}>
              Resolve
            </Button>
          ) : (
            ''
          )}
        </Box>
      </Box>
    </Modal>
  )
}

export default SavedQueryModal
