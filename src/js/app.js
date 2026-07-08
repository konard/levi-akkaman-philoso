/*
 * Open Philosophy — application logic.
 *
 * A small vanilla-JS single-page app: hash based navigation between the Main
 * and Library tabs, genre sub-pages inside the Library, live search by title
 * and author, a book detail modal, language switching (en/ru/de/zh) and a
 * day/night theme switcher. Preferences persist in localStorage.
 */
(function () {
  'use strict';

  var STORAGE = { lang: 'op-lang', theme: 'op-theme' };
  var DEFAULT_LANG = 'en';
  var DEFAULT_THEME = 'day';

  // The two theme logos requested in the brief.
  var LOGOS = {
    day: 'logo/logo_op_black.png',
    night: 'logo/logo_op_white.png',
  };

  var state = {
    lang: DEFAULT_LANG,
    theme: DEFAULT_THEME,
    view: 'main',
    genre: 'all',
    query: '',
  };

  // -- Small DOM helpers ---------------------------------------------------
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function t(key) {
    var dict = I18N[state.lang] || I18N[DEFAULT_LANG];
    if (dict && dict[key] != null) return dict[key];
    return I18N[DEFAULT_LANG][key] != null ? I18N[DEFAULT_LANG][key] : key;
  }

  // -- Cover placeholder ---------------------------------------------------
  // When a remote cover image fails to load we render a graceful gradient
  // placeholder carrying the title and author, so the catalogue never breaks.
  function placeholderCover(book) {
    var esc = function (s) {
      return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    };
    var title = esc(book.title);
    var author = esc(book.author);
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="400" viewBox="0 0 300 400">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#5b6cff"/><stop offset="1" stop-color="#b45aff"/>' +
      '</linearGradient></defs>' +
      '<rect width="300" height="400" fill="url(#g)"/>' +
      '<rect x="18" y="18" width="264" height="364" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>' +
      '<foreignObject x="26" y="120" width="248" height="200">' +
      '<div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Segoe UI,Arial,sans-serif;color:#fff;text-align:center">' +
      '<div style="font-size:22px;font-weight:700;line-height:1.25">' + title + '</div>' +
      '<div style="font-size:14px;margin-top:12px;opacity:0.85">' + author + '</div>' +
      '</div></foreignObject></svg>';
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  function attachCover(img, book) {
    img.onerror = function () {
      img.onerror = null;
      img.src = placeholderCover(book);
    };
    img.src = book.image;
  }

  // -- Internationalisation ------------------------------------------------
  function applyTranslations() {
    document.documentElement.lang = state.lang;
    document.documentElement.dir = 'ltr';

    $all('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    $all('[data-i18n-placeholder]').forEach(function (el) {
      el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder')));
    });
    $all('[data-i18n-title]').forEach(function (el) {
      el.setAttribute('title', t(el.getAttribute('data-i18n-title')));
    });
  }

  function buildLanguageSelect() {
    var select = $('#language-select');
    select.innerHTML = '';
    Object.keys(I18N).forEach(function (code) {
      var opt = document.createElement('option');
      opt.value = code;
      opt.textContent = I18N[code].label;
      select.appendChild(opt);
    });
    select.value = state.lang;
    select.addEventListener('change', function () {
      setLanguage(select.value);
    });
  }

  function setLanguage(lang) {
    if (!I18N[lang]) lang = DEFAULT_LANG;
    state.lang = lang;
    try { localStorage.setItem(STORAGE.lang, lang); } catch (e) {}
    applyTranslations();
    buildGenreTabs();
    renderCatalog();
  }

  // -- Theme ---------------------------------------------------------------
  function setTheme(theme) {
    if (theme !== 'day' && theme !== 'night') theme = DEFAULT_THEME;
    state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem(STORAGE.theme, theme); } catch (e) {}

    var logo = LOGOS[theme];
    $('#brand-logo').src = logo;
    $('#hero-logo').src = logo;

    $all('.theme-option').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-theme') === theme);
    });
  }

  // -- Navigation ----------------------------------------------------------
  function setView(view) {
    if (view !== 'main' && view !== 'library') view = 'main';
    state.view = view;

    $('#view-main').hidden = view !== 'main';
    $('#view-library').hidden = view !== 'library';

    $all('.nav-tab').forEach(function (tab) {
      tab.classList.toggle('active', tab.getAttribute('data-nav') === view);
    });
    window.scrollTo({ top: 0 });
  }

  function routeFromHash() {
    var hash = (window.location.hash || '').replace(/^#\/?/, '');
    setView(hash === 'library' ? 'library' : 'main');
  }

  // -- Genre sub-tabs ------------------------------------------------------
  function buildGenreTabs() {
    var container = $('#genre-tabs');
    container.innerHTML = '';
    var keys = ['all'].concat(GENRES);
    keys.forEach(function (key) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'genre-tab' + (key === state.genre ? ' active' : '');
      btn.textContent = t('genre.' + key);
      btn.setAttribute('data-genre', key);
      btn.addEventListener('click', function () {
        state.genre = key;
        $all('.genre-tab').forEach(function (b) {
          b.classList.toggle('active', b.getAttribute('data-genre') === key);
        });
        renderCatalog();
      });
      container.appendChild(btn);
    });
  }

  // -- Catalogue -----------------------------------------------------------
  function filteredBooks() {
    var q = state.query.trim().toLowerCase();
    return BOOKS.filter(function (book) {
      if (state.genre !== 'all' && book.genre !== state.genre) return false;
      if (!q) return true;
      return (
        book.title.toLowerCase().indexOf(q) !== -1 ||
        book.author.toLowerCase().indexOf(q) !== -1
      );
    });
  }

  function renderCatalog() {
    var catalog = $('#catalog');
    var list = filteredBooks();

    catalog.innerHTML = '';
    list.forEach(function (book, i) {
      var card = document.createElement('article');
      card.className = 'book-card';
      card.style.animationDelay = Math.min(i * 40, 320) + 'ms';
      card.tabIndex = 0;
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', book.title);

      // Catalogue view shows only: cover, title, date and author.
      var cover = document.createElement('img');
      cover.className = 'book-cover';
      cover.alt = book.title;
      cover.loading = 'lazy';
      attachCover(cover, book);

      var body = document.createElement('div');
      body.className = 'book-card-body';

      var h = document.createElement('h3');
      h.className = 'book-card-title';
      h.textContent = book.title;

      var author = document.createElement('p');
      author.className = 'book-card-author';
      author.textContent = book.author;

      var year = document.createElement('p');
      year.className = 'book-card-year';
      year.textContent = book.year;

      body.appendChild(h);
      body.appendChild(author);
      body.appendChild(year);
      card.appendChild(cover);
      card.appendChild(body);

      var open = function () { openModal(book); };
      card.addEventListener('click', open);
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
      });

      catalog.appendChild(card);
    });

    var count = $('#results-count');
    count.textContent = list.length + ' ' + t('library.count');

    $('#no-results').hidden = list.length !== 0;
  }

  // -- Book modal ----------------------------------------------------------
  var lastFocused = null;

  function openModal(book) {
    lastFocused = document.activeElement;
    attachCover($('#modal-cover'), book);
    $('#modal-cover').alt = book.title;
    $('#modal-title').textContent = book.title;
    $('#modal-author').textContent = t('book.by') + ' ' + book.author;
    $('#modal-year').textContent = book.year;
    $('#modal-genre').textContent = t('genre.' + book.genre);
    $('#modal-description').textContent = book.description;
    $('#modal-download').href = book.download;

    $('#modal-overlay').hidden = false;
    document.body.style.overflow = 'hidden';
    $('#modal-close').focus();
  }

  function closeModal() {
    $('#modal-overlay').hidden = true;
    document.body.style.overflow = '';
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  // -- Settings panel ------------------------------------------------------
  function toggleSettings(force) {
    var panel = $('#settings-panel');
    var btn = $('#settings-btn');
    var show = force != null ? force : panel.hidden;
    panel.hidden = !show;
    btn.setAttribute('aria-expanded', String(show));
  }

  // -- Main page dynamic content -------------------------------------------
  function buildResourceList() {
    var ul = $('#resource-list');
    ul.innerHTML = '';
    RESOURCES.forEach(function (res) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = res.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = res.name;
      li.appendChild(a);
      ul.appendChild(li);
    });
  }

  // -- Wiring --------------------------------------------------------------
  function init() {
    // Restore saved preferences.
    var savedLang, savedTheme;
    try {
      savedLang = localStorage.getItem(STORAGE.lang);
      savedTheme = localStorage.getItem(STORAGE.theme);
    } catch (e) {}
    state.lang = I18N[savedLang] ? savedLang : DEFAULT_LANG;
    state.theme = savedTheme === 'night' || savedTheme === 'day' ? savedTheme : DEFAULT_THEME;

    setTheme(state.theme);
    applyTranslations();
    buildLanguageSelect();
    buildResourceList();
    buildGenreTabs();
    renderCatalog();

    routeFromHash();
    window.addEventListener('hashchange', routeFromHash);

    // Search.
    $('#search-input').addEventListener('input', function (e) {
      state.query = e.target.value;
      renderCatalog();
    });

    // Settings toggle.
    $('#settings-btn').addEventListener('click', function (e) {
      e.stopPropagation();
      toggleSettings();
    });
    document.addEventListener('click', function (e) {
      var panel = $('#settings-panel');
      if (!panel.hidden && !panel.contains(e.target) && e.target.closest('#settings-btn') === null) {
        toggleSettings(false);
      }
    });

    // Theme buttons.
    $all('.theme-option').forEach(function (btn) {
      btn.addEventListener('click', function () { setTheme(btn.getAttribute('data-theme')); });
    });

    // Modal close interactions.
    $('#modal-close').addEventListener('click', closeModal);
    $('#modal-overlay').addEventListener('click', function (e) {
      if (e.target === $('#modal-overlay')) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      if (!$('#modal-overlay').hidden) closeModal();
      else if (!$('#settings-panel').hidden) toggleSettings(false);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
