const gnbSearch = document.querySelector('.gnb-search')
const gnbSearchInput = gnbSearch.querySelector('input')
const gnbSearchHistory = gnbSearch.querySelector('.search-history')
const gnbSearchHistoryList = gnbSearch.querySelector('ol')
const deleteAllButton = gnbSearch.querySelector('.search-history-header button')
const deleteButtonList = gnbSearchHistoryList.querySelectorAll('.delete-button')

function openGnbSearchHistory() {
  if (!gnbSearchHistoryList.children.length) return

  if (!gnbSearchHistory.classList.contains('is-active')) {
    window.addEventListener('click', closeGnbSearchHistoryOnClickingOutside)
  }
  gnbSearchHistory.classList.add('is-active')
}

function closeGnbSearchHistory() {
  gnbSearchHistory.classList.remove('is-active')
  window.removeEventListener('click', closeGnbSearchHistory)
}

function closeGnbSearchHistoryOnClickingOutside(e) {
  if (!gnbSearch.contains(e.target)) {
    closeGnbSearchHistory()
  }
}

function deleteAllSearchHistory() {
  gnbSearchHistoryList.replaceChildren()
  closeGnbSearchHistory()
}

function deleteSearchHistoryItem(e) {
  e.stopPropagation()
  const itemToDelete = this.parentNode
  gnbSearchHistoryList.removeChild(itemToDelete)

  if (!gnbSearchHistoryList.children.length) {
    closeGnbSearchHistory()
  }
}

gnbSearchInput.addEventListener('focus', openGnbSearchHistory)
deleteAllButton.addEventListener('click', deleteAllSearchHistory)
deleteButtonList.forEach((button) => {
  button.addEventListener('click', deleteSearchHistoryItem)
})
