const { resolve } = require('path')
const Koa = require('koa')
const favicon = require('koa-favicon')
const serve = require('koa-simple-static')
const lowercase = require('koa-lowercase')
const Router = require('koa-router')
const cacheControl = require('koa-ctx-cache-control')
const helmet = require('koa-helmet')
const compress = require('koa-helmet')

const buildResponse = require('./build-response')
const router = new Router()
const oneMinute = 1000 * 60
const app = module.exports = new Koa()

app.port = process.env.PORT || 9000

router.get('/posts.json', async (ctx) => {
  ctx.status = 200
  ctx.type = 'application/json'
  ctx.cacheControl(oneMinute)
  const body = await buildResponse()
  ctx.body = body
})

app.use(favicon(resolve(__dirname, '..', 'favicon.ico')))
app.use(helmet())
app.use(compress())
cacheControl(app)
app.use(lowercase)
app.use(serve({
  dir: resolve(__dirname, '..', 'public'),
  maxAge: (oneMinute * 5) / 1000
}))
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(app.port, () => {
  console.log(`Loonaverse.co listening on ${app.port}`)
})
