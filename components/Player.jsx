import { RiPlayMiniFill, RiPauseMiniFill, RiGithubFill } from 'react-icons/ri'

import usePlayer from '@/hooks/usePlayer'
import Footer from '@/components/Footer'

const Button = ({ className, children, href, ...props }) => {
  let classNames = [
    'text-white h-[50px] bg-white/5 rounded-[13px] w-[50px] inline-flex justify-center items-center hover:ring-2 hover:ring-white/10 hover:ring-inset active:scale-95 transition',
    className
  ]
    .filter(Boolean)
    .join(' ')
    .trim()

  if (href) {
    return (
      <a className={classNames} href={href} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button className={classNames} {...props}>
      {children}
    </button>
  )
}

const PlayButton = () => {
  const { playing, canplay, play, pause } = usePlayer()

  return (
    <Button
      onClick={playing ? pause : play}
      className={!canplay && '!text-white/30 pointer-events-none'}
      aria-label="Toggle"
    >
      {playing ? (
        <RiPauseMiniFill fontSize={40} />
      ) : (
        <RiPlayMiniFill fontSize={40} />
      )}
    </Button>
  )
}

const GithubButton = () => {
  return (
    <Button
      aria-label="Got to Github"
      href="https://github.com/pfrlv/plofier-web"
      rel="noopener noreferrer"
      target="_blank"
    >
      <RiGithubFill fontSize={40} />
    </Button>
  )
}

export default function Player() {
  return (
    <div className="flex flex-wrap justify-center">
      <div className="select-none bg-black/20 backdrop-blur-md px-[5px] py-[5px] mb-[25px] sm:mb-0 rounded-[17px]">
        <div className="flex justify-center items-center">
          <div className="flex space-x-[5px]">
            <PlayButton />
            <GithubButton />
          </div>

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
