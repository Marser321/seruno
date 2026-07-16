/* Ecosistema Gisella Arias Olson — interacciones compartidas */
(function () {
  'use strict';

  /* Header: estado "scrolled" */
  var header = document.querySelector('.site-header');
  var floating = document.querySelector('.floating-cta');
  function onScroll() {
    var y = window.scrollY;
    if (header) header.classList.toggle('scrolled', y > 40);
    if (floating) floating.classList.toggle('show', y > 480);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Reveal al scroll */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* Scrollytelling: activa el slide de fondo según la sección visible */
  var panels = document.querySelectorAll('.panel-trigger');
  var slides = document.querySelectorAll('.scrolly-slide');
  if (panels.length && slides.length && 'IntersectionObserver' in window) {
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var idx = parseInt(e.target.getAttribute('data-slide'), 10) || 0;
          slides.forEach(function (s, i) { s.classList.toggle('active', i === idx); });
        }
      });
    }, { threshold: 0.5 });
    panels.forEach(function (p) { so.observe(p); });
  }

  /* FAQ acordeón */
  document.querySelectorAll('.faq-q').forEach(function (q, index) {
    q.setAttribute('role', 'button');
    q.setAttribute('tabindex', '0');
    q.setAttribute('aria-expanded', 'false');
    q.setAttribute('aria-controls', 'faq-answer-' + index);
    var answer = q.parentElement.querySelector('.faq-a');
    if (answer) answer.id = 'faq-answer-' + index;
    function toggleFaq() {
      var isOpen = q.parentElement.classList.toggle('active');
      q.setAttribute('aria-expanded', String(isOpen));
    }
    q.addEventListener('click', toggleFaq);
    q.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleFaq();
      }
    });
  });

  /* Carrusel lateral de testimonios */
  document.querySelectorAll('[data-testimonial-carousel]').forEach(function (carousel) {
    var viewport = carousel.querySelector('[data-carousel-viewport]');
    var cards = Array.prototype.slice.call(carousel.querySelectorAll('[data-carousel-card]'));
    var previous = carousel.querySelector('[data-carousel-prev]');
    var next = carousel.querySelector('[data-carousel-next]');
    var currentLabel = carousel.querySelector('[data-carousel-current]');
    var totalLabel = carousel.querySelector('[data-carousel-total]');
    var ticking = false;

    if (!viewport || !cards.length) return;
    if (totalLabel) totalLabel.textContent = String(cards.length);

    function activeIndex() {
      var viewportLeft = viewport.getBoundingClientRect().left;
      var closestIndex = 0;
      var closestDistance = Infinity;
      cards.forEach(function (card, index) {
        var distance = Math.abs(card.getBoundingClientRect().left - viewportLeft);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });
      return closestIndex;
    }

    function updateCarousel() {
      var index = activeIndex();
      if (currentLabel) currentLabel.textContent = String(index + 1);
      if (previous) previous.disabled = index === 0;
      if (next) next.disabled = index === cards.length - 1;
      ticking = false;
    }

    function goTo(index) {
      var target = cards[Math.max(0, Math.min(cards.length - 1, index))];
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }

    if (previous) previous.addEventListener('click', function () { goTo(activeIndex() - 1); });
    if (next) next.addEventListener('click', function () { goTo(activeIndex() + 1); });
    viewport.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(updateCarousel);
        ticking = true;
      }
    }, { passive: true });

    cards.forEach(function (card) {
      var video = card.querySelector('video');
      if (!video) return;
      video.addEventListener('play', function () {
        cards.forEach(function (otherCard) {
          var otherVideo = otherCard.querySelector('video');
          if (otherVideo && otherVideo !== video) otherVideo.pause();
        });
      });
    });

    updateCarousel();
  });

  /* Modal */
  var overlay = document.getElementById('modalOverlay');
  if (overlay) {
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-hidden', 'true');
  }
  window.openModal = function () {
    if (overlay) {
      overlay.classList.add('open');
      overlay.setAttribute('aria-hidden', 'false');
      var firstField = overlay.querySelector('input, select, button');
      if (firstField) firstField.focus();
    }
  };
  window.closeModal = function () {
    if (overlay) {
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden', 'true');
    }
  };
  if (overlay) {
    overlay.addEventListener('click', function (e) { if (e.target === overlay) window.closeModal(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') window.closeModal(); });
  }
  window.selectPlan = function (name) {
    var sel = document.getElementById('planSelector');
    if (sel) sel.value = name;
    window.openModal();
  };
  window.handleFormSubmit = function (e) {
    e.preventDefault();
    alert('¡Gracias! Recibimos tu solicitud. Te contactaremos muy pronto.');
    window.closeModal();
    return false;
  };
})();
