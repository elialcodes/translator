import { useEffect, useState } from 'react';

//como estamos haciendo un debounce genérico y reutilizable,
//T es un valor genérico, es mejor que poner any o unknow
export function useDebounce<T>(value: T, delay: number) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [value]);
  //timer se vuelve ejecuta cada vez que escribimos, limpiando previamente
  //el setTimeout anterior y volviendo a empezar desde cero el delay
  return debounceValue;
}
