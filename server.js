require('dotenv').config()
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const pathMatch = require('path-match')

const crudRoutes = [
  'org'
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
      const getPage = route('/:route/:id')(pathname)
      if (getPage && crudRoutes.includes(getPage.route)) {
        app.render(req, res, `/${getPage.route}`, Object.assign(getPage, query))
        return
      }
      const createPage = route('/:route/new')(pathname)
      const editPage = route('/:route/edit/:id')(pathname)
      const createOrEditPage = createPage || editPage
      if (createOrEditPage && crudRoutes.includes(createOrEditPage.route)) {
        app.render(req, res, `/${createOrEditPage.route}-edit`, Object.assign(createOrEditPage, query))
        return
      }

      handle(req, res)
    })
      .listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}!`)
      })
})
