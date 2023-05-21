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
const songTitle = document.querySelector(".song-title");
const artistName = document.querySelector(".artist-name");
const artistTitle = document.getElementById("artist-title");
const artistPicture = document.getElementById("artist-picture");
const albumCover = document.getElementById("album-cover");
const streams = document.querySelector(".streams");
const songLibrary = document.querySelector(".song-library");
const songDatabase = document.querySelector(".song-database");
const songContent = document.querySelector(".song-content");

const databaseSongs = document.querySelectorAll(".song");
const addedSongs = document.querySelectorAll(".added-song");

const addButtons = document.querySelectorAll(".add-button");
const addSongWrapper = document.querySelector(".add-song-wrapper");
const removeButtons = document.querySelectorAll(".remove-button");
const addedActive = document.querySelector(".added-active");

const playlistsCard = document.querySelector(".playlists-card");
const allPlaylists = document.querySelector(".all-playlists");

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
    picture: "images/artist-pictures/daft-punk.jpeg",
    streams: 0,
    id: 1
  },
  {
    title: "I Feel It Coming",
    album: "Starboy",
    artist: "The Weeknd, Daft Punk",
    source: "songs/The Weeknd - I Feel It Coming.mp3",
    cover: "images/album-covers/starboy.jpg",
    picture: "images/artist-pictures/the-weeknd.jpeg",
    streams: 0,
    id: 2
  },
  {
    title: "The Way I Are",
    album: "Shock Value",
    artist: "Timbaland",
    source: "songs/Timbaland - The Way I Are.mp3",
    cover: "images/album-covers/shock-value.jpg",
    picture: "images/artist-pictures/timbaland.jpeg",
    streams: 0,
    id: 3
  },
  {
    title: "Digital Love",
    album: "Discovery",
    artist: "Daft Punk",
    source: "songs/Daft Punk - Digital Love.mp3",
    cover: "images/album-covers/discovery.png",
    picture: "images/artist-pictures/daft-punk.jpeg",
    streams: 0,
    id: 4
  },
  {
    title: "Safe and Sound",
    album: "Woman",
    artist: "Justice",
    source: "songs/Justice - Safe and Sound.mp3",
    cover: "images/album-covers/woman.jpeg",
    picture: "images/artist-pictures/justice.jpeg",
    streams: 0,
    id: 5
  },
  {
    title: "You Rock My World",
    album: "Invincible",
    artist: "Michael Jackson",
    source: "songs/Michael Jackson - You Rock My World.mp3",
    cover: "images/album-covers/invincible.jpg",
    picture: "images/artist-pictures/michael-jackson.jpeg",
    streams: 0,
    id: 6
  },
  {
    title: "D.A.N.C.E",
    album: "Justice",
    artist: "Justice",
    source: "songs/Justice - D.A.N.C.E..mp3",
    cover: "images/album-covers/justice.jpg",
    picture: "images/artist-pictures/justice.jpeg",
    streams: 0,
    id: 7
  },
  {
    title: "Music Sounds Better With You",
    album: "Single",
    artist: "Stardust",
    source: "songs/Stardust - Music Sounds Better With You.mp3",
    cover: "images/album-covers/stardust.png",
    picture: "images/artist-pictures/stardust.jpeg",
    streams: 0,
    id: 8
  },
  {
    title: "Together",
    album: "Single",
    artist: "DJ Falcon & Thomas Bangalter",
    source: "songs/DJ Falcon & Thomas Bangalter - Together.mp3",
    cover: "images/album-covers/together.webp",
    picture: "images/artist-pictures/together.jpg",
    streams: 0,
    id: 9
  },
  {
    title: "Take My Breath",
    album: "Dawn FM",
    artist: "The Weeknd",
    source: "songs/The Weeknd - Take My Breath.mp3",
    cover: "images/album-covers/dawn-fm.png",
    picture: "images/artist-pictures/the-weeknd.jpeg",
    streams: 0,
    id: 10
  },
  {
    title: "Da Funk",
    album: "Homework",
    artist: "Daft Punk",
    source: "songs/Daft Punk - Da Funk.mp3",
    cover: "images/album-covers/homework.jpg",
    picture: "images/artist-pictures/daft-punk.jpeg",
    streams: 0,
    id: 11
  },
  {
    title: "Pjanoo",
    album: "Pjanoo",
    artist: "Eric Prydz",
    source: "songs/Eric Prydz - Pjanoo.mp3",
    cover: "images/album-covers/pjanoo.jpeg",
    picture: "images/artist-pictures/eric-prydz.jpeg",
    streams: 0,
    id: 12
  },
  {
    title: "Yo Voy (feat. Daddy Yankee)",
    album: "Motivando a la Yal",
    artist: "Zion & Lennox",
    source: "songs/Yo Voy (feat. Daddy Yankee) - Zion & Lennox.mp3",
    cover: "images/album-covers/motivando-a-la-yal.jpeg",
    picture: "images/artist-pictures/zion-and-lennox.jpeg",
    streams: 0,
    id: 13
  },
  {
    title: "Television Rules the Nation / Crescendolls",
    album: "Alive 2007",
    artist: "Daft Punk",
    source: "songs/Daft Punk - Television Rules the Nation & Crescendolls.mp3",
    cover: "images/album-covers/alive-2007.jpeg",
    picture: "images/artist-pictures/daft-punk.jpeg",
    streams: 0,
    id: 14
  },
  {
    title: "Get Lucky (feat. Pharrell Williams and Nile Rodgers)",
    album: "Random Access Memories",
    artist: "Daft Punk",
    source: "songs/Daft Punk - Get Lucky (feat. Pharrell Williams and Nile Rodgers).mp3",
    cover: "images/album-covers/random-access-memories.jpeg",
    picture: "images/artist-pictures/daft-punk.jpeg",
    streams: 0,
    id: 15
  },
  {
    title: "Gust of Wind",
    album: "G I R L",
    artist: "Pharrell Williams",
    source: "songs/Pharrell Williams - Gust of Wind.mp3",
    cover: "images/album-covers/girl.jpeg",
    picture: "images/artist-pictures/pharrell-williams.jpeg",
    streams: 0,
    id: 16
  }
];

