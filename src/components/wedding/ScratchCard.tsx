import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CalendarDays, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { COPY, IMAGES } from '@/data/config.ts';
import { addCalendar, Flourish, Reveal } from './shared';

export function ScratchCard({
  guest,
  dateLabel,
  days,
  events,
  onReveal,
}: {
  guest: string;
  dateLabel?: string;
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
  onReveal: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const last = useRef<{ x: number; y: number } | null>(null);
  const strokes = useRef(0);
  const [revealed, setRevealed] = useState(false);
  const reduced = useReducedMotion();
  const reveal = () => {
    if (revealed) return;
    setRevealed(true);
    onReveal();
  };
  useEffect(() => {
    let active = true;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const drawCard = () => {
      if (!active || !canvas) return;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;
      canvas.width = 592;
      canvas.height = 538;
      const root = getComputedStyle(document.documentElement);
      const gold = root.getPropertyValue('--gold').trim() || '#c5a059';
      const pale = root.getPropertyValue('--seal-highlight').trim() || '#e8d4a2';
      const gradient = ctx.createLinearGradient(0, 0, 592, 538);
      gradient.addColorStop(0, pale);
      gradient.addColorStop(0.45, gold);
      gradient.addColorStop(1, pale);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 592, 538);
      for (let i = 0; i < 1700; i++) {
        const x = (i * 137.7) % 592;
        const y = (i * 83.3) % 538;
        ctx.globalAlpha = 0.12 + (i % 4) * 0.06;
        ctx.fillStyle = root.getPropertyValue('--background').trim() || '#fff';
        ctx.fillRect(x, y, 2, 2);
      }
      ctx.globalAlpha = 1;
      ctx.fillStyle = root.getPropertyValue('--primary-foreground').trim() || '#fff';
      ctx.textAlign = 'center';
      ctx.font = '46px Georgia';
      ctx.fillText('✧', 296, 205);
      ctx.font = '600 50px "Cormorant Garamond", Georgia, serif';
      const words = COPY.scratchHint.split(' ');
      const line1 = words.length > 3 ? words.slice(0, 3).join(' ') : 'Scratch to reveal';
      const line2 =
        words.length > 3 ? words.slice(3).join(' ') : (words[words.length - 1] ?? 'dates');
      ctx.fillText(line1, 296, 275);
      ctx.fillText(line2, 296, 338);
    };

    drawCard();
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (active && !revealed) drawCard();
      });
    }

    return () => {
      active = false;
    };
  }, [revealed]);
  function erase(event: PointerEvent<HTMLCanvasElement>) {
    if (revealed || !last.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const point = {
      x: ((event.clientX - rect.left) * canvas.width) / rect.width,
      y: ((event.clientY - rect.top) * canvas.height) / rect.height,
    };
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = 62;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(last.current.x, last.current.y);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    last.current = point;
    strokes.current++;
    if (strokes.current % 5 === 0) {
      const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let clear = 0,
        total = 0;
      for (let y = 10; y < canvas.height; y += 12)
        for (let x = 10; x < canvas.width; x += 12) {
          // Sample only within the visible arch.
          const cx = canvas.width / 2,
            cy = canvas.width / 2;
          if (y < cy && (x - cx) ** 2 + (y - cy) ** 2 > cx ** 2) continue;
          total++;
          if (pixels[(y * canvas.width + x) * 4 + 3] < 64) clear++;
        }
      if (clear / total >= 0.55) reveal();
    }
  }
  return (
    <section id="save-the-date" className="paper-section scratch-section">
      <img className="scratch-bg-art" src={IMAGES.hero} alt="" aria-hidden="true" />
      <div className="section-inner">
        <Reveal>
          <span className="eyebrow">{COPY.scratchEyebrow}</span>
          <h2 className="mt-3 text-4xl">{COPY.scratchTitle}</h2>
          <Flourish />
        </Reveal>
        <Reveal>
          <div className="scratch-frame">
            <div className="scratch-inner">
              <div className="scratch-under">
                <Sparkles className="mx-auto mb-4 size-5 text-gold" />
                <h3>{dateLabel ?? COPY.date}</h3>
                <Flourish />
              </div>
              <motion.canvas
                ref={canvasRef}
                className="scratch-canvas"
                aria-label={COPY.scratchHint}
                animate={{ opacity: revealed ? 0 : 1 }}
                transition={{ duration: 0.6 }}
                style={{ pointerEvents: revealed ? 'none' : 'auto' }}
                onPointerDown={(e) => {
                  e.currentTarget.setPointerCapture(e.pointerId);
                  const r = e.currentTarget.getBoundingClientRect();
                  last.current = {
                    x: ((e.clientX - r.left) * e.currentTarget.width) / r.width,
                    y: ((e.clientY - r.top) * e.currentTarget.height) / r.height,
                  };
                  erase(e);
                }}
                onPointerMove={erase}
                onPointerUp={() => {
                  last.current = null;
                }}
                onPointerCancel={() => {
                  last.current = null;
                }}
              />
              {revealed && !reduced && (
                <div className="petals">
                  {Array.from({ length: 22 }, (_, i) => (
                    <motion.i
                      key={i}
                      className="petal"
                      initial={{ x: 0, y: 0, opacity: 1 }}
                      animate={{
                        x: Math.cos(i * 2.4) * 180,
                        y: Math.sin(i * 2.4) * 190,
                        rotate: i * 55,
                        opacity: 0,
                      }}
                      transition={{ duration: 1.5, ease: 'easeOut' }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          {!revealed && (
            <Button variant="link" className="text-xs text-muted-foreground" onClick={reveal}>
              {COPY.scratchAccessible}
            </Button>
          )}
          {revealed && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <p className="scratch-personal">{COPY.scratchPersonal(guest)}</p>
              <Button variant="invitation" onClick={() => addCalendar(days, events)}>
                <CalendarDays />
                {COPY.calendar}
              </Button>
              <p className="scratch-share">{COPY.shareExcitement}</p>
            </motion.div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
