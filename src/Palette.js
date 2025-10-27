import React, { useState, useEffect, useRef } from 'react';
import Rectangle from './Rectangle';
import './Palette.css';

const Palette = ({ filter }) => {
  const [rectangles, setRectangles] = useState([]);
  const [originalRectangles, setOriginalRectangles] = useState([]);
  const [dragging, setDragging] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [audio, setAudio] = useState(null);
  const [isSorting, setIsSorting] = useState(false);
  const paletteRef = useRef(null);

  useEffect(() => {
    const initialRectangles = [
      { id: 1, x: 10, y: 10, width: 300, height: 100, color: '#ff0000', group: 1, song: { title: 'Bad Guy', artist: 'Billie Eilish', albumArt: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-Iz3wv4AIVC5XV-n9NhmUffdYj5JnlJou1A&s', previewUrl: '/song1.mp3', danceability: 0.701, acoustiness: 0.328, loudness: -10.97 } },
      { id: 2, x: 10, y: 120, width: 300, height: 100, color: '#00ff00', group: 1, song: { title: 'Blinding Lights', artist: 'The Weeknd', albumArt: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFQgiX0FcuWwZzn85SlbrtQnwnMgAdgWfm7A&s', previewUrl: '/song2.mp3', danceability: 0.8, acoustiness: 0.05, loudness: -5.0 } },
      { id: 3, x: 320, y: 10, width: 300, height: 100, color: '#0000ff', group: 2, song: { title: 'Uptown Funk (ft. Bruno Mars)', artist: 'Mark Ronson', albumArt: 'https://i.scdn.co/image/ab67616d0000b273e419ccba0baa8bd3f3d7abf2', previewUrl: '/song3.mp3', danceability: 0.85, acoustiness: 0.01, loudness: -3.0 } },
      { id: 4, x: 320, y: 120, width: 300, height: 100, color: '#ffff00', group: 2, song: { title: 'Don\'t Start Now', artist: 'Dua Lipa', albumArt: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjh-LepHUfMI0dYEGxP7lbdFa6f2USO-hppg&s', previewUrl: '/song4.mp3', danceability: 0.793, acoustiness: 0.0123, loudness: -4.521 } },
      { id: 5, x: 630, y: 10, width: 300, height: 100, color: '#ff00ff', group: 3, song: { title: 'Driver\'s License', artist: 'Olivia Rodrigo', albumArt: 'https://upload.wikimedia.org/wikipedia/en/0/09/Drivers_License_by_Olivia_Rodrigo.png', previewUrl: '/song5.mp3', danceability: 0.4, acoustiness: 0.7, loudness: -8.0 } },
      { id: 6, x: 630, y: 120, width: 300, height: 100, color: '#00ffff', group: 3, song: { title: 'You Belong With Me (Taylor\'s Version)', artist: 'Taylor Swift', albumArt: 'https://i.scdn.co/image/ab67616d0000b273a48964b5d9a3d6968ae3e0de', previewUrl: '/song6.mp3', danceability: 0.65, acoustiness: 0.1, loudness: -6.0 } },
    ];
    setRectangles(initialRectangles);
    setOriginalRectangles(initialRectangles);
  }, []);

  useEffect(() => {
    if (filter) {
      setIsSorting(true);
      const paletteWidth = paletteRef.current ? paletteRef.current.offsetWidth : 0;
      const sectionWidth = paletteWidth / 3;
      const yOffsets = [50, 50, 50];

      let values = rectangles.map(r => r.song[filter]);
      let minVal = Math.min(...values);
      let maxVal = Math.max(...values);

      const newRectangles = rectangles.map(rect => {
        let value = rect.song[filter];
        if (filter === 'loudness') {
          value = (value - minVal) / (maxVal - minVal);
        }

        let section = 0;
        if (value >= 0.66) {
          section = 2;
        } else if (value >= 0.33) {
          section = 1;
        }

        const x = (section * sectionWidth) + (sectionWidth - rect.width) / 2;
        const y = yOffsets[section];
        yOffsets[section] += rect.height + 10;

        return { ...rect, x, y };
      });

      setRectangles(newRectangles);
    } else {
      setIsSorting(false);
      setRectangles(originalRectangles);
    }
  }, [filter, originalRectangles]);

  const handleMouseDown = (e, id) => {
    if (isSorting) return;
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
    <div className="palette" ref={paletteRef} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
          <div className="background-section" style={{ backgroundColor: '#cccccc' }}>
            <h3>Low</h3>
          </div>
          <div className="background-section" style={{ backgroundColor: '#dddddd' }}>
            <h3>Middle</h3>
          </div>
          <div className="background-section" style={{ backgroundColor: '#eeeeee' }}>
            <h3>High</h3>
          </div>
          {rectangles.map(rect => (
            <Rectangle key={rect.id} rect={rect} onMouseDown={handleMouseDown} onPlaySong={handlePlaySong} />
          ))}
    </div>
  );
};

export default Palette;
