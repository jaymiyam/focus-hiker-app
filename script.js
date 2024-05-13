const themeToggle = document.querySelector('.theme-toggle');
const themeToggleIcon = document.querySelector('.theme-toggle-icon');
const themeToggleText = document.querySelector('.theme-toggle-text');
const heroAppScreen = document.querySelector('.hero-app-screen');

themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');

  if (currentTheme === 'light') {
    themeToggleText.textContent = 'Light mode';
    themeToggleIcon.innerHTML = `<use href="/assets/icon-sun.svg#icon-sun" />`;
    document.documentElement.setAttribute('data-theme', 'dark');
    heroAppScreen.src = '/assets/hero-app-screen-dark-min.png';
  } else {
    themeToggleText.textContent = 'Dark mode';
    themeToggleIcon.innerHTML = `<use href="/assets/icon-moon.svg#icon-moon" />`;
    document.documentElement.setAttribute('data-theme', 'light');
    heroAppScreen.src = '/assets/hero-app-screen-light-min.png';
  }
});

// GSAP

document.addEventListener('DOMContentLoaded', (event) => {
  gsap.registerPlugin(ScrollTrigger);

  const parallaxLayers = gsap.utils.toArray('.parallax');

  parallaxLayers.forEach((layer) => {
    const depth = layer.dataset.depth;
    const distance = -(layer.offsetHeight * depth);

    const tl = gsap.to(layer, { y: distance, ease: 'none' }, 0);

    ScrollTrigger.create({
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      animation: tl,
    });
  });

  const dividerAni = gsap.from(
    '.mid-divider',
    {
      xPercent: -85,
      ease: 'none',
      scrollTrigger: {
        trigger: '.mid-divider-wrapper',
        start: 'top 85%',
        end: 'bottom 60%',
        scrub: 1,
        // markers: true,
      },
    },
    0
  );

  const fadeLayers = gsap.utils.toArray('.fade-in');

  fadeLayers.forEach((layer) => {
    const parent = layer.parentNode;
    const tl = gsap.from(layer, { opacity: 0, y: 200 });

    ScrollTrigger.create({
      trigger: parent,
      start: 'top 80%',
      animation: tl,
    });
  });
});
