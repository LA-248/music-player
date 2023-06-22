const artistModal = document.getElementById('artist-modal');
const artistBio = document.querySelector('.artist-bio');
const artistInfoWrapper = document.querySelector('.artist-info-wrapper');

function openArtistModal() {
  artistModal.showModal();
}

function closeArtistModalOnClick(event) {
  // Check if the clicked element is outside the modal
  if (event.target === artistModal) {
    artistModal.close();
  }
}

async function getArtistBio(artist) {
  const url = `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artist}&api_key=6bb72f7e3c9aec29039fbf5230937b08&format=json`;

  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
  });
  const data = await response.json();
  console.log(data);
  const biography = data.artist.bio.summary;
  const result = biography.replace(/<a\b[^>]*>(.*?)<\/a>/gi, '');
  artistBio.textContent = result;
  console.log(result);
}

export {
  openArtistModal,
  closeArtistModalOnClick,
  getArtistBio,
  artistInfoWrapper,
};
