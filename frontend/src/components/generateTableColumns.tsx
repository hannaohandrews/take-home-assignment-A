import React from 'react'
import { GridColDef } from '@mui/x-data-grid'
import TextDisplayCell from './TextDisplayCell'
import { Box, IconButton, Tooltip } from '@mui/material'
import { Add, CheckCircle, HelpOutline } from '@mui/icons-material'

interface GenerateTableColumnsProps {
  onCreateQuery: (rowData: any) => void
  onOpenStatusRowData: (rowData: any) => void
}

const GenerateTableColumns = ({
  onCreateQuery,
  onOpenStatusRowData,
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
        const { value: queries, row } = params
        const hasQuery = queries && queries.length > 0
        const query = hasQuery ? queries[0] : null
        const queryStatus = query?.status

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {!hasQuery ? (
              <Tooltip title="Create Query">
                <IconButton onClick={() => onCreateQuery(row)} color="primary">
                  <Add />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip
                title={
                  queryStatus === 'OPEN'
                    ? 'Query is OPEN'
                    : queryStatus === 'RESOLVED'
                    ? 'Query is RESOLVED'
                    : 'Unknown Query Status'
                }
              >
                <IconButton
                  color={queryStatus === 'OPEN' ? 'error' : 'success'}
                  onClick={() => onOpenStatusRowData(query)}
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
