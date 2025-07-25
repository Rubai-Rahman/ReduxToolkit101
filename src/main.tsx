import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { store } from '@/redux/store.ts';
import { RouterProvider } from 'react-router-dom';
import router from '@/routes/routes.tsx';
import { ThemeProvider } from './context/ThemeContext';
import { Auth0Provider } from '@auth0/auth0-react';
import { AuthTokenProvider } from './context/TokenContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin + '/onboarding',
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      }}
      cacheLocation="memory" // ✅ add this!
      useRefreshTokens={true}
    >
      <AuthTokenProvider>
        <Provider store={store}>
          <ThemeProvider>
            <RouterProvider router={router} />
          </ThemeProvider>
        </Provider>
      </AuthTokenProvider>
    </Auth0Provider>
  </StrictMode>
);
