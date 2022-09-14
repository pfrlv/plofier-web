import { useEffect } from 'react'
import { useSnapshot, proxy } from 'valtio'
import { subscribeKey } from 'valtio/utils'

const state = proxy({
  darkTheme: false,
  toggleTheme: () => {
    state.darkTheme = !state.darkTheme
  }
})

const useTheme = () => {
  const { darkTheme, toggleTheme } = useSnapshot(state)

  
  useEffect(() => {
    state.darkTheme = JSON.parse(localStorage?.getItem('darkTheme')) || false
  }, [])

  return {
    darkTheme,
    toggleTheme
  }
}

subscribeKey(state, 'darkTheme', (val) => {
  document.documentElement.classList.toggle('dark')
  localStorage.setItem('darkTheme', JSON.stringify(val))
})

export default useTheme
