import React, { Suspense, Fragment, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';

import GuestGuard from './components/Auth/GuestGuard';
import AuthGuard from './components/Auth/AuthGuard';

import { BASE_URL } from './config/constant';

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Element = route.element;

        return (
          <Route
            key={i}
            path={route.path}
            element={
              <Guard>
                <Layout>{route.routes ? renderRoutes(route.routes) : <Element props={true} />}</Layout>
              </Guard>
            }
          />
        );
      })}
    </Routes>
  </Suspense>
);

const routes = [
  {
    exact: 'true',
    guard: GuestGuard,
    path: '/login',
    element: lazy(() => import('./views/databit/login'))
  },
  {
    exact: 'true',
    path: '/404',
    element: lazy(() => import('./views/errors/NotFound404'))
  },
  {
    exact: 'true',
    path: '/principal',
    layout: AdminLayout,
    element: lazy(() => import('./views/databit/principal'))
  },
  {
    path: '*',
    layout: AdminLayout,
    guard: AuthGuard,
    routes: [
      {
        exact: 'true',
        path: '/principal',
        element: lazy(() => import('./views/databit/principal'))
      },
      {
        exact: 'true',
        path: '/cadastro',
        element: lazy(() => import('./views/errors/NotFound404'))
      },
      {
        path: '*',
        exact: 'true',
        element: () => <Navigate to={BASE_URL} />
      }
    ]
  }
];

export default routes;
