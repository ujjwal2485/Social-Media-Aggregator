/* eslint-disable camelcase */

const flatten = require('zeelib/lib/flatten')
const oneMinute = 1000 * 60
const fiveMinutes = oneMinute * 5
const Cache = require('./cache')
const getTumblr = require('./apis/tumblr')

const { sortByDate } = require('./util')
const getTwitter = require('./apis/twitter')
const tags = require('./tags')
const formatPost = require('./format-post')

const addPlatform = (platform) => (posts) => posts.map((p) => ({ __platform: platform, ...p }))
const addTwitter = addPlatform('twitter')
const addTumblr = addPlatform('tumblr')

const noRetweets = (posts) => posts.filter((post) => !post.in_reply_to_status_id)

const _tumblrSeed = require('./tumblr-seed.json')
const _twitterSeed = require('./twitter-seed.json')
const tumblrSeed = addTumblr(_tumblrSeed).map(formatPost)
const twitterSeed = addTwitter(noRetweets(_twitterSeed)).map(formatPost)

const cache = new Cache([ ...tumblrSeed, ...twitterSeed ])

const combinePosts = (...caches) => {
  const posts = []
  caches.forEach((cache) => {
    if (cache && cache.length) posts.push(...cache)
  })
  return sortByDate(posts)
}

const buildEverything = (...caches) => combinePosts(...caches)

const buildTwitters = async () => {
  try {
    // const responses = await Promise.all(tags.twitter.map((tag) => getTwitter.get('search/tweets', {
    const responses = await Promise.all([ 'loona' ].map((tag) => getTwitter.get('search/tweets', {
      q: tag,
      result_type: 'recent',
      count: 100
    })))
    const newTwitters = addTwitter(noRetweets(flatten(responses.map(({ statuses }) => statuses)))).map(formatPost)
    cache.add(newTwitters)
  } catch (err) {
    console.log('Error refreshing Twitter')
    console.trace(err)
  }
}

const buildTumblrs = async () => {
  try {
    const responses = await Promise.all(tags.tumblr.map(getTumblr))
    const newTumblrs = addTumblr(flatten(responses)).map(formatPost)
    cache.add(newTumblrs)
  } catch (err) {
    console.log('Error refreshing Tumblr')
    console.trace(err)
  }
}

buildTumblrs()
buildTwitters()
setInterval(buildTumblrs, fiveMinutes * 2)
setInterval(buildTwitters, oneMinute)

module.exports = async () => buildEverything(cache.posts)
