import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import BuilderPage from './pages/BuilderPage';
import InvitationViewPage from './pages/InvitationViewPage';
import AppLayout from './components/AppLayout';

const rootRoute = createRootRoute({
  component: AppLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: BuilderPage,
});

const invitationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/invite/$id',
  component: InvitationViewPage,
});

const routeTree = rootRoute.addChildren([indexRoute, invitationRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
