import {
  RiPlayFill,
  RiMoonClearLine,
  RiSunFill,
  RiPauseFill
} from 'react-icons/ri'

import { useEffect, useRef } from 'react'

import appStore from '@/stores/app'
import { useSnapshot } from 'valtio'

import { VIDEO_ID } from '../constants'

const Buttons = () => {
  const { toggleTheme, togglePlaying, playing, darkTheme, initTheme } =
    useSnapshot(appStore)

  useEffect(() => {
    initTheme(JSON.parse(localStorage.getItem('darkTheme')) || false)
  }, [ initTheme ])

  return (
    <div className={`flex space-x-[5px] justify-center transition transform-gpu duration-500 ease-out ${playing ? 'translate-y-[45px]' : ''}`}>
      <div className="bg-neutral-50 dark:bg-neutral-900 dark:text-neutral-50 w-[50px] h-[50px] inline-flex justify-center items-center rounded-[13px]">
        <svg
          data-plofier
          className={`w-[40px] block ${playing ? 'is-playing' : ''}`}
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.86333 23.2924C0.295946 19.8314 3.64844 13.5369 10.3513 9.2333C17.0542 4.92968 24.5693 4.2466 27.1367 7.7076C29.7041 11.1686 26.3516 17.4631 19.6487 21.7667C12.9458 26.0703 5.43071 26.7534 2.86333 23.2924Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <button
        className="text-neutral-200 dark:text-neutral-900 uppercase tracking-wider text-xs bg-black dark:bg-neutral-50 h-[50px] w-[50px] inline-flex justify-center items-center rounded-[13px] active:scale-95 transition-transform"
        onClick={togglePlaying}
      >
        {playing ? <RiPauseFill fontSize={25} /> : <RiPlayFill fontSize={25} />}
      </button>
      <button
        className="text-neutral-200 dark:text-neutral-900 uppercase tracking-wider text-xs bg-black dark:bg-neutral-50 h-[50px] w-[50px] inline-flex justify-center items-center rounded-[13px] active:scale-95 transition-transform"
        onClick={toggleTheme}
      >
        {darkTheme ? (
          <RiSunFill fontSize={25} />
        ) : (
          <RiMoonClearLine fontSize={25} />
        )}
      </button>
    </div>
  )
}

export default function Player() {
  const { setReady, playing } = useSnapshot(appStore)

  const playerRef = useRef()
  const instanceContainerRef = useRef()

  useEffect(() => {
    if (!playerRef.current) return
    playing ? playerRef.current.playVideo() : playerRef.current.pauseVideo()
  }, [playing])

  useEffect(() => {
    global.onYouTubeIframeAPIReady = () => {
      playerRef.current = new global.YT.Player(instanceContainerRef.current, {
        height: '1',
        width: '1',
        videoId: VIDEO_ID,
        events: {
          onReady: setReady
        }
      })
    }
  }, [ setReady ])

  return (
    <div className="select-none">
      <div ref={instanceContainerRef} className="hidden" hidden />
      <Buttons />
    </div>
  )
}
