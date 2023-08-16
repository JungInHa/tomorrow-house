const gnbSearch = document.querySelector('.gnb-search')
const gnbSearchInput = gnbSearch.querySelector('input')
const gnbSearchHistory = gnbSearch.querySelector('.search-history')
const gnbSearchHistoryList = gnbSearch.querySelector('ol')
const deleteAllButton = gnbSearch.querySelector('.search-history-header button')

function openGnbSearchHistory() {
  if (!gnbSearchHistoryList.children.length) return

  if (!gnbSearchHistory.classList.contains('is-active')) {
    window.addEventListener('click', closeGnbSearchHistory)
  }
  gnbSearchHistory.classList.add('is-active')
}

function closeGnbSearchHistory(e) {
  if (!gnbSearch.contains(e.target)) {
    gnbSearchHistory.classList.remove('is-active')
    window.removeEventListener('click', closeGnbSearchHistory)
  }
}

function deleteAllSearchHistory() {
  gnbSearchHistoryList.replaceChildren()
  gnbSearchHistory.classList.remove('is-active')
}

gnbSearchInput.addEventListener('focus', openGnbSearchHistory)
deleteAllButton.addEventListener('click', deleteAllSearchHistory)
