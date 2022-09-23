import { useEffect, useCallback, useRef } from 'react'
import { useSnapshot, proxy } from 'valtio'

const STREAM_URL = 'https://play.streamafrica.net/lofiradio'

const state = proxy({
  canplay: false,
  playing: false
})

function useStreamAudio() {
  const { playing, canplay } = useSnapshot(state)
  const audio = useRef()

  const play = useCallback(async () => {
    if (!canplay) return
    await audio.current.play()
  }, [canplay])

  const pause = useCallback(() => {
    if (!canplay) return
    audio.current.pause()
  }, [canplay])

  useEffect(() => {
    audio.current = new Audio(STREAM_URL)

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
  }, [])

  useEffect(() => {
    const onPause = () => (state.playing = false)
    audio.current.addEventListener('pause', onPause)

    return () => audio.current.removeEventListener('pause', onPause)
  }, [])

  useEffect(() => {
    const onPlay = () => (state.playing = true)
    audio.current.addEventListener('play', onPlay)

    return () => audio.current.removeEventListener('play', onPlay)
  }, [])

  useEffect(() => {
    const onCanplay = () => (state.canplay = true)
    audio.current.addEventListener('loadedmetadata', onCanplay)

    return () => {
      audio.current.pause()
      audio.current.removeEventListener('loadedmetadata', onCanplay)
    }
  }, [])

  return {
    canplay,
    playing,
    play,
    pause
  }
}

export default useStreamAudio
