import {
  RiPlayFill,
  RiMoonClearLine,
  RiSunFill,
  RiPauseFill,
  RiLoader4Line
} from 'react-icons/ri'

import useStreamAudio from 'hooks/useStreamAudio'
import useTheme from 'hooks/useTheme'

const ICONS_SIZE = 25

const Button = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="text-neutral-200 dark:text-neutral-900 uppercase tracking-wider text-xs bg-black dark:bg-neutral-50 h-[50px] w-[50px] inline-flex justify-center items-center rounded-[13px] active:scale-95 transition-transform"
    >
      {children}
    </button>
  )
}

const Plofier = () => {
  const { playing } = useStreamAudio()
  return (
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
  )
}

const PlayButton = () => {
  const { playing, canplay, play, pause } = useStreamAudio()

  if (!canplay) {
    return (
      <Button>
        <RiLoader4Line fontSize={ICONS_SIZE} className="animate-spin" />
      </Button>
    )
  }

  return (
    <Button onClick={playing ? pause : play}>
      {playing ? (
        <RiPauseFill fontSize={ICONS_SIZE} />
      ) : (
        <RiPlayFill fontSize={ICONS_SIZE} />
      )}
    </Button>
  )
}

const ThemeButton = () => {
  const { toggleTheme, darkTheme } = useTheme()

  return (
    <Button onClick={toggleTheme}>
      {darkTheme ? (
        <RiSunFill fontSize={ICONS_SIZE} />
      ) : (
        <RiMoonClearLine fontSize={ICONS_SIZE} />
      )}
    </Button>
  )
}


export default function Player() {
  const { playing } = useStreamAudio()

  return (
    <div className="select-none">
      <div
        style={{ '--tw-translate-y': playing ? '45px' : '0px' }}
        className="flex space-x-[5px] justify-center transition transform-gpu duration-500 ease-out"
      >
        <Plofier />
        <PlayButton />
        <ThemeButton />
      </div>
    </div>
  )
}
