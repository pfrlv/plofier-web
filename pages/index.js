import Head from 'next/head'

import Background from '@/components/Background'
import Player from '@/components/Player'

import { initPlayer } from '@/hooks/usePlayer'

export default function Home() {
  initPlayer()

  return (
    <>
      <Head>
        <title>Plofier</title>
        <meta
          name="description"
          content="Work, study and relax with simple web app for background music"
        />
      </Head>

      <Background />

      <div className="absolute bottom-[25px] left-[50%] -translate-x-[50%]">
        <Player />
      </div>
    </>
  )
}
