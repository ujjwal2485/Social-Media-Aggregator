#!/usr/bin/env node

// This file is for internal Docker healthchecks.
// This is written in Node rather than using `curl`
// to avoid the extra dependency in prod images.

const http = require('http')

const opts = {
  host: 'localhost',
  port: 9000,
  timeout: 1000,
}

const request = http.request(opts, (res) => {
  process.exit(res.statusCode === 200 ? 0 : 1)
})

request.on('error', () => {
  process.exit(1)
})

request.end()
