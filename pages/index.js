import Head from 'next/head'

import Player from '@/components/Player'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[65%] space-y-[25px] w-[300px]">
      <Player />
      <Footer />
    </div>
  )
}
