import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { router } from './routes'

async function enableMocking() {
  if (import.meta.env.MODE !== 'test') {
    return
  }

  const { worker } = await import('@/__mocks__/browser')

  return worker.start()
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  )
})
