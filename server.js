const path = require('path')
const express = require('express')
const server = express()

const { createBundleRenderer } = require('vue-server-renderer')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')
const serverBundle = require(path.join(__dirname, 'dist/vue-ssr-server-bundle.json'))
const template = require('fs').readFileSync('./index.template.html', 'utf-8')

const renderer = createBundleRenderer(serverBundle, {
  clientManifest,
  template,
  inject: false,
  runInNewContext: false
})

server.use('/dist', express.static(path.join(__dirname, 'dist')))

server.get('*', (req, res) => {
    const context = { url: req.url, query: {...req.query} }
    context.$state = {...context}

    renderer.renderToString(context, (err, html) => {
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
