export type Side = 'bride' | 'groom';
export const COUPLE = { groom: 'Vicky Jain', bride: 'Yashi Jain' };
export const HASHTAGS = { main: '#ayYashiwithVicky', short: '#YaVi' };
export const MAP_LINK = 'https://maps.app.goo.gl/X7TxGiHLKaUDrEmU9?g_st=ic';
export const MAP_EMBED_URL = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.7626444924763!2d73.4342126!3d18.9418974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7f9f3a7d535a5%3A0xc9413fd5f1ef945a!2sNandi%20Baag%20Resort!5e0!3m2!1sen!2sin!4v1791645636865!5m2!1sen!2sin`; // TODO: Google Maps → Share → Embed a map → copy iframe src.
export const COUNTDOWN_TARGET = '2026-12-11T12:00:00+05:30';
export const VENUE = {
  name: 'Nandi Baag Resort',
  address:
    '100 Feet Road, opposite Aashiana lawns, Near Shani temple, Satara-Phaltan Road, Karad, Maharashtra 415101',
  dressCode: 'A little festive, a little fabulous',
};
export const TITLES = { bride: 'Yashi weds Vicky Ji', groom: 'Vicky weds Yashi' };
export const META = {
  description: `Vicky & Yashi's wedding, 11 & 12 December 2026 ${HASHTAGS.short}`,
  theme: '#fdf8ef',
  ogImage: '/images/og-cover.jpg',
};
export const EVENTS = [
  {
    id: 'haldi',
    numeral: 'I',
    name: 'Haldi & Carnival',
    date: '2026-12-11',
    time: '12:00 PM',
    hour: '120000',
    outfit: 'haldi',
    description: 'A little sunshine. A lot of haldi. Let the happy chaos begin.',
    dress: 'Wear yellow 💛',
  },
  {
    id: 'sangeet',
    numeral: 'II',
    name: 'Sangeet',
    date: '2026-12-11',
    time: '7:00 PM',
    hour: '190000',
    outfit: 'sangeet',
    description: 'Bring your best moves. We promise not to judge the rest.',
    dress: 'Sparkle & shine ✨',
  },
  {
    id: 'baarat',
    numeral: 'III',
    name: 'Baarat',
    date: '2026-12-12',
    time: '10:00 AM',
    hour: '100000',
    outfit: 'baarat',
    description: 'Dhol, dancing, and a very excited groom. Join the procession.',
    dress: 'Royal & festive 👑',
  },
  {
    id: 'shaadi',
    numeral: 'IV',
    name: 'Mangal Vivaah',
    date: '2026-12-12',
    time: '12:15 PM',
    hour: '121500',
    outfit: 'shaadi',
    description: 'Seven promises. Two hearts. One beautiful forever.',
    dress: 'Traditional elegance 🌹',
  },
] as const;
export const DAYS = [
  { date: '2026-12-11', label: 'Friday, 11 December', full: '11 December 2026' },
  { date: '2026-12-12', label: 'Saturday, 12 December', full: '12 December 2026' },
];

export type InviteDateType = 'all' | '12';

export function getInviteConfig(dateType: InviteDateType = 'all') {
  const is12Only = dateType === '12';
  const days = is12Only ? [DAYS[1]!] : DAYS;
  const events = is12Only ? EVENTS.filter((e) => e.date === '2026-12-12') : EVENTS;
  const countdownTarget = is12Only ? '2026-12-12T10:00:00+05:30' : COUNTDOWN_TARGET;
  const dateLabel = is12Only ? '12 December 2026' : '11 & 12 December 2026';
  const daysValue = is12Only
    ? 'Saturday 12 December 2026'
    : 'Friday 11 & Saturday 12 December 2026';
  const hoursValue = is12Only ? 'From 10:00 AM on 12 December' : 'From 12:00 PM on 11 December';
  const celebrationsSubtitle = is12Only ? 'Two pages, one day' : 'Four pages, two days';

  return {
    is12Only,
    days,
    events,
    countdownTarget,
    dateLabel,
    daysValue,
    hoursValue,
    celebrationsSubtitle,
  };
}

export const GALLERY = Array.from({ length: 4 }, (_, i) => ({
  src: `/images/gallery/${i + 1}.JPEG`,
  alt: `A painted memory of Vicky and Yashi, page ${i + 1}`,
  caption: [
    'A little magic',
    'Our kind of forever',
    'The happy little things',
    'Side by side',
    'Golden afternoons',
    'Better together',
    'A love like this',
    'The next chapter',
  ][i],
}));
export const IMAGES = {
  hero: '/images/hero.jpg',
  bride: '/images/bride.jpg',
  groom: '/images/groom.JPEG',
  map: '/images/map.jpg',
  finale: '/images/finale.jpg',
  couple: '/images/couple.png',
};
export const COPY = {
  close: 'Close photo',
  ji: ' Ji',
  brand: 'a celebration of love',
  chooserTitle: 'Vicky & Yashi',
  chooserSubtitle: 'Two families. One beautiful beginning.',
  chooserEyebrow: 'THE WEDDING STORYBOOK',
  brideLink: 'The bride’s invitation',
  groomLink: 'The groom’s invitation',
  helperLink: 'Create a guest invitation',
  sideLabels: [, `|| श्री अंतरिक्ष पार्श्वनाथाय नमः ||`, `|| ॐ श्री गणेशाय नमः ||`],
  gateEyebrow: 'A LITTLE ENVELOPE. A BIG CELEBRATION.',
  gateTitle: 'A story with you in it',
  gatePrompt: 'Please enter your name to open your invitation',
  namePlaceholder: 'Your lovely name',
  open: 'Open my invitation',
  skip: 'Skip intro',
  reset: 'Not you?',
  nameRequired: 'Please enter your name.',
  dear: (name: string) => `Dear ${name}, you are warmly invited`,
  together: 'Together with our families',
  weds: 'weds',
  tagline: 'Some stories are written in the stars. Ours begins with you.',
  saveDate: 'Save the Date',
  date: '11 & 12 December 2026',
  heroBottom: 'SCROLL TO TURN THE PAGE',
  chapters: {
    couple: ['Chapter One', 'The Two of Them', 'Two hearts, one wonderfully imperfect love story.'],
    details: [
      'Chapter Two',
      'Where the story gathers',
      'A place for laughter, love, and all our favourite people.',
    ],
    celebrations: ['Chapter Three', 'The Celebrations', 'Four pages, two days'],
    gallery: ['Chapter Four', 'Painted moments', 'A few pages from the album'],
    welcome: [
      'Chapter Five',
      'Warm Welcome',
      'With blessings, open arms, and hearts full of love.',
    ],
  },
  portraits: {
    bride: {
      label: 'The Bride',
      name: 'Yashi',
      bio: 'A little grace, a little mischief, and a heart full of sunshine.',
    },
    groom: {
      label: 'The Groom',
      name: 'Vicky',
      bio: 'Her favourite person. His favourite adventure is just beginning.',
    },
  },
  waiting: 'The Waiting',
  countdown: 'Until the gates open',
  units: ['Days', 'Hours', 'Minutes', 'Seconds'],
  scratchEyebrow: 'A LITTLE SURPRISE, JUST FOR YOU',
  scratchTitle: 'Some dates are worth keeping',
  scratchHint: 'Scratch to reveal dates',
  scratchAccessible: 'Reveal the wedding dates',
  scratchPersonal: (name: string) => `${name}, save the dates!`,
  calendar: 'Add to Calendar',
  shareExcitement: `Share your excitement with ${HASHTAGS.main}`,
  details: {
    days: 'The Days',
    daysValue: 'Friday 11 & Saturday 12 December 2026',
    hours: 'The Hours',
    hoursValue: 'From 12:00 PM on 11 December',
    place: 'The Place',
    dress: 'Dress Code',
  },
  directions: 'Get Directions',
  openMaps: 'Open in Google Maps',
  copyAddress: 'Copy address',
  mapPending: 'Our celebration, on the map',
  mapPendingSubtitle: 'The venue pin will appear here soon.',
  finaleTitle: 'Come early. Stay late.\nDance badly with us.',
  release: 'Release a wish lantern',
  finalePersonal: (name: string) => `We can’t wait to celebrate with you, ${name}`,
  closing: 'With all our love, Vicky & Yashi',
  wishMessage: 'Your wish is on its way ✨',
  footer: 'Made with ❤️ for our people',
  shareMoments: 'Share your moments with us using',
  copied: 'Copied! 💕',
  copyFailed: 'Copy unavailable — please copy the text manually.',
  linksTitle: 'An invitation, just for them',
  linksSubtitle: 'A little personal touch for your favourite people.',
  guestLabel: 'Guest name',
  linksBride: 'Bride’s side',
  linksGroom: 'Groom’s side',
  copyLink: 'Copy link',
  preview: 'Preview',
  back: 'Back to the storybook',
};
export const FAMILY_GROUPS = [
  ['divineBlessing', 'DIVINE BLESSING – DADAJI'],
  ['preciousBlessing', 'PRECIOUS BLESSING – DADIJI'],
  ['specialRegards', 'SPECIAL REGARDS'],
  ['lovingWishes', 'LOVING WISHES'],
  ['nanihalPaksh', 'NANIHAL PAKSH'],
  ['withLove', 'WITH LOVE'],
  ['littleWelcome', 'LITTLE WELCOME'],
  ['happyHeart', 'HAPPY HEART'],
  ['firm', 'FIRM'],
] as const;
