/*
 * Internationalisation for Open Philosophy.
 *
 * The default language is English. Russian, German and Chinese are also
 * available and the whole interface (navigation, tiles, genre pages and the
 * book modal chrome) is translated. Book titles, authors and descriptions are
 * kept in their catalogue form.
 *
 * Any element carrying a `data-i18n="key"` attribute has its text content
 * replaced with the matching translation; `data-i18n-placeholder="key"`
 * localises input placeholders.
 */

const I18N = {
  en: {
    label: 'English',
    'app.name': 'Open Philosophy',
    'nav.main': 'Main',
    'nav.library': 'Library',
    'settings.title': 'Settings',
    'settings.language': 'Language',
    'settings.theme': 'Theme',
    'theme.day': 'Day',
    'theme.night': 'Night',
    'main.tagline': 'A free, open catalogue of philosophy and its neighbouring minds.',
    'main.aboutTitle': 'About the Library',
    'main.aboutText':
      'Open Philosophy is a free digital library dedicated to the great works ' +
      'of philosophy, psychology and religious thought. Browse curated ' +
      'collections by tradition, search by title or author, and download ' +
      'classic texts to read at your own pace.',
    'main.resourcesTitle': 'Resources',
    'main.resourcesText': 'Trusted places to keep reading and exploring:',
    'library.searchPlaceholder': 'Search by title or author…',
    'library.noResults': 'No books match your search.',
    'library.count': 'books',
    'genre.all': 'All',
    'genre.classical': 'Classical Philosophical Schools',
    'genre.modern': 'Philosophical Movements of the Modern Era and the 20th Century',
    'genre.psychology': 'Practical Psychology',
    'genre.religious': 'Religious and Eastern Philosophical Systems',
    'genre.ethics': 'Ethical Concepts',
    'genre.other': 'Other',
    'book.by': 'by',
    'book.year': 'Year',
    'book.author': 'Author',
    'book.genre': 'Genre',
    'book.description': 'Description',
    'book.download': 'Download',
    'book.close': 'Close',
  },
  ru: {
    label: 'Русский',
    'app.name': 'Открытая философия',
    'nav.main': 'Главная',
    'nav.library': 'Библиотека',
    'settings.title': 'Настройки',
    'settings.language': 'Язык',
    'settings.theme': 'Тема',
    'theme.day': 'День',
    'theme.night': 'Ночь',
    'main.tagline': 'Свободный открытый каталог философии и смежных областей мысли.',
    'main.aboutTitle': 'О библиотеке',
    'main.aboutText':
      'Открытая философия — это бесплатная цифровая библиотека, посвящённая ' +
      'великим трудам философии, психологии и религиозной мысли. Просматривайте ' +
      'подобранные коллекции по традициям, ищите по названию или автору и ' +
      'скачивайте классические тексты, чтобы читать в удобном темпе.',
    'main.resourcesTitle': 'Ресурсы',
    'main.resourcesText': 'Надёжные места, чтобы продолжить чтение и изучение:',
    'library.searchPlaceholder': 'Поиск по названию или автору…',
    'library.noResults': 'По вашему запросу ничего не найдено.',
    'library.count': 'книг',
    'genre.all': 'Все',
    'genre.classical': 'Классические философские школы',
    'genre.modern': 'Философские течения Нового времени и XX века',
    'genre.psychology': 'Практическая психология',
    'genre.religious': 'Религиозные и восточные философские системы',
    'genre.ethics': 'Этические концепции',
    'genre.other': 'Прочее',
    'book.by': '—',
    'book.year': 'Год',
    'book.author': 'Автор',
    'book.genre': 'Жанр',
    'book.description': 'Описание',
    'book.download': 'Скачать',
    'book.close': 'Закрыть',
  },
  de: {
    label: 'Deutsch',
    'app.name': 'Offene Philosophie',
    'nav.main': 'Start',
    'nav.library': 'Bibliothek',
    'settings.title': 'Einstellungen',
    'settings.language': 'Sprache',
    'settings.theme': 'Design',
    'theme.day': 'Tag',
    'theme.night': 'Nacht',
    'main.tagline': 'Ein freier, offener Katalog der Philosophie und verwandter Denkrichtungen.',
    'main.aboutTitle': 'Über die Bibliothek',
    'main.aboutText':
      'Offene Philosophie ist eine kostenlose digitale Bibliothek, die den ' +
      'großen Werken der Philosophie, Psychologie und des religiösen Denkens ' +
      'gewidmet ist. Durchstöbern Sie kuratierte Sammlungen nach Tradition, ' +
      'suchen Sie nach Titel oder Autor und laden Sie klassische Texte herunter, ' +
      'um sie in Ihrem eigenen Tempo zu lesen.',
    'main.resourcesTitle': 'Ressourcen',
    'main.resourcesText': 'Vertrauenswürdige Orte zum Weiterlesen und Entdecken:',
    'library.searchPlaceholder': 'Suche nach Titel oder Autor…',
    'library.noResults': 'Keine Bücher entsprechen Ihrer Suche.',
    'library.count': 'Bücher',
    'genre.all': 'Alle',
    'genre.classical': 'Klassische philosophische Schulen',
    'genre.modern': 'Philosophische Strömungen der Neuzeit und des 20. Jahrhunderts',
    'genre.psychology': 'Praktische Psychologie',
    'genre.religious': 'Religiöse und östliche philosophische Systeme',
    'genre.ethics': 'Ethische Konzepte',
    'genre.other': 'Sonstiges',
    'book.by': 'von',
    'book.year': 'Jahr',
    'book.author': 'Autor',
    'book.genre': 'Genre',
    'book.description': 'Beschreibung',
    'book.download': 'Herunterladen',
    'book.close': 'Schließen',
  },
  zh: {
    label: '中文',
    'app.name': '开放哲学',
    'nav.main': '主页',
    'nav.library': '图书馆',
    'settings.title': '设置',
    'settings.language': '语言',
    'settings.theme': '主题',
    'theme.day': '日间',
    'theme.night': '夜间',
    'main.tagline': '一个自由、开放的哲学及相关思想目录。',
    'main.aboutTitle': '关于图书馆',
    'main.aboutText':
      '开放哲学是一个免费的数字图书馆，致力于收藏哲学、心理学与宗教思想的伟大著作。' +
      '您可以按传统浏览精选合集，按标题或作者搜索，并下载经典文本，随心阅读。',
    'main.resourcesTitle': '资源',
    'main.resourcesText': '值得信赖的延伸阅读与探索之处：',
    'library.searchPlaceholder': '按标题或作者搜索…',
    'library.noResults': '没有找到符合搜索条件的书籍。',
    'library.count': '本书',
    'genre.all': '全部',
    'genre.classical': '古典哲学学派',
    'genre.modern': '近代及二十世纪的哲学思潮',
    'genre.psychology': '实用心理学',
    'genre.religious': '宗教与东方哲学体系',
    'genre.ethics': '伦理观念',
    'genre.other': '其他',
    'book.by': '作者',
    'book.year': '年份',
    'book.author': '作者',
    'book.genre': '类别',
    'book.description': '简介',
    'book.download': '下载',
    'book.close': '关闭',
  },
};

// External resources shown on the main page. Names are proper nouns and stay
// the same across languages; only the surrounding chrome is translated.
const RESOURCES = [
  { name: 'Stanford Encyclopedia of Philosophy', url: 'https://plato.stanford.edu/' },
  { name: 'Internet Encyclopedia of Philosophy', url: 'https://iep.utm.edu/' },
  { name: 'Project Gutenberg', url: 'https://www.gutenberg.org/' },
  { name: 'PhilPapers', url: 'https://philpapers.org/' },
  { name: 'Wikisource', url: 'https://wikisource.org/' },
];

window.I18N = I18N;
window.RESOURCES = RESOURCES;
