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
	uniform vec2 resolution;
	uniform float time;
	
	float map(vec3 pos) {
		
		float ret = 0.0;
		
		ret += length(pos + vec3(
				(sin(time * 0.5 + pos.y * 6.0) - cos(pos.z * 1.823)) * 0.1,
				(cos(time * 0.5 + pos.x * 7.3) - cos(pos.x * 0.956)) * 0.1,
				cos(time * 0.1 - pos.y * 8.0 + pos.x * 4.4) * 0.05));
		
		return ret;
		
	}

	void main()
	{
			vec2 uv = gl_FragCoord.xy/resolution.xy - 1.0;
			uv.x *= (resolution.x / resolution.y);
			
			uv *= 0.75;
			
			vec3 off = vec3(1.0 / resolution.xy, 0.0);
			
			vec3 col = vec3(0.0);
			
			for (int j=0; j < 10; j++) {
				float js = pow(float(j) * 0.075, 2.5);
				vec3 pos = vec3(uv.x, uv.y, js - 0.75);
				float v =
						smoothstep(0.5 + js * 0.75, 0.5, map(pos))
						* smoothstep(0.5, 0.6 + js * 0.3, map(pos + vec3(0.1, 0.2, 0.0)));
				
				float w =
						smoothstep(0.9 + js * 0.75, 0.8, map(pos))
						* smoothstep(0.6, 1.5 + js * 0.25, map(pos - vec3(0.2, 0.1, 0.1)));
				
				col += v * vec3(0.5 + js, 0.5 - js, 1.0);
				col += w * vec3(0.5 + js, 0.0, 0.05 + js);
				col -= dot(pos - 15.5, off);
			}
			
			col /= 10.0;
			
			gl_FragColor = vec4(smoothstep(0.0, 0.55, col), 1.0);
			
	}
  `
)

extend({ PlofierMaterial })
