import { createBrowserRouter } from 'react-router-dom'
import { Home } from '@/pages/Home'
import { Mapa } from '@/pages/Mapa'
import { App } from '@/App'
import { Detalhes } from '@/pages/Detalhes'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/mapa',
        element: <Mapa />,
      },
      {
        path: '/detalhes/:id',
        element: <Detalhes />,
      },
    ],
  },
])
