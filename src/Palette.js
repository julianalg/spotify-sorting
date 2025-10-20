import React, { useState, useEffect } from 'react';
import Rectangle from './Rectangle';
import './Palette.css';

const Palette = () => {
  const [rectangles, setRectangles] = useState([]);
  const [dragging, setDragging] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    setRectangles([
      { id: 1, x: 10, y: 10, width: 300, height: 100, color: '#ff0000', group: 1, song: { title: 'Bad Guy', artist: 'Billie Eilish', albumArt: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-Iz3wv4AIVC5XV-n9NhmUffdYj5JnlJou1A&s', previewUrl: '/song1.mp3' } },
      { id: 2, x: 10, y: 120, width: 300, height: 100, color: '#00ff00', group: 1, song: { title: 'Blinding Lights', artist: 'The Weeknd', albumArt: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFQgiX0FcuWwZzn85SlbrtQnwnMgAdgWfm7A&s', previewUrl: '/song2.mp3' } },
      { id: 3, x: 320, y: 10, width: 300, height: 100, color: '#0000ff', group: 2, song: { title: 'Uptown Funk (ft. Bruno Mars)', artist: 'Mark Ronson', albumArt: 'https://i.scdn.co/image/ab67616d0000b273e419ccba0baa8bd3f3d7abf2', previewUrl: '/song3.mp3' } },
      { id: 4, x: 320, y: 120, width: 300, height: 100, color: '#ffff00', group: 2, song: { title: 'Don\'t Start Now', artist: 'Dua Lipa', albumArt: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjh-LepHUfMI0dYEGxP7lbdFa6f2USO-hppg&s', previewUrl: '/song4.mp3' } },
      { id: 5, x: 630, y: 10, width: 300, height: 100, color: '#ff00ff', group: 3, song: { title: 'Driver\'s License', artist: 'Olivia Rodrigo', albumArt: 'https://upload.wikimedia.org/wikipedia/en/0/09/Drivers_License_by_Olivia_Rodrigo.png', previewUrl: '/song5.mp3' } },
      { id: 6, x: 630, y: 120, width: 300, height: 100, color: '#00ffff', group: 3, song: { title: 'You Belong With Me (Taylor\'s Version)', artist: 'Taylor Swift', albumArt: 'https://i.scdn.co/image/ab67616d0000b273a48964b5d9a3d6968ae3e0de', previewUrl: '/song6.mp3' } },
    ]);
  }, []);

  const handleMouseDown = (e, id) => {
    const rect = rectangles.find(r => r.id === id);
    setDragging(id);
    setOffset({
      x: e.clientX - rect.x,
      y: e.clientY - rect.y,
    });
  };

  const handleMouseMove = (e) => {
    if (dragging !== null) {
      const newRectangles = rectangles.map(rect => {
        if (rect.id === dragging) {
          return { ...rect, x: e.clientX - offset.x, y: e.clientY - offset.y };
        }
        return rect;
      });
      setRectangles(newRectangles);
    }
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  const handlePlaySong = (song) => {
    console.log("Playing song:", song);
    if (audio) {
      console.log("Pausing previous audio");
      audio.pause();
    }
    const newAudio = new Audio(song.previewUrl);
    console.log("New audio created:", newAudio);
    newAudio.addEventListener('error', (e) => {
      console.error("Audio Error:", e);
    });
    newAudio.play().then(() => {
      console.log("Playback started");
    }).catch(error => {
      console.error("Playback Error:", error);
    });
    setAudio(newAudio);
  };

  return (
    <div className="palette" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
          <div className="background-section" style={{ backgroundColor: '#cccccc' }}>
            <h3>Group 1</h3>
          </div>
          <div className="background-section" style={{ backgroundColor: '#dddddd' }}>
            <h3>Group 2</h3>
          </div>
          <div className="background-section" style={{ backgroundColor: '#eeeeee' }}>
            <h3>Group 3</h3>
          </div>
          {rectangles.map(rect => (
            <Rectangle key={rect.id} rect={rect} onMouseDown={handleMouseDown} onPlaySong={handlePlaySong} />
          ))}
    </div>
  );
};

export default Palette;
