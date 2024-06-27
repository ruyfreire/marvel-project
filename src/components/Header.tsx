import { CornerUpLeft } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { Separator } from '@/components/ui/separator'

import { Button } from './ui/button'

export function Header() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  return (
    <div className="z-10 w-full">
      <div className="relative flex items-center p-2">
        {pathname !== '/' && (
          <Link to="/" className="absolute flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
              <CornerUpLeft />
            </Button>
          </Link>
        )}

        <div className="flex flex-1 justify-center">
          <img src="/logo.svg" alt="" />
        </div>
      </div>

      <Separator className="m-auto w-[98%]" />
    </div>
  )
}
