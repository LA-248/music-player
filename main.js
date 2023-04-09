// Get references to HTML elements
const audio = document.getElementById("my-audio");
const backgroundCard = document.querySelector(".background-card");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");
const playButton = document.querySelector(".play-button");
const playIcon = document.getElementById("play-icon");
const progressBar = document.querySelector(".progress-bar");
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
const addedSongs = document.querySelectorAll(".added-song");

const addButtons = document.querySelectorAll(".add-button");
const addSongWrapper = document.querySelector(".add-song-wrapper");
const removeButtons = document.querySelectorAll(".remove-button");
const addedActive = document.querySelector(".added-active");

let isErrorMessageAppended = false;
let hasRunOnce = false;

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
  },
  {
    title: "You Rock My World",
    album: "Invincible",
    artist: "Michael Jackson",
    source: "songs/Michael Jackson - You Rock My World.mp3",
    cover: "images/album-covers/invincible.jpg",
    id: 6
  },
  {
    title: "D.A.N.C.E",
    album: "Justice",
    artist: "Justice",
    source: "songs/Justice - D.A.N.C.E..mp3",
    cover: "images/album-covers/justice.jpg",
    id: 7
  },
  {
    title: "Music Sounds Better With You",
    album: "Single",
    artist: "Stardust",
    source: "songs/Stardust - Music Sounds Better With You.mp3",
    cover: "images/album-covers/stardust.png",
    id: 8
  },
  {
    title: "Take My Breath",
    album: "Dawn FM",
    artist: "The Weeknd",
    source: "songs/The Weeknd - Take My Breath.mp3",
    cover: "images/album-covers/dawn-fm.png",
    id: 9
  },
  {
    title: "Da Funk",
    album: "Homework",
    artist: "Daft Punk",
    source: "songs/Daft Punk - Da Funk.mp3",
    cover: "images/album-covers/homework.jpg",
    id: 10
  },
];

// Update the progress bar as the audio plays
audio.addEventListener("timeupdate", () => {
  const duration = audio.duration;
  const currentTime = audio.currentTime;
  const progress = (currentTime / duration) * 100;
});

// Update the volume as the user adjusts the volume control
volumeControl.addEventListener("input", () => {
  audio.volume = volumeControl.value;
});

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
  if (event.target.className === "added-song" || event.target.className === "song-name" || event.target.className === "artist-info" || event.target.className === "album-image") {

    // If the user clicked on a valid song element, we retrieve the song ID from the element's ID attribute and convert it to an integer
    const clickedSongId = parseInt(event.target.getAttribute("id"));

    // Find the song object in our songStorage array that matches the clicked song's ID
    const clickedSong = songStorage.find(song => song.id === clickedSongId);

     // If we found a valid song object with a corresponding ID, we update various elements on the page with the clicked song's information
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
        errorMessage.style.margin = "20px 0px -20px 0px"
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

const removeButtonWrapper = document.querySelector(".remove-button-wrapper");

// This function takes an index as input and adds a song to the page using information from the songStorage array
// This index is retrieved from the "Add" button that was clicked, which is then used in the "addButtons" forEach loop to display the correct song info
function addSong(index) {
  // Retrieve the song object from the songStorage array using the provided index
  const song = songStorage[index];

  const addedSong = document.createElement("div");
  const songContainer = document.createElement("div");
  const songData = document.createElement("div");
  const songName = document.createElement("div");
  const albumImageWrapper = document.createElement("div")
  const artistInfo = document.createElement("div");
  const albumImage = document.createElement("img");
  const removeButton = document.createElement("button");

  addedSong.className = "added-song";
  addedSong.setAttribute("id", song.id);
  songContainer.className = "song-container";
  songData.className = "song-data";
  songName.setAttribute("id", song.id);
  songName.textContent = `${song.title}`;
  songName.className = "song-name";
  albumImageWrapper.className = "album-image-wrapper";
  artistInfo.setAttribute("id", song.id);
  artistInfo.textContent = `${song.artist}`;
  artistInfo.style.color = "gray";
  artistInfo.className = "artist-info";
  albumImage.setAttribute("id", song.id);
  albumImage.className = "album-image";
  albumImage.src = `${song.cover}`;
  albumImage.style.width = "40px";
  albumImage.style.height = "auto";
  albumImage.style.borderRadius = "5px";
  removeButton.className = "remove-button";
  removeButton.setAttribute("id", song.id);
  removeButton.textContent = "Remove";

  addedSong.appendChild(songContainer);
  songContainer.appendChild(albumImageWrapper);
  songLibrary.appendChild(addedSong);
  addedSong.appendChild(songName);
  albumImageWrapper.appendChild(albumImage);
  songData.appendChild(songName);
  songData.appendChild(artistInfo);
  songContainer.appendChild(songData);
  addedSong.appendChild(removeButton);

  console.log(index);
}

function removeSong(event) {
  if (event.target.className === "remove-button") {
    const songToRemove = event.target.parentElement;
    songToRemove.remove();

    const removeButtonId = parseInt(event.target.getAttribute("id"));
    const addButtonsArray = Array.from(addButtons);

    // Find the button in the array that has the same id as the remove button
    const buttonToChange = addButtonsArray.find(button => parseInt(button.getAttribute("id")) === removeButtonId);

    // If a button was found with the same id, remove the "added-active" class and change the button text to "Add"
    if (buttonToChange) {
      buttonToChange.classList.remove("added-active");
      buttonToChange.textContent = "Add";
    }
  }
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

const songDatabaseModal = document.getElementById("song-database-modal");
const exploreSongsButton = document.getElementById("explore-songs");
// When the user clicks on the button, open the modal
exploreSongsButton.addEventListener("click", () => {
  songDatabaseModal.style.display = "block";
});

const closeIcon = document.getElementsByClassName("close")[0];
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

const addedSongArray = Array.from(addedSongs);

addButtons.forEach((button, index, event) => {
  button.addEventListener("click", function removeSongHandler() {
    // Call the "addSong" function, passing in the index of the current button that was clicked, allowing for the correct song info to be displayed
    addSong(index);
    button.classList.toggle("added-active");
    button.textContent = "Added";
    button.removeEventListener("click", removeSongHandler);
  });
});

songLibrary.addEventListener("dblclick", event => {
  playSong(event);
});

songLibrary.addEventListener("click", event => {
  removeSong(event);
});