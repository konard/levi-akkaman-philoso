/*
 * Open Philosophy — book catalogue.
 *
 * The catalogue is a plain JavaScript array so the whole library can run as a
 * static site without a backend. Every book carries the fields required by the
 * project brief:
 *   - title            : book title
 *   - author           : author name
 *   - year             : publication year (a string so we can keep "c. 380 BC")
 *   - description       : long text shown in the book modal
 *   - image            : cover image URL (a generated placeholder is used as a
 *                        fallback when the remote image cannot be loaded)
 *   - download          : link to a downloadable copy (mostly Project Gutenberg)
 *   - genre            : one of the GENRES keys below
 *
 * Genres map to the separate sub-pages of the Library tab.
 */

const GENRES = [
  'classical',   // Classical Philosophical Schools
  'modern',      // Philosophical Movements of the Modern Era and the 20th Century
  'psychology',  // Practical Psychology
  'religious',   // Religious and Eastern Philosophical Systems
  'ethics',      // Ethical Concepts
  'other',       // Other
];

const BOOKS = [
  // ---------------------------------------------------------------- Classical
  {
    title: 'Meditations',
    author: 'Marcus Aurelius',
    year: '180',
    genre: 'classical',
    description:
      'A series of personal writings by the Roman Emperor Marcus Aurelius, ' +
      'setting out his ideas on Stoic philosophy. Never intended for ' +
      'publication, the twelve books are a private source of guidance and ' +
      'self-improvement on duty, mortality and living in accordance with nature.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Meditations_-_Marcus_Aurelius.jpg',
    download: 'https://www.gutenberg.org/ebooks/2680',
  },
  {
    title: 'The Republic',
    author: 'Plato',
    year: 'c. 375 BC',
    genre: 'classical',
    description:
      'A Socratic dialogue concerning justice, the order and character of the ' +
      'just city-state, and the just man. It is Plato’s best-known work and ' +
      'introduces the allegory of the cave, the theory of forms and the ' +
      'philosopher-king.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Platon_Republik.jpg',
    download: 'https://www.gutenberg.org/ebooks/1497',
  },
  {
    title: 'Nicomachean Ethics',
    author: 'Aristotle',
    year: 'c. 340 BC',
    genre: 'classical',
    description:
      'Aristotle’s central work on ethics, examining how humans should best ' +
      'live. It develops the idea of virtue as a mean between extremes and ' +
      'argues that eudaimonia — flourishing — is the highest human good.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Aristotle_Ethica_Nicomachea_page_1.jpg',
    download: 'https://www.gutenberg.org/ebooks/8438',
  },
  {
    title: 'The Enchiridion',
    author: 'Epictetus',
    year: 'c. 125',
    genre: 'classical',
    description:
      'A short manual of Stoic ethical advice compiled by Arrian, a pupil of ' +
      'Epictetus. It distils the practical core of Stoicism: focus only on what ' +
      'is within your control and accept the rest with equanimity.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Epictetus_Enchiridion_1683_page1.png',
    download: 'https://www.gutenberg.org/ebooks/45109',
  },

  // ------------------------------------------------------------------- Modern
  {
    title: 'Thus Spoke Zarathustra',
    author: 'Friedrich Nietzsche',
    year: '1883',
    genre: 'modern',
    description:
      'A philosophical novel presenting the ideas of the Übermensch, the ' +
      'eternal recurrence and the death of God through the travels and speeches ' +
      'of the prophet Zarathustra.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Also_sprach_Zarathustra._Ein_Buch_f%C3%BCr_Alle_und_Keinen_%28title_page%29.jpg',
    download: 'https://www.gutenberg.org/ebooks/1998',
  },
  {
    title: 'Critique of Pure Reason',
    author: 'Immanuel Kant',
    year: '1781',
    genre: 'modern',
    description:
      'Kant’s seminal work of the Enlightenment, investigating the limits and ' +
      'scope of human reason. It seeks to reconcile rationalism and empiricism ' +
      'through the notion of synthetic a priori knowledge.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Kant_KrV_1781.jpg',
    download: 'https://www.gutenberg.org/ebooks/4280',
  },
  {
    title: 'The Communist Manifesto',
    author: 'Karl Marx & Friedrich Engels',
    year: '1848',
    genre: 'modern',
    description:
      'A political pamphlet presenting an analytical approach to class struggle ' +
      'and the problems of capitalism, and calling for the working class to ' +
      'overturn the existing social order.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Communist-manifesto.png',
    download: 'https://www.gutenberg.org/ebooks/61',
  },
  {
    title: 'Beyond Good and Evil',
    author: 'Friedrich Nietzsche',
    year: '1886',
    genre: 'modern',
    description:
      'A critique of past philosophers for their unquestioned acceptance of ' +
      'moral premises. Nietzsche argues for a re-evaluation of values and ' +
      'develops his ideas of the will to power.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Beyond_Good_and_Evil_title_page.jpg',
    download: 'https://www.gutenberg.org/ebooks/4363',
  },

  // --------------------------------------------------------------- Psychology
  {
    title: 'The Interpretation of Dreams',
    author: 'Sigmund Freud',
    year: '1899',
    genre: 'psychology',
    description:
      'Freud’s foundational text introducing the theory of the unconscious ' +
      'with respect to dream interpretation, and the concept of wish ' +
      'fulfilment. A cornerstone of psychoanalysis.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Interpretation_of_Dreams_1899_title.jpg',
    download: 'https://www.gutenberg.org/ebooks/66048',
  },
  {
    title: 'Psychology of the Unconscious',
    author: 'Carl Gustav Jung',
    year: '1912',
    genre: 'psychology',
    description:
      'Jung’s study of the symbolism of the libido and the collective ' +
      'unconscious, marking his intellectual break from Freud and laying the ' +
      'ground for analytical psychology.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Carl_Jung_1910.jpg',
    download: 'https://www.gutenberg.org/ebooks/65903',
  },
  {
    title: 'The Principles of Psychology',
    author: 'William James',
    year: '1890',
    genre: 'psychology',
    description:
      'A monumental survey of the emerging science of psychology, introducing ' +
      'the notion of the "stream of consciousness" and pragmatic accounts of ' +
      'habit, emotion and the self.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/William_James_b1842c.jpg',
    download: 'https://www.gutenberg.org/ebooks/57628',
  },
  {
    title: 'Beyond the Pleasure Principle',
    author: 'Sigmund Freud',
    year: '1920',
    genre: 'psychology',
    description:
      'An essay in which Freud introduces the concept of the death drive and ' +
      'revises his earlier theory that the mind is governed solely by the ' +
      'pleasure principle.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Sigmund_Freud%2C_by_Max_Halberstadt_%28cropped%29.jpg',
    download: 'https://www.gutenberg.org/ebooks/67903',
  },

  // ----------------------------------------------------------------- Religious
  {
    title: 'Tao Te Ching',
    author: 'Lao Tzu',
    year: 'c. 400 BC',
    genre: 'religious',
    description:
      'The fundamental text of Taoism, a short work of poetic aphorisms on ' +
      'living in harmony with the Tao — the natural order underlying all ' +
      'things — through simplicity, humility and non-action (wu wei).',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Mawangdui_LaoTsu_Ms2.JPG',
    download: 'https://www.gutenberg.org/ebooks/216',
  },
  {
    title: 'The Analects',
    author: 'Confucius',
    year: 'c. 475 BC',
    genre: 'religious',
    description:
      'A collection of sayings and ideas attributed to Confucius and his ' +
      'contemporaries, forming the core of Confucian thought on ethics, ' +
      'governance, ritual and the cultivation of virtue.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/54/Confucius_the_scholar.jpg',
    download: 'https://www.gutenberg.org/ebooks/3330',
  },
  {
    title: 'The Bhagavad Gita',
    author: 'Vyasa (attributed)',
    year: 'c. 200 BC',
    genre: 'religious',
    description:
      'A 700-verse Hindu scripture, part of the epic Mahabharata, in which the ' +
      'god Krishna counsels the warrior Arjuna on duty, righteousness and the ' +
      'paths of yoga and devotion.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Bhagavad_Gita%2C_a_19th_century_manuscript.jpg',
    download: 'https://www.gutenberg.org/ebooks/2388',
  },
  {
    title: 'The Dhammapada',
    author: 'Attributed to the Buddha',
    year: 'c. 300 BC',
    genre: 'religious',
    description:
      'A collection of sayings of the Buddha in verse form, one of the most ' +
      'widely read Buddhist scriptures, offering guidance on the ethical and ' +
      'contemplative path to liberation.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Gautama_Buddha_statue.jpg',
    download: 'https://www.gutenberg.org/ebooks/2017',
  },

  // -------------------------------------------------------------------- Ethics
  {
    title: 'The Metaphysics of Morals (Groundwork)',
    author: 'Immanuel Kant',
    year: '1785',
    genre: 'ethics',
    description:
      'Kant’s first contribution to moral philosophy, arguing for an a priori ' +
      'basis for morality grounded in the categorical imperative and the ' +
      'inherent dignity of rational beings.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Grundlegung_zur_Metaphysik_der_Sitten_%281785%29.png',
    download: 'https://www.gutenberg.org/ebooks/5682',
  },
  {
    title: 'Utilitarianism',
    author: 'John Stuart Mill',
    year: '1861',
    genre: 'ethics',
    description:
      'A classic defence of the utilitarian ethical theory, which holds that ' +
      'actions are right in proportion as they tend to promote happiness and ' +
      'the greatest good for the greatest number.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/34/John_Stuart_Mill_by_London_Stereoscopic_Company%2C_c1870.jpg',
    download: 'https://www.gutenberg.org/ebooks/11224',
  },
  {
    title: 'The Ethics',
    author: 'Baruch Spinoza',
    year: '1677',
    genre: 'ethics',
    description:
      'Written in a geometric style of definitions, axioms and propositions, ' +
      'Spinoza’s masterwork develops a pantheistic metaphysics and an ethics ' +
      'of understanding, freedom and the intellectual love of God.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Spinoza.jpg',
    download: 'https://www.gutenberg.org/ebooks/3800',
  },

  // --------------------------------------------------------------------- Other
  {
    title: 'Meditations on First Philosophy',
    author: 'René Descartes',
    year: '1641',
    genre: 'other',
    description:
      'A foundational work of modern philosophy in which Descartes employs ' +
      'methodological doubt, arriving at the certainty of "cogito, ergo sum" ' +
      'and rebuilding knowledge on secure foundations.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Meditationes_de_prima_philosophia_1641.jpg',
    download: 'https://www.gutenberg.org/ebooks/59',
  },
  {
    title: 'Leviathan',
    author: 'Thomas Hobbes',
    year: '1651',
    genre: 'other',
    description:
      'A treatise on the structure of society and legitimate government, ' +
      'famous for its social contract theory and its description of the state ' +
      'of nature as a war of "all against all".',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Leviathan_by_Thomas_Hobbes.jpg',
    download: 'https://www.gutenberg.org/ebooks/3207',
  },
  {
    title: 'An Essay Concerning Human Understanding',
    author: 'John Locke',
    year: '1689',
    genre: 'other',
    description:
      'Locke’s influential empiricist account of the origin, certainty and ' +
      'extent of human knowledge, arguing that the mind begins as a blank ' +
      'slate shaped by experience.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Essay_Concerning_Humane_Understanding.jpg',
    download: 'https://www.gutenberg.org/ebooks/10615',
  },
  {
    title: 'The Prince',
    author: 'Niccolò Machiavelli',
    year: '1532',
    genre: 'other',
    description:
      'A political treatise on the acquisition and maintenance of power, ' +
      'notorious for its pragmatic — some say ruthless — advice to rulers ' +
      'and its separation of politics from conventional morality.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Machiavelli_Principe_Cover_Page.jpg',
    download: 'https://www.gutenberg.org/ebooks/1232',
  },
];

// Expose to the rest of the app (loaded via classic <script> tags).
window.GENRES = GENRES;
window.BOOKS = BOOKS;
