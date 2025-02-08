// src/hooks/useMediaQuery.ts
import { useState, useEffect } from 'react';

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const handleMedia = () => setMatches(media.matches);
    handleMedia();
    media.addEventListener('change', handleMedia);
    return () => media.removeEventListener('change', handleMedia);
  }, [query]);

  return matches;
};

export default useMediaQuery;
