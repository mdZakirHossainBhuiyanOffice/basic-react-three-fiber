import { useTexture } from '@react-three/drei';
import React from 'react';
import floor from "../texure/ground/4444.jpg"

const BreakGround = () => {
    const textureMap = useTexture(floor);
    return (
        <mesh position={[0, 0, 0]} rotation={[Math.PI * -0.5]}>
            <planeGeometry args={[500, 500]} />
            <meshStandardMaterial map={textureMap} />
        </mesh>
    );
};

export default BreakGround;