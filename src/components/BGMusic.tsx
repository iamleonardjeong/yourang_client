import React, { useState, useEffect, MouseEvent } from 'react';
import './BGMusic.css';
import bgMusic from '../music/yourang-home_music.mp3';

function BGMusic(url: any) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [music] = useState(new Audio(bgMusic));

  useEffect(() => {
    isPlaying ? music.play() : music.pause();
  });

  // useEffect(() => {
  //   setTimeout(() => music.play(), 2000);
  //   return music.pause();
  // }, []);

  const toggle = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <button className="home_music-button" onClick={toggle}>
        play/pause
      </button>
    </div>
  );
}

export default BGMusic;
