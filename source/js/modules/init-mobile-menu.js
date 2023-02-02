import '../utils/scroll-lock';

const mobMenu = document.querySelector('[data-header]');
const menuBtn = document.querySelector('[data-burger]');
const breakpointLg = window.matchMedia('(min-width:1024px)');

const openMenu = () => {
  menuBtn.ariaPressed = 'true';
  mobMenu.classList.add('is-active');
  window.scrollLock.disableScrolling();
};

const closeMenu = () => {
  menuBtn.ariaPressed = 'false';
  mobMenu.classList.remove('is-active');
  window.scrollLock.enableScrolling();
};

const closeMenuOnResize = () => {
  closeMenu();
};

const manageMobileMenu = () => {
  if (menuBtn) {
    breakpointLg.addListener(closeMenuOnResize);
    menuBtn.addEventListener('click', () => {
      if (menuBtn.ariaPressed === 'true') {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }
};

export {manageMobileMenu};
