import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Copy, ArrowLeft, ArrowUpRight, Calendar } from 'lucide-react';
import { Toaster } from 'sonner';
import { Button } from '@/components/ui/button';
import { COPY, META, type Side, type InviteDateType } from '@/data/config';
import { copyText, Flourish } from '@/components/wedding/shared';

export const Route = createFileRoute('/links')({
  head: () => ({
    meta: [
      { title: `${COPY.linksTitle} · ${COPY.chooserTitle}` },
      { name: 'description', content: COPY.linksSubtitle },
      { property: 'og:title', content: COPY.linksTitle },
      { property: 'og:description', content: COPY.linksSubtitle },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'theme-color', content: META.theme },
    ],
    links: [{ rel: 'canonical', href: '/links' }],
  }),
  component: GuestLinks,
});

function GuestLinks() {
  const [name, setName] = useState('');
  const [inviteDate, setInviteDate] = useState<InviteDateType>('all');
  const [origin, setOrigin] = useState('');

  useEffect(() => setOrigin(window.location.origin), []);

  return (
    <main className="link-page">
      <Toaster position="bottom-center" />
      <Link to="/" className="monogram">
        V & Y
      </Link>
      <h1>{COPY.linksTitle}</h1>
      <p className="font-serif text-xl italic text-muted-foreground">{COPY.linksSubtitle}</p>
      <Flourish />
      <div className="link-form">
        <label htmlFor="link-name">{COPY.guestLabel}</label>
        <input
          id="link-name"
          autoComplete="name"
          className="name-input"
          placeholder={COPY.namePlaceholder}
          value={name}
          maxLength={80}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="mt-6 mb-6">
          <label className="block mb-2 font-serif text-lg">Invitation Days</label>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant={inviteDate === 'all' ? 'invitation' : 'stationery'}
              size="sm"
              onClick={() => setInviteDate('all')}
            >
              <Calendar className="size-3.5" />
              Both Days (11 & 12 Dec)
            </Button>
            <Button
              type="button"
              variant={inviteDate === '12' ? 'invitation' : 'stationery'}
              size="sm"
              onClick={() => setInviteDate('12')}
            >
              <Calendar className="size-3.5" />
              12 Dec Only (Wedding Day)
            </Button>
          </div>
        </div>

        {(['bride', 'groom'] as Side[]).map((side) => {
          const dateQuery = inviteDate === '12' ? '&date=12' : '';
          const url = `${origin}/${side}?name=${encodeURIComponent(name.trim())}${dateQuery}`;
          const searchParams: Record<string, string> = { name: name.trim() };
          if (inviteDate === '12') {
            searchParams['date'] = '12';
          }

          return (
            <div className="link-result" key={side}>
              <div className="flex items-center justify-between mb-2">
                <h2>{side === 'bride' ? COPY.linksBride : COPY.linksGroom}</h2>
                <span className="text-xs font-serif italic text-muted-foreground">
                  {inviteDate === '12' ? '12 Dec Only' : 'Both Days'}
                </span>
              </div>
              <input
                className="name-input"
                readOnly
                aria-label={side === 'bride' ? COPY.linksBride : COPY.linksGroom}
                value={name.trim() ? url : ''}
              />
              <div className="action-row">
                <Button variant="invitation" disabled={!name.trim()} onClick={() => copyText(url)}>
                  <Copy />
                  {COPY.copyLink}
                </Button>
                <Button variant="stationery" asChild>
                  <Link to={side === 'bride' ? '/bride' : '/groom'} search={searchParams}>
                    {COPY.preview}
                    <ArrowUpRight />
                  </Link>
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      <Button variant="ghost" asChild>
        <Link to="/">
          <ArrowLeft />
          {COPY.back}
        </Link>
      </Button>
    </main>
  );
}
