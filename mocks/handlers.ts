import { http, delay, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/list', () => {
    return HttpResponse.json(Array.from({ length: 1000 }, (_, i) => ({
      id: i.toString(),
    })))
  }),

  http.get('/api/detail/:id', async ({ params }) => {
    await delay(3000 * Math.random())
    return HttpResponse.json({
      id: params.id,
      name: `User ${params.id}`,
    })
  }),
]