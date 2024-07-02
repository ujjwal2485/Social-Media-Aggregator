# <http://loonaverse.co>

WIP doesn't exist at that URL again yet

![screenshot](/screenshot.png?raw=true)

The source for [Loonaverse](http://loonaverse.co), a Loona-related social post
aggregator.

The server is Koa, client is React. The bundle is checked in because I deploy
this manually on a little VPS right now.

If you want to fork this to work with non-Loona tags, all you need to do is
change `tags.js` and add a `config.js` in the root:

```javascript
module.exports = {
  // register an app at https://www.tumblr.com/settings/apps
  tumblr: {
    consumer_key: 'CONSUMER_KEY',
    consumer_secret: 'CONSUMER_SECRET'
  },
  // register an app at https://apps.twitter.com/
  twitter: {
    consumer_key: 'CONSUMER_KEY',
    consumer_secret: 'CONSUMER_SECRET',
    access_token_key: 'ACCESS_TOKEN_KEY',
    access_token_secret: 'ACCESS_TOKEN_SECRET'
  },
  maxPosts: 1000 // max posts to keep in cache
}
```

License: [MIT](./LICENSE.md)
