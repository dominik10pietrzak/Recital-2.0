import React from "react";
import "./player-interface.styles.scss";

import img from "../../assets/cancel.png";

import SongButton from "../song-button/song-button.component";

const PlayerInterface = ({
  musicAudio,
  musicData,
  handlePlay,
  currentSong,
  filter,
  searchSong,
  setTimer,
  resetTimer,
  clearSearch
}) => {
  return (
    <div className="player-interface">
      <div className="search-bar">
        <form className="search">
          <input
            id="search-input"
            type="text"
            placeholder="Type to search..."
            onChange={searchSong}
          />
          <img
            className="delete hidden"
            src={img}
            alt="delete"
            onClick={clearSearch}
          />
        </form>
        <h1>Player</h1>
      </div>
      {musicData
        .filter(
          song =>
            song.title.toUpperCase().includes(filter) ||
            song.author.toUpperCase().includes(filter) ||
            song.album.toUpperCase().includes(filter)
        )
        .map((song, index) => (
          <SongButton
            key={index}
            musicAudio={musicAudio}
            musicData={song}
            handlePlay={handlePlay}
            setTimer={setTimer}
            resetTimer={resetTimer}
          />
        ))}
    </div>
  );
};

export default PlayerInterface;
