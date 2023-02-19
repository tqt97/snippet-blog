import { HiMoon, HiSun } from 'react-icons/hi'
import { useEffect, useState } from 'react'

import { motion } from 'framer-motion'
import useSound from 'use-sound'
import { useTheme } from 'next-themes'

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  const [ThemeSound] = useSound('/static/sounds/switch-on.mp3')

  const ThemeSwitch = () => {
    setTheme(theme === 'dark' || resolvedTheme === 'dark' ? 'light' : 'dark')
  }
  return (
    <div className="p-3 cursor-pointer rounded transition duration-100">
      <motion.button
        className="flex items-center justify-center"
        whileTap={{
          scale: 0.7,
          rotate: 360,
        }}
        whileHover={mounted ? { scale: 1.1 } : {}}
        transition={{ duration: 0.2, ease: 'easeIn' }}
        aria-label="Toggle Dark Mode"
        type="button"
        onClick={() => {
          ThemeSwitch()
          ThemeSound()
        }}
      >
        {mounted && (theme === 'dark' || resolvedTheme === 'dark') ? (
          <HiSun className="h-4 w-4 hover:animate-spin" />
        ) : (
          <HiMoon className="h-4 w-4 hover:animate-spin" />
        )}
      </motion.button>
    </div>
  )
}

export default ThemeSwitch
