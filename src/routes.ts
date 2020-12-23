import { HomePage } from './pages';

import { RouteProps } from 'react-router-dom';

export const Routes: RouteProps[] = [
  {
    path: '/',
    component: HomePage,
    exact: true,
  },
];
