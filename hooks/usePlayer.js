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
    state.audio = ref(new Audio(STREAM_URL))

    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: 'Lo-Fi, Chillhop, ChillJazz, Sleep Music, Work Music etc.',
        artist: 'LoFi Radio',
        artwork: [
          { src: '/mediasession/96.png', sizes: '96x96', type: 'image/png' },
          { src: '/mediasession/128.png', sizes: '128x128', type: 'image/png' },
          { src: '/mediasession/192.png', sizes: '192x192', type: 'image/png' },
          { src: '/mediasession/256.png', sizes: '256x256', type: 'image/png' },
          { src: '/mediasession/384.png', sizes: '384x384', type: 'image/png' },
          { src: '/mediasession/512.png', sizes: '512x512', type: 'image/png' }
        ]
      })
    }

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
