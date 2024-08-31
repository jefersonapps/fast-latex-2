import { useEffect, useRef } from 'react'

type LatexRenderRef = React.MutableRefObject<HTMLDivElement | null>

export const useMathJax = (renderLatex: () => void): LatexRenderRef => {
  const latexRenderRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js'
    script.async = true
    script.onload = (): void => {
      if (window.MathJax) {
        window.MathJax.startup.promise
          .then(() => {
            console.log('MathJax is ready!')
            window.MathJax = {
              tex: {
                inlineMath: [
                  ['$', '$'],
                  ['\\(', '\\)']
                ],
                packages: { '[+]': ['amsmath', 'amssymb'] }
              },
              svg: {
                fontCache: 'global'
              },
              options: {
                skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre']
              },
              processEscapes: true
            }

            renderLatex()
          })
          .catch((err) => {
            console.error('MathJax startup error:', err)
          })
      }
    }
    document.head.appendChild(script)

    return (): void => {
      document.head.removeChild(script)
    }
  }, [renderLatex])

  return latexRenderRef
}
