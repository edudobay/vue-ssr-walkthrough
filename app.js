import Vue from 'vue'

const App = () => import('./App.vue')
const Hello = () => import('./Hello.vue')

function findRootComponent(context) {
  if (context.url.startsWith('/hello')) {
    return Hello
  } else {
    return App
  }
}

export function createApp(context) {
  const root = findRootComponent(context)

  const app = new Vue({
    render: h => h(root, { props: context }),
  })
  return { app }
}
