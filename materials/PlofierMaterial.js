import { Vector2 } from 'three'
import { extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'

export const PlofierMaterial = shaderMaterial(
  {
    time: 0.0,
    resolution: new Vector2(0.0, 0.0)
  },
  `
	varying vec2 vUv;

	void main() {
		vec4 modelPosition = modelMatrix * vec4(position, 1.0);
		vec4 viewPosition = viewMatrix * modelPosition;
		vec4 projectionPosition = projectionMatrix * viewPosition;
		gl_Position = projectionPosition;
		vUv = uv;
  }`,
  `
  #define complexity 10.0
	#define fluid_speed 100.0
	#define color_intensity 0.485

	uniform vec2 resolution;
	uniform float time;

	void main() {
		vec2 p = (2.0 * gl_FragCoord.xy - resolution) / max(resolution.x, resolution.y);
		for (float i = 1.0; i < complexity; i++) {
			vec2 np = p + time * 0.01;
			np.x += 1.15 / i * sin(i * p.y + time / fluid_speed + 1.0 * i) + 1.25;
			np.y -= 0.95 / i * cos(i * p.x + time / fluid_speed + 0.5 * i) + 1.25;
			p = np;
		}
		float f1 = color_intensity * sin(1.0 * p.y) + color_intensity;
		float f2 = 0.15 * color_intensity * sin(p.x + p.y) + color_intensity;
		vec3 col = vec3(f1, f2, 0.6);
		gl_FragColor = vec4(col, 1.0);
  }`
)

extend({ PlofierMaterial })
