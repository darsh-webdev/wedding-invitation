import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { COUPLE, COPY, HASHTAGS, IMAGES } from '@/data/config';
import { Flourish, invitationHead, Lanterns } from '@/components/wedding/shared';

export const Route = createFileRoute('/')({ head: () => invitationHead(), component: Index });
function Index() {
  return (
    <main className="chooser">
      <img
        className="scene-art"
        src={IMAGES.hero}
        alt="A painted palace at dawn"
        width="1536"
        height="1024"
        fetchPriority="high"
      />
      <Lanterns count={6} />
      <div className="chooser-content relative z-10">
        <span className="eyebrow">{COPY.chooserEyebrow}</span>
        <h1>{COPY.chooserTitle}</h1>
        <p className="chooser-subtitle">{COPY.chooserSubtitle}</p>
        <Flourish />
        <img
          className="chooser-couple"
          src={IMAGES.couple}
          alt={`${COUPLE.bride} and ${COUPLE.groom}`}
          width="1024"
          height="1024"
        />
        <div className="chooser-links">
          <Button variant="invitation" size="lg" asChild>
            <Link to="/bride">
              {COPY.brideLink}
              <ArrowRight />
            </Link>
          </Button>
          <Button variant="stationery" size="lg" asChild>
            <Link to="/groom">
              {COPY.groomLink}
              <ArrowRight />
            </Link>
          </Button>
        </div>
        <p className="chooser-date">{COPY.date}</p>
        <span className="hashtag-chip">{HASHTAGS.short}</span>
        <div className="chooser-helper">
          <Button variant="link" className="text-xs text-muted-foreground" asChild>
            <Link to="/links">
              <Heart className="size-3" />
              {COPY.helperLink}
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
