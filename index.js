const Vue = require('vue')

function main() {
  const app = new Vue({
    template: `<div>Hello world</div>`
  })

  render(app)
}

function render(app) {
  const renderer = require('vue-server-renderer').createRenderer()

  renderer.renderToString(app).then(html => {
    console.log(html)
  }).catch(err => {
    console.error(err)
  })
}

main()
