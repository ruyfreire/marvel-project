import './globals.css'

import { QueryClientProvider } from '@tanstack/react-query'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

import { Header } from '@/components/Header'
import { ThemeProvider } from '@/components/ThemeProvider'
import { ScrollArea } from '@/components/ui/scroll-area'
import { queryClient } from '@/lib/react-query'

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
          <Helmet titleTemplate="%s | Projeto Marvel" />

          <div className="grid h-screen grid-rows-[68px,1fr]">
            <Header />

            <ScrollArea>
              <div className="h-[calc(100vh-68px)] p-4">
                <Outlet />
              </div>
            </ScrollArea>
          </div>
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}
