const exploreSongsButton = document.getElementById('explore-songs');
const dialog = document.getElementById('dialog');
const closeIcon = document.querySelector('.close');
const modalContent = document.querySelector('.modal-content');

function openModal() {
  dialog.showModal();
}

function closeModal() {
  dialog.close();
}

function closeModalOnClick(event) {
  // Check if the clicked element is outside the modal
  if (event.target === dialog) {
    dialog.close();
  }
}

export {
  exploreSongsButton,
  dialog,
  closeIcon,
  modalContent,
  openModal,
  closeModal,
  closeModalOnClick
};
