import React, { useEffect } from 'react'
import { useMathJax } from '../hooks/useMaxJax'
import { Download } from 'lucide-react'

interface LatexRendererProps {
  latex: string
  textColor: string
  backgroundColor: string
  externalColor: string
  borderColor: string
  borderRadius: number
  textSize: number
  lineStyle: string
  borderWidth: number
  hideDownloadButton: boolean
  setHideDownloadButton: React.Dispatch<React.SetStateAction<boolean>>
}

export function LatexRenderer({
  latex,
  textColor,
  backgroundColor,
  externalColor,
  borderColor,
  borderRadius,
  textSize,
  lineStyle,
  borderWidth,
  hideDownloadButton,
  setHideDownloadButton
}: LatexRendererProps) {
  const renderLatex = (): void => {
    if (window.MathJax && latexRenderRef.current) {
      window.MathJax.typesetPromise([latexRenderRef.current])
        .then(() => {
          console.log('MathJax processed successfully!')
        })
        .catch((err) => {
          console.error('Error processing MathJax:', err)
        })
    }
  }

  const latexRenderRef = useMathJax(renderLatex)

  useEffect(() => {
    renderLatex()
  }, [latex])

  const handleDownload = async () => {
    if (latexRenderRef.current) {
      const containerRect = latexRenderRef.current.getBoundingClientRect()
      const padding = 2
      const captureRect = {
        x: containerRect.x - padding,
        y: containerRect.y - padding,
        width: containerRect.width + padding * 2,
        height: containerRect.height + padding * 2
      }
      const image = await window.electron.ipcRenderer.invoke('capture-page', captureRect)
      console.log('Capturou a página!', image)
    }
  }

  const handleCaptureScreen = () => {
    setHideDownloadButton(true)
    setTimeout(() => {
      handleDownload()
      setHideDownloadButton(false)
    }, 100)
  }

  return (
    <div
      className="relative flex flex-col items-center justify-center p-4 w-full flex-1 rounded-md border border-zinc-400 dark:border-zinc-800"
      style={{ backgroundColor: externalColor }}
    >
      {!hideDownloadButton && (
        <button
          onClick={handleCaptureScreen}
          title="Capturar imagem"
          aria-label="Capturar imagem"
          className="absolute top-3 right-3 bg-gray-200 dark:bg-zinc-900 hover:bg-gray-300 dark:hover:bg-zinc-800 transition-colors p-2 rounded-full"
        >
          <Download />
        </button>
      )}
      <div
        ref={latexRenderRef}
        id="latex-render"
        className="p-4"
        style={{
          color: textColor,
          backgroundColor: backgroundColor,
          borderRadius: `${borderRadius}px`,
          fontSize: `${textSize}px`,
          borderStyle: lineStyle,
          borderColor: borderColor,
          borderWidth: `${borderWidth}px`,
          border: `${borderWidth}px ${lineStyle} ${borderColor}`
        }}
      >
        {`${latex}`}
      </div>
    </div>
  )
}
