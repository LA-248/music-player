const audio = document.getElementById('my-audio');
const songTitle = document.querySelector('.song-title');
const albumName = document.querySelector('.album-name');
const artistTitle = document.getElementById('artist-title');
const artistPicture = document.getElementById('artist-picture');
const albumCover = document.getElementById('album-cover');
const streams = document.querySelector('.streams');
const songLibrary = document.querySelector('.song-library');

let lastSongPlayed = JSON.parse(localStorage.getItem('lastSongPlayed')) || {};

// This function is used to create a new song and add it to the UI
function addSongToUI(song) {
  const addedSong = document.createElement('div');
  const songContainer = document.createElement('div');
  const songData = document.createElement('div');
  const songName = document.createElement('div');
  const albumImageWrapper = document.createElement('div');
  const artistInfo = document.createElement('div');
  const albumImage = document.createElement('img');
  const removeButton = document.createElement('button');

  addedSong.className = 'added-song';
  addedSong.setAttribute('id', song.id);
  songContainer.className = 'song-container';
  songData.className = 'song-data';
  songName.setAttribute('id', song.id);
  songName.textContent = `${song.title}`;
  songName.className = 'song-name';
  albumImageWrapper.className = 'album-image-wrapper';
  artistInfo.setAttribute('id', song.id);
  artistInfo.textContent = `${song.artist}`;
  artistInfo.style.color = 'white';
  artistInfo.className = 'artist-info';
  albumImage.setAttribute('id', song.id);
  albumImage.className = 'album-image';
  albumImage.src = `${song.cover}`;
  albumImage.style.width = '40px';
  albumImage.style.height = 'auto';
  albumImage.style.borderRadius = '5px';
  removeButton.className = 'remove-button';
  removeButton.setAttribute('id', song.id);
  removeButton.textContent = 'Remove';

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

export function saveLastSongPlayed(song) {
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
  localStorage.setItem('lastSongPlayed', JSON.stringify(lastSongPlayed));
}

// Retrieves and parses the "songLibrary" key from localStorage, or assigns an empty array to "savedSongs" if nothing is found
export const savedSongs = JSON.parse(localStorage.getItem('songLibrary')) || [];

export function displayClickedSong(song) {
  const clickedSong = song;
  if (clickedSong) {
    songTitle.textContent = `${clickedSong.title}`;
    albumName.textContent = `${clickedSong.album}`;
    albumCover.src = `${clickedSong.cover}`;
    audio.src = `${clickedSong.source}`;

    artistTitle.textContent = `${clickedSong.artist}`;
    artistPicture.src = `${clickedSong.picture}`;

    saveLastSongPlayed(clickedSong);

    clickedSong.streams += 1;
    localStorage.setItem('songLibrary', JSON.stringify(savedSongs));
  }
}

export function loadSong(song) {
  const songToLoad = song;
  if (songToLoad) {
    songTitle.textContent = `${songToLoad.title}`;
    albumName.textContent = `${songToLoad.album}`;
    albumCover.src = `${songToLoad.cover}`;
    audio.src = `${songToLoad.source}`;

    artistTitle.textContent = `${songToLoad.artist}`;
    artistPicture.src = `${songToLoad.picture}`;
  }
}

export {
  audio,
  songTitle,
  albumName,
  artistTitle,
  artistPicture,
  albumCover,
  streams,
  songLibrary,
  addSongToUI,
  lastSongPlayed,
};
