import { atom } from 'jotai';

const getLocalStorageItem = (key: string, defaultValue: any) => {
  const storedValue = localStorage.getItem(key);
  if (storedValue) {
    try {
      return JSON.parse(storedValue);
    } catch {
      return defaultValue;
    }
  }
  return defaultValue;
};

const localStorageEffect = (key: string) => (getSet) => {
  const set = getSet[1];
  const storedValue = getLocalStorageItem(key, null);

  if (storedValue !== null) {
    set(storedValue);
  }

  return (newValue) => {
    if (newValue === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(newValue));
    }
  };
};

export const authTokenAtom = atom<string | null>(null);
