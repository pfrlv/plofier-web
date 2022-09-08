import { RiExternalLinkLine } from 'react-icons/ri'

import appStore from '@/stores/app'
import { useSnapshot } from 'valtio'

export default function Footer() {
  const { playing } = useSnapshot(appStore)
  
  return (
    <div
      className={`editor text-xs text-neutral-400 max-w-[300px] text-center transition duration-500 ease-out transform-gpu ${playing ? 'translate-y-[35px] opacity-0 pointer-events-none' : ''}`}>
      A simple web app for background music from the popular
      YouTube channel{' '}
      <a
        href="https://www.youtube.com/c/LofiGirl"
        rel="noopener noreferrer"
        target="_blank"
      >
        Lofi Girl
      </a>
      .
      <br />
      Just music, no GPU load, no ugly UI.
      <br />
      <a href="" rel="noopener noreferrer" target="_blank">
        Use as App <RiExternalLinkLine size={12} />
      </a>
    </div>
  )
}
