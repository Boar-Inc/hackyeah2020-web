const express = require('express')
const consola = require('consola')
const {Nuxt, Builder} = require('nuxt')
const app = express()
// Import and Set Nuxt.js options
const config = require('./nuxt.config.js')
config.dev = false;

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const {host, port} = nuxt.options.server;

  await nuxt.ready()

  // Give nuxt middleware to express
  app.set('trust proxy', 1)
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start();
