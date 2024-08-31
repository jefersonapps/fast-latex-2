import { LatexStyles } from '@renderer/App'
import { ColorControl } from './controls/color-control'
import { LineStyleControl } from './controls/lineStyle-control'
import { SliderControl } from './controls/slider-control'

interface ControlsProps {
  latexStyles: LatexStyles
  handleStyleChange: (name: keyof LatexStyles, value: string | number) => void
}

export function Controls({ latexStyles, handleStyleChange }: ControlsProps) {
  const {
    textColor,
    backgroundColor,
    externalColor,
    borderColor,
    borderWidth,
    borderRadius,
    textSize,
    lineStyle
  } = latexStyles

  return (
    <div className="mt-4 flex flex-wrap justify-center gap-4 w-full">
      <ColorControl
        color={textColor}
        setColor={(value) => handleStyleChange('textColor', value)}
        label="Cor texto"
      />
      <ColorControl
        color={backgroundColor}
        setColor={(value) => handleStyleChange('backgroundColor', value)}
        label="Cor fundo"
      />
      <ColorControl
        color={externalColor}
        setColor={(value) => handleStyleChange('externalColor', value)}
        label="Cor externa"
      />
      <ColorControl
        color={borderColor}
        setColor={(value) => handleStyleChange('borderColor', value)}
        label="Cor borda"
      />
      <SliderControl
        value={borderWidth}
        onChange={(value) => handleStyleChange('borderWidth', value)}
        label="Largura borda"
        min={0}
        max={10}
        step={1}
      />
      <SliderControl
        value={borderRadius}
        onChange={(value) => handleStyleChange('borderRadius', value)}
        label="Raio borda"
        min={0}
        max={200}
        step={1}
      />
      <SliderControl
        value={textSize}
        onChange={(value) => handleStyleChange('textSize', value)}
        label="Tamanho texto"
        min={0}
        max={80}
        step={1}
      />
      <LineStyleControl
        lineStyle={lineStyle}
        setLineStyle={(value) => handleStyleChange('lineStyle', value)}
      />
    </div>
  )
}
