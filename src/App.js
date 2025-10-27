import React, { useState } from 'react';
import Palette from './Palette';
import SplashScreen from './SplashScreen';
import AttributeSplashScreen from './AttributeSplashScreen';
import './App.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [selectedAttribute, setSelectedAttribute] = useState(null);

  const handleCloseSplash = () => {
    setShowSplash(false);
  };

  const handleOpenSplash = () => {
    setShowSplash(true);
  };

  const handleAttributeClick = (attribute) => {
    setSelectedAttribute(attribute);
  };

  const handleCloseAttributeSplash = () => {
    setSelectedAttribute(null);
  };

  const [filter, setFilter] = useState(null);

  return (
    <div className="App">
      {showSplash && <SplashScreen onClose={handleCloseSplash} />}
      {selectedAttribute && <AttributeSplashScreen attribute={selectedAttribute} onClose={handleCloseAttributeSplash} />}
      <div className={`main-content ${showSplash ? 'blurred' : ''}`}>
        <Palette filter={filter} />
      </div>
      <footer className="app-footer">
        <button onClick={() => { setFilter('danceability'); handleAttributeClick('danceability'); }}>Danceability</button>
        <button onClick={() => { setFilter('acoustiness'); handleAttributeClick('acoustiness'); }}>Acoustiness</button>
        <button onClick={() => { setFilter('loudness'); handleAttributeClick('loudness'); }}>Loudness</button>
        <button onClick={() => setFilter(null)}>Clear Filter</button>
        <button onClick={handleOpenSplash}>Help</button>
      </footer>
    </div>
  );
}

export default App;
