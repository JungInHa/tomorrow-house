const productTab = document.querySelector('.product-tab')
const productTabButtonList = productTab.querySelectorAll('button')

const TOP_HEADER_DESKTOP = 80 + 50 + 54
const TOP_HEADER_MOBILE = 50 + 40 + 40
const SECTION_PADDING_DESKTOP = 80
const SECTION_PADDING_MOBILE = 8

let currentActiveTab = productTab.querySelector('.is-active')

const productTabPanelIdList = [
  'product-spec',
  'product-review',
  'product-inquiry',
  'product-shipment',
  'product-recommendation',
]
const productTabPanelList = productTabPanelIdList.map((id) =>
  document.querySelector(`#${id}`)
)
const productTabPanelPositionMap = {}

function toggleActiveTab() {
  const tabItem = this.parentNode

  if (currentActiveTab !== tabItem) {
    tabItem.classList.add('is-active')
    currentActiveTab.classList.remove('is-active')
    currentActiveTab = productTab.querySelector('.is-active')
  }
}

function scrollToTabPanel() {
  const tabPanelId = this.parentNode.getAttribute('aria-labelledby')
  const tabPanel = document.querySelector(`#${tabPanelId}`)

  const scrollAmount =
    tabPanel.getBoundingClientRect().top -
    (window.innerWidth >= 768 ? TOP_HEADER_DESKTOP : TOP_HEADER_MOBILE)

  window.scrollBy({ top: scrollAmount, behavior: 'smooth' })
}

function detectTabPanelPosition() {
  productTabPanelList.forEach((panel) => {
    const id = panel.getAttribute('id')
    const position = window.scrollY + panel.getBoundingClientRect().top
    productTabPanelPositionMap[id] = position
  })
}

productTabButtonList.forEach((button) => {
  button.addEventListener('click', toggleActiveTab)
  button.addEventListener('click', scrollToTabPanel)
})

function updateActiveTabOnScroll() {
  const scrolledAmount =
    window.scrollY +
    (window.innerWidth >= 768
      ? TOP_HEADER_DESKTOP + SECTION_PADDING_DESKTOP
      : TOP_HEADER_MOBILE + SECTION_PADDING_MOBILE)

  const newActiveTabIdx = Object.values(
    productTabPanelPositionMap
  ).findLastIndex((position) => scrolledAmount >= position)
  const newActiveTab = productTabButtonList[newActiveTabIdx]?.parentNode

  if (newActiveTab && newActiveTab !== currentActiveTab) {
    newActiveTab.classList.add('is-active')
    currentActiveTab.classList.remove('is-active')
    currentActiveTab = newActiveTab
  }
}

window.addEventListener('load', detectTabPanelPosition)
window.addEventListener('resize', detectTabPanelPosition)
window.addEventListener('scroll', updateActiveTabOnScroll)
