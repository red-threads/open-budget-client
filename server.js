require('dotenv').config()
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const pathMatch = require('path-match')

const crudRoutes = [
  'organization',
  'card',
  'transaction',
  'transaction-type'
]
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const route = pathMatch()

app.prepare()
  .then(() => {
    createServer((req, res) => {
      const { pathname, query } = parse(req.url, true)
      const createPage = route('/:entity/new')(pathname)
      const editPage = route('/:entity/:id/edit')(pathname)
      const getPage = route('/:entity/:id')(pathname)
      const listPage = route('/:entity')(pathname)
      const createOrEditPage = createPage || editPage
      const anyPage = createOrEditPage || getPage || listPage

      if (anyPage && !crudRoutes.includes(anyPage.entity)) {
        return handle(req, res)
      }

      if (createOrEditPage && crudRoutes.includes(createOrEditPage.entity)) {
        app.render(req, res, '/edit', Object.assign({}, createOrEditPage, query))
        return
      }
      if (getPage && crudRoutes.includes(getPage.entity)) {
        app.render(req, res, '/item', Object.assign({}, getPage, query))
        return
      }
      if (listPage && crudRoutes.includes(listPage.entity)) {
        app.render(req, res, '/list', Object.assign({}, listPage, query))
        return
      }

      handle(req, res)
    })
      .listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}!`)
      })
  })
