const songDatabaseModal = document.getElementById('song-database-modal');
const exploreSongsButton = document.getElementById('explore-songs');
const closeIcon = document.getElementsByClassName('close')[0];

function openModal() {
  songDatabaseModal.style.display = 'block';
}

function closeModal() {
  songDatabaseModal.style.display = 'none';
}

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', (event) => {
  if (event.target === songDatabaseModal) {
    songDatabaseModal.style.display = 'none';
  }
});

export {
  songDatabaseModal,
  exploreSongsButton,
  closeIcon,
  openModal,
  closeModal,
};
