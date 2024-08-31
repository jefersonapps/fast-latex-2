import { ColorPicker } from './color-picker'

interface ColorControlProps {
  color: string
  setColor: (color: string) => void
  label: string
}

export function ColorControl({ color, setColor, label }: ColorControlProps) {
  return (
    <div>
      <ColorPicker color={color} onChange={setColor} label={label} />
    </div>
  )
}
