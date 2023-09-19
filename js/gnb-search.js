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

function addSearchHistory() {
  const input = this.value.trim()
  if (input.length) {
    const listItem = createSearchHistoryItem(input)
    gnbSearchHistoryList.append(listItem)
  }
  this.value = ''

  openGnbSearchHistory()
}

function createSearchHistoryItem(name) {
  const listItem = document.createElement('li')
  listItem.classList.add('search-history-item')

  const wordButton = document.createElement('button')
  wordButton.classList.add('word-button')
  wordButton.setAttribute('type', 'button')
  listItem.append(wordButton)

  const searchText = document.createTextNode(name)
  wordButton.append(searchText)

  const deleteButton = document.createElement('button')
  deleteButton.classList.add('delete-button')
  deleteButton.setAttribute('type', 'button')
  deleteButton.addEventListener('click', deleteSearchHistoryItem)
  listItem.append(deleteButton)

  const deleteIcon = document.createElement('i')
  deleteIcon.classList.add('ic-close')
  deleteIcon.setAttribute('aria-label', '검색어 삭제')
  deleteButton.append(deleteIcon)

  return listItem
}

gnbSearchInput.addEventListener('focus', openGnbSearchHistory)
gnbSearchInput.addEventListener('change', addSearchHistory)
deleteAllButton.addEventListener('click', deleteAllSearchHistory)
deleteButtonList.forEach((button) => {
  button.addEventListener('click', deleteSearchHistoryItem)
})
