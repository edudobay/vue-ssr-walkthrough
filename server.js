const path = require('path')
const express = require('express')
const server = express()

const createApp = require('./app')
const { createRenderer } = require('vue-server-renderer')

const clientManifest = require('./dist/vue-ssr-client-manifest.json')

const template = require('fs').readFileSync('./index.template.html', 'utf-8')
const serialize = require('serialize-javascript')

const renderer = createRenderer({
  clientManifest,
  template,
  inject: false
})

server.use('/dist', express.static(path.join(__dirname, 'dist')))

server.get('*', (req, res) => {
    const context = { url: req.url }
    const app = createApp(context)
    const templateContext = { $state: serialize(context) }

    renderer.renderToString(app, templateContext, (err, html) => {
        if (err) {
            console.error(err)
            res.status(500).end('Internal Server Error')
            return
        }
        res.setHeader('Content-Type', 'text/html;charset=UTF-8')
        res.end(html)
    })
})

server.listen(8080)
