import React from 'react';
import './SplashScreen.css';

const SplashScreen = ({ onClose }) => {
  return (
    <div className="splash-screen-overlay">
      <div className="splash-screen-card">
        <h2>Can you sort the songs? 🎵</h2>
        <p>Music streaming services like Spotify categorize songs using measurable features, which is then used to cluster and recommend songs together. In this activity, listen to these popular songs and try to sort them into groups based on their similarities, like mood or genre.</p>
        <p>Drag and drop the songs to move them around. Click on the song's album art to hear the song. When you're done sorting, click the features at the bottom of the page see how Spotify's algorithm would group them.</p>
        <p>This activity is best optimized for desktop use. Created by <a href="https://projectnextech.org/">Project NexTech</a></p>
        <button onClick={onClose}>Get Started</button>
      </div>
    </div>
  );
};

export default SplashScreen;
