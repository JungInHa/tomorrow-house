const myMenu = document.querySelector('.my-menu')
const myMenuButton = myMenu.querySelector('.my-menu-button')
// const [myMenuButton, myMenuContent] = myMenu.children

function toggleMyMenu() {
  if (!myMenu.classList.contains('is-active')) {
    window.addEventListener('click', closeMyMenuOnClickingOutside)
  }
  myMenu.classList.toggle('is-active')
}

function closeMyMenuOnClickingOutside(e) {
  if (!myMenu.contains(e.target)) {
    myMenu.classList.remove('is-active')
    window.removeEventListener('click', closeMyMenuOnClickingOutside)
  }
}

myMenuButton.addEventListener('click', toggleMyMenu)
