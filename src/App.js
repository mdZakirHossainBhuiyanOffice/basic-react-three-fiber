import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import BreakGround from './components/BreakGround';
import { useEffect, useState } from 'react';
import { Color, Vector3 } from "three";
import * as THREE from "three";
import DrawingLines from './components/DrawingLines';

const InteractiveBall = ({onClick, color, position}) => {
  return <mesh
   onClick={() => {
    onClick()
  }}
  position={position}
  >
    <sphereGeometry args={[10 ,10, 10]} />
    <meshStandardMaterial color={color} />
  </mesh>
}

const getRandomNumber = () => {
  return Math.abs(Math.floor(Math.random() * (1000 - 100000 + 1)) + 1000);
}

const getRandomColor = () => {
  const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  return new THREE.Color(randomColor);;
}

function App() {
  const [ball_1_Color, setBall_1_Color] = useState(getRandomColor);
  const [ball_2_color, setBall_2_color] = useState(getRandomColor);

  const [gameState, setGameState] = useState(false);
  const [clickCounter, setClickCounter] = useState(0);

  useEffect(() => {
    if (ball_1_Color.equals(ball_2_color)) {
      setGameState(true);
    }
    if (clickCounter === 10) {
      setBall_1_Color(ball_1_Color);
      setBall_2_color(ball_2_color);
      setGameState(true);
    }

  }, [ball_1_Color, ball_2_color, clickCounter])

  return (
    <div style={{position: "relative"}}>
      <div style={{background: "grey", height: "100vh", width: "100vw"}}>
        <Canvas camera={{fov: 75, position: [10, 35, 50]}}>
          <ambientLight intensity={0.5}/>
          <spotLight castShadow position={[0, 2, 0]} />
          <directionalLight  position={[0, 10, 10]} />

          <OrbitControls />
          <BreakGround />
          {/* <mesh position={[0, 0, 0]} rotation={[Math.PI * -0.5, 0, 0]}>
            <planeGeometry args={[500, 500]} />
            <meshStandardMaterial color={'#18d6b6'} />
          </mesh> */}
          <InteractiveBall onClick={() => {
              setClickCounter((state) => state += 1)
              setBall_1_Color(getRandomColor())
            }} 
            color={ball_1_Color} position={new Vector3(0, 10, 0)}
          />
          <InteractiveBall onClick={() => {
              setBall_2_color(getRandomColor())
              setClickCounter((state) => state += 1)
            }} 
            color={ball_2_color}
            position={new Vector3(20, 10, 0)} 
          />
          <DrawingLines />
          
        </Canvas>
      </div>
      {
        gameState && 
        <div style={{
          position: "absolute",
          top: "0px",
          left: "0px",
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <div style={{
            width: "auto",
            height: "auto",
            backgroundColor: "rgb(249 215 220 / 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            rowGap: "10px",
            padding: "30px 20px",
            borderRadius: "10px"
          }} >
            <h1 style={{ fontSize: "30px", color: "#effa16", fontWeight: "900" }}>Congrats!</h1>
            <p style={{fontSize: "50px", color: "#84fa16", fontWeight: "900", textAlign: "center"}}>
              You won 
              <span style={{color: "#f76fee", paddingLeft: "10px"}}>${getRandomNumber()}</span>
            </p>
            <button
              style={{padding: "8px 20px", backgroundColor: "#fa78e4", color: "#fff", fontWeight: "700", borderRadius: "0.75rem"}}
              onClick={() => {
                setGameState(false);
                setClickCounter(0);
              }}
            >
              Play Again
            </button>
          </div>
        </div>
      }
    </div>
    
  );
}

export default App;
