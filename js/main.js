AOS.init({
  offset: 120,
  delay: 0,
  duration: 900,
  easing: 'ease',
  once: false,
  mirror: false,
  anchorPlacement: 'top-bottom',
});

// Navbar: hide on scroll down, show on scroll up
(function () {
  const navbar = document.getElementById('mainNav');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', function () {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 80) {
      // Scrolling down → hide
      navbar.classList.add('navbar--hidden');
    } else {
      // Scrolling up → show
      navbar.classList.remove('navbar--hidden');
    }

    lastScrollY = currentScrollY;
  }, { passive: true });
})();

// Projects carousel — mouse drag to slide
document.addEventListener('DOMContentLoaded', function () {
  const inner = document.querySelector('#projectsCarousel .carousel-inner');
  if (!inner) return;
  let startX = 0, isDragging = false;

  inner.addEventListener('mousedown', function (e) {
    startX = e.clientX;
    isDragging = true;
    inner.style.cursor = 'grabbing';
    e.preventDefault();
  });

  document.addEventListener('mouseup', function (e) {
    if (!isDragging) return;
    isDragging = false;
    inner.style.cursor = 'grab';
    const diff = e.clientX - startX;
    if (Math.abs(diff) < 40) return;
    const carousel = bootstrap.Carousel.getOrCreateInstance(document.getElementById('projectsCarousel'));
    diff < 0 ? carousel.next() : carousel.prev();
  });

  document.addEventListener('mouseleave', function () {
    if (isDragging) { isDragging = false; inner.style.cursor = 'grab'; }
  });

  inner.style.cursor = 'grab';
});

// Projects carousel — sync external dots with active slide
document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.getElementById('projectsCarousel');
  const dots = document.querySelectorAll('.project-dot');
  if (carousel && dots.length) {
    carousel.addEventListener('slid.bs.carousel', function (e) {
      dots.forEach(function (d) { d.classList.remove('active'); });
      if (dots[e.to]) dots[e.to].classList.add('active');
    });
  }
});

// Close mobile menu when a nav link is clicked
document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navbarCollapse = document.getElementById('navbarNav');

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });
});
