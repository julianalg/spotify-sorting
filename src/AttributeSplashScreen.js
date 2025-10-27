import React from 'react';
import './AttributeSplashScreen.css';

const AttributeSplashScreen = ({ attribute, onClose }) => {
  const attributeExplanations = {
    danceability: 'Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.',
    acoustiness: 'A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.',
    loudness: 'The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typical range between -60 and 0 db.',
  };

  return (
    <div className="attribute-splash-screen" onClick={onClose}>
      <div className="attribute-splash-content">
        <h2>{attribute}</h2>
        <p>{attributeExplanations[attribute]}</p>
      </div>
    </div>
  );
};

export default AttributeSplashScreen;
