const allSelectGroup = document.querySelectorAll('.select-group select')
const allOrderForm = document.querySelectorAll('.order-form')
const allCheckoutList = document.querySelectorAll('.checkout-list')
const allTotalAmount = document.querySelectorAll('.order-summary .amount')

let selectedItems = []
function setSelectedItems(newState) {
  selectedItems = newState
  render()
}

const QUANTITY_COUNTER_ID = {
  mobile: 'order-form-modal-checkout-item-',
  desktop: 'checkout-item-',
  floating: 'floating-order-form-checkout-item-',
}

allSelectGroup.forEach((group) =>
  group.addEventListener('change', addSelectedItem)
)

render()

function addSelectedItem(e) {
  let [name, info] = e.target.value.split('(')
  name = name.trim()
  const price = Number(info.replace(/[^0-9]/g, ''))
  const currency = info.replace(/[0-9(),]/g, '')

  if (selectedItems.find((item) => item.name === name)) {
    alert('이미 선택한 옵션입니다.')
  } else {
    setSelectedItems([...selectedItems, { name, price, currency, quantity: 1 }])
  }

  e.target.value = ''
}

function render() {
  allCheckoutList.forEach((list) => {
    const newList = new DocumentFragment()
    const counterId = QUANTITY_COUNTER_ID[list.dataset.displayType]

    for (const { name, price, currency, quantity } of selectedItems) {
      const listItem = createListItem(
        name,
        price,
        currency,
        quantity,
        counterId
      )
      newList.append(listItem)
    }

    list.replaceChildren(newList)
  })

  updateTotalAmount()
}

function createListItem(name, price, currency, quantity, counterId) {
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
  const titleText = document.createTextNode(name)
  checkoutTitle.append(titleText)
  checkoutHeader.append(checkoutTitle)

  const deleteButton = document.createElement('button')
  deleteButton.classList.add('delete-button')
  deleteButton.setAttribute('type', 'button')
  deleteButton.setAttribute('aria-label', '해당 상품을 삭제하기')
  deleteButton.addEventListener('click', deleteItem)

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
  const quantityCounter = document.createElement('select')
  quantityCounter.id = counterId + name
  checkoutSelect.append(quantityCounter)
  for (let i = 1; i <= 5; i++) {
    const option = document.createElement('option')
    option.setAttribute('value', i)
    const number = document.createTextNode(i)
    option.appendChild(number)
    quantityCounter.appendChild(option)
  }
  quantityCounter.value = quantity
  quantityCounter.addEventListener('change', changeItemQuantity)

  const caretIcon = document.createElement('i')
  caretIcon.classList.add('ic-caret')
  caretIcon.setAttribute('aria-hidden', true)
  checkoutSelect.append(caretIcon)

  const checkoutOutput = document.createElement('output')
  checkoutOutput.classList.add('checkout-output')
  checkoutOutput.setAttribute('for', counterId + name)
  checkoutFooter.append(checkoutOutput)

  const priceDiv = document.createElement('div')
  priceDiv.classList.add('price-16')
  checkoutOutput.append(priceDiv)

  const amount = document.createElement('strong')
  amount.classList.add('amount')
  priceDiv.append(amount)
  const number = document.createTextNode((price * quantity).toLocaleString())
  amount.appendChild(number)

  const currencySpan = document.createElement('span')
  currencySpan.classList.add('currency')
  priceDiv.append(currencySpan)
  const currencyText = document.createTextNode(currency)
  currencySpan.append(currencyText)

  return listItem
}

function updateTotalAmount() {
  const newTotal = selectedItems.reduce(
    (acc, cur) => acc + cur.price * cur.quantity,
    0
  )

  allTotalAmount.forEach((el) => {
    el.textContent = newTotal.toLocaleString()
  })
}

function changeItemQuantity(e) {
  const selectedItemName = e.target.id.replace('checkout-item-', '')
  const updatedList = selectedItems.map((item) =>
    item.name === selectedItemName
      ? { ...item, quantity: e.target.value }
      : item
  )
  setSelectedItems(updatedList)
}

function deleteItem() {
  const deleteItemName = this.previousSibling.textContent
  const filteredList = selectedItems.filter(
    (item) => item.name !== deleteItemName
  )

  setSelectedItems(filteredList)
}
