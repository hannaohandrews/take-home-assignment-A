export interface IQuery {
  id: string
  title: string
  description?: string | null
  createdAt: Date
  updatedAt: Date
  status: 'OPEN' | 'RESOLVED'
  formDataId: string
}

export interface IQueryBody {
  title: string
  description?: string
  formDataId: string
}
