import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';

const DrawingLines = (props) => {
    const cubeRef = useRef();
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)

    useFrame((state, delta) => {
        cubeRef.current.rotation.x += delta;
    });

  return (
    <mesh
        {...props}
        position={[30, 30, 30]}
        ref={cubeRef}
        scale={active ? 1.5 : 1}
        onClick={(event) => setActive(!active)}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[10, 10, 10]} />
      <meshBasicMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
};

export default DrawingLines;