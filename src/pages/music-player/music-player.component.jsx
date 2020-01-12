import React, { Component } from "react";
import "./music-player.styles.scss";
import $ from "jquery";

//components
import ProgressBar from "../../components/progress-bar/progress-bar.component";
import PlayerInterface from "../../components/player-interface/player-interface.component";

//music
import { Howl } from "howler";
import MUSIC_DATA from "./music-data";

class MusicPlayer extends Component {
  constructor(props) {
    super(props);

    let songsCollection = [];
    MUSIC_DATA.forEach(music => {
      let song = new Howl({
        src: music.songUrl,
        html5: true,
        onend: () => {
          this.nextSong();
          this.resetTimer();
        }
      });
      songsCollection.push(song);
    });

    this.state = {
      musicData: MUSIC_DATA,
      musicAudio: songsCollection,
      random: false,
      playing: false,
      muted: false,
      currentSong: 0,
      volume: 0,
      filter: "",
      timer: false,
      currentTime: 0
    };
  }

  componentDidMount = () => {
    document.querySelector(".header").style.backgroundColor = "black";
  };

  componentWillUnmount = () => {
    this.state.musicAudio[this.state.currentSong].stop();
  };

  handleClickOnSong = (song, info) => {
    this.state.musicAudio.forEach(music => {
      music.stop();
    });
    this.setState({
      currentSong: info.id - 1,
      playing: true
    });
    $("#progress-bar").stop();
    song.play();
    $("#progress-bar").css({ width: 0 });
    this.barProgressing();
  };

  handleVisibility = value => {
    switch (value) {
      case "playing":
        this.setState({
          playing: !this.state.playing
        });
        break;
      case "muted":
        this.setState({
          muted: !this.state.muted
        });
        break;
      case "random":
        this.setState({
          random: !this.state.random
        });
        break;
    }
  };

  handleStart = () => {
    this.state.musicAudio[this.state.currentSong].play();
    this.barProgressing();
    this.setTimer();
  };
  handleStop = () => {
    this.state.musicAudio[this.state.currentSong].pause();
    $("#progress-bar").stop();
  };

  previousSong = () => {
    this.state.musicAudio[this.state.currentSong].stop();
    $("#progress-bar").stop();
    $("#progress-bar").css({ width: 0 });

    if (this.state.currentSong == 0) {
      this.state.musicAudio[this.state.currentSong].play();
    } else {
      this.setState({ currentSong: this.state.currentSong - 1 }, () =>
        this.handleStart()
      );
    }
  };

  nextSong = () => {
    const length = this.state.musicData.length;
    this.state.musicAudio[this.state.currentSong].stop();
    $("#progress-bar").stop();
    $("#progress-bar").css({ width: 0 });

    if (!this.state.random) {
      if (this.state.currentSong === length - 1) {
        this.setState({ currentSong: 0 }, () => this.handleStart());
      } else {
        this.setState({ currentSong: this.state.currentSong + 1 }, () =>
          this.handleStart()
        );
      }
    } else {
      let ran = Math.round(Math.random() * length) - 1;
      this.setState({ currentSong: ran }, () => this.handleStart());
    }
    if (!this.state.playing) {
      this.setState({
        playing: !this.state.playing
      });
    }
  };

  changeVolume = value => {
    this.state.musicAudio[this.state.currentSong].volume(value);
  };

  barProgressing = () => {
    let duration = Math.round(
      this.state.musicAudio[this.state.currentSong]._duration
    );
    const length = duration - this.state.currentTime;
    $("#progress-bar").animate(
      {
        width: "100%"
      },
      length * 1000
    );
  };

  resetTimer = () => {
    this.setState({
      currentTime: 0
    });
    this.setTimer();
  };

  setTimer = () => {
    clearInterval(window.timer);
    window.timer = setInterval(() => {
      this.setState({
        currentTime: this.state.currentTime + 1
      });
    }, 1000);
  };

  searchSong = e => {
    this.setState({ filter: e.target.value.toUpperCase() });
    if (e.target.value !== "") {
      document.querySelector(".delete").classList.remove("hidden");
    } else {
      document.querySelector(".delete").classList.add("hidden");
    }
  };

  clearSearch = () => {
    this.setState({
      filter: ""
    });
    document.getElementById("search-input").value = "";
    document.querySelector(".delete").classList.add("hidden");
  };

  render() {
    return (
      <div className="music-player">
        <div className="application">
          <div className="top">
            {/* <PlayerMenu /> */}
            <PlayerInterface
              musicAudio={this.state.musicAudio}
              musicData={this.state.musicData}
              handlePlay={this.handleClickOnSong}
              currentSong={this.state.currentSong}
              filter={this.state.filter}
              searchSong={this.searchSong}
              setTimer={this.setTimer}
              resetTimer={this.resetTimer}
              clearSearch={this.clearSearch}
            />
          </div>
          <div className="bottom">
            <ProgressBar
              random={this.state.random}
              playing={this.state.playing}
              muted={this.state.muted}
              handleVisibility={this.handleVisibility}
              handleStart={this.handleStart}
              handleStop={this.handleStop}
              nextSong={this.nextSong}
              previousSong={this.previousSong}
              currentSong={this.state.currentSong}
              musicData={this.state.musicData}
              changeVolume={this.changeVolume}
              musicAudio={this.state.musicAudio}
              currentTime={this.state.currentTime}
              setTimer={this.setTimer}
              resetTimer={this.resetTimer}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MusicPlayer;
