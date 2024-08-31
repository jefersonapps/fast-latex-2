import React from 'react'
import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/mode-latex'
import 'ace-builds/src-noconflict/theme-textmate'
import 'ace-builds/src-noconflict/theme-monokai'
import { ThemeSwitcher } from './theme-switcher'

interface EditorProps {
  latex: string
  setLatex: React.Dispatch<React.SetStateAction<string>>
  theme: 'light' | 'dark' | 'system'
  currentTheme: 'light' | 'dark'
  setThemePreference: (newTheme: 'light' | 'dark' | 'system') => void
}

export function Editor({ latex, setLatex, theme, currentTheme, setThemePreference }: EditorProps) {
  return (
    <div className="relative w-full h-60 rounded-md overflow-hidden border border-zinc-400 dark:border-zinc-800">
      <div className="absolute top-3 right-3 z-50">
        <ThemeSwitcher theme={theme} setThemePreference={setThemePreference} />
      </div>
      <AceEditor
        mode="latex"
        theme={currentTheme === 'dark' ? 'monokai' : 'textmate'}
        enableBasicAutocompletion
        enableSnippets
        value={latex}
        onChange={setLatex}
        width="100%"
        height="100%"
        fontSize={20}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={false}
        lineHeight={24}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          highlightActiveLine: false,
          highlightGutterLine: false,
          spellcheck: true,
          enableMultiselect: true,
          showLineNumbers: true,
          showPrintMargin: false,
          tabSize: 2,
          useWorker: false
        }}
      />
    </div>
  )
}
