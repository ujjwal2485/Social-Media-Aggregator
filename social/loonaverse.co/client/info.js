import React from 'react'
import styled from 'react-emotion'

const youtubeLink = 'https://www.youtube.com/watch?v=pYbUP6qkU7M&list=PLtcTpq9htoKzrWNw3PR7hN9IQ0JuxrjQU&index=1'
const A = styled('a')({
  ':hover,:active,:focus': {
    textDecoration: 'underline'
  }
})
const Info = () => (
  <small>
    <span>
      Loonaverse is a
      {' '}<A href="https://github.com/zacanger/loonaverse.co" target="_blank">free software project</A>
      {' '}by <A href="https://zacanger.com" target="_blank">zac anger</A>.
      {' '}<A href={youtubeLink} target="_blank">click here to stream all official MVs with less than 1M views</A>.
    </span>
  </small>
)

export default Info
