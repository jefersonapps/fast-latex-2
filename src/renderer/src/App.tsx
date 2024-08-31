import React, { useState } from 'react'
import { useTheme } from './hooks/useTheme'
import { Editor } from './components/editor'
import { Controls } from './components/controls'
import { LatexRenderer } from './components/latex-renderer'

export interface LatexStyles {
  textColor: string
  backgroundColor: string
  externalColor: string
  borderColor: string
  borderRadius: number
  textSize: number
  lineStyle: string
  borderWidth: number
}

const App: React.FC = () => {
  const [latex, setLatex] = useState<string>('\\begin{align}\n\\end{align}')
  const [latexStyles, setLatexStyles] = useState<LatexStyles>({
    textColor: '#000000',
    backgroundColor: '#ffffff',
    externalColor: '#ffffff',
    borderColor: '#000000',
    borderRadius: 8,
    textSize: 16,
    lineStyle: 'solid',
    borderWidth: 0
  })
  const [hideDownloadButton, setHideDownloadButton] = useState<boolean>(false)

  const { theme, setThemePreference, currentTheme } = useTheme()

  const handleStyleChange = (name: keyof LatexStyles, value: string | number) => {
    setLatexStyles((prevStyles) => ({
      ...prevStyles,
      [name]: value
    }))
  }

  return (
    <div className="flex flex-col space-y-4 items-center justify-center min-h-screen bg-gray-100 dark:bg-zinc-950 text-black dark:text-white p-4">
      <LatexRenderer
        latex={latex}
        hideDownloadButton={hideDownloadButton}
        setHideDownloadButton={setHideDownloadButton}
        {...latexStyles}
      />
      <Editor
        latex={latex}
        setLatex={setLatex}
        theme={theme}
        currentTheme={currentTheme}
        setThemePreference={setThemePreference}
      />
      <Controls latexStyles={latexStyles} handleStyleChange={handleStyleChange} />
    </div>
  )
}

export default App
