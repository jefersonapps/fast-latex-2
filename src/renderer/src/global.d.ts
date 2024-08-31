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
  processEscapes: true,
  typesetPromise: () => Promise.resolve(),
  startup: {
    promise: Promise.resolve()
  }
}

interface Window {
  MathJax: MathJax
}
