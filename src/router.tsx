import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    getScrollRestorationKey: (location) => {
      if (location.pathname.startsWith("/work/")) {
        return null;
      }
      return location.pathname;
    },
    defaultPreloadStaleTime: 0,
  });

  return router;
};
