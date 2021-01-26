import React, { useState, useEffect } from 'react';
import bgMusic from '../music/bgm_home.mp3';

function BGMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [music] = useState(new Audio(bgMusic));

  useEffect(() => {
    isPlaying ? music.play() : music.pause();
  });

  const toggle = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div onClick={toggle} style={{ cursor: 'pointer' }}>
      {isPlaying ? 'BGM Off' : 'BGM On'}
    </div>
  );
}

export default BGMusic;
