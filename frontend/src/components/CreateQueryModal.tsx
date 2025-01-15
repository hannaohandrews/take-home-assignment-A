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

  const handleSubmit = () => {
    onSubmit({
      title: rowData?.question || '',
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
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
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
        <Typography variant="h6" mb={2}>
          Create a Query
        </Typography>
        <TextField
          fullWidth
          label="Description"
          multiline
          rows={4}
          value={description}
          onChange={e => setDescription(e.target.value)}
          variant="outlined"
          sx={{ mb: 2 }}
          autoFocus
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained">
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default CreateQueryModal
