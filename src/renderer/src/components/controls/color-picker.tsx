import { useState } from 'react'
import * as Popover from '@radix-ui/react-popover'
import { ColorResult, Sketch } from '@uiw/react-color'
import { Pipette } from 'lucide-react'

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
  label: string
}

export function ColorPicker({ color, onChange, label }: ColorPickerProps) {
  const [open, setOpen] = useState(false)

  const handleColorChange = (color: ColorResult) => {
    onChange(color.hex)
  }

  async function handleGetColor() {
    try {
      const color = await window.electron.ipcRenderer.invoke('capture-color')
      onChange(color)
    } catch (error) {
      console.error('Error capturing color:', error)
    }
  }

  return (
    <div>
      <label className="block text-black dark:text-white font-semibold text-sm mb-2">{label}:</label>
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <button
            className="w-full h-8 border border-zinc-400 dark:border-zinc-800 rounded"
            style={{ backgroundColor: color }}
          ></button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            side="bottom"
            align="center"
            className="z-50 space-y-2 bg-white dark:bg-zinc-800 p-2 rounded shadow-lg border border-gray-300 dark:border-zinc-700"
          >
            <Sketch color={color} onChange={handleColorChange} />

            <button
              className="flex gap-2 items-center bg-violet-800 hover:bg-violet-900 transition-colors text-white rounded-md px-3 py-2 mx-auto"
              onClick={handleGetColor}
            >
              {' '}
              <Pipette strokeWidth={2.5} size={20} />{' '}
              <span className="font-semibold">Cor da tela</span>
            </button>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  )
}
