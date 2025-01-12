import fastify from 'fastify'

import formDataRoutes from './routes/form_data'
import queriesRoutes from './routes/queries'
import errorHandler from './errors'

function build(opts = {}) {
  const app = fastify(opts)

  app.register(formDataRoutes, { prefix: '/form-data' })
  app.register(queriesRoutes)

  app.setErrorHandler(errorHandler)

  return app
}
export default build
