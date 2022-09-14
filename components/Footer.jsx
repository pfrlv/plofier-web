import { RiExternalLinkLine } from 'react-icons/ri'
import useStreamAudio from 'hooks/useStreamAudio'

export default function Footer() {
  const { playing } = useStreamAudio()

  return (
    <div
      className={`editor text-xs text-neutral-400 max-w-[300px] text-center transition duration-500 ease-out transform-gpu ${
        playing ? 'translate-y-[35px] opacity-0 pointer-events-none' : ''
      }`}
    >
      A simple web app for background music from the 
      <a href="https://boxradio.net/" rel="noopener noreferrer" target="_blank">
        Box Radio
      </a>
      .{' '}
      Just music, no GPU load, no ugly UI. {' '}
      <a href="" rel="noopener noreferrer" target="_blank" className="whitespace-nowrap">
        Use as App <RiExternalLinkLine size={12} />
      </a>
    </div>
  )
}
