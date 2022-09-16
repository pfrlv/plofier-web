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

  useEffect(() => {
    audio.current = new Audio(STREAM_URL)
  }, [])

  useEffect(() => {
    const onCanPlay = () => {
      state.canplay = true
    }

    audio.current.addEventListener('loadedmetadata', onCanPlay)

    return () => {
      audio.current.pause()
      audio.current.removeEventListener('loadedmetadata', onCanPlay)
    }
  }, [])

  const play = useCallback(() => {
    if (!canplay) return

    audio.current.play()
    state.playing = true
  }, [canplay])

  const pause = useCallback(() => {
    if (!canplay) return

    audio.current.pause()
    state.playing = false
  }, [canplay])

  return {
    canplay,
    playing,
    play,
    pause
  }
}

export default useStreamAudio
