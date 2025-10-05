import React, { useState, useEffect } from 'react';
import Rectangle from './Rectangle';
import './Palette.css';

const Palette = () => {
  const [rectangles, setRectangles] = useState([]);
  const [dragging, setDragging] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setRectangles([
      { id: 1, x: 10, y: 10, width: 300, height: 100, color: '#ff0000', group: 1, song: { title: 'Song 1', artist: 'Artist 1', albumArt: '' } },
      { id: 2, x: 10, y: 120, width: 300, height: 100, color: '#00ff00', group: 1, song: { title: 'Song 2', artist: 'Artist 2', albumArt: '' } },
      { id: 3, x: 320, y: 10, width: 300, height: 100, color: '#0000ff', group: 2, song: { title: 'Song 3', artist: 'Artist 3', albumArt: '' } },
      { id: 4, x: 320, y: 120, width: 300, height: 100, color: '#ffff00', group: 2, song: { title: 'Song 4', artist: 'Artist 4', albumArt: '' } },
      { id: 5, x: 630, y: 10, width: 300, height: 100, color: '#ff00ff', group: 3, song: { title: 'Song 5', artist: 'Artist 5', albumArt: '' } },
      { id: 6, x: 630, y: 120, width: 300, height: 100, color: '#00ffff', group: 3, song: { title: 'Song 6', artist: 'Artist 6', albumArt: '' } },
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
            <Rectangle key={rect.id} rect={rect} onMouseDown={handleMouseDown} />
          ))}
    </div>
  );
};

export default Palette;
