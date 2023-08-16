const gnbSearch = document.querySelector('.gnb-search')
const gnbSearchInput = gnbSearch.querySelector('input')
const searchHistory = gnbSearch.querySelector('.search-history')

function openGnbSearchHistory() {
  if (!searchHistory.classList.contains('is-active')) {
    window.addEventListener('click', closeGnbSearchHistory)
  }
  searchHistory.classList.add('is-active')
}

function closeGnbSearchHistory(e) {
  if (!gnbSearch.contains(e.target)) {
    searchHistory.classList.remove('is-active')
    window.removeEventListener('click', closeGnbSearchHistory)
  }
}

gnbSearchInput.addEventListener('focus', openGnbSearchHistory)
