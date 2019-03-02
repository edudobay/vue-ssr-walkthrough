const { devMode } = require('./env')
const path = require('path')
const express = require('express')
const server = express()

const { createBundleRenderer } = require('vue-server-renderer')
const template = require('fs').readFileSync('./index.template.html', 'utf-8')
const resolve = file => path.resolve(__dirname, file)

function createRenderer(bundle, options) {
  return createBundleRenderer(bundle, {
    ...options,
    inject: false,
    runInNewContext: false,
    // this is only needed when vue-server-renderer is npm-linked
    basedir: resolve('./dist'),
  })
}

let readyPromise
let renderer

if (devMode) {
  readyPromise = require('./setup-dev-server')(
    server,
    template,
    (bundle, options) => {
      renderer = createRenderer(bundle, options)
    }
  )

} else {
  const clientManifest = require('./dist/vue-ssr-client-manifest.json')
  const serverBundle = require(path.join(__dirname, 'dist/vue-ssr-server-bundle.json'))

  renderer = createRenderer(serverBundle, { template, clientManifest })
}

function render(req, res) {
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
}

const renderFunction =
  devMode
    ? (req, res) => { readyPromise.then(() => render(req, res)) }
    : render

const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && devMode ? 0 : 1000 * 60 * 60 * 24 * 30,
})

server.use('/dist', serve('./dist', true))

server.get('*', renderFunction)

const port = Number.parseInt(process.env.PORT) || 8080;
server.listen(port, () => {
  console.log(`Listening on port ${port}. Visit me at http://localhost:${port}`);
});
