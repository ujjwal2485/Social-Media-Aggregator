import React from 'react'
import styled from 'react-emotion'
import { string } from 'prop-types'

const Article = styled('article')({
  ':hover,:active,:focus': {
    boxShadow: '0 10px 20px 0 rgba(0, 0, 0, 0.15)',
    transform: 'translate(1px, -3px)'
  },
  margin: '8px',
  maxHeight: '400px',
  overflow: 'hidden',
  boxShadow: '2px 2px 4px #999',
  transition: '.2s ease-in-out transform, .2s ease-in-out box-shadow',
  display: 'flex',
  flexDirection: 'column',
  padding: '8px',
  maxWidth: '300px',
  '& img': {
    maxWidth: '100%;'
  }
})

const Small = styled('small')({
  textAlign: 'right',
  marginBottom: '8px'
})

const Card = ({
  author,
  authorUrl,
  content,
  platform,
  url
}) => (
  <Article>
    <Small>
      <a href={authorUrl} target="_blank">{platform}: {author}</a>
    </Small>
    <a href={url} target="_blank">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </a>
  </Article>
)

Card.propTypes = {
  author: string.isRequired,
  authorUrl: string.isRequired,
  content: string.isRequired,
  platform: string.isRequired,
  url: string.isRequired
}

export default Card
