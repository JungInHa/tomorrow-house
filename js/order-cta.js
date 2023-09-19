const orderCta = document.querySelector('.order-cta')
const [orderCtaBookmarkButton, orderCtaBuyButton] = orderCta.children

const orderModal = document.querySelector('.order-form-modal')
const orderModalOverlay = document.querySelector('.overlay')

function openOrderModal() {
  orderModal.classList.add('is-open')
  orderModalOverlay.classList.add('is-active')
}

function closeOrderModal() {
  orderModal.classList.remove('is-open')
  orderModalOverlay.classList.remove('is-active')
}

function toggleOrderCtaBookmark() {
  const [icon, countSpan] = this.children
  let count = Number(countSpan.textContent.replaceAll(',', ''))

  this.classList.contains('is-active') ? count-- : count++

  countSpan.textContent = count.toLocaleString()
  countSpan.setAttribute('aria-label', `북마크 ${count.toLocaleString()}회`)

  this.classList.toggle('is-active')
  icon.classList.toggle('ic-bookmark')
  icon.classList.toggle('ic-bookmark-filled')
}

orderCtaBuyButton.addEventListener('click', openOrderModal)
orderModalOverlay.addEventListener('click', closeOrderModal)
orderCtaBookmarkButton.addEventListener('click', toggleOrderCtaBookmark)
