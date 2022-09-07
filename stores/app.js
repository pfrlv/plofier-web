import { proxy } from 'valtio'
import { subscribeKey } from 'valtio/utils'

const store = proxy({
  darkTheme: false,
  playing: false,
  ready: false,
  togglePlaying: () => {
    store.playing = !store.playing
  },
  initTheme: (val) => {
    store.darkTheme = val
  },
  toggleTheme: () => {
    store.darkTheme = !store.darkTheme
  },
  setReady: () => {
    store.ready = !store.ready
  }
})

subscribeKey(store, 'darkTheme', (value) => {
  document.documentElement.classList.toggle('dark')
  localStorage.setItem('darkTheme', JSON.stringify(value))
})

export default store
