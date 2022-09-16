import { RiPlayMiniFill, RiPauseMiniFill, RiLoaderFill } from 'react-icons/ri'

import useStreamAudio from '@hooks/use-stream-audio'
import Footer from './Footer'

const Button = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="text-black h-[50px] w-[50px] inline-flex justify-center items-center active:scale-95 transition-transform"
    >
      {children}
    </button>
  )
}

const Plofier = () => {
  const { playing } = useStreamAudio()
  return (
    <div className="w-[50px] h-[50px] inline-flex justify-center items-center">
      <svg
        data-plofier
        className={`w-[35px] block ${playing ? 'is-playing' : ''}`}
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
        <RiLoaderFill fontSize={25} className="animate-spin" />
      </Button>
    )
  }

  return (
    <Button onClick={playing ? pause : play}>
      {playing ? (
        <RiPauseMiniFill fontSize={40} />
      ) : (
        <RiPlayMiniFill fontSize={40} />
      )}
    </Button>
  )
}

export default function Player() {
  return (
    <div className="flex flex-wrap justify-center">
      <div
        className="select-none bg-white px-[5px] py-[5px] mb-[25px] sm:mb-0">
        <div className="flex space-x-[5px] justify-center items-center">
          <Plofier />

          <span className="h-[50px] w-[1px] bg-black/10"></span>

          <PlayButton />

          <div className="hidden sm:block">
            <Footer />
          </div>
        </div>
      </div>

      <div className="sm:hidden text-center">
        <Footer />
      </div>
    </div>
  )
}
