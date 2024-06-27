import { ResponsiveCirclePacking } from '@nivo/circle-packing'
import { Radar } from 'lucide-react'
import { useMemo, useState } from 'react'

import { Character } from '@/@types/marvel'

import { Button } from './ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './ui/drawer'

type MapProps = {
  rawData: Character[]
}

type ChartProperty = {
  id: string
  value: number
  type?: string
  children?: {
    id: string
    value: number
    type?: string
  }[]
}

type Zoom = {
  id: string | null
  height: number | null
}

export function CircleMap({ rawData }: MapProps) {
  const [zoom, setZoom] = useState<Zoom>({
    id: null,
    height: null,
  })

  const chartChildren = useMemo<ChartProperty[]>(
    () =>
      rawData.reduce((finalData, character) => {
        const allItems =
          character.comics.available +
          character.series.available +
          character.stories.available +
          character.events.available

        const characterData = {
          id: character.name,
          value: allItems,
          children: [
            {
              id: `${character.name} - Comics`,
              type: 'Comics',
              value: character.comics.available,
            },
            {
              id: `${character.name} - Series`,
              type: 'Series',
              value: character.series.available,
            },
            {
              id: `${character.name} - Stories`,
              type: 'Stories',
              value: character.stories.available,
            },
            {
              id: `${character.name} - Events`,
              type: 'Events',
              value: character.events.available,
            },
          ],
        }

        return [...finalData, characterData]
      }, [] as ChartProperty[]),
    [rawData],
  )

  const totalData = useMemo(
    () => chartChildren.reduce((acc, item) => acc + item.value, 0),
    [chartChildren],
  )

  const chartData: ChartProperty = {
    id: 'Total',
    value: totalData,
    children: chartChildren,
  }

  return (
    <Drawer>
      <DrawerTrigger asChild disabled={chartData.value === 0}>
        <Button variant="destructive">
          <Radar className="mr-2" size={16} />
          Visualizar mapa de resultados
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Contagem dos heróis em tela</DrawerTitle>
          <DrawerDescription>
            Veja qual personagem possui mais quais
          </DrawerDescription>
        </DrawerHeader>

        <div className="m-auto h-[80vh] w-[90vw] p-2">
          <ResponsiveCirclePacking
            data={chartData}
            motionConfig="slow"
            zoomedId={zoom.id}
            colors={{ scheme: 'pastel2' }}
            colorBy="depth"
            padding={6}
            onClick={(node) => {
              setZoom((state) => {
                return {
                  id: state.id === node.id ? null : node.id,
                  height: state.height === node.height ? null : node.height,
                }
              })
            }}
            enableLabels
            labelsFilter={(label) => {
              if (zoom.height === null || zoom.height === 2) {
                return label.node.height === 1
              }

              return label.node.height <= zoom.height || zoom.height === 0
            }}
            label={(labelProps) => {
              if (zoom.height === 0) {
                return `${labelProps.data.id} - ${labelProps.data.value} itens`
              }

              return labelProps.data.type || labelProps.data.id
            }}
            tooltip={({ id, value }) => (
              <span className="rounded-sm bg-white px-2 py-1 text-gray-800">
                <strong>{id}: </strong>
                {value}
              </span>
            )}
          />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
