export interface IQuery {
  id: string
  title: string
  description?: string | null
  createdAt: Date
  updatedAt: Date
  status: 'OPEN' | 'RESOLVED'
  formDataId: string
}

// payload of the request
export interface IQueryBody {
  title: string
  description?: string
  formDataId: string
}
