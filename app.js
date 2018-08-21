const Vue = require('vue')
const App = require('./App')

function createApp(context) {
  const app = new Vue({
    render: h => h(App, { props: context })
  })
  return app
}

module.exports = createApp
