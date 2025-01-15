import React from 'react'
import {
  Box,
  Modal,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material'
import useQueriesApi from '../../hooks/useQueriesApi'

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
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
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
          boxShadow: 24,
          borderRadius: 2,
          padding: 4,
          maxHeight: '80vh',
          overflowY: 'auto',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: 'text.primary',
            mb: 3,
          }}
        >
          Query: <span style={{ fontWeight: 400 }}>{title}</span>
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <strong>Status:</strong>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 500,
                      color:
                        status === 'RESOLVED'
                          ? '#155724'
                          : status === 'OPEN'
                          ? '#721c24'
                          : 'text.primary',
                      backgroundColor:
                        status === 'RESOLVED'
                          ? '#d4edda'
                          : status === 'OPEN'
                          ? '#f8d7da'
                          : 'transparent',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      display: 'inline-block',
                    }}
                  >
                    {status}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Description:</strong>
                </TableCell>
                <TableCell>{description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Created At:</strong>
                </TableCell>
                <TableCell>{new Date(createdAt).toLocaleString()}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Updated At:</strong>
                </TableCell>
                <TableCell>{new Date(updatedAt).toLocaleString()}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 4,
            gap: 2,
          }}
        >
          <Button
            onClick={onClose}
            variant="outlined"
            color="error"
            sx={{
              flex: 1,
              fontWeight: 600,
              borderRadius: 2,
              padding: '8px 16px',
            }}
          >
            CLOSE
          </Button>
          {status === 'OPEN' && (
            <Button
              variant="contained"
              onClick={handleResolve}
              sx={{
                flex: 1,
                fontWeight: 600,
                borderRadius: 2,
                padding: '8px 16px',
                backgroundColor: '#28a745',
                '&:hover': {
                  backgroundColor: '#218838',
                },
              }}
            >
              Resolve
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  )
}

export default SavedQueryModal
