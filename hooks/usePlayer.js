import { useEffect } from 'react'
import { useSnapshot, proxy, ref } from 'valtio'

const STREAM_URL = 'https://plofier.streamafrica.net/lofi'

const state = proxy({
  canplay: false,
  playing: false,
  audio: null,
  play: async () => {
    await state.audio.play()
    state.playing = true
  },
  pause: () => {
    state.audio.pause()
    state.playing = false
  }
})

const initPlayer = () => {
  useEffect(() => {
    if (state.audio) return
    state.audio = ref(new Audio(STREAM_URL))

    function onCanplay() {
      state.canplay = true
    }

    function onError() {
      alert('Something went wrong, please try again later')
    }

    state.audio.addEventListener('error', onError)
    state.audio.addEventListener('loadedmetadata', onCanplay)

    return () => {
      state.pause()

      state.audio.removeEventListener('error', onError)
      state.audio.removeEventListener('loadedmetadata', onCanplay)
    }
  }, [])
}

export default () => {
  return useSnapshot(state)
}

export { initPlayer }
