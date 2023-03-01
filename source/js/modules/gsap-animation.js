import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let mm = gsap.matchMedia();
const breakPoint = '(min-width: 768px)';
const subtitle = document.querySelector('.intro__text');
const title = document.querySelector('.intro__title');
const introBlock = document.querySelector('.intro');

const titleAnim = () => {

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
  gsap.to(subtitle, {x: 300, y: -50, scale: 1.5, duration: 2});

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

mm.add(breakPoint, () => {
  // Intro animation

  titleAnim();
  gsap.from('.main-nav__item', {opacity: 0, y: -100, duration: 1, stagger: 0.2});
  gsap.from('.socials__item', {opacity: 0, y: 100, duration: 1, stagger: 0.2}, 1);
  let tl = gsap.timeline();

  // bg animation
  tl.to('.intro .container', {
    scrollTrigger: {
      trigger: '.intro',
      start: 'top top',
      scrub: true,
    },
    yPercent: 50,
    scale: 0.8,
    opacity: 0,
  })
      .to('.bg-block__img', {
        scrollTrigger: {
          trigger: introBlock,
          start: 'top top',
          scrub: true,
        },
        scale: 1.5,
      })
      .from('.events__row', {
        scrollTrigger: {
          trigger: introBlock,
          start: 'top top',
          scrub: true,
        },
        x: -100,
        y: -100,
        opacity: 0,
        duration: 0.2,
        stagger: 0.2,
      })
      .from('.events__decor-img', {
        scrollTrigger: {
          trigger: introBlock,
          start: 'top top',
          scrub: true,
        },
        x: +100,
        y: -100,
        opacity: 0,
        duration: 0.3,
        stagger: 0.2,
      });

  // menu animation

  tl.from('.menu__row.right', {
    scrollTrigger: {
      trigger: '.menu',
      start: 'top top',
      scrub: true,
    },
    x: -100,
    duration: 0.3,
  })
      .from('.menu__row.reverse', {
        scrollTrigger: {
          trigger: '.menu',
          start: 'top top',
          scrub: true,
        },
        x: +100,
        duration: 0.3,
      });
});


