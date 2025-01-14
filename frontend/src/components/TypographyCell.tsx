import React from 'react'
import { Typography } from '@mui/material'

interface TypographyCellProps {
  value: string
}

const TypographyCell: React.FC<TypographyCellProps> = ({ value }) => (
  <Typography
    variant="body2"
    sx={{
      wordWrap: 'break-word',
      overflowWrap: 'break-word',
      whiteSpace: 'normal',
    }}
  >
    {value}
  </Typography>
)

export default TypographyCell
