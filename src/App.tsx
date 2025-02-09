import React, { Suspense } from 'react';
import './App.css';
import { Canvas } from '@react-three/fiber';

import Scene from './Scene';

function App() {

  return (
    <div className="App relative w-full h-full bg-black">
      <Suspense fallback={<span>Loading... Please wait!</span>}>
        <Canvas className="w-full h-full"
          camera={{position:[0, 4, -10]}}
        >      
          
          <Scene />
          
        </Canvas> 
      </Suspense>
    </div>
  );
}

export default App;
