const orderFormModal = document.querySelector('.order-form-modal')
const selectGroup = orderFormModal.querySelectorAll('.select-group select')
const checkoutList = orderFormModal.querySelector('.checkout-list')
const checkoutSelect = orderFormModal.querySelectorAll(
  '.checkout-select select'
)
const orderSummary = orderFormModal.querySelector('.order-summary')
const totalAmount = orderSummary.querySelector('.amount')

selectGroup.forEach((group) =>
  group.addEventListener('change', function (e) {
    let [optionName, info] = e.target.value.split('(')
    optionName = optionName.trim()
    const price = Number(info.replace(/[^0-9]/g, ''))
    const currency = info.replace(/[0-9(),]/g, '')

    const checkoutListTitles = checkoutList.querySelectorAll('h4')

    if (exists(checkoutListTitles, optionName)) {
      alert('이미 선택한 옵션입니다.')
    } else {
      const listItem = createListItem(optionName, price, currency)
      checkoutList.append(listItem)
      updateTotalAmount()
    }

    group.value = ''
  })
)

function exists(list, title) {
  const alreadySelected = Array.from(list).find((el) =>
    el.innerText.includes(title)
  )
  return alreadySelected !== undefined
}

function updateTotalAmount() {
  let newTotal = 0
  const allPriceTag = checkoutList.querySelectorAll('.amount')
  allPriceTag.forEach((tag) => {
    const price = Number(tag.textContent.replace(/,/g, ''))
    newTotal += price
  })
  totalAmount.textContent = newTotal.toLocaleString()
}

function deleteItem() {
  checkoutList.removeChild(this.parentNode.parentNode.parentNode)
  updateTotalAmount()
}

function createListItem(title, price, currency) {
  const listItem = document.createElement('li')
  listItem.classList.add('checkout-item')

  const checkoutCard = document.createElement('div')
  checkoutCard.classList.add('checkout-card')
  listItem.append(checkoutCard)

  const checkoutHeader = document.createElement('div')
  checkoutHeader.classList.add('checkout-header')
  checkoutCard.append(checkoutHeader)

  const checkoutTitle = document.createElement('h4')
  checkoutTitle.classList.add('checkout-title')
  const titleText = document.createTextNode(title)
  checkoutTitle.append(titleText)
  checkoutHeader.append(checkoutTitle)

  const deleteButton = document.createElement('button')
  deleteButton.classList.add('delete-button')
  deleteButton.setAttribute('type', 'button')
  deleteButton.setAttribute('aria-label', '해당 상품을 삭제하기')
  deleteButton.onclick = deleteItem

  checkoutHeader.append(deleteButton)
  const deleteIcon = document.createElement('i')
  deleteIcon.classList.add('ic-close')
  deleteIcon.setAttribute('aria-hidden', true)
  deleteButton.append(deleteIcon)

  const checkoutFooter = document.createElement('footer')
  checkoutFooter.classList.add('checkout-footer')
  checkoutCard.append(checkoutFooter)

  const checkoutSelect = document.createElement('div')
  checkoutSelect.classList.add('checkout-select')
  checkoutFooter.append(checkoutSelect)
  const selectForm = document.createElement('select')
  selectForm.id = 'order-form-modal-checkout-item-' + title
  checkoutSelect.append(selectForm)
  for (let i = 1; i <= 5; i++) {
    const option = document.createElement('option')
    option.setAttribute('value', i)
    const number = document.createTextNode(i)
    option.appendChild(number)
    selectForm.appendChild(option)
  }
  checkoutSelect.onchange = function changeQuantity(e) {
    const amount = this.parentNode.querySelector('.amount')
    const newPrice = price * e.target.value
    amount.textContent = newPrice.toLocaleString()
    updateTotalAmount()
  }
  const caretIcon = document.createElement('i')
  caretIcon.classList.add('ic-caret')
  caretIcon.setAttribute('aria-hidden', true)
  checkoutSelect.append(caretIcon)

  const checkoutOutput = document.createElement('output')
  checkoutOutput.classList.add('checkout-output')
  checkoutOutput.setAttribute('for', 'order-form-modal-checkout-item-' + title)
  checkoutFooter.append(checkoutOutput)

  const priceDiv = document.createElement('div')
  priceDiv.classList.add('price-16')
  checkoutOutput.append(priceDiv)

  const amount = document.createElement('strong')
  amount.classList.add('amount')
  priceDiv.append(amount)
  const number = document.createTextNode(price.toLocaleString())
  amount.appendChild(number)

  const currencySpan = document.createElement('span')
  currencySpan.classList.add('currency')
  priceDiv.append(currencySpan)
  const currencyText = document.createTextNode(currency)
  currencySpan.append(currencyText)

  return listItem
}
