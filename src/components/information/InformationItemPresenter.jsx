import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@material-ui/core'

export const InformationItemPresenter = ({children, description, width = 60}) => {
  return (
    <Box display="flex">
      <Box minWidth={60} maxWidth={120} width={width} height={40}>
        {children}
      </Box>
      <Box flexGrow={1} marginLeft={1}>
        <Typography variant="body2" >
          {description}
        </Typography>
      </Box>
    </Box>
  )
}

InformationItemPresenter.propTypes = {
  children: PropTypes.node,
  description: PropTypes.string,
  width: PropTypes.number
}