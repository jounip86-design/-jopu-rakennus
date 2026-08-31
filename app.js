const button = document.querySelector('.hamb');
const menu = document.querySelector('.mobile-menu');

if (button && menu) {
  button.addEventListener('click', () => {
    menu.classList.toggle('open');
  });
}
