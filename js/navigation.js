// Progressive enhancement: without JavaScript all navigation links remain visible.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-navigation');
const smallScreen = window.matchMedia('(max-width: 760px)');
function setMenu(open) {
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.dataset.collapsed = String(!open);
}
function syncMenu() {
  menuButton.hidden = !smallScreen.matches;
  setMenu(!smallScreen.matches);
}
menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
navigation.addEventListener('keydown', event => {
  if (event.key === 'Escape' && smallScreen.matches) {
    setMenu(false);
    menuButton.focus();
  }
});
smallScreen.addEventListener('change', syncMenu);
syncMenu();
