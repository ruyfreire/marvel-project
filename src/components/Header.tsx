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
          <Button
            className="absolute"
            variant="outline"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <CornerUpLeft />
          </Button>
        )}

        <div className="flex flex-1 justify-center">
          <Link to="/">
            <img src="/logo.svg" alt="" />
          </Link>
        </div>
      </div>

      <Separator className="m-auto w-[98%]" />
    </div>
  )
}
