import { Moon, Sun, Monitor } from 'lucide-react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

interface ThemeSwitcherProps {
  theme: string
  setThemePreference: (newTheme: 'light' | 'dark' | 'system') => void
}

export const ThemeSwitcher = ({ theme, setThemePreference }: ThemeSwitcherProps) => {
  const getIcon = (): JSX.Element => {
    if (theme === 'dark') {
      return <Moon className="size-4 shrink-0 text-white" />
    } else if (theme === 'light') {
      return <Sun className="size-4 shrink-0 text-black" />
    } else {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? (
        <Moon className="size-4 shrink-0 text-white" />
      ) : (
        <Sun className="size-4 shrink-0 text-black" />
      )
    }
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          aria-label="Tema"
          title="Tema"
          className="flex items-center justify-center p-2 bg-gray-200 rounded-full dark:bg-zinc-900 hover:bg-gray-300 dark:hover:bg-zinc-800 focus:outline-none transition-colors"
        >
          {getIcon()}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="w-fit p-2 bg-white rounded-md shadow-md dark:bg-zinc-900"
          align="end"
          sideOffset={5}
        >
          <DropdownMenu.Item
            className="flex items-center px-2 py-1 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-800 text-black dark:text-white"
            onClick={() => setThemePreference('light')}
          >
            <Sun className="w-5 h-5 shrink-0 mr-2" />
            Claro
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="flex items-center px-2 py-1 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-800 text-black dark:text-white"
            onClick={() => setThemePreference('dark')}
          >
            <Moon className="w-5 h-5 shrink-0 mr-2" />
            Escuro
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="flex items-center px-2 py-1 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-800 text-black dark:text-white"
            onClick={() => setThemePreference('system')}
          >
            <Monitor className="w-5 h-5 shrink-0 mr-2" />
            Automático
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
