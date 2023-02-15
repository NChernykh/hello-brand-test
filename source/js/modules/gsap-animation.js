import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Intro animation
let tlMain = gsap.timeline();
const main = document.querySelector('main');

gsap.from('.main-nav__item', {opacity: 0, y: -100, duration: 1, stagger: 0.2});
gsap.from('.socials__item', {opacity: 0, y: 100, duration: 1, stagger: 0.2}, 1);

const titleAnim = () => {
  const title = document.querySelector('.intro__title');
  const subtitle = document.querySelector('.intro__text');

  gsap.to(subtitle, {x: 300, y: -50, scale: 1.5, duration: 2});

  const splitText = (el) => {
    el.innerHTML = el.textContent.replace(/(\S*)/g, (m) => {
      return '<div class="word">' + m.replace(/(-|#|@)?\S(-|#|@)?/g, '<div class=\'letter\'>$&</div>') +
          '</div>';
    });
    return el;
  };

  const split = splitText(title);

  function random(min, max) {
    return (Math.random() * (max - min)) + min;
  }

  Array.from(split.querySelectorAll('.letter')).forEach((el, idx) => {
    gsap.from(el, {
      opacity: 0,
      scale: 0.1,
      x: random(-500, 500),
      y: random(-500, 500),
      z: random(-500, 500),
      delay: idx * 0.02,
      repeat: 0,
      duration: 2.5,
    });
  });
};

titleAnim();

// bg animation

gsap.to('.intro .container', {
  scrollTrigger: {
    trigger: '.intro',
    markers: true,
    start: 'top top',
    scrub: true,

  },
  yPercent: 80,
  scale: 0.8,
  xPercent: -80,
  opacity: 0,
});

gsap.to('.bg-block__img', {
  scrollTrigger: {
    trigger: '.intro',
    start: 'top top',
    scrub: true,
  },
  scale: 1.5,
});

// all page animation
tlMain.fromTo('.events', {x: '-100%', y: '+100%'}, {y: 0});
tlMain.from('.events__row', {
  x: -200,
  y: -200,
  opacity: 0,
  duration: 0.5,
  stagger: 0.2,
});
tlMain.from('.events__decor-img', {
  x: +200,
  y: -200,
  opacity: 0,
  duration: 0.3,
  stagger: 0.2,
});
tlMain.fromTo('.reviews', {x: '-100%'}, {x: '-200%'});

ScrollTrigger.create({
  animation: tlMain,
  trigger: '.wrapper',
  start: 'top top',
  end: () => main.offsetWidth / 2,
  scrub: true,
  pin: true,
});
