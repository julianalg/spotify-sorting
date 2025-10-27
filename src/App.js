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

  const [filter, setFilter] = useState(null);

  return (
    <div className="App">
      {showSplash && <SplashScreen onClose={handleCloseSplash} />}
      <div className={`main-content ${showSplash ? 'blurred' : ''}`}>
        <Palette filter={filter} />
      </div>
      <footer className="app-footer">
        <button onClick={() => setFilter('danceability')}>Danceability</button>
        <button onClick={() => setFilter('acoustiness')}>Acoustiness</button>
        <button onClick={() => setFilter('loudness')}>Loudness</button>
        <button onClick={() => setFilter(null)}>Clear Filter</button>
        <button onClick={handleOpenSplash}>Help</button>
      </footer>
    </div>
  );
}

export default App;
