import React from 'react'
import styled from 'react-emotion'
import { string, func, bool } from 'prop-types'

const Small = styled('small')({
  marginLeft: '8px',
  marginRight: '8px',
  userSelect: 'none'
})

const Label = styled('label')({
  cursor: 'pointer'
})

const Checkbox = ({ platform, handleChange, checked }) => (
  <Small>
    <Label htmlFor={platform}>
      <input id={platform} type="checkbox" value={platform} checked={checked} onChange={handleChange} />
      {platform}
    </Label>
  </Small>
)

Checkbox.propTypes = {
  platform: string.isRequired,
  handleChange: func.isRequired,
  checked: bool.isRequired
}

export default Checkbox
