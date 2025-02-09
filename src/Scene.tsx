import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshReflectorMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function Scene() {

  const sphereRef = useRef<THREE.Mesh | null>(null);

  // Sphere animation
  useFrame((state) => {
    const h = 5;
    const speed = 0.2;
    sphereRef.current?.position.set(
        (Math.cos(state.clock.elapsedTime* speed) * h) ,
        3 + (Math.cos(state.clock.elapsedTime* speed * 10) * 2) ,
        (Math.sin(state.clock.elapsedTime* speed) * h) ,
    )
  });

  return (
    <>    
          <color attach="background" args={[0x000000]} />

          <perspectiveCamera position={[0,0,0]} />

          <mesh ref={sphereRef} >
            <sphereGeometry />
            <meshStandardMaterial emissive={0xFF0000} emissiveIntensity={0.5} metalness={0.2} roughness={1} color={0xFF0000} />
          </mesh>

          <ambientLight />
          <directionalLight position={[15, 15, 15]} />

          <mesh  rotation-x={-Math.PI/2}>
            <planeGeometry args={[100, 100]}/>
            <MeshReflectorMaterial
              blur={[300, 300]} // Blur ground reflections (width, height), 0 skips blur
              mixBlur={1.5} // How much blur mixes with surface roughness (default = 1)
              mixStrength={1} // Strength of the reflections
              mixContrast={1} // Contrast of the reflections
              resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
              mirror={1} // Mirror environment, 0 = texture colors, 1 = pick up env colors
              depthScale={1} // Scale the depth factor (0 = no depth, default = 0)
              minDepthThreshold={0.8} // Lower edge for the depthTexture interpolation (default = 0)
              maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
              depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
              distortion={1} // Amount of distortion based on the distortionMap texture
              color={0xFFFFFF}
              reflectorOffset={0} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
            />
        </mesh>

        <OrbitControls/>
          
    </>
  );
}

export default Scene;
