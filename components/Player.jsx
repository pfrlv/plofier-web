import { RiPlayMiniFill, RiPauseMiniFill } from 'react-icons/ri'

import usePlayer from '@/hooks/usePlayer'
import Footer from '@/components/Footer'

const Button = ({ onClick, children, canplay = false }) => {
  return (
    <button
      onClick={onClick}
      className={`text-white h-[50px] bg-white/5 rounded-[13px] w-[50px] inline-flex justify-center items-center active:scale-95 transition-transform ${!canplay && 'text-white/30 cursor-wait'}`}
    >
      {children}
    </button>
  )
}

const PlayButton = () => {
  const { playing, canplay, play, pause } = usePlayer()

  return (
    <Button onClick={playing ? pause : play} canplay={canplay}>
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
        className="select-none bg-black/20 backdrop-blur-md px-[5px] py-[5px] mb-[25px] sm:mb-0 rounded-[17px]">
        <div className="flex justify-center items-center">
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
