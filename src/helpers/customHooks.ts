import { useRef, useEffect } from 'react';
import { useAuthToken } from './localstorage/auth';

// Use it on useEffect props dependencies which are object or array to...
// ...trigger the useEffect only when the content of these props change

export function usePrevious<T>(value: T): T {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref: any = useRef<T>();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

export function useIsAuthenticated(): boolean {
  const { authToken } = useAuthToken();

  if (!authToken) {
    return false;
  }

  return true;

  // TODO: return true only if user !== null OR if fetching user with a request and the accessToken and refreshToken
}
