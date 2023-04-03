// Get references to HTML elements
const audio = document.getElementById("my-audio");
const backgroundCard = document.querySelector(".background-card");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");
const playButton = document.querySelector(".play-button");
const playIcon = document.getElementById("play-icon");
const progressBar = document.getElementById("progress-bar");
const volumeControl = document.getElementById("volume-control");
const playCount = document.getElementById("play-count");

const songInfo = document.querySelector(".song-info");
const songTitle = document.getElementById("song-title");
const artistName = document.getElementById("artist-name");
const albumCover = document.getElementById("album-cover");
const songLibrary = document.querySelector(".song-library");
const songDatabase = document.querySelector(".song-database");
const songContent = document.querySelector(".song-content");

const databaseSongs = document.querySelectorAll(".song");

const songDatabaseModal = document.getElementById("song-database-modal");
const exploreSongsButton = document.getElementById("explore-songs");
const closeIcon = document.getElementsByClassName("close")[0];

const likeIcons = document.querySelectorAll(".like-icon");
const likeSongWrapper = document.querySelector(".like-song-wrapper");
const likedSongs = document.querySelectorAll(".liked-song");

const removeSongButton = document.getElementById("remove-song");

// Array of objects representing the songs in the database
const songStorage = [
  {
    title: "Give Life Back to Music",
    album: "Random Access Memories",
    artist: "Daft Punk",
    source: "songs/Daft Punk - Give Life Back to Music.mp3",
    cover: "images/album-covers/random-access-memories.jpeg",
    id: 1
  },
  {
    title: "I Feel It Coming",
    album: "Starboy",
    artist: "The Weeknd, Daft Punk",
    source: "songs/The Weeknd - I Feel It Coming.mp3",
    cover: "images/album-covers/starboy.jpg",
    id: 2
  },
  {
    title: "The Way I Are",
    album: "Shock Value",
    artist: "Timbaland",
    source: "songs/Timbaland - The Way I Are.mp3",
    cover: "images/album-covers/shock-value.jpg",
    id: 3
  },
  {
    title: "Digital Love",
    album: "Discovery",
    artist: "Daft Punk",
    source: "songs/Daft Punk - Digital Love.mp3",
    cover: "images/album-covers/discovery.png",
    id: 4
  },
  {
    title: "Safe and Sound",
    album: "Woman",
    artist: "Justice",
    source: "songs/Justice - Safe and Sound.mp3",
    cover: "images/album-covers/woman.jpeg",
    id: 5
  }
];

// Initialize a counter and retrieve the previous value from local storage
let counter = 0;
const storedCounter = localStorage.getItem("playCount");
if (storedCounter) {
  counter = Number(storedCounter);
  playCount.textContent = "Number of plays: " + counter.toString();
}

// A function to increment the play counter and update the value displayed to the user
function incrementPlayCounter() {
  if (audio.currentTime === 0) {
    counter++;
    localStorage.setItem("playCount", Number(counter));
    playCount.textContent = "Number of plays: " + counter.toString();
  }
}

function changePlayButtonClass() {
  if (playIcon.className === "fa-solid fa-play") {
    playIcon.className = "fa-solid fa-pause";
  } else {
    playIcon.className = "fa-solid fa-play";
  }
}

