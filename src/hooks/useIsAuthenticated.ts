import { useAuthToken } from './useAuthToken';

export function useIsAuthenticated(): boolean {
  const { authToken } = useAuthToken();

  if (!authToken) {
    return false;
  }

  return true;

  // TODO: return true only if user !== null OR if fetching user with a request and the accessToken and refreshToken
}
