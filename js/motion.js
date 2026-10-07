/* Motion layer: scroll reveals, marquee, card spotlight/tilt, header + progress, mobile CTA.
   Loaded with `defer` after site.js. No dependencies. Safe to fail: content is visible by default. */
(function () {
  var doc = document, root = doc.documentElement;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var canHover = window.matchMedia && matchMedia("(hover: hover) and (pointer: fine)").matches;
  var hasIO = "IntersectionObserver" in window;

  /* ---------- Scroll reveal ---------- */
  var TARGETS = [
    [".section-head", "up"], [".about > img", "scale"], [".about > div", "right"],
    [".grid:not(.snap) > .card", "up"], [".grid:not(.snap) > .empty", "fade"], [".grid.snap", "up"],
    [".logos", "fade"], [".cta-band", "scale"],
    [".post-row", "up"], [".book-side > .card", "left"], [".embed", "up"],
    [".article > *", "up"], [".page-hero + .section", "fade"]
  ];
  var io = null;
  function show(el) {
    el.classList.add("in");
    // hand transitions back to the element's own (hover) styles once the reveal is done
    setTimeout(function () { el.removeAttribute("data-reveal"); el.classList.remove("in"); }, 1400);
  }
  function scan(scope) {
    if (reduce || !hasIO) return;
    scope = scope || doc;
    if (!io) {
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { io.unobserve(e.target); show(e.target); }
        });
      }, { threshold: 0.1, rootMargin: "0px 0px -6% 0px" });
    }
    TARGETS.forEach(function (t) {
      scope.querySelectorAll(t[0]).forEach(function (el) {
        if (el._rv) return;
        el._rv = true;
        var kind = t[1];
        el.setAttribute("data-reveal", kind === "up" ? "" : kind);
        var idx = 0, sib = el;
        while ((sib = sib.previousElementSibling)) idx++;
        el.style.setProperty("--d", Math.min(idx, 5));
        io.observe(el);
      });
    });
  }

  /* ---------- Stack logos -> infinite marquee ---------- */
  function marquee() {
    if (reduce) return;
    doc.querySelectorAll(".logos").forEach(function (box) {
      if (box.classList.contains("is-marquee")) return;
      var tiles = Array.prototype.slice.call(box.children);
      var track = doc.createElement("div");
      track.className = "track";
      tiles.forEach(function (t) { track.appendChild(t); });
      tiles.forEach(function (t) {
        var c = t.cloneNode(true);
        c.setAttribute("aria-hidden", "true");
        track.appendChild(c);
      });
      box.appendChild(track);
      box.classList.add("is-marquee");
    });
  }

  /* ---------- Card spotlight + tilt (mouse only) ---------- */
  function pointerFx() {
    if (reduce || !canHover) return;
    var frame = 0, last = null;
    doc.addEventListener("pointermove", function (e) {
      var card = e.target.closest && e.target.closest(".card");
      if (!card) return;
      last = { card: card, x: e.clientX, y: e.clientY };
      if (frame) return;
      frame = requestAnimationFrame(function () {
        frame = 0;
        var r = last.card.getBoundingClientRect();
        var px = (last.x - r.left) / r.width, py = (last.y - r.top) / r.height;
        last.card.style.setProperty("--mx", (px * r.width) + "px");
        last.card.style.setProperty("--my", (py * r.height) + "px");
        if (last.card.tagName === "A") {
          last.card.style.setProperty("--ry", ((px - 0.5) * 6).toFixed(2) + "deg");
          last.card.style.setProperty("--rx", ((0.5 - py) * 5).toFixed(2) + "deg");
        }
      });
    }, { passive: true });
    doc.addEventListener("pointerout", function (e) {
      var card = e.target.closest && e.target.closest("a.card");
      if (card && !card.contains(e.relatedTarget)) {
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
      }
    });
  }

  /* ---------- Scroll-linked chrome ---------- */
  function scrollFx() {
    var bar = doc.createElement("div");
    bar.className = "scroll-progress";
    bar.setAttribute("aria-hidden", "true");
    doc.body.appendChild(bar);

    var cta = null;
    if (doc.body.getAttribute("data-page") !== "booking") {
      cta = doc.createElement("div");
      cta.className = "mobile-cta";
      cta.innerHTML = '<a class="btn btn-lg" href="booking.html">☕ Book a virtual coffee</a>';
      doc.body.appendChild(cta);
    }

    var header = null, lastY = window.pageYOffset, ticking = false;
    function update() {
      ticking = false;
      var y = window.pageYOffset, h = root.scrollHeight - window.innerHeight;
      bar.style.setProperty("--p", h > 0 ? Math.min(1, y / h).toFixed(4) : 0);
      header = header || doc.getElementById("site-header");
      if (header) {
        header.classList.toggle("scrolled", y > 8);
        var menuOpen = doc.body.classList.contains("menu-open");
        header.classList.toggle("hide", !menuOpen && y > 160 && y > lastY + 4);
        if (y < lastY - 4 || y < 160) header.classList.remove("hide");
      }
      if (cta) {
        var nearEnd = y + window.innerHeight > root.scrollHeight - 260;
        cta.classList.toggle("show", y > 420 && !nearEnd);
      }
      lastY = y;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  /* ---------- Page leave transition ---------- */
  function pageLeave() {
    if (reduce) return;
    doc.addEventListener("click", function (e) {
      if (e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target.closest && e.target.closest("a[href]");
      if (!a || a.target || a.hasAttribute("download")) return;
      var u = new URL(a.href, location.href);
      if (u.origin !== location.origin || (u.pathname === location.pathname && u.search === location.search)) return;
      e.preventDefault();
      doc.body.classList.add("leaving");
      setTimeout(function () { location.href = u.href; }, 170);
    });
    window.addEventListener("pageshow", function (e) {
      if (e.persisted) doc.body.classList.remove("leaving");
    });
  }

  window.SiteMotion = { scan: scan };

  function init() {
    marquee();
    scan(doc);
    pointerFx();
    scrollFx();
    pageLeave();
  }
  if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", init); else init();
})();