function playSong(event) {
  if (event.target.className === "liked-song") {
    const clickedSongId = parseInt(event.target.getAttribute("id"));
    const clickedSong = songStorage.find(song => song.id === clickedSongId);
    if (clickedSong) {
      songTitle.textContent = clickedSong.title;
      artistName.textContent = `${clickedSong.artist} | ${clickedSong.album}`;
      albumCover.src = clickedSong.cover;
      audio.src = clickedSong.source;
    }
    if (playIcon.className === "fa-solid fa-play") {
      playIcon.className = "fa-solid fa-pause";
    }
  
    try {
      audio.load();
      audio.play();
    } catch(err) {
      // Check if the text has already been appended
      if (!isErrorMessageAppended) {
        // If it hasn't, create a new element with the content to append
        let errorMessage = document.createElement("p");
        errorMessage.textContent = "Unable to play song. Please check your internet connection and retry.";
        errorMessage.style.fontSize = "15px";
        errorMessage.style.fontWeight = "600";
        errorMessage.style.margin = "20px 0px -20px 35px"
        backgroundCard.appendChild(errorMessage);
        // Update the flag to indicate that the text has been appended
        // This way, the error text will only be appended once no matter how many times the user clicks the song
        isErrorMessageAppended = true;
      }
    }
  }
}

function resumeSong() {
  changePlayButtonClass();
  // incrementPlayCounter();
  if (playIcon.className === "fa-solid fa-play") {
    audio.pause()
  } else {
    audio.play();
  }
}

function changeSong() {
}

function addSong(index) {
  const song = songStorage[index];
  const likedSong = document.createElement("div");
  likedSong.className = "liked-song";
  likedSong.setAttribute("id", song.id)
  likedSong.textContent = `${song.title} - ${song.artist}`;
  songLibrary.appendChild(likedSong);
  removeSong(likedSong);
}

const songArray = Array.from(songLibrary);

function removeSong(song) {
  likeSongWrapper.addEventListener("click", function removeSongHandler(event) {
    if (event.target.className === "fa-regular fa-heart fa-lg") {
      try {
        songLibrary.removeChild(song);
        console.log(songLibrary);
      } catch (error) {
        console.error('Error removing song:', error);
      }
      likeSongWrapper.removeEventListener("click", removeSongHandler);
    }
  });
}

function nextSong() {
}

function prevSong() {
  // If the audio is currently playing, reset the audio and automatically start playing it + update the counter
  if (audio.paused === false) {
    audio.load();
    audio.play();
    incrementPlayCounter();
  } else {
    // If the audio is paused, simply reset it to the beginning but do not start playing it automatically
    audio.load();
  }
  // Reset the progress bar when the song is restarted
  progressBar.style.width = 0;
}

function currentSong() {
}

// Add click event listeners to the play/pause, previous, and next buttons
playButton.addEventListener("click", resumeSong);

prevButton.addEventListener("click", prevSong);

nextButton.addEventListener("click", () => {
});

// Update the progress bar as the audio plays
audio.addEventListener("timeupdate", () => {
  const duration = audio.duration;
  const currentTime = audio.currentTime;
  const progress = (currentTime / duration) * 100;
  progressBar.style.width = `${progress}%`;
});

// Update the volume as the user adjusts the volume control
volumeControl.addEventListener("input", () => {
  audio.volume = volumeControl.value;
});

// When the user clicks on the button, open the modal
exploreSongsButton.onclick = () => {
  songDatabaseModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
closeIcon.onclick = () => {
  songDatabaseModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = event => {
  if (event.target == songDatabaseModal) {
    songDatabaseModal.style.display = "none";
  }
}

window.onload = () => {
  const song = songStorage;
  songTitle.textContent = song[0].title;
  artistName.textContent = `${song[0].artist} | ${song[0].album}`;
  albumCover.src = song[0].cover;
  audio.src = song[0].source;
}

// Set a flag to keep track of whether the text has been appended or not
let isErrorMessageAppended = false;

likeIcons.forEach((icon, index) => {
  icon.addEventListener("click", () => {
    addSong(index);
  })
})

songLibrary.addEventListener("click", event => {
  playSong(event);
})

console.log(databaseSongs);
console.log(likeIcons);
console.log(songArray)

likeSongWrapper.addEventListener("click", event => {
  if (event.target.className === "fa-regular fa-heart fa-lg") {
    event.target.className = "fa-solid fa-heart fa-lg";
  } else {
    event.target.className = "fa-regular fa-heart fa-lg";
  }
});