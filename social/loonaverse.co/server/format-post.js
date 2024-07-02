const { stripStyleTags } = require('./util')

const formatTwitter = (post) => {
  const date = new Date(post.created_at)
  const user = (post.user && post.user.screen_name) || ''
  const text = post.text + '\n' || ''
  const hasImgs = post.extended_entities && post.extended_entities.media && post.extended_entities.media.length
  const imgs = hasImgs
    ? post.extended_entities.media.map((photo) => `<img alt="${user}'s photo" src="${photo.media_url_https}">`).join('')
    : ''
  const url = post.url || post.id_str ? `https://twitter.com/statuses/${post.id_str}` : ''
  const c = text + imgs
  const content = stripStyleTags(c)
  const author = stripStyleTags(user)
  const authorUrl = `https://twitter.com/${author}/`
  return {
    __date: date,
    id: post.id,
    url,
    content,
    author,
    platform: post.__platform,
    authorUrl
  }
}

const formatTumblr = (post) => {
  const date = new Date(post.date)
  const contentRaw = post.trail && post.trail[0] && post.trail[0].content_raw
  const innerPost = contentRaw && contentRaw.split('[[MORE]]')[0] // 'Read More' link
  const user = post.blog_name
  const url = post.post_url
  const c = post.type === 'video'
    ? post.player && post.player[0] && post.player[0].embed_code
    : post.type === 'photo'
      ? post.photos.map((photo) => `<img alt="${user}'s photo" src="${photo.original_size.url}">`).join('')
      : innerPost
  const author = stripStyleTags(user)
  const content = stripStyleTags(c)
  const authorUrl = `https://${author}.tumblr.com/`
  return {
    __date: date,
    id: post.id,
    author,
    url,
    content,
    platform: post.__platform,
    authorUrl
  }
}

const format = (post) =>
  post.__platform === 'twitter' ? formatTwitter(post) : formatTumblr(post)

module.exports = format
