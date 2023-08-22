import { useEffect} from 'react'

export const useDebounce = (searchTerm: string, fn: (term: string) => void, fn2?: (value: null) => void)  => {
	useEffect(() => {
		if (fn2){
			fn2(null);
		}
    const handler = setTimeout(() => {
      fn(searchTerm);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, fn, fn2]);
}