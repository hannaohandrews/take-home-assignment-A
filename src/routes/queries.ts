import { FastifyInstance } from 'fastify'
import prisma from '../db/db_client'
import { IQuery, IQueryBody } from './schemas/query.interface'
import { ApiError } from '../errors'

async function queriesRoutes(app: FastifyInstance) {
  const log = app.log.child({
    component: 'queriesRoutes',
  })

  const handleError = (
    log: any,
    message: string,
    err: any,
    statusCode: number
  ) => {
    log.error({ err }, message)
    throw new ApiError(message, statusCode)
  }

  const findQueryById = async (id: string) => {
    const existingQuery = await prisma.query.findUnique({ where: { id } })
    if (!existingQuery) {
      throw new ApiError('Query not found', 404)
    }
    return existingQuery
  }

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
        handleError(log, 'Error creating new query', err, 500)
      }
    },
  })

  //Update an existing query by ID
  app.put<{
    Params: { id: string }
    Body: Partial<IQueryBody> // possible for partial update
    Reply: { message: string } | IQuery
  }>('/queries/:id', {
    async handler(req, reply) {
      const { id } = req.params
      const newData = req.body

      log.debug({ id, newData }, 'Updating a query')

      try {
        await findQueryById(id) //ensure query exists before updating
        const updatedQuery = await prisma.query.update({
          where: { id },
          data: newData,
        })
        reply.status(200).send(updatedQuery)
      } catch (err: any) {
        handleError(log, 'Error updating query', err, 500)
      }
    },
  })

  //Delete a query by ID
  app.delete<{
    Params: { id: string }
  }>('/queries/:id', {
    async handler(req, reply) {
      const { id } = req.params

      log.debug({ id }, 'Deleting a query')

      try {
        await findQueryById(id) //ensure query exists before deleting
        const deletedQuery = await prisma.query.delete({
          where: { id },
        })
        reply.status(200).send(deletedQuery)
      } catch (err: any) {
        handleError(log, 'Error deleting query', err, 500)
      }
    },
  })
}

export default queriesRoutes
