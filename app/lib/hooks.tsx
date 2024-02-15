import { useCallback, useEffect, useRef } from 'react';

export const useDebounce = <
  F extends (...args: Parameters<F>) => ReturnType<F>,
>(
  callback: F,
  delay: number,
) => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>();

  useEffect(() => {
    return () => {
      timer.current && clearTimeout(timer.current);
    };
  }, []);

  return useCallback(
    (...args: Parameters<F>) => {
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
      }

      timer.current = setTimeout(() => callback(...args), delay);
    },
    [delay, callback],
  );
};
