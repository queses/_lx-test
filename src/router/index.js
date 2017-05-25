import Vue from 'vue'
import Router from 'vue-router'

// can't put import() here, because node will complain "SyntaxError: Unexpected token import"
const asyncImport = require('./_import_' + TARGET)

Vue.use(Router)

const routes = [
  { path: '/', component: asyncImport('index') }
  // { path: '/foo/:id', name: 'foo', component: asyncImport('Foo') },
  // { path: '/show-error-page', component: asyncImport('ShowErrorPage') }
  // { path: '/landing', component: asyncImport('landing')}
]

if (TARGET === 'web') {
  routes.push(
    // catch-all route must be placed at the last
    { path: '*', component: asyncImport('HTTP404') }
  )
}

export default new Router({
  mode: 'history',
  routes
})
