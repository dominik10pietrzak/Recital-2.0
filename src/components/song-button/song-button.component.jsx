import React from "react";
import "./song-button.styles.scss";

const SongButton = ({
  key,
  musicAudio,
  musicData,
  handlePlay,
  setTimer,
  resetTimer
}) => {
  return (
    <div
      className="song-button"
      onClick={() => {
        handlePlay(musicAudio[musicData.id - 1], musicData);
        resetTimer();
        setTimer();
      }}
    >
      <img className="song-cover" src={musicData.coverUrl} alt="cover" />
      <div className="song-description">
        <h3 className="title">{musicData.title}</h3>
        <div className="others">
          <span className="author">{musicData.author}</span>
          <span className="year">{musicData.relaseYear}</span>
          <span className="album">{musicData.album}</span>
        </div>
      </div>
    </div>
  );
};

export default SongButton;
