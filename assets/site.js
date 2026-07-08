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
