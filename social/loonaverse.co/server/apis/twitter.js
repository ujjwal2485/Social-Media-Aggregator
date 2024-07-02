const { twitter: twitterConfig } = require('../../config')
const Twitter = require('twitter')

const client = new Twitter(twitterConfig)

module.exports = client
