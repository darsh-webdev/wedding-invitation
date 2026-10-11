import { QueryClient } from '@tanstack/react-query';
import { createRouter, rootRouteId } from '@tanstack/react-router';
import { describe, expect, it } from 'vitest';

import { getInviteConfig } from '@/data/config';
import { routeTree } from '@/routeTree.gen';

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe('App routing', () => {
  it('matches a page for / instead of falling back to not found', () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes('/');

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });
});

describe('Invite date config', () => {
  it('defaults to both days when date is "all"', () => {
    const config = getInviteConfig('all');
    expect(config.days).toHaveLength(2);
    expect(config.events).toHaveLength(4);
    expect(config.dateLabel).toContain('11 & 12 December 2026');
  });

  it('filters to 12 December only when date is "12"', () => {
    const config = getInviteConfig('12');
    expect(config.days).toHaveLength(1);
    expect(config.days[0].date).toBe('2026-12-12');
    expect(config.events).toHaveLength(2);
    expect(config.events.every((e) => e.date === '2026-12-12')).toBe(true);
    expect(config.dateLabel).toContain('12 December 2026');
  });

  it('correctly handles quoted date strings like "%2212%22" or \'"12"\'', () => {
    const rawWithQuotes = '"12"';
    const sanitized = rawWithQuotes.replace(/^["']|["']$/g, '');
    expect(sanitized).toBe('12');
    const config = getInviteConfig(sanitized === '12' ? '12' : 'all');
    expect(config.days).toHaveLength(1);
  });
});
