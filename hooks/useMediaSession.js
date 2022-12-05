import { useEffect } from 'react'

const isMediaSessionAvailable =
  typeof window !== 'undefined' && 'mediaSession' in window.navigator

export const useMediaMeta = ({ title, album, artist, artwork }) => {
  useEffect(() => {
    if (!isMediaSessionAvailable) return

    window.navigator.mediaSession.metadata = new MediaMetadata({
      title,
      album,
      artist,
      artwork
    })

    return () => {
      window.navigator.mediaSession.metadata = undefined
    }
  }, [album, artist, artwork, title])
}

const bindActionHandler = (action, callback) => {
  if (!isMediaSessionAvailable || !callback) return

  window.navigator.mediaSession.setActionHandler(action, callback)

  return () => {
    window.navigator.mediaSession.setActionHandler(action, null)
  }
}

export const useMediaSession = ({
  playbackState = 'none',
  onPause,
  onPlay,
  onNextTrack,
  onPreviousTrack,
  onSeekBackward,
  onSeekForward,
  onSeekTo,
  onSkipAd,
  onStop
}) => {
  useEffect(() => {
    if (!isMediaSessionAvailable) return

    window.navigator.mediaSession.playbackState = playbackState

    return () => {
      window.navigator.mediaSession.playbackState = 'none'
    }
  }, [playbackState])

  useEffect(() => bindActionHandler('play', onPlay), [onPlay])
  useEffect(() => bindActionHandler('pause', onPause), [onPause])
  useEffect(() => bindActionHandler('nexttrack', onNextTrack), [onNextTrack])
  useEffect(
    () => bindActionHandler('previoustrack', onPreviousTrack),
    [onPreviousTrack]
  )
  useEffect(
    () => bindActionHandler('seekbackward', onSeekBackward),
    [onSeekBackward]
  )
  useEffect(
    () => bindActionHandler('seekforward', onSeekForward),
    [onSeekForward]
  )
  useEffect(() => bindActionHandler('seekto', onSeekTo), [onSeekTo])
  useEffect(() => bindActionHandler('skipad', onSkipAd), [onSkipAd])
  useEffect(() => bindActionHandler('stop', onStop), [onStop])
}
