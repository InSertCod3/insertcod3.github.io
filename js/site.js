/* Shared header/footer, live clock, and dev-blog helpers. No dependencies. */

var SITE = {
  name: "Shamoy Baker",
  email: "insertcod3@gmail.com",
  github: "https://github.com/InSertCod3",
  linkedin: "https://www.linkedin.com/in/shamoy-baker-472548163/",
  avatar: "img/profile/1718292567186.jpg",
  booking: "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3Q_IYVpdFgfIPAFKFhYhUGTUS6p-Y1R8rW-ofLhDkMVE9c9tWvl8F3PLIQcn6F9eYsMNGcrHB-"
};

function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}

/* ---------- Header / footer ---------- */
function renderChrome() {
  var page = document.body.getAttribute("data-page") || "";
  var cur = function (p) { return page === p ? ' aria-current="page"' : ""; };

  var header = document.getElementById("site-header");
  if (header) {
    header.className = "site-header";
    header.innerHTML =
      '<div class="wrap nav">' +
        '<a class="brand" href="index.html"><img src="' + SITE.avatar + '" alt="" width="32" height="32"><span>' + SITE.name + '</span></a>' +
        '<ul class="nav-links" id="nav-links">' +
          '<li><a href="index.html#about"' + cur("about") + '>About</a></li>' +
          '<li><a href="blog.html"' + cur("blog") + '>Dev Blog</a></li>' +
          '<li><a href="index.html#projects">Projects</a></li>' +
          '<li><a href="booking.html"' + cur("booking") + '>Coffee</a></li>' +
        '</ul>' +
        '<div class="nav-cta">' +
          '<a class="btn btn-sm" href="booking.html">☕ Book a virtual coffee</a>' +
          '<button class="menu-btn" id="menu-btn" aria-label="Menu" aria-expanded="false" aria-controls="nav-links"><span></span><span></span><span></span></button>' +
        '</div>' +
      '</div>';
    var btn = document.getElementById("menu-btn"), links = document.getElementById("nav-links");
    var setMenu = function (open) {
      links.classList.toggle("open", open);
      document.body.classList.toggle("menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Close menu" : "Menu");
    };
    btn.addEventListener("click", function (e) { e.stopPropagation(); setMenu(!links.classList.contains("open")); });
    links.addEventListener("click", function () { setMenu(false); });
    document.addEventListener("click", function (e) {
      if (links.classList.contains("open") && !header.contains(e.target)) setMenu(false);
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
    window.addEventListener("resize", function () { if (window.innerWidth > 720) setMenu(false); });
  }

  var footer = document.getElementById("site-footer");
  if (footer) {
    footer.className = "site-footer";
    footer.innerHTML =
      '<div class="wrap">' +
        '<div class="footer-grid">' +
          '<div><a class="brand" href="index.html"><img src="' + SITE.avatar + '" alt="" width="32" height="32"><span>' + SITE.name + '</span></a>' +
          '<p style="margin:10px 0 0;max-width:36ch">Software engineer writing about what I build, break, and fix.</p></div>' +
          '<ul>' +
            '<li><a href="blog.html">Dev Blog</a></li>' +
            '<li><a href="booking.html">Book a virtual coffee</a></li>' +
            '<li><a target="_blank" rel="noopener" href="' + SITE.github + '">GitHub</a></li>' +
            '<li><a target="_blank" rel="noopener" href="' + SITE.linkedin + '">LinkedIn</a></li>' +
            '<li><a href="mailto:' + SITE.email + '">Email</a></li>' +
          '</ul>' +
        '</div>' +
        '<p class="footer-note">© ' + new Date().getFullYear() + ' ' + SITE.name + ' · Made with ❤️ by InsertCod3</p>' +
      '</div>';
  }
}

/* ---------- Live New York clock ---------- */
function tickClock() {
  var el = document.getElementById("est-clock");
  if (!el) return;
  el.textContent = new Date().toLocaleTimeString("en-US", {
    hour: "numeric", minute: "2-digit", timeZone: "America/New_York"
  });
}

/* ---------- Dev blog ---------- */
var _postsPromise = null;
function loadPosts() {
  if (!_postsPromise) {
    _postsPromise = fetch("posts/index.json", { cache: "no-cache" })
      .then(function (r) { if (!r.ok) throw new Error("posts/index.json " + r.status); return r.json(); })
      .then(function (list) {
        return list
          .filter(function (p) { return !p.draft; })
          .sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
      });
  }
  return _postsPromise;
}

function fmtDate(iso) {
  var d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function coverHtml(p) {
  var fallback = '<div class="cover-fallback">' + esc(p.emoji || "✍️") + "</div>";
  if (!p.cover) return '<div class="cover">' + fallback + "</div>";
  return '<div class="cover">' + fallback +
    '<img src="' + esc(p.cover) + '" alt="" loading="lazy" onerror="this.remove()"></div>';
}

function postCard(p, feature, solo) {
  var tags = (p.tags || []).map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join("");
  return '<a class="card post-card' + (feature ? " feature" : "") + (solo ? " solo" : "") + '" href="post.html?p=' + encodeURIComponent(p.slug) + '">' +
    coverHtml(p) +
    '<div class="card-body"><div class="tags">' + tags + "</div>" +
    "<h3>" + esc(p.title) + "</h3>" +
    "<p>" + esc(p.summary) + "</p>" +
    '<div class="meta"><span>' + fmtDate(p.date) + "</span>" +
    (p.readTime ? "<span>· " + esc(p.readTime) + "</span>" : "") +
    '<span class="arrow">→</span></div></div></a>';
}

function emptyPosts(msg) {
  return '<div class="empty"><b>' + (msg || "First post is brewing ☕") + "</b>" +
    "Dev blog posts will show up here as soon as they're published.</div>";
}

document.addEventListener("DOMContentLoaded", function () {
  renderChrome();
  tickClock();
  setInterval(tickClock, 15000);

  // Homepage: latest posts
  var latest = document.getElementById("latest-posts");
  if (latest) {
    loadPosts().then(function (posts) {
      if (!posts.length) { latest.innerHTML = emptyPosts(); return; }
      var top = posts.slice(0, 5);
      latest.innerHTML = top.map(function (p, i) { return postCard(p, i === 0, posts.length === 1); }).join("");
      if (window.SiteMotion) SiteMotion.scan(latest);
    }).catch(function () { latest.innerHTML = emptyPosts(); });
  }

  // Blog index
  var list = document.getElementById("post-list");
  if (list) {
    loadPosts().then(function (posts) {
      if (!posts.length) { list.outerHTML = emptyPosts(); return; }
      list.innerHTML = posts.map(function (p) {
        return '<a class="post-row" href="post.html?p=' + encodeURIComponent(p.slug) + '">' +
          '<div class="thumb">' + coverHtml(p) + "</div>" +
          "<div><time datetime=\"" + esc(p.date) + "\">" + fmtDate(p.date) + "</time><h3>" + esc(p.title) + "</h3><p>" + esc(p.summary) + "</p></div>" +
          '<div class="tags">' + (p.tags || []).map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join("") + "</div></a>";
      }).join("");
      if (window.SiteMotion) SiteMotion.scan(list);
    }).catch(function () { list.outerHTML = emptyPosts("Couldn't load posts"); });
  }

  // Single post
  var article = document.getElementById("post-body");
  if (article) renderPost(article);
});

function renderPost(article) {
  var slug = new URLSearchParams(location.search).get("p");
  var fail = function (msg) {
    article.innerHTML = '<div class="empty"><b>' + esc(msg) + '</b><a href="blog.html">← Back to the dev blog</a></div>';
  };
  if (!slug || !/^[a-z0-9-]+$/i.test(slug)) return fail("Post not found");

  loadPosts().then(function (posts) {
    var meta = posts.filter(function (p) { return p.slug === slug; })[0];
    if (!meta) return fail("Post not found");
    return fetch("posts/" + slug + ".md", { cache: "no-cache" })
      .then(function (r) { if (!r.ok) throw new Error("md " + r.status); return r.text(); })
      .then(function (md) {
        document.title = meta.title + " — " + SITE.name;
        if (meta.cover) md = md.replace(/^\s*!\[[^\]]*\]\([^)]*\)\s*/, "");
        var html = DOMPurify.sanitize(marked.parse(md));
        article.innerHTML =
          '<a class="back" href="blog.html">← Dev Blog</a>' +
          '<h1 class="title">' + esc(meta.title) + "</h1>" +
          '<div class="byline"><img src="' + SITE.avatar + '" alt="">' +
            "<span>" + SITE.name + "</span><span>·</span><span>" + fmtDate(meta.date) + "</span>" +
            (meta.readTime ? "<span>·</span><span>" + esc(meta.readTime) + "</span>" : "") + "</div>" +
          (meta.cover ? '<figure class="hero-img">' + coverHtml(meta) + "</figure>" : "") +
          '<div class="prose">' + html + "</div>";
        if (window.hljs) article.querySelectorAll("pre code").forEach(function (b) { hljs.highlightElement(b); });
        if (window.SiteMotion) SiteMotion.scan(article);
      });
  }).catch(function () { fail("Couldn't load this post"); });
}
