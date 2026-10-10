import { motion, useReducedMotion, useInView } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { toast } from 'sonner';
import { COPY, DAYS, EVENTS, HASHTAGS, META, VENUE, type Side, TITLES } from '@/data/config.ts';

export function invitationHead(side?: Side) {
  const title = side ? TITLES[side] : COPY.chooserTitle;
  return {
    meta: [
      { title },
      { name: 'description', content: META.description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: META.description },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'theme-color', content: META.theme },
    ],
    links: [{ rel: 'canonical', href: side ? `/${side}` : '/' }],
  };
}
export async function copyText(text: string) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      const el = document.createElement('textarea');
      el.value = text;
      el.style.position = 'fixed';
      el.style.opacity = '0';
      document.body.append(el);
      el.select();
      const done = document.execCommand('copy');
      el.remove();
      if (!done) throw new Error('Copy unavailable');
    }
    toast.success(COPY.copied);
  } catch {
    toast.error(COPY.copyFailed);
  }
}
export function addCalendar(
  customDays?: readonly { date: string; label: string; full: string }[],
  customEvents?: readonly {
    id: string;
    numeral: string;
    name: string;
    date: string;
    time: string;
    hour: string;
    outfit: string;
    description: string;
    dress: string;
  }[]
) {
  const daysToUse = customDays ?? DAYS;
  const eventsToUse = customEvents ?? EVENTS;
  const escape = (s: string) =>
    s.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//YaVi//Wedding Storybook//EN',
    'CALSCALE:GREGORIAN',
  ];
  daysToUse.forEach((day) => {
    const dayEvents = eventsToUse.filter((e) => e.date === day.date);
    if (!dayEvents.length) return;
    const isFirstDay = day.date === '2026-12-11';
    lines.push(
      'BEGIN:VEVENT',
      `UID:yavi-day-${day.date}-2026@wedding`,
      `DTSTAMP:${now}`,
      `DTSTART:${day.date.replace(/-/g, '')}T${isFirstDay ? '063000' : '043000'}Z`,
      `DTEND:${day.date.replace(/-/g, '')}T${isFirstDay ? '163000' : '123000'}Z`,
      `SUMMARY:${escape(COPY.chooserTitle + ' · ' + day.full)}`,
      `DESCRIPTION:${escape(dayEvents.map((e) => `${e.name} — ${e.time} IST`).join('\n') + '\n' + HASHTAGS.short)}`,
      `LOCATION:${escape(VENUE.name + ', ' + VENUE.address)}`,
      'END:VEVENT'
    );
  });
  lines.push('END:VCALENDAR');
  const blob = new Blob([lines.join('\r\n') + '\r\n'], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Vicky-and-Yashi-wedding.ics';
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export function Flourish() {
  return (
    <svg className="flourish" viewBox="0 0 180 30" fill="none" aria-hidden="true">
      <path
        d="M2 15h43c16 0 21-10 14-10-8 0-5 15 12 15h9m98-5h-43c-16 0-21-10-14-10 8 0 5 15-12 15h-9"
        stroke="currentColor"
        strokeWidth=".8"
      />
      <path d="m90 6 5 9-5 9-5-9 5-9Z" stroke="currentColor" />
      <circle cx="74" cy="15" r="1.5" fill="currentColor" />
      <circle cx="106" cy="15" r="1.5" fill="currentColor" />
    </svg>
  );
}
export function Reveal({
  children,
  className = '',
  delay = 0,
  tilt = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  tilt?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 28, rotate: tilt }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.85, delay, ease: [0.2, 0.65, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
export function Chapter({ data }: { data: readonly string[] }) {
  return (
    <Reveal className="chapter-heading">
      <span className="eyebrow">{data[0]}</span>
      <h2>{data[1]}</h2>
      <p>{data[2]}</p>
      <Flourish />
    </Reveal>
  );
}
export function Lanterns({ count = 10, pulse = false }: { count?: number; pulse?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);
  const reduced = useReducedMotion();
  return (
    <div className="lantern-field" aria-hidden="true" ref={ref}>
      {Array.from({ length: count }, (_, i) => (
        <motion.span
          key={`${i}-${pulse}`}
          className="lantern"
          style={{
            left: `${5 + ((i * 37) % 89)}%`,
            top: `${20 + ((i * 23) % 76)}%`,
            scale: 0.45 + (i % 4) * 0.19,
          }}
          initial={{ y: 180, opacity: 0.5 }}
          animate={
            visible && !reduced
              ? { y: [180, -950], x: [0, (i % 2 ? 1 : -1) * 25, 0], opacity: [0, 0.55, 0.55, 0] }
              : { y: 0, opacity: 0.45 }
          }
          transition={{ duration: 22 + i * 2, delay: -i * 2.7, repeat: Infinity, ease: 'linear' }}
        />
      ))}
    </div>
  );
}
export function Florals() {
  const reduced = useReducedMotion();
  return (
    <>
      {['left', 'right'].map((side) => (
        <motion.svg
          key={side}
          className={`floral ${side}`}
          viewBox="0 0 200 200"
          aria-hidden="true"
          animate={reduced ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 9, repeat: Infinity }}
        >
          <path
            d="M0 0Q80 25 140 160M25 13q30 25 25 70M65 38q50 5 88 36"
            fill="none"
            stroke="var(--gold)"
            strokeWidth="2"
          />
          {Array.from({ length: 16 }, (_, i) => (
            <g
              key={i}
              transform={`translate(${20 + ((i * 31) % 130)} ${10 + ((i * 29) % 125)}) rotate(${i * 28})`}
              opacity={0.5 + (i % 3) * 0.15}
            >
              <path
                d="M0 0C-18-22 5-27 7-6 28-23 33 0 10 4 25 21 3 30 0 9-18 21-25 0 0 0Z"
                fill="currentColor"
              />
              <circle r="2" cx="4" cy="3" fill="var(--background)" />
            </g>
          ))}
        </motion.svg>
      ))}
    </>
  );
}
