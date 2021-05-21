import { useLocalStorage } from './useLocalStorage';

const key = 'authToken';

export const useAuthToken = (): {
  authToken: string | null;
  setAuthToken: (authToken: string) => void;
  removeAuthToken: (key: string) => void;
} => {
  const [authToken, setValue, removeValue] = useLocalStorage<string>({ key });

  const setAuthToken = (token: string) => setValue(token);

  const removeAuthToken = () => removeValue(key);

  return { authToken, setAuthToken, removeAuthToken };
};
