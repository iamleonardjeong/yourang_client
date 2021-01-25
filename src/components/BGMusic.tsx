import React, { useState, useEffect, MouseEvent } from 'react';
import './BGMusic.css';
//music
import bgMusic from '../music/yourang-home_music.mp3';
// image
import musicMute from '../image/music-mute.png';
import musicPlay from '../image/music-play.png';

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
    <div onClick={toggle} style={{ cursor: 'pointer' }}>
      {isPlaying ? 'BGM Off' : 'BGM On'}
      {/* <button className="home_music-button" onClick={toggle}>
        {d}
      </button> */}
      {/* <img
        className="music-button"
        onClick={toggle}
        src={isPlaying ? musicPlay : musicMute}
        alt=""
      /> */}
    </div>
  );
}

export default BGMusic;
