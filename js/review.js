const reviewLikeButtonList = document.querySelectorAll(
  '.review-card-footer button'
)

const HELPFUL = '도움됨'
const NOT_HELPFUL = '도움이 돼요'

function toggleReviewLikeButton() {
  const isLiked = this.classList.contains('btn-primary')
  const textElement = this.nextElementSibling
  const reviewCardFooter = this.parentElement

  if (isLiked) {
    this.textContent = NOT_HELPFUL
  } else {
    this.textContent = HELPFUL

    const checkIcon = document.createElement('i')
    checkIcon.classList.add('ic-check')
    checkIcon.setAttribute('aria-hidden', true)
    this.prepend(checkIcon)
  }

  if (textElement) {
    const countSpan = textElement.querySelector('span')
    let count = Number(countSpan.textContent.replaceAll(',', ''))

    isLiked ? count-- : count++

    if (count === 0) {
      reviewCardFooter.removeChild(textElement)
    } else {
      countSpan.textContent = count.toLocaleString()
    }
  } else if (!isLiked) {
    const newSpanElement = document.createElement('span')
    const newStrongElement = document.createElement('strong')
    const newTextElement = document.createElement('p')

    newSpanElement.textContent = '1'
    newStrongElement.textContent = '명'
    newTextElement.textContent = '에게 도움이 되었습니다.'

    newStrongElement.prepend(newSpanElement)
    newTextElement.prepend(newStrongElement)
    reviewCardFooter.appendChild(newTextElement)
  }

  this.classList.toggle('btn-outlined')
  this.classList.toggle('btn-primary')
}

reviewLikeButtonList.forEach((button) => {
  button.addEventListener('click', toggleReviewLikeButton)
})
