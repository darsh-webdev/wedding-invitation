import { useState, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { COPY, IMAGES, COUPLE, type Side } from '@/data/config.ts';
import { Flourish } from './shared.tsx';

interface EnvelopeProps {
  initialName?: string;
  side?: Side;
  dateLabel?: string;
  onOpen: (name: string) => void;
}

type Stage = 'idle' | 'opening' | 'extracted' | 'expanding';

export function Envelope({ initialName = '', side = 'groom', dateLabel, onOpen }: EnvelopeProps) {
  const [name, setName] = useState(initialName);
  const [stage, setStage] = useState<Stage>('idle');
  const reduced = useReducedMotion();
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const isBride = side === 'bride';
  const monogram = isBride ? 'Y & V' : 'V & Y';
  const sealMonogram = isBride ? 'Y&V' : 'V&Y';
  const firstPerson = isBride ? COUPLE.bride : COUPLE.groom;
  const secondPerson = isBride ? COUPLE.groom : COUPLE.bride;

  const startOpenSequence = (guestName: string) => {
    if (stage !== 'idle') return;
    const finalName = guestName.trim() || 'Valued Guest';

    if (reduced) {
      onOpen(finalName);
      return;
    }

    setStage('opening');

    // Step 1: Flap opens, card smoothly slides out of pocket
    const t1 = setTimeout(() => {
      setStage('extracted');
    }, 550);

    // Step 2: Card rests in full view, then begins expanding into hero page
    const t2 = setTimeout(() => {
      setStage('expanding');
    }, 2200);

    // Step 3: Finish transition to live invitation
    const t3 = setTimeout(() => {
      onOpen(finalName);
    }, 2900);

    timeoutsRef.current = [t1, t2, t3];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startOpenSequence(name);
  };

  const handleSkip = () => {
    timeoutsRef.current.forEach(clearTimeout);
    onOpen(name.trim() || 'Valued Guest');
  };

  return (
    <motion.div
      className="intro"
      initial={{ opacity: 1 }}
      animate={stage === 'expanding' ? { opacity: 0 } : { opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <img className="intro-art" src={IMAGES.hero} alt="" aria-hidden="true" />

      <div className="intro-skip">
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-muted-foreground"
          onClick={handleSkip}
        >
          {COPY.skip}
        </Button>
      </div>

      <div className="intro-content">
        <motion.div
          animate={stage !== 'idle' ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <span className="eyebrow">{COPY.gateEyebrow}</span>
          <h1>{COPY.gateTitle}</h1>
          <Flourish />
        </motion.div>

        <div className={`envelope-container ${stage !== 'idle' ? 'is-animating' : ''}`}>
          <div className="envelope">
            {/* Top Flap */}
            <motion.div
              className="envelope-flap"
              initial={{ rotateX: 0 }}
              animate={stage !== 'idle' ? { rotateX: 180, zIndex: 1 } : { rotateX: 0, zIndex: 4 }}
              transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
            />

            {/* Wax Seal - prominent and on top */}
            <AnimatePresence>
              {stage === 'idle' && (
                <motion.div
                  className="wax-seal"
                  onClick={() => startOpenSequence(name)}
                  exit={{ scale: 1.35, opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                  {sealMonogram}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Invitation Card Inside Envelope */}
            <motion.div
              className="envelope-card"
              initial={{ y: 0, scale: 1, zIndex: 2 }}
              animate={
                stage === 'idle'
                  ? { y: 0, scale: 1, zIndex: 2 }
                  : stage === 'opening'
                    ? { y: -25, scale: 1.02, zIndex: 3 }
                    : stage === 'extracted'
                      ? {
                          y: -145,
                          scale: 1.12,
                          zIndex: 20,
                          boxShadow: '0 25px 50px -12px rgba(90, 30, 45, 0.35)',
                        }
                      : {
                          y: -60,
                          scale: 4,
                          opacity: 0,
                          zIndex: 50,
                          transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
                        }
              }
              transition={{
                duration: stage === 'extracted' ? 0.75 : 0.5,
                ease: [0.25, 1, 0.5, 1],
              }}
            >
              <div className="card-border">
                <span className="card-eyebrow">WEDDING STORYBOOK</span>
                <span className="card-monogram">{monogram}</span>
                <span className="card-names">
                  {firstPerson} & {secondPerson}
                </span>
                {name.trim() && <span className="card-guest">Especially for {name.trim()}</span>}
                <span className="card-date">{dateLabel ?? COPY.date}</span>
              </div>
            </motion.div>

            {/* Pocket in front */}
            <div className="envelope-pocket" />
          </div>
        </div>

        {/* Form to enter name */}
        <motion.form
          onSubmit={handleSubmit}
          animate={
            stage !== 'idle' ? { opacity: 0, y: 30, pointerEvents: 'none' } : { opacity: 1, y: 0 }
          }
          transition={{ duration: 0.4 }}
        >
          <label htmlFor="guest-name">{COPY.gatePrompt}</label>
          <input
            id="guest-name"
            type="text"
            className="name-input"
            placeholder={COPY.namePlaceholder}
            value={name}
            maxLength={80}
            onChange={(e) => setName(e.target.value)}
            disabled={stage !== 'idle'}
            autoFocus
          />
          <div className="mt-4">
            <Button
              type="submit"
              variant="invitation"
              size="lg"
              className="w-full"
              disabled={stage !== 'idle'}
            >
              {COPY.open}
            </Button>
          </div>
        </motion.form>
      </div>
    </motion.div>
  );
}
