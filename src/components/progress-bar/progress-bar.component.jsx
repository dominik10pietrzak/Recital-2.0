import React, { Component } from "react";
import "./progress-bar.styles.scss";
import $ from "jquery";

const ProgressBar = ({
  random,
  playing,
  muted,
  handleVisibility,
  handleStart,
  handleStop,
  nextSong,
  previousSong,
  currentSong,
  musicData,
  changeVolume,
  musicAudio,
  currentTime,
  setTimer,
  resetTimer,
}) => {
  let length = Math.round(musicAudio[currentSong]._duration);
  let lengthMinutes = Math.floor(length / 60);
  let lengthSeconds = length % 60;
  if (lengthSeconds < 10) {
    lengthSeconds = "0" + lengthSeconds;
  }

  // const setTimer = () => {
  //   clearInterval(window.timer);
  //   startTimer();
  //   window.timer = setInterval(() => {
  //     addSecond();
  //   }, 1000);
  // };

  // const pauseTimer = () => {
  //   clearInterval(window.timer);
  // };

  let minutesPassed = Math.floor(currentTime / 60);
  let secondsPassed = currentTime % 60;
  if (secondsPassed < 10) {
    secondsPassed = "0" + secondsPassed;
  }

  let minutesRemaining = lengthMinutes - minutesPassed;
  let secondsRemaining = lengthSeconds - secondsPassed;
  if (secondsRemaining < 0) {
    secondsRemaining = 60 - secondsPassed + 1;
    minutesRemaining--;
  }
  if (secondsRemaining < 10) {
    secondsRemaining = "0" + secondsRemaining;
  }

  return (
    <div className="progress-bar">
      <div className="left">
        <div className="random">
          {random ? (
            <i
              class="fas fa-random"
              onClick={() => handleVisibility("random")}
            ></i>
          ) : (
            <i
              class="fas fa-long-arrow-alt-right"
              onClick={() => handleVisibility("random")}
            ></i>
          )}
        </div>
      </div>
      <div className="middle">
        <div className="bar">
          <div className="progress">
            <div id="progress-bar"></div>
          </div>
          <div className="timer">
            <div>
              {minutesPassed}:{secondsPassed}
            </div>
            <div>
              -{minutesRemaining}:{secondsRemaining}
            </div>
          </div>
        </div>
        <div className="buttons">
          <div className="song-info">
            <img src={musicData[currentSong].coverUrl} alt="cover" />
            <div>
              <h5>{musicData[currentSong].title}</h5>
              <h6>{musicData[currentSong].author}</h6>
            </div>
          </div>
          <div className="action-buttons">
            <div
              className="previous"
              onClick={() => {
                previousSong();
                resetTimer();
              }}
            >
              <i class="fas fa-backward"></i>
            </div>
            <div className="play-pause">
              {playing ? (
                <i
                  class="fas fa-pause"
                  onClick={() => {
                    handleVisibility("playing");
                    handleStop();
                    clearInterval(window.timer);
                  }}
                ></i>
              ) : (
                <i
                  class="fas fa-play"
                  onClick={() => {
                    handleVisibility("playing");
                    handleStart();
                    setTimer();
                  }}
                ></i>
              )}
            </div>
            <div
              className="next"
              onClick={() => {
                nextSong();
                resetTimer();
              }}
            >
              <i class="fas fa-forward"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="right">
        <div className="volume">
          {muted ? (
            <i
              class="fas fa-volume-off"
              onClick={() => {
                handleVisibility("muted");
                changeVolume(1);
              }}
            ></i>
          ) : (
            <i
              class="fas fa-volume-up"
              onClick={() => {
                handleVisibility("muted");
                changeVolume(0);
              }}
            ></i>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
