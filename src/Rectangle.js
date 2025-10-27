import React from 'react';
import './Rectangle.css';

const Rectangle = ({ rect, onMouseDown, onPlaySong, playingSong }) => {
  const handleAlbumArtClick = () => {
    onPlaySong(rect.song);
  };

  const isPlaying = playingSong && playingSong.title === rect.song.title;

  return (
    <div
      className="rectangle"
      style={{
        left: rect.x,
        top: rect.y,
        width: rect.width,
        height: rect.height,
        backgroundColor: rect.color,
      }}
      onMouseDown={e => onMouseDown(e, rect.id)}
    >
      <img src={rect.song.albumArt ? rect.song.albumArt : ''} alt={rect.song.title ? rect.song.title : ''} className="album-art" onClick={handleAlbumArtClick} />
      <div className="song-info">
        <div className="song-title">
          {rect.song.title}
          {isPlaying && <span role="img" aria-label="speaker">🔊</span>}
        </div>
        <div className="artist-name">{rect.song.artist}</div>
      </div>
    </div>
  );
};

export default Rectangle;
