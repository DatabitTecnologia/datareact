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
    path: '/',
    element: lazy(() => import('./views/databit/login'))
  },
  {
    exact: 'true',
    guard: GuestGuard,
    path: '/DataClient',
    element: lazy(() => import('./views/databit/login'))
  },
  {
    exact: 'true',
    guard: GuestGuard,
    path: '/DataService',
    element: lazy(() => import('./views/databit/login'))
  },
  {
    exact: 'true',
    guard: GuestGuard,
    path: '/DataReact',
    element: lazy(() => import('./views/databit/login'))
  },
  {
    exact: 'true',
    guard: GuestGuard,
    path: '/DataClassic',
    element: lazy(() => import('./views/databit/login'))
  },
  {
    exact: 'true',
    guard: GuestGuard,
    path: '/DataPartner',
    element: lazy(() => import('./views/databit/login'))
  },
  {
    exact: 'true',
    path: 'error',
    element: lazy(() => import('./views/errors/NotFound404'))
  },
  {
    exact: 'true',
    path: '/recuperar',
    element: lazy(() => import('./views/databit/login/recuperar'))
  },
  {
    path: '*',
    layout: AdminLayout,
    guarde: AuthGuard,
    routes: [
      {
        exact: 'true',
        path: '/index',
        element: lazy(() => import('./views/databit/principal'))
      },
      {
        exact: 'true',
        path: '/efetivar',
        element: lazy(() => import('./views/databit/cliente/inforcliente'))
      },
      {
        exact: 'true',
        path: '/cliente',
        element: lazy(() => import('./views/databit/cliente'))
      },
      {
        exact: 'true',
        path: '/prospect',
        element: lazy(() => import('./views/databit/prospect'))
      },
      {
        exact: 'true',
        path: '/contato',
        element: lazy(() => import('./views/databit/contato'))
      },
      {
        exact: 'true',
        path: '/proposta',
        element: lazy(() => import('./views/databit/proposta'))
      },
      {
        exact: 'true',
        path: '/oportunidade/index',
        element: lazy(() => import('./views/databit/oportunidade'))
      },
      {
        exact: 'true',
        path: '/oportunidade/classificacao',
        element: lazy(() => import('./views/databit/oportunidade/classificacao'))
      },
      {
        exact: 'true',
        path: '/oportunidade/produto',
        element: lazy(() => import('./views/databit/oportunidade/produto'))
      },
      {
        exact: 'true',
        path: '/oportunidade/servico',
        element: lazy(() => import('./views/databit/oportunidade/servico'))
      },
      {
        exact: 'true',
        path: '/oportunidade/status',
        element: lazy(() => import('./views/databit/oportunidade/status'))
      },
      {
        exact: 'true',
        path: '/oportunidade/tipo',
        element: lazy(() => import('./views/databit/oportunidade/tipo'))
      },
      {
        exact: 'true',
        path: '/oportunidade/painel',
        element: lazy(() => import('./views/databit/oportunidade/painel'))
      },
      {
        exact: 'true',
        path: '/precontrato/index',
        element: lazy(() => import('./views/databit/precontrato'))
      },
      {
        exact: 'true',
        path: '/precontrato/status',
        element: lazy(() => import('./views/databit/precontrato/status'))
      },
      {
        exact: 'true',
        path: '/precontrato/tipo',
        element: lazy(() => import('./views/databit/precontrato/tipo'))
      },
      {
        exact: 'true',
        path: '/precontrato/painel',
        element: lazy(() => import('./views/databit/precontrato/painel'))
      },
      {
        exact: 'true',
        path: '/precontrato/pendencia',
        element: lazy(() => import('./views/databit/precontrato/pendencia'))
      },
      {
        exact: 'true',
        path: '/vendedor',
        element: lazy(() => import('./views/databit/vendedor'))
      },
      {
        exact: 'true',
        path: '/usuario',
        element: lazy(() => import('./views/databit/usuario'))
      },
      {
        exact: 'true',
        path: '/chat',
        element: lazy(() => import('./views/databit/chat'))
      },
      {
        exact: 'true',
        path: '/permissao',
        element: lazy(() => import('./views/databit/permissao'))
      },
      {
        exact: 'true',
        path: '/visao',
        element: lazy(() => import('./views/databit/contrato/visao'))
      },
      {
        exact: 'true',
        path: '/nivel',
        element: lazy(() => import('./views/databit/nivel'))
      },
      {
        exact: 'true',
        path: '/query',
        element: lazy(() => import('./views/databit/query'))
      },
      {
        exact: 'true',
        path: '/dashboard',
        element: lazy(() => import('./views/databit/dashboard'))
      },
      {
        exact: 'true',
        path: '/site',
        element: lazy(() => import('./views/databit/site'))
      },
      {
        exact: 'true',
        path: '/partnertabela',
        element: lazy(() => import('./views/databit/partner/tabela'))
      },
      {
        exact: 'true',
        path: '/partnerstatus',
        element: lazy(() => import('./views/databit/partner/status'))
      },
      {
        exact: 'true',
        path: '/partnertipo',
        element: lazy(() => import('./views/databit/partner/tipo'))
      },
      {
        exact: 'true',
        path: '/clientecondicao',
        element: lazy(() => import('./views/databit/partner/condicao'))
      },
      {
        exact: 'true',
        path: '/comprapartner',
        element: lazy(() => import('./views/databit/partner/compra'))
      },
      {
        exact: 'true',
        path: '/painelpartner',
        element: lazy(() => import('./views/databit/partner/painel'))
      },
      {
        exact: 'true',
        path: '/receberpartner',
        element: lazy(() => import('./views/databit/partner/receber'))
      },
      {
        exact: 'true',
        path: '/prevenda/status',
        element: lazy(() => import('./views/databit/prevenda/status'))
      },
      {
        exact: 'true',
        path: '/prevenda/tipo',
        element: lazy(() => import('./views/databit/prevenda/tipo'))
      },
      {
        exact: 'true',
        path: '/prevenda/index',
        element: lazy(() => import('./views/databit/prevenda'))
      },
      {
        exact: 'true',
        path: '/prevenda/painel',
        element: lazy(() => import('./views/databit/prevenda/painel'))
      },
      {
        exact: 'true',
        path: '/produto/consulta',
        element: lazy(() => import('./views/databit/produto/consulta'))
      },
      {
        exact: 'true',
        path: '/movimentacao/consulta',
        element: lazy(() => import('./views/databit/movimentacao/consulta'))
      },
      {
        exact: 'true',
        path: '/defeito',
        element: lazy(() => import('./views/databit/defeito'))
      },
      {
        exact: 'true',
        path: '/condinterv',
        element: lazy(() => import('./views/databit/codinterv'))
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
