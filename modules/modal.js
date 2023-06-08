const exploreSongsButton = document.getElementById('explore-songs');
const dialog = document.getElementById('dialog');
const closeIcon = document.querySelector('.close');

function openModal() {
  dialog.showModal();
}

function closeModal() {
  dialog.close();
}

export { exploreSongsButton, dialog, openModal, closeModal, closeIcon };
