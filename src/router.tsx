import { QueryClient } from '@tanstack/react-query';
import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    stringifySearch: (search) => {
      const params = new URLSearchParams();
      for (const [key, val] of Object.entries(search)) {
        if (val !== undefined && val !== null && val !== '') {
          params.set(key, typeof val === 'string' ? val : JSON.stringify(val));
        }
      }
      const str = params.toString();
      return str ? `?${str}` : '';
    },
  });

  return router;
};
