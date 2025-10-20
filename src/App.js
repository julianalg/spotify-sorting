import React, { useState } from 'react';
import Palette from './Palette';
import SplashScreen from './SplashScreen';
import './App.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleCloseSplash = () => {
    setShowSplash(false);
  };

  const handleOpenSplash = () => {
    setShowSplash(true);
  };

  return (
    <div className="App">
      {showSplash && <SplashScreen onClose={handleCloseSplash} />}
      <div className={`main-content ${showSplash ? 'blurred' : ''}`}>
        <Palette />
      </div>
      <footer className="app-footer">
        <button onClick={handleOpenSplash}>Help</button>
      </footer>
    </div>
  );
}

export default App;
