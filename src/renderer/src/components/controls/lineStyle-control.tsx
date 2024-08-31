import * as Select from '@radix-ui/react-select'
import { BoxSelect, ChevronDown, Scan, Square } from 'lucide-react'

interface LineStyleControlProps {
  lineStyle: string
  setLineStyle: (value: string) => void
}

export function LineStyleControl({ lineStyle, setLineStyle }: LineStyleControlProps) {
  return (
    <div>
      <label htmlFor="line-style" className="block text-black dark:text-white font-semibold">
        Estilo linha:
      </label>
      <Select.Root value={lineStyle} onValueChange={setLineStyle}>
        <Select.Trigger
          className="flex gap-1 items-center justify-between w-full bg-white dark:bg-zinc-900 text-black dark:text-white border border-zinc-400 dark:border-zinc-800 rounded-md pl-2 pr-1 py-1"
          aria-label="Estilo linha"
        >
          <Select.Value placeholder="Escolha o estilo" />
          <ChevronDown className="text-gray-600 dark:text-gray-400" />
        </Select.Trigger>
        <Select.Content
          className="bg-white dark:bg-zinc-900 text-black dark:text-white rounded-md shadow-lg p-2 border border-zinc-400 dark:border-zinc-800 mt-1"
          side="bottom"
          align="start"
        >
          <Select.ScrollUpButton className="flex items-center justify-center h-4 cursor-default">
            <span className="text-gray-600 dark:text-gray-400">↑</span>
          </Select.ScrollUpButton>
          <Select.Viewport>
            <Select.Item
              value="solid"
              className="p-2 hover:bg-gray-200 dark:hover:bg-zinc-800 flex gap-1 rounded-md cursor-pointer"
            >
              <Square className="w-5 h-5 shrink-0 mr-2" />
              <Select.ItemText>Sólida</Select.ItemText>
            </Select.Item>
            <Select.Item
              value="dashed"
              className="p-2 hover:bg-gray-200 dark:hover:bg-zinc-800 flex gap-1 rounded-md cursor-pointer"
            >
              <Scan className="w-5 h-5 shrink-0 mr-2" />
              <Select.ItemText>Tracejada</Select.ItemText>
            </Select.Item>
            <Select.Item
              value="dotted"
              className="p-2 hover:bg-gray-200 dark:hover:bg-zinc-800 flex gap-1 rounded-md cursor-pointer"
            >
              <BoxSelect className="w-5 h-5 shrink-0 mr-2" />
              <Select.ItemText>Pontilhada</Select.ItemText>
            </Select.Item>
          </Select.Viewport>
          <Select.ScrollDownButton className="flex items-center justify-center h-4 cursor-default">
            <span className="text-gray-600 dark:text-gray-400">↓</span>
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Root>
    </div>
  )
}
