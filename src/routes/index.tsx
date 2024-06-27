import { createBrowserRouter } from 'react-router-dom'

import { App } from '@/app'
import { Details } from '@/pages/details'
import { Home } from '@/pages/home'
import { NotFound } from '@/pages/not-found'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/detalhes/:id',
        element: <Details />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
])
