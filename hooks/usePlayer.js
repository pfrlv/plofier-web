import { useEffect } from 'react'
import { useSnapshot, proxy, ref } from 'valtio'
import { useMediaSession, useMediaMeta } from '@/hooks/useMediaSession'

const STREAM_URL = 'https://ss-edge.joeycast.com/lofi.mp3'
let audio

const state = proxy({
  canplay: false,
  playing: false,
  async play() {
    await audio.play()

    state.playing = true
  },
  pause() {
    audio.pause()

    state.playing = false
  }
})

const initPlayer = () => {
  useMediaMeta({
    title: 'Lo-Fi, Chillhop, ChillJazz, Sleep Music, Work Music etc.',
    artist: 'LoFi Radio by BoxRadio',
    artwork: [
      { src: '/mediasession/96.png', sizes: '96x96', type: 'image/png' },
      { src: '/mediasession/128.png', sizes: '128x128', type: 'image/png' },
      { src: '/mediasession/192.png', sizes: '192x192', type: 'image/png' },
      { src: '/mediasession/256.png', sizes: '256x256', type: 'image/png' },
      { src: '/mediasession/384.png', sizes: '384x384', type: 'image/png' },
      { src: '/mediasession/512.png', sizes: '512x512', type: 'image/png' }
    ]
  })

  useMediaSession({
    onPlay() {
      state.play()
    },
    onPause() {
      state.pause()
    },
    onStop() {
      state.pause()
    }
  })

  const onLoadedMetadata = () => {
    state.canplay = true
  }

  const onError = () => {
    alert('Something went wrong, please try again later')
  }

  useEffect(() => {
    audio = new Audio(STREAM_URL)

    audio.addEventListener('error', onError)
    audio.addEventListener('loadedmetadata', onLoadedMetadata)

    return () => {
      state.pause()

      audio.removeEventListener('error', onError)
      audio.removeEventListener('loadedmetadata', onLoadedMetadata)
    }
  }, [])
}

export default () => {
  return useSnapshot(state)
}

export { initPlayer }
