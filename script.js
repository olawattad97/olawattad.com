/* olawattad.com — small progressive enhancements. The page works without JS. */
(function () {
  "use strict";

  var nav = document.getElementById("nav");
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");

  /* Solid nav once the hero scrolls away */
  function onScroll() {
    if (window.scrollY > 40) nav.classList.add("is-solid");
    else nav.classList.remove("is-solid");
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Mobile menu */
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.style.overflow = open ? "hidden" : "";
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A" && nav.classList.contains("is-open")) toggle.click();
    });
  }

  /* Highlight the section in view */
  var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
  var navAnchors = links ? Array.prototype.slice.call(links.querySelectorAll("a")) : [];
  if ("IntersectionObserver" in window && sections.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navAnchors.forEach(function (a) {
          a.classList.toggle("is-active", a.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(function (s) { io.observe(s); });
  }

  /* Media slots: if a photo/figure/video file is not there yet, show the
     labelled placeholder (or the inline SVG artwork) instead of a broken image. */
  Array.prototype.slice.call(document.querySelectorAll("[data-slot]")).forEach(function (el) {
    var slot = el.closest(".slot");
    if (!slot) return;
    var markMissing = function () { slot.classList.add("is-missing"); };
    var markPresent = function () { slot.classList.remove("is-missing"); };
    if (el.tagName === "VIDEO") {
      el.addEventListener("error", markMissing, true);
      el.addEventListener("loadeddata", markPresent);
      if (el.error) markMissing();
    } else {
      el.addEventListener("error", markMissing);
      el.addEventListener("load", markPresent);
      if (el.complete && el.naturalWidth === 0) markMissing();
    }
  });

  /* Research cards: when a real image/video file is present, reveal it over the SVG stand-in. */
  Array.prototype.slice.call(document.querySelectorAll(".work .media")).forEach(function (media) {
    var real = media.querySelector("[data-slot]");
    if (!real) return;
    var show = function () { media.classList.add("has-real"); };
    if (real.tagName === "VIDEO") {
      real.addEventListener("loadeddata", show);
      if (real.readyState >= 2) show();
    } else {
      real.addEventListener("load", show);
      if (real.complete && real.naturalWidth > 0) show();
    }
  });

  /* Footer year */
  var y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());
})();
