const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const progressCont = document.getElementById("progress-container");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const progress = document.getElementById("progress");
let isPlaying = false;

const songs = [
  {
    name: "Jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "Jacinto Design",
  },
  {
    name: "Jacinto-2",
    displayName: "Seven Nation army (Remix)",
    artist: "Jacinto Design",
  },
  {
    name: "Jacinto-3",
    displayName: "Goodnight Disco Queen",
    artist: "Jacinto Design",
  },
  {
    name: "metric-1",
    displayName: "Front row (Remix)",
    artist: "Metric/Jacinto Design",
  },
];

//play

function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("tittle", "pause");
  music.play();
}
//pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("tittle", "play");

  music.pause();
}

// play or pause
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));
function load(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `${song.name}.mp3`;
  image.src = `${song.name}.jpg`;
}

let songIndex = 0;
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  console.log(songIndex);
  load(songs[songIndex]);
  playSong();
}
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  console.log(songIndex);
  load(songs[songIndex]);
  playSong();
}

load(songs[songIndex]);

function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    //console.log(duration, currentTime);
    //upsate progress bar
    const progressPresent = (currentTime / duration) * 100;
    progress.style.width = `${progressPresent}%`;
    // calculate
    const durationMin = Math.floor(duration / 60);
    //console.log("minutes", durationMin);
    let durationSecond = Math.floor(duration % 60);
    if (durationSecond < 10) {
      durationSecond = `0${durationSecond}`;
    }
    console.log("second", durationSecond);
    if (durationSecond) {
      durationEl.textContent = `${durationMin}:${durationSecond}`;
    }
    const currentMin = Math.floor(currentTime / 60);

    let currentSecond = Math.floor(currentTime % 60);
    if (currentSecond < 10) {
      currentSecond = `0${currentSecond}`;
    }
    currentTimeEl.textContent = `${currentMin}:${currentSecond}`;
  }
}

// set progress bar
function setProgressBar(e) {
  //console.log(e);
  const width = this.clientWidth;
  //console.log("width", width);
  const clickX = e.offsetX;
  // console.log("clickX", clickX);
  const { duration } = music;
  //console.log(clickX / width);
  //console.log((clickX / width) * duration);
  music.currentTime = (clickX / width) * duration;
}

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressCont.addEventListener("click", setProgressBar);
music.addEventListener("ended", nextSong);
