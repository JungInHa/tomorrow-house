const searchModal = document.querySelector('.search-modal')
const searchButton = document.querySelector('.gnb-icon-button.is-search')
const searchOverlay = document.querySelector('.overlay')
const searchModalCloseButton = searchModal.querySelector(
  '.search-modal-form .btn-ghost.btn-40'
)

function openSearchModal() {
  searchModal.classList.add('is-active')
  searchOverlay.classList.add('is-active')
}

function closeSearchModal() {
  searchModal.classList.remove('is-active')
  searchOverlay.classList.remove('is-active')
}

searchButton.addEventListener('click', openSearchModal)
searchModalCloseButton.addEventListener('click', closeSearchModal)
