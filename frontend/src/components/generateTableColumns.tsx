import React from 'react'
import { GridColDef } from '@mui/x-data-grid'
import TextDisplayCell from './TextDisplayCell'
import { Box, IconButton, Tooltip } from '@mui/material'
import { Add, CheckCircle, HelpOutline } from '@mui/icons-material'

interface GenerateTableColumnsProps {
  onCreateQuery: (rowData: any) => void
}

const GenerateTableColumns = ({
  onCreateQuery,
}: GenerateTableColumnsProps): GridColDef[] => {
  return [
    {
      field: 'question',
      headerName: 'Question',
      minWidth: 200,
      flex: 1,
      renderCell: params => <TextDisplayCell value={params.value} />,
    },
    {
      field: 'answer',
      headerName: 'Answer',
      minWidth: 200,
      flex: 1,
      renderCell: params => <TextDisplayCell value={params.value} />,
    },
    {
      field: 'queries',
      headerName: 'Queries',
      width: 150,
      renderCell: params => {
        const hasQuery = params.value && params.value.length > 0
        const queryStatus = hasQuery ? params.value[0].status : null

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {!hasQuery ? (
              <Tooltip title="Create Query">
                <IconButton
                  onClick={() => onCreateQuery(params.row)}
                  color="primary"
                >
                  <Add />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip
                title={
                  queryStatus === 'OPEN' ? 'Query is OPEN' : 'Query is RESOLVED'
                }
              >
                <IconButton
                  color={queryStatus === 'OPEN' ? 'error' : 'success'}
                >
                  {queryStatus === 'OPEN' ? <HelpOutline /> : <CheckCircle />}
                </IconButton>
              </Tooltip>
            )}
          </Box>
        )
      },
    },
  ]
}

export default GenerateTableColumns
