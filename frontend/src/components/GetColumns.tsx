import React from 'react'
import { GridColDef } from '@mui/x-data-grid'
import TypographyCell from './TypographyCell'
import { Typography } from '@mui/material'

const getColumns = (): GridColDef[] => [
  {
    field: 'question',
    headerName: 'Question',
    minWidth: 200,
    flex: 1,
    renderCell: params => <TypographyCell value={params.value} />,
  },
  {
    field: 'answer',
    headerName: 'Answer',
    minWidth: 200,
    flex: 1,
    renderCell: params => <TypographyCell value={params.value} />,
  },
  {
    field: 'queries',
    headerName: 'Queries',
    minWidth: 150,
    renderCell: params => (
      <Typography variant="body2" color="textSecondary">
        {params.value ? 'OPEN' : 'RESOLVED'}
      </Typography>
    ),
  },
]

export default getColumns
