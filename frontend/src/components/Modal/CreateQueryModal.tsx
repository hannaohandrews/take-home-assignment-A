import React, { useState } from 'react'
import { Box, Modal, TextField, Button, Typography } from '@mui/material'

interface CreateQueryModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (formData: {
    title: string
    description: string
    formDataId: string
  }) => void
  rowData: any
}

const CreateQueryModal: React.FC<CreateQueryModalProps> = ({
  open,
  onClose,
  onSubmit,
  rowData,
}) => {
  const [description, setDescription] = useState('')
  const title = rowData?.question

  const handleSubmit = () => {
    onSubmit({
      title: title || '',
      description,
      formDataId: rowData?.formDataId || '',
    })
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
          Create a Query: {title}
        </Typography>

        <TextField
          fullWidth
          label="Description"
          multiline
          rows={4}
          value={description}
          onChange={e => setDescription(e.target.value)}
          variant="outlined"
          sx={{
            mb: 3,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
            '& .MuiInputLabel-root': {
              fontWeight: 500,
            },
          }}
          autoFocus
        />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
          <Button
            onClick={onClose}
            color="error"
            variant="outlined"
            sx={{
              flex: 1,
              fontWeight: 600,
              borderRadius: 2,
              padding: '8px 16px',
            }}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            variant="contained"
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
            Create
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default CreateQueryModal
