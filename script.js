/* =============================================================
   RAUNAK CURATED — Shared Client Script
   Loaded on every page. Handles:
     1. Mobile hamburger menu toggle
     2. Sticky header condense-on-scroll
     3. Scroll-triggered reveal animations
   ============================================================= */

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {

        /* ---------- 1. Mobile menu ---------- */
        const hamburger = document.querySelector('.hamburger');
        const overlay   = document.querySelector('.nav-mobile-overlay');

        if (hamburger && overlay) {
            hamburger.addEventListener('click', function () {
                hamburger.classList.toggle('active');
                overlay.classList.toggle('active');
                document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : '';
            });

            // Close on link click (smooth single-page feel)
            overlay.querySelectorAll('a').forEach(function (link) {
                link.addEventListener('click', function () {
                    hamburger.classList.remove('active');
                    overlay.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
        }

        /* ---------- 2. Sticky header scroll state ---------- */
        const header = document.querySelector('.header');
        if (header) {
            const onScroll = function () {
                if (window.scrollY > 40) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            };
            window.addEventListener('scroll', onScroll, { passive: true });
            onScroll();
        }

        /* ---------- 3. Scroll-reveal via IntersectionObserver ---------- */
        const revealTargets = document.querySelectorAll('.reveal');
        if (revealTargets.length && 'IntersectionObserver' in window) {
            const observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.12,
                rootMargin: '0px 0px -60px 0px'
            });

            revealTargets.forEach(function (el) { observer.observe(el); });
        } else {
            // Fallback: show everything if IO unsupported
            revealTargets.forEach(function (el) { el.classList.add('visible'); });
        }
    });
})();
