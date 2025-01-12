import { FastifyInstance } from 'fastify'
import prisma from '../db/db_client'
import { IQuery, IQueryBody } from './schemas/query.interface'
import { ApiError } from '../errors'

async function queriesRoutes(app: FastifyInstance) {
  const log = app.log.child({
    component: 'queriesRoutes',
  })

  //Create a new query
  app.post<{
    Body: IQueryBody
    Reply: IQuery
  }>('/queries', {
    async handler(req, reply) {
      log.debug('Creating a new query')
      const { title, description, formDataId } = req.body
      try {
        const newQuery = await prisma.query.create({
          data: {
            title,
            description,
            status: 'OPEN', // default to open when a new query is made,
            formDataId,
          },
        })
        reply.status(201).send(newQuery)
      } catch (err: any) {
        log.error({ err }, 'Error creating new query')
        throw new ApiError('Failed to create a new query', 500)
      }
    },
  })
}

export default queriesRoutes
