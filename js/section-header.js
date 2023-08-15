const sectionHeaderIconButton = document.querySelector(
  '.product-shipment .product-section-header .icon-button'
)

function showFullSection() {
  const section = this.parentNode.parentNode
  section.classList.add('is-open')
}

sectionHeaderIconButton.addEventListener('click', showFullSection)