const duration = document.getElementById("duration");
const currentTime = document.getElementById("current-time");
const slider = document.querySelector(".slider");
let raf = null;

// This function takes in a number of seconds and returns a formatted string in minutes and seconds
function calculateTime(secs) {
  const minutes = Math.floor(secs / 60);
  const seconds = Math.floor(secs % 60);
  const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${minutes}:${returnedSeconds}`;
}

// This function updates the display of the audio's duration using the calculateTime function
function displayDuration() {
  duration.textContent = calculateTime(audio.duration);
}

// This function sets the maximum value of the slider based on the audio's duration
function setSliderMax() {
  slider.max = Math.floor(audio.duration);
}

const savedSliderValue = JSON.parse(localStorage.getItem("savedSliderValue")) || [];
const savedAudioValue = JSON.parse(localStorage.getItem("savedAudioValue")) || [];
const savedCurrentTime = JSON.parse(localStorage.getItem("savedCurrentTime")) || [];
const savedVolumeControlValue = JSON.parse(localStorage.getItem("savedVolumeControlValue")) || [];
const savedAudioVolume = JSON.parse(localStorage.getItem("savedAudioVolume")) || [];

// This function updates the slider and current time text while the audio is playing
function whilePlaying() {
  slider.value = Math.floor(audio.currentTime);
  currentTime.textContent = calculateTime(slider.value);
  raf = requestAnimationFrame(whilePlaying);

  localStorage.setItem("savedSliderValue", JSON.stringify(slider.value));
  localStorage.setItem("savedCurrentTime", JSON.stringify(currentTime.textContent));
  localStorage.setItem("savedAudioValue", JSON.stringify(Math.floor(audio.currentTime)));
}

// If the audio has already loaded, then display the duration and set the slider max
// Otherwise, wait until the metadata has loaded before displaying the duration and setting the slider max
if (audio.readyState > 0) {
  displayDuration();
  setSliderMax();
} else { 
  audio.addEventListener('loadedmetadata', () => {
    displayDuration();
    setSliderMax();
  });
}

// When the slider is moved, update the current time text
// If the audio is playing or paused, cancel the animation frame so that it doesn't interfere with the slider
slider.addEventListener('input', function() {
  currentTime.textContent = calculateTime(this.value);
  cancelAnimationFrame(raf);

  localStorage.setItem("savedCurrentTime", JSON.stringify(currentTime.textContent));
});

// When the slider is changed (either by moving it or clicking on it), update the audio's current time
// If the audio is playing or paused, request an animation frame to update the slider and current time text while playing
slider.addEventListener('change', function() {
  audio.currentTime = this.value;
  requestAnimationFrame(whilePlaying);

  localStorage.setItem("savedAudioValue", JSON.stringify(Math.floor(audio.currentTime)));
});

// Update the volume as the user adjusts the volume control
volumeControl.addEventListener("input", function() {
  audio.volume = this.value;
  localStorage.setItem("savedVolumeControlValue", JSON.stringify(volumeControl.value));
  localStorage.setItem("savedAudioVolume", JSON.stringify(audio.volume));
});

const rewind = document.querySelector(".rewind");
const fastForward = document.querySelector(".fast-forward");

rewind.addEventListener("click", () => {
  audio.currentTime -= 15;
});

fastForward.addEventListener("click", () => {
  audio.currentTime += 15;
});

const loop = document.getElementById("loop");
const shuffle = document.getElementById("shuffle");

const shuffleState = JSON.parse(localStorage.getItem("shuffleState"));
const loopState = JSON.parse(localStorage.getItem("loopState"));
const shuffleColor = JSON.parse(localStorage.getItem("shuffleColor"));
const loopColor = JSON.parse(localStorage.getItem("loopColor"));
const shuffleTitle = JSON.parse(localStorage.getItem("shuffleTitle"));
const loopTitle = JSON.parse(localStorage.getItem("loopTitle"));

function toggleLoop() {
  if (audio.loop === false) {
    audio.loop = true;
    loop.style.color = "#0173e5";
    loop.title = "Disable loop";
  } else {
    audio.loop = false;
    loop.style.color = "white";
    loop.title = "Enable loop";
  }
  localStorage.setItem("loopState", JSON.stringify(audio.loop));
  localStorage.setItem("loopColor", JSON.stringify(loop.style.color));
  localStorage.setItem("loopTitle", JSON.stringify(loop.title));
}

function toggleShuffle() {
  if (shuffle.dataset.state === "false") {
    shuffle.dataset.state = "true";
    shuffle.style.color = "#0173e5";
    shuffle.title = "Disable shuffle";
  } else if (shuffle.dataset.state === "true") {
    shuffle.dataset.state = "false";
    shuffle.style.color = "white";
    shuffle.title = "Enable shuffle";
  }
  localStorage.setItem("shuffleState", JSON.stringify(shuffle.dataset.state));
  localStorage.setItem("shuffleColor", JSON.stringify(shuffle.style.color));
  localStorage.setItem("shuffleTitle", JSON.stringify(shuffle.title));
}

loop.addEventListener("click", toggleLoop);
shuffle.addEventListener("click", toggleShuffle);

function changePlayButtonClass() {
  if (playIcon.className === "fa-solid fa-play") {
    playIcon.className = "fa-solid fa-pause";
  } else {
    playIcon.className = "fa-solid fa-play";
  }
}

function changePlaybackIcon() {
  if (playIcon.className === "fa-solid fa-play") {
    playIcon.className = "fa-solid fa-pause";
  }
}

// Retrieves and parses the "songLibrary" key from localStorage, or assigns an empty array to "savedSongs" if nothing is found
const savedSongs = JSON.parse(localStorage.getItem("songLibrary")) || [];

let lastSongPlayed = JSON.parse(localStorage.getItem("lastSongPlayed")) || {};

function saveLastSongPlayed(song) {
  lastSongPlayed = {
    title: song.title,
    artist: song.artist,
    album: song.album,
    cover: song.cover,
    source: song.source,
    picture: song.picture,
    streams: song.streams,
    id: song.id,
  };
  localStorage.setItem("lastSongPlayed", JSON.stringify(lastSongPlayed));
}

function displayClickedSong(song) {
  if (song) {
    songTitle.textContent = `${song.title}`;
    artistName.textContent = `${song.artist} | ${song.album}`;
    albumCover.src = `${song.cover}`;
    audio.src = `${song.source}`;

    artistTitle.textContent = `${song.artist}`;
    artistPicture.src = `${song.picture}`;

    saveLastSongPlayed(song);

    song.streams += 1;
    localStorage.setItem("songLibrary", JSON.stringify(savedSongs));
  }
}

function loadSong(song) {
  if (song) {
    songTitle.textContent = `${song.title}`;
    artistName.textContent = `${song.artist} | ${song.album}`;
    albumCover.src = `${song.cover}`;
    audio.src = `${song.source}`;

    artistTitle.textContent = `${song.artist}`;
    artistPicture.src = `${song.picture}`;
  }
}

function skipToNextSong(index) {
  // Increment index and wrap it around to the beginning of the array if it exceeds the length of the savedSongs array
  // Depending on if the shuffle state is true or false, either skip to the next song or to a random song in the library
  if (shuffle.dataset.state === "true") {
    index = Math.floor(Math.random(index) * savedSongs.length) % savedSongs.length;
  } else if (shuffle.dataset.state === "false") {
    index = (index + 1) % savedSongs.length;
  }
  
  songTitle.textContent = `${savedSongs[index].title}`;
  artistName.textContent = `${savedSongs[index].artist} | ${savedSongs[index].album}`;
  albumCover.src = `${savedSongs[index].cover}`;
  
  // Pause the audio before changing the source
  audio.pause();
  audio.src = `${savedSongs[index].source}`;
  
  // Wait for the new audio to load before playing it
  audio.addEventListener('loadedmetadata', function() {
    audio.play();
  });
  
  artistTitle.textContent = savedSongs[index].artist;
  artistPicture.src = savedSongs[index].picture;

  changePlaybackIcon();
}


function playSong(event) {
  if (event.target.className === "added-song" || event.target.className === "song-name" || event.target.className === "artist-info" || event.target.className === "album-image") {

    // If the user clicked on a valid song element, we retrieve the song ID from the element's ID attribute and convert it to an integer
    const clickedSongId = parseInt(event.target.getAttribute("id"));

    // Find the song object in our savedSongs array that matches the clicked song's ID
    const clickedSong = savedSongs.find(song => song.id === clickedSongId);

    // If we found a valid song object with a corresponding ID to that of the clicked song, we update various elements with the clicked song's information
    displayClickedSong(clickedSong);

    // Find the index of the song that was clicked
    const clickedSongIndex = savedSongs.findIndex(song => song.id === clickedSongId);

    let currentSongIndex = clickedSongIndex;

    nextButton.addEventListener("click", () => {
      // Increment index and wrap it around to the beginning of the array if it exceeds the length of the savedSongs array
      // Depending on if the shuffle state is true or false, either skip to the next song or to a random song in the library
      if (shuffle.dataset.state === "true") {
        currentSongIndex = Math.floor(Math.random(currentSongIndex) * savedSongs.length) % savedSongs.length;
      } else if (shuffle.dataset.state === "false") {
        currentSongIndex = (currentSongIndex + 1) % savedSongs.length;
      }
  
      songTitle.textContent = `${savedSongs[currentSongIndex].title}`;
      artistName.textContent = `${savedSongs[currentSongIndex].artist} | ${savedSongs[currentSongIndex].album}`;
      albumCover.src = `${savedSongs[currentSongIndex].cover}`;

      saveLastSongPlayed(savedSongs[currentSongIndex]);
  
      // Pause the audio before changing the source
      audio.pause();
      audio.src = `${savedSongs[currentSongIndex].source}`;
  
      // Wait for the new audio to load before playing it
      audio.addEventListener('loadedmetadata', function() {
        audio.play();
      });
  
      artistTitle.textContent = savedSongs[currentSongIndex].artist;
      artistPicture.src = savedSongs[currentSongIndex].picture;

      changePlaybackIcon();
    });

    // Skip to the next song once the current song has ended
    audio.addEventListener("ended", () => {
      skipToNextSong(currentSongIndex);
    });

    changePlaybackIcon();

    requestAnimationFrame(whilePlaying);

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

// This function is used to create a new song and add it to the UI
function addSongToUI(song) {
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
  artistInfo.style.color = "white";
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
}

// This function takes an index as input and adds a song to the page using information from the songStorage array
// The index is retrieved from the "add" button that was clicked, which is then used in the "addButtons" forEach loop to display the correct song info in the library
function addSong(index) {
  // Retrieve the song object from the songStorage array using the provided index
  const song = songStorage[index];

  addSongToUI(song);

  // Add the song object to the savedSongs array, along with some additional properties
  savedSongs.push({
    title: song.title,
    artist: song.artist,
    album: song.album,
    cover: song.cover,
    source: song.source,
    picture: song.picture,
    streams: song.streams,
    id: song.id,
  });

  // Store the updated savedSongs array in the browser's local storage as a JSON string
  localStorage.setItem("songLibrary", JSON.stringify(savedSongs));

  console.log(index);
  console.log(savedSongs);
}

console.log(savedSongs);

// Add the saved songs to the UI
savedSongs.forEach((song) => {
  addSongToUI(song);
});

const buttonIDs = JSON.parse(localStorage.getItem("buttonIDs")) || [];

addButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    // Check if the ID of the "add" button already exists in the buttonIDs array
    if (buttonIDs.includes(parseInt(button.id))) {
      return; // If it does, this means the song has already been added - therefore, do nothing
    } else {
      // If it doesn't, add the song to the user's library and update the button
      addSong(index);
      button.classList.toggle("added-active");
      button.textContent = "Added";
      
      // Store the updated array of button IDs in local storage
      buttonIDs.push(parseInt(button.id));
      localStorage.setItem("buttonIDs", JSON.stringify(buttonIDs));
    }
  });
});

const addButtonsArray = Array.from(addButtons);

function removeSong(event) {
  if (event.target.className === "remove-button") { 
    const songToRemove = event.target.parentElement;
    songToRemove.remove();

    // Retrieve the ID of the remove button that was clicked
    const clickedRemoveButtonId = parseInt(event.target.getAttribute("id"));

    // Find the "add" button that has the same ID as the clicked remove button
    const buttonToChange = addButtonsArray.find(button => parseInt(button.getAttribute("id")) === clickedRemoveButtonId);

    // If an "add" button with the same ID was found, remove the "added-active" class and change the button text to "Add"
    if (buttonToChange) {
      buttonToChange.classList.remove("added-active");
      buttonToChange.textContent = "Add";
    }

    // Find the index of the song to remove in the "savedSongs" array
    const indexToDelete = savedSongs.findIndex(song => parseInt(song.id) === clickedRemoveButtonId);
    console.log(indexToDelete);

    // Remove the respective song from the savedSongs array using the splice() method
    savedSongs.splice(indexToDelete, 1);

    // Save the updated savedSongs array to localStorage as a string
    localStorage.setItem("songLibrary", JSON.stringify(savedSongs));

    // Remove the respective ID from the buttonIDs array using the splice() method - this styles the button back to "add"
    buttonIDs.splice(indexToDelete, 1);
    
    // Store the updated array of button IDs in local storage
    localStorage.setItem("buttonIDs", JSON.stringify(buttonIDs));
    
    console.log(savedSongs);
  }
}

function prevSong() {
  // If the audio is currently playing, reset the audio and automatically start playing it
  if (audio.paused === false) {
    audio.load();
    audio.play();
  } else {
    // If the audio is paused, simply reset it to the beginning but do not start playing it automatically
    audio.load();
  }
}

function resumeSong() {
  changePlayButtonClass();
  if (playIcon.className === "fa-solid fa-play") {
    audio.pause()
  } else {
    audio.play();
    requestAnimationFrame(whilePlaying);
  }
}

playButton.addEventListener("click", resumeSong);

prevButton.addEventListener("click", prevSong);

songLibrary.addEventListener("dblclick", event => {
  playSong(event);
});

songLibrary.addEventListener("click", event => {
  removeSong(event);
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
  if (savedSongs.length === 0) {
    const song = songStorage[0];
    loadSong(song);
  } else {
    loadSong(lastSongPlayed);
  }

  shuffle.dataset.state = "false";

  if (shuffleState) {
    shuffle.dataset.state = shuffleState;
  }

  audio.volume = savedAudioVolume;
  volumeControl.value = savedVolumeControlValue;
  audio.currentTime = savedAudioValue;
  currentTime.textContent = savedCurrentTime;
  slider.value = savedAudioValue;

  audio.loop = loopState;
  shuffle.style.color = shuffleColor;
  loop.style.color = loopColor;
  shuffle.title = shuffleTitle;
  loop.title = loopTitle;
}

const databaseSongsArray = Array.from(databaseSongs)
console.log(databaseSongsArray);

// This code ensures that the "add" button is styled as "added" if the song exists in the user's song library
// It does this by checking if the ID of a saved song matches the ID of an add button - if it does, the button is styled as "added"
for (let i = 0; i < savedSongs.length; i++ ) {
  // Get the ID of the current saved song
  const savedSongId = savedSongs[i].id;
  // Find the "add" button that corresponds to the saved song by using the find method and checking if the button's ID matches the savedSong's ID
  const matchingButton = addButtonsArray.find(button => parseInt(button.getAttribute("id")) === savedSongId);

  // If a matching button is found
  if (matchingButton) {
    // Update the text of the button to indicate the song has been added
    matchingButton.textContent = "Added"
    // Toggle the "added-active" class to style the button as "added"
    matchingButton.classList.toggle("added-active");
  }
}


const songLibrarySubtext = document.getElementById("song-library-subtext");
if (savedSongs.length === 0) {
  songLibrarySubtext.textContent = "Click the explore songs button to add music to your library";
} else {
  songLibrarySubtext.textContent = "All songs that you add will appear here";
}

const currentSelection = document.getElementById("current-selection");

// This function searches for a given song or artist in the database and filters out those that do not match the search term
function searchDatabaseSongs() {
  const searchBar = document.getElementById("music-search").value.toUpperCase();
  const info = document.querySelectorAll(".info");

  // Loop through each song in the database
  for (let i = 0; i < info.length; i++) {
    let match = databaseSongs[i].querySelectorAll(".info")[0];

    if (match) {
      let textValue = match.textContent || match.innerHTML;

      if (textValue.toUpperCase().indexOf(searchBar) > -1) {
        databaseSongs[i].style.display = "";
        currentSelection.textContent = "Results";
      } else {
        databaseSongs[i].style.display = "none";
        currentSelection.textContent = "Results";
      }
      if (searchBar === "") {
        currentSelection.textContent = "Current selection";
      }
    }
  }
}

const songsNotAddedFilterButton = document.querySelector(".song-filter-button");
const songsAddedFilterButton = document.querySelector(".added-songs-filter-button")

function filterBySongsNotAdded() {
  if (songsAddedFilterButton.className.includes("song-filter-active")) {
    return;
  }
  if (songsNotAddedFilterButton.className === "song-filter-button") {
    databaseSongs.forEach(song => {
      if (song.lastElementChild.className.includes("added-active")) {
        song.style.display = "none";
      }
    });
  } else if (songsNotAddedFilterButton.className === "song-filter-button song-filter-active") {
    databaseSongs.forEach(song => {
      if (song.lastElementChild.className.includes("added-active")) {
        song.style.display = "";
      }
    });
  }
  songsNotAddedFilterButton.classList.toggle("song-filter-active");
}

function filterBySongsAdded() {
  if (songsNotAddedFilterButton.className.includes("song-filter-active")) {
    return;
  }
  if (songsAddedFilterButton.className === "added-songs-filter-button") {
    databaseSongs.forEach(song => {
      if (song.lastElementChild.className === "add-button") {
        song.style.display = "none";
      }
    });
  } else if (songsAddedFilterButton.className === "added-songs-filter-button song-filter-active") {
    databaseSongs.forEach(song => {
      if (song.lastElementChild.className === "add-button") {
        song.style.display = "";
      }
    });
  }
  songsAddedFilterButton.classList.toggle("song-filter-active");
}

songsNotAddedFilterButton.addEventListener("click", filterBySongsNotAdded);
songsAddedFilterButton.addEventListener("click", filterBySongsAdded);