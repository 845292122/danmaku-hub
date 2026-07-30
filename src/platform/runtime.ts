export const isDev = (): boolean => {
  return import.meta.env.DEV;
};

export const isElectron = (): boolean =>
  typeof window !== 'undefined' && !!(window as Window & { __IS_ELECTRON__?: boolean }).__IS_ELECTRON__;
