import { Outlet } from 'react-router-dom'
import { ThemeProvider } from '@/components/ThemeProvider'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Header } from '@/components/Header'

import './globals.css'

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="h-screen">
        <Header />

        <div className="h-full pt-[5rem] pb-4">
          <ScrollArea type="scroll" className="h-full px-4">
            <Outlet />
          </ScrollArea>
        </div>
      </div>
    </ThemeProvider>
  )
}
