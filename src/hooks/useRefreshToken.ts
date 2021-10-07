import { useLocalStorage } from './useLocalStorage';

const key = 'refreshToken';

export const useRefreshToken = (): {
  refreshToken: string | null;
  setRefreshToken: (refreshToken: string) => void;
  removeRefreshToken: () => void;
} => {
  const [refreshToken, setValue, removeValue] = useLocalStorage<string>({
    key,
  });

  const setRefreshToken = (token: string) => setValue(token);

  const removeRefreshToken = () => removeValue(key);

  return { refreshToken, setRefreshToken, removeRefreshToken };
};
