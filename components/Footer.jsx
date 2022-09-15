// import { RiExternalLinkLine } from 'react-icons/ri'

export default function Footer() {
  return (
    <div className="editor text-[11px] leading-[15px] text-white/60 sm:text-gray-400 w-[300px] sm:w-auto sm:max-w-[250px] px-[10px]">
      Simple web app for background music from the 
      <a href="https://boxradio.net/" rel="noopener noreferrer" target="_blank">
        Box Radio
      </a>
      . Work, study and relax.{' '}
      {/* <a
        href=""
        rel="noopener noreferrer"
        target="_blank"
        className="whitespace-nowrap"
      >
        Use as App <RiExternalLinkLine size={12} />
      </a> */}
    </div>
  )
}
