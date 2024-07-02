const { tumblr: tumblrConfig } = require('../../config')
const tumblr = require('tumblr.js')

const client = tumblr.createClient(tumblrConfig)
const promisify = require('zeelib/lib/promisify')

module.exports = promisify(client.taggedPosts)
