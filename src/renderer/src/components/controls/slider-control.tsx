import * as Slider from '@radix-ui/react-slider'

interface SliderControlProps {
  value: number
  onChange: (value: number) => void
  label: string
  min: number
  max: number
  step: number
}

export function SliderControl({ value, onChange, label, min, max, step }: SliderControlProps) {
  return (
    <div>
      <label className="block text-black dark:text-white font-semibold">{label}:</label>
      <Slider.Root
        className="relative flex items-center w-full h-8"
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(value) => onChange(value[0])}
      >
        <Slider.Track className="relative grow rounded-full bg-gray-300 dark:bg-zinc-700 h-2">
          <Slider.Range className="absolute bg-gray-800 dark:bg-zinc-400 h-full rounded-full" />
        </Slider.Track>
        <Slider.Thumb className="block w-4 h-4 rounded-full bg-gray-800 dark:bg-zinc-400" />
      </Slider.Root>
    </div>
  )
}
