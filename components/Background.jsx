import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import { Vector2 } from 'three'

import useStreamAudio from '@hooks/use-stream-audio'
import '../materials/PlofierMaterial'


const ShaderPlane = () => {
  const { playing } = useStreamAudio()
  const materialRef = useRef()
  const viewport = useThree((state) => state.viewport)
  const size = useThree((state) => state.size)
  
  useEffect(() => {
    materialRef.current.resolution = new Vector2(size.width, size.height)
  }, [size])

  useFrame(({}, delta) => {
    if (!playing) return
    materialRef.current.time += delta
  })

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <plofierMaterial ref={materialRef} />
    </mesh>
  )
}

export default function Background() {
  return (
    <div className="w-screen h-screen">
      <Canvas>
        <ShaderPlane />
      </Canvas>
    </div>
  )
}
