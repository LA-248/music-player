const audio = document.getElementById('my-audio');
const songTitle = document.querySelector('.song-title');
const albumName = document.querySelector('.album-name');
const artistTitle = document.getElementById('artist-title');
const artistPicture = document.getElementById('artist-picture');
const albumCover = document.getElementById('album-cover');
const streams = document.querySelector('.streams');
const songLibrary = document.querySelector('.song-library');

let lastSongPlayed = JSON.parse(localStorage.getItem('lastSongPlayed')) || {};

export {
  audio,
  songTitle,
  albumName,
  artistTitle,
  artistPicture,
  albumCover,
  streams,
  songLibrary,
  lastSongPlayed,
};

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
