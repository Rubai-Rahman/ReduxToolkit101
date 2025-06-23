import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { store } from '@/redux/store.ts';
import { RouterProvider } from 'react-router-dom';
import router from '@/routes/routes.tsx';
import { ThemeProvider } from './context/ThemeContext';
import { Auth0Provider } from '@auth0/auth0-react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
      domain="dev-hewggjqgaubv8btx.us.auth0.com"
      clientId="jMJuYaKbUR4IUVHh3LkS7ZIWQ9F5ECNx"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <Provider store={store}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    </Auth0Provider>
  </StrictMode>
);
