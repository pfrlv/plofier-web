import Background from '@/components/Background'
import Player from '@/components/Player'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Background />
      <div className="absolute bottom-[25px] left-[50%] -translate-x-[50%]">
        <Player />
      </div>
    </>
  )
}
