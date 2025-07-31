import { createContext, useContext, type FC, type ReactNode } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

type TokenContextType = { getTokenSilently: () => Promise<string | null> };
const TokenContext = createContext<TokenContextType>({
  getTokenSilently: async () => null,
});

export const AuthTokenProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { getAccessTokenSilently } = useAuth0();
  const getTokenSilently = async () => {
    try {
      return await getAccessTokenSilently();
    } catch (err) {
      console.error('❌ Failed to get token silently:', err);
      return null;
    }
  };
  return (
    <TokenContext.Provider value={{ getTokenSilently }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => useContext(TokenContext);
