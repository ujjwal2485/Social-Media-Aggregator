import React, { Component, Fragment } from 'react'
import styled from 'react-emotion'
import Card from './card'
import Info from './info'
import Checkbox from './checkbox'

const Logo = styled('img')({
  marginLeft: 'auto',
  marginRight: 'auto',
  maxWidth: '100%',
  height: 'auto',
  display: 'block'
})

const Toggles = styled('div')({
  paddingRight: '32px'
})

const Header = styled('header')({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  boxShadow: '1px 1px 2px #999',
  justifyContent: 'space-between',
  top: '0px',
  left: '0px',
  width: '100%',
  position: 'fixed',
  padding: '8px',
  background: 'white',
  zIndex: 3
})

const Section = styled('section')({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center'
})

const oneMinute = 60 * 1000
const platforms = [ 'twitter', 'tumblr' ]

class App extends Component {
  interval

  state = {
    posts: [],
    displaying: {
      twitter: true,
      tumblr: true
    }
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount () {
    this.updatePosts()
  }

  handleCheckboxChange = (e) => {
    const changing = e.target.value
    this.setState(({ displaying: prev }) => ({
      displaying: {
        ...prev,
        [changing]: !prev[changing]
      }
    }))
  }

  updatePosts = () => {
    window.fetch('/posts.json')
      .then((r) => r.json())
      .then((posts) => {
        this.setState({ posts })
      })
  }

  componentDidMount () {
    this.interval = setInterval(this.updatePosts, oneMinute)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  render () {
    const { posts, displaying } = this.state
    const ps = posts.filter((p) => displaying[p.platform])
    return (
      <Fragment>
        <Header>
          <Info />
          <Toggles>
            {platforms.map((p) =>
              <Checkbox
                key={p}
                platform={p}
                handleChange={this.handleCheckboxChange}
                checked={displaying[p]}
              />
            )}
          </Toggles>
        </Header>
        <main>
          <Section>
            {!!ps.length && ps.map((post) => <Card key={post.id} {...post} />)}
            {!ps.length && <Logo src="/logo.png" alt="Loona Logo" />}
          </Section>
        </main>
      </Fragment>
    )
  }
}

export default App
