import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import {
  CalendarDays,
  Clock3,
  MapPin,
  Shirt,
  Navigation,
  Copy,
  ChevronDown,
  Heart,
  Flame,
  X,
  CarFront,
} from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  COUPLE,
  COPY,
  COUNTDOWN_TARGET,
  DAYS,
  EVENTS,
  FAMILY_GROUPS,
  GALLERY,
  HASHTAGS,
  IMAGES,
  MAP_EMBED_URL,
  MAP_LINK,
  VENUE,
  getInviteConfig,
  type InviteDateType,
  type Side,
} from '@/data/config.ts';
import { brideFamily, groomFamily } from '@/data/families.ts';
import { addCalendar, Chapter, copyText, Florals, Flourish, Lanterns, Reveal } from './shared.tsx';
import { Envelope } from './Envelope';
import { ScratchCard } from './ScratchCard.tsx';

function Countdown({ countdownTarget }: { countdownTarget?: string }) {
  const target = countdownTarget ?? COUNTDOWN_TARGET;
  const [now, setNow] = useState<number | null>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const seconds =
    now === null ? null : Math.max(0, Math.floor((new Date(target).getTime() - now) / 1000));
  const values =
    seconds === null
      ? ['—', '—', '—', '—']
      : [
          Math.floor(seconds / 86400),
          Math.floor(seconds / 3600) % 24,
          Math.floor(seconds / 60) % 60,
          seconds % 60,
        ].map((v) => String(v).padStart(2, '0'));
  return (
    <section className="paper-section waiting">
      <Lanterns count={6} />
      <div className="section-inner">
        <Reveal className="chapter-heading">
          <span className="eyebrow">{COPY.waiting}</span>
          <h2>{COPY.countdown}</h2>
          <Flourish />
        </Reveal>
        <div className="countdown" role="timer" aria-label={COPY.countdown}>
          {values.map((value, i) => (
            <div className="countdown-tile" key={i}>
              <div className="countdown-number">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={value}
                    initial={reduced ? false : { y: 18, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -18, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {value}
                  </motion.div>
                </AnimatePresence>
              </div>
              <small>{COPY.units[i]}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MapPlate() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '690%']);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [0, -18, 4]);
  const reduced = useReducedMotion();
  const [custom, setCustom] = useState(true);
  return (
    <div className="map-plate" ref={ref}>
      {custom && (
        <img
          src={IMAGES.map}
          alt={COPY.mapPending}
          loading="lazy"
          onError={() => setCustom(false)}
        />
      )}
      <svg
        className="map-scene"
        viewBox="0 0 600 250"
        aria-hidden="true"
        style={{ opacity: custom ? 0 : 1 }}
      >
        <path
          d="M0 210Q110 155 215 190T390 158T610 130"
          fill="none"
          stroke="var(--border)"
          strokeWidth="24"
        />
        <path
          d="M0 210Q110 155 215 190T390 158T610 130"
          fill="none"
          stroke="var(--background)"
          strokeWidth="16"
        />
        <path
          d="M0 210Q110 155 215 190T390 158T610 130"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="1.5"
          strokeDasharray="5 8"
        />
        {[70, 145, 380, 480].map((cx, i) => (
          <g key={cx} transform={`translate(${cx} ${90 + (i % 2) * 25})`}>
            <path d="M0 55V8Q10-15 20 8V55" fill="var(--blush)" stroke="var(--gold)" />
            <path d="M-8 55H28" stroke="var(--gold)" />
            <path d="M8 55V33q2-9 5 0v22" fill="var(--background)" />
          </g>
        ))}
        {[35, 235, 325, 550].map((cx, i) => (
          <g key={cx} transform={`translate(${cx} ${125 - (i % 2) * 65})`}>
            <path d="M0 35V0" stroke="var(--gold)" />
            <ellipse
              cy="-5"
              rx="15"
              ry="24"
              fill="var(--accent)"
              stroke="var(--gold)"
              strokeWidth=".5"
            />
          </g>
        ))}
        <path
          d="M265 150V88h50v62M254 91h72M265 88q25-39 50 0"
          fill="var(--blush)"
          stroke="var(--gold)"
        />
        <path d="M281 150v-32q9-22 18 0v32" fill="var(--background)" stroke="var(--gold)" />
        <path d="M270 97h6v10h-6m28-10h6v10h-6" stroke="var(--gold)" />
      </svg>
      <motion.div className="map-car" style={{ x: reduced ? 0 : x, y: reduced ? 0 : y }}>
        <CarFront className="h-full w-full" strokeWidth={1.3} />
        <Heart className="absolute left-5 top-2 size-3 fill-blush" />
      </motion.div>
    </div>
  );
}

function Details({
  days,
  events,
}: {
  days?: readonly { date: string; label: string; full: string }[];
  events?: readonly {
    id: string;
    numeral: string;
    name: string;
    date: string;
    time: string;
    hour: string;
    outfit: string;
    description: string;
    dress: string;
  }[];
}) {
  return (
    <section className="paper-section details-section">
      <div className="section-inner">
        <Chapter data={COPY.chapters.details} />
        <div className="action-row">
          <Button variant="invitation" onClick={() => addCalendar(days, events)}>
            <CalendarDays />
            {COPY.calendar}
          </Button>
          <Button variant="stationery" asChild>
            <a href={MAP_LINK} target="_blank" rel="noreferrer">
              <Navigation />
              {COPY.directions}
            </a>
          </Button>
        </div>
        <Reveal>
          <div className="map-embed">
            {MAP_EMBED_URL ? (
              <iframe
                src={MAP_EMBED_URL}
                title={COPY.mapPending}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            ) : (
              <div className="map-placeholder">
                <MapPin size={30} strokeWidth={1} />
                <h3>{COPY.mapPending}</h3>
                <p>{COPY.mapPendingSubtitle}</p>
              </div>
            )}
          </div>
          <div className="action-row">
            <Button variant="stationery" asChild>
              <a href={MAP_LINK} target="_blank" rel="noreferrer">
                <MapPin />
                {COPY.openMaps}
              </a>
            </Button>
            <Button variant="ghost" onClick={() => copyText(VENUE.address)}>
              <Copy />
              {COPY.copyAddress}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const ROMAN_NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

function Celebrations({
  days,
  events,
  subtitle,
}: {
  days?: readonly { date: string; label: string; full: string }[];
  events?: readonly {
    id: string;
    numeral: string;
    name: string;
    date: string;
    time: string;
    hour: string;
    outfit: string;
    description: string;
    dress: string;
  }[];
  subtitle?: string;
}) {
  const daysToRender = days ?? DAYS;
  const eventsToRender = events ?? EVENTS;
  const chapterData: readonly string[] = [
    COPY.chapters.celebrations[0] ?? 'Chapter Three',
    COPY.chapters.celebrations[1] ?? 'The Celebrations',
    subtitle ?? COPY.chapters.celebrations[2] ?? 'Four pages, two days',
  ];
  const reduced = useReducedMotion();
  return (
    <section className="paper-section celebrations-section">
      <div className="section-inner">
        <Chapter data={chapterData} />
        <div className="timeline">
          {daysToRender.map((day) => (
            <div className="timeline-day" key={day.date}>
              <div className="day-label">{day.label}</div>
              {eventsToRender
                .filter((event) => event.date === day.date)
                .map((event) => {
                  const eventIndex = eventsToRender.indexOf(event);
                  const numeral = ROMAN_NUMERALS[eventIndex] ?? event.numeral;
                  return (
                    <div className="event-item" key={event.id}>
                      <motion.div
                        className="timeline-line"
                        initial={reduced ? false : { scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2 }}
                      />
                      <Reveal className="numeral">{numeral}</Reveal>
                      <Reveal className="event-copy">
                        <div className="event-heading">
                          <h3>{event.name}</h3>
                          <p>-</p>
                          <span className="event-time">{event.time}</span>
                        </div>
                        <p>{event.description}</p>
                      </Reveal>
                      <motion.img
                        src={`/images/events/${event.outfit}.png`}
                        alt={`${COUPLE.bride} and ${COUPLE.groom} · ${event.name}`}
                        className="event-art"
                        loading="lazy"
                        width="512"
                        height="1024"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = IMAGES.couple;
                        }}
                        animate={reduced ? {} : { y: [0, -7, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    </div>
                  );
                })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);
  useEffect(() => {
    if (selected === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
      if (e.key === 'ArrowRight')
        setSelected((v) => (v === null ? null : (v + 1) % GALLERY.length));
      if (e.key === 'ArrowLeft')
        setSelected((v) => (v === null ? null : (v - 1 + GALLERY.length) % GALLERY.length));
    };
    window.addEventListener('keydown', key);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', key);
    };
  }, [selected]);
  return (
    <section className="paper-section gallery-section">
      <div className="section-inner">
        <Chapter data={COPY.chapters.gallery} />
        <div className="gallery-grid">
          {GALLERY.map((image, i) => (
            <Reveal key={image.src} delay={(i % 4) * 0.09} tilt={i % 2 ? 3 : -3}>
              <Button
                variant="ghost"
                className="gallery-plate"
                onClick={() => setSelected(i)}
                aria-label={image.alt}
              >
                <img src={image.src} alt={image.alt} loading="lazy" width="480" height="600" />
                <span className="gallery-tag">
                  <span>{image.caption}</span>
                  <span>{HASHTAGS.short}</span>
                </span>
              </Button>
            </Reveal>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={COPY.chapters.gallery[1]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <Button
              autoFocus
              variant="stationery"
              size="icon"
              className="lightbox-close"
              aria-label={COPY.close}
              onClick={() => setSelected(null)}
            >
              <X />
            </Button>
            <img
              src={GALLERY[selected]?.src}
              alt={GALLERY[selected]?.alt}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Finale({ guest, dateLabel }: { guest: string; dateLabel?: string }) {
  const [wishes, setWishes] = useState<{ id: number; x: number; y: number }[]>([]);
  const reduced = useReducedMotion();
  const ids = useRef(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  return (
    <section className="finale">
      <img
        className="scene-art"
        src={IMAGES.finale}
        alt=""
        loading="lazy"
        width="1536"
        height="1024"
      />
      <Lanterns count={8} />
      <Reveal>
        <h2>{COPY.finaleTitle}</h2>
        <Flourish />
        <p className="personal">{COPY.finalePersonal(guest)}</p>
        <Button
          variant="invitation"
          className="wish-button"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const id = ids.current++;
            setWishes((prev) => [...prev.slice(-7), { id, x: rect.x + rect.width / 2, y: rect.y }]);
            toast(COPY.wishMessage);
            timers.current.push(
              setTimeout(() => setWishes((prev) => prev.filter((w) => w.id !== id)), 6500)
            );
          }}
        >
          <Flame />
          {COPY.release}
        </Button>
        <img
          className="finale-couple"
          src={IMAGES.couple}
          alt={`${COUPLE.bride} & ${COUPLE.groom}`}
          loading="lazy"
          width="1024"
          height="1024"
        />
        <p className="finale-closing">{COPY.closing}</p>
        <p className="font-serif text-lg">{dateLabel ?? COPY.date}</p>
      </Reveal>
      <AnimatePresence>
        {wishes.map((wish) => (
          <motion.div
            className="wish-lantern lantern"
            key={wish.id}
            style={{ left: wish.x, top: wish.y }}
            initial={{ opacity: 1, scale: 0.8 }}
            animate={
              reduced
                ? { opacity: 0 }
                : {
                    y: -window.innerHeight - 100,
                    x: [0, 30, -20, 55],
                    scale: [0.8, 1.2, 0.3],
                    opacity: [1, 1, 0],
                  }
            }
            transition={{ duration: reduced ? 0.3 : 6, ease: 'easeInOut' }}
          />
        ))}
      </AnimatePresence>
    </section>
  );
}

function Families({ side }: { side: Side }) {
  const family = side === 'bride' ? brideFamily : groomFamily;
  return (
    <section className="paper-section family-section">
      <div className="section-inner">
        <Chapter data={COPY.chapters.welcome} />
        <div className="family-groups">
          {FAMILY_GROUPS.map(([key, label]) => {
            const entries = family[key];
            if (!entries?.length || (key === 'firm' && side === 'bride')) return null;
            return (
              <Reveal key={key} className="family-group">
                <h3>{label}</h3>
                {entries.map((person) => (
                  <p key={person.name}>
                    {person.name}
                    {person.message && <em>{person.message}</em>}
                  </p>
                ))}
                <Flourish />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Invitation({ side }: { side: Side }) {
  const [guest, setGuest] = useState('');
  const [inviteDate, setInviteDate] = useState<InviteDateType>('all');
  const [ready, setReady] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [pulse, setPulse] = useState(false);
  const reduced = useReducedMotion();

  const open = useCallback((name: string, dateType?: InviteDateType) => {
    setGuest(name);
    const d = dateType ?? 'all';
    setInviteDate(d);
    try {
      localStorage.setItem('yavi-guest', name);
      localStorage.setItem('yavi-date', d);
    } catch {}
    setShowIntro(false);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const rawName = urlParams.get('name')?.trim().slice(0, 80);
    const fromUrlName = rawName?.replace(/^["']|["']$/g, '');
    const rawDate = urlParams.get('date')?.trim().toLowerCase();
    const fromUrlDate = rawDate?.replace(/^["']|["']$/g, '');

    // Explicit date query param in URL determines date, otherwise defaults to both days ('all')
    const activeDate: InviteDateType =
      fromUrlDate === '12' || fromUrlDate === '12th' || fromUrlDate === 'dec12' ? '12' : 'all';

    let storedName = '';
    try {
      storedName = localStorage.getItem('yavi-guest')?.trim().slice(0, 80) ?? '';
    } catch {}

    setInviteDate(activeDate);

    if (fromUrlName) {
      open(fromUrlName, activeDate);
    } else if (storedName) {
      setGuest(storedName);
    }
    setReady(true);
  }, [side, open]);

  const reset = () => {
    try {
      localStorage.removeItem('yavi-guest');
      localStorage.removeItem('yavi-date');
    } catch {}
    const url = new URL(window.location.href);
    url.searchParams.delete('name');
    url.searchParams.delete('date');
    window.history.replaceState({}, '', url);
    setGuest('');
    setInviteDate('all');
    setShowIntro(true);
  };

  const inviteConfig = getInviteConfig(inviteDate);
  const first = side === 'bride' ? 'bride' : 'groom';
  const second = side === 'bride' ? 'groom' : 'bride';

  return (
    <main className="storybook">
      <Toaster position="bottom-center" />
      <AnimatePresence>
        {ready && showIntro && (
          <Envelope
            key="envelope"
            side={side}
            dateLabel={inviteConfig.dateLabel}
            initialName={guest}
            onOpen={(name) => open(name, inviteDate)}
          />
        )}
      </AnimatePresence>
      <section className="hero">
        <img
          className="hero-art"
          src={IMAGES.hero}
          alt="A hand-painted palace courtyard at dawn"
          width="1536"
          height="1024"
          fetchPriority="high"
        />
        <Lanterns pulse={pulse} />
        <Florals />
        <div className="story-topbar">
          <Link to="/" className="monogram" aria-label={COPY.back}>
            {side === 'bride' ? 'Y & V' : 'V & Y'}
          </Link>
          <span className="eyebrow">{COPY.sideLabels[side]}</span>
        </div>
        <div className="hero-content">
          <motion.div
            initial={false}
            animate={{
              opacity: showIntro ? 0 : 1,
              y: showIntro ? 25 : 0,
              scale: showIntro ? 0.96 : 1,
            }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="guest-line">
              {COPY.dear(guest)}{' '}
              {guest && (
                <Button
                  variant="link"
                  className="h-auto p-0 text-[10px] text-muted-foreground"
                  onClick={reset}
                >
                  {COPY.reset}
                </Button>
              )}
            </p>
            <p className="hero-together">{COPY.together}</p>
            <h1 className="hero-names">
              <motion.span
                initial={false}
                animate={{ opacity: showIntro ? 0 : 1 }}
                transition={{ delay: 0.5, duration: 0.9 }}
              >
                {COPY.portraits[first].name}
              </motion.span>
              <span className="weds">{COPY.weds}</span>
              <motion.span
                initial={false}
                animate={{ opacity: showIntro ? 0 : 1 }}
                transition={{ delay: 0.85, duration: 0.9 }}
              >
                {COPY.portraits[second].name}
                {side === 'bride' ? COPY.ji : ''}
              </motion.span>
            </h1>
            <p className="hero-tagline">{COPY.tagline}</p>
            <span className="hashtag-chip">{HASHTAGS.main}</span>
            <p className="hero-date">{inviteConfig.dateLabel}</p>
            <Button
              variant="invitation"
              className="hero-save"
              onClick={() =>
                document
                  .getElementById('save-the-date')
                  ?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth' })
              }
            >
              <CalendarDays />
              {COPY.saveDate}
            </Button>
          </motion.div>
        </div>
        <div className="hero-bottom">
          <span>{COPY.heroBottom}</span>
          <ChevronDown size={17} strokeWidth={1} />
        </div>
      </section>
      <section className="paper-section">
        <div className="section-inner">
          <Chapter data={COPY.chapters.couple} />
          <div className="portraits">
            {[first, second].map((person, i) => (
              <Reveal key={person} className="portrait-card" delay={i * 0.15} tilt={i ? 3 : -3}>
                <div className="portrait-art">
                  <img
                    src={IMAGES[person]}
                    alt={COPY.portraits[person].name}
                    loading="lazy"
                    width="512"
                    height="1024"
                  />
                </div>
                <span className="portrait-label">{COPY.portraits[person].label}</span>
                <h3>{COPY.portraits[person].name}</h3>
                <p>{COPY.portraits[person].bio}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <Countdown countdownTarget={inviteConfig.countdownTarget} />
      <ScratchCard
        guest={guest}
        dateLabel={inviteConfig.dateLabel}
        days={inviteConfig.days}
        events={inviteConfig.events}
        onReveal={() => setPulse(true)}
      />
      <Details days={inviteConfig.days} events={inviteConfig.events} />
      <Celebrations
        days={inviteConfig.days}
        events={inviteConfig.events}
        subtitle={inviteConfig.celebrationsSubtitle}
      />
      <Gallery />
      <Finale guest={guest} dateLabel={inviteConfig.dateLabel} />
      <Families side={side} />
      <footer className="story-footer">
        <p>{COPY.shareMoments}</p>
        <Button variant="ghost" className="hashtag-main" onClick={() => copyText(HASHTAGS.main)}>
          {HASHTAGS.main}
        </Button>
        <div>
          <Button
            variant="ghost"
            className="text-rose text-xs"
            onClick={() => copyText(HASHTAGS.short)}
          >
            {HASHTAGS.short}
            <Copy className="size-3" />
          </Button>
        </div>
        <p className="footer-made">{COPY.footer}</p>
      </footer>
    </main>
  );
}
