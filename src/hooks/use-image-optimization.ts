// src/hooks/use-image-optimization.ts
"use client"

import { useState, useCallback, useEffect } from 'react';

interface ImageDimensions {
  width: number;
  height: number;
}

interface ImageOptimizationOptions {
  quality?: number;
  sizes?: string[];
  formats?: Array<'webp' | 'avif' | 'original'>;
}

export const useImageOptimization = () => {
  const [viewportWidth, setViewportWidth] = useState<number>(0);

  useEffect(() => {
    const updateWidth = () => {
      setViewportWidth(window.innerWidth);
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const getOptimalImageSize = useCallback(
    (dimensions: ImageDimensions): ImageDimensions => {
      const { width, height } = dimensions;
      const aspectRatio = width / height;

      // Calculate optimal width based on viewport
      let optimalWidth = Math.min(width, viewportWidth * (window.devicePixelRatio || 1));
      optimalWidth = Math.ceil(optimalWidth / 100) * 100; // Round to nearest 100

      return {
        width: optimalWidth,
        height: Math.round(optimalWidth / aspectRatio),
      };
    },
    [viewportWidth]
  );

  const generateSrcSet = useCallback(
    (
      src: string,
      dimensions: ImageDimensions,
      options: ImageOptimizationOptions = {}
    ): { srcset: string; sizes: string } => {
      const {
        sizes = ['320w', '640w', '750w', '828w', '1080w', '1200w', '1920w', '2048w', '3840w'],
        formats = ['webp', 'original'],
        quality = 75,
      } = options;

      const imageParams = new URLSearchParams({
        q: quality.toString(),
      });

      const srcSet = sizes
        .map((size) => {
          const width = parseInt(size);
          const height = Math.round(width / (dimensions.width / dimensions.height));

          return formats
            .map((format) => {
              const url = `/_next/image?url=${encodeURIComponent(src)}&w=${width}&h=${height}${
                format !== 'original' ? `&fmt=${format}` : ''
              }&${imageParams.toString()}`;
              return `${url} ${size}`;
            })
            .join(', ');
        })
        .join(', ');

      // Generate sizes attribute based on viewport width
      const sizesAttribute = [
        '(max-width: 640px) 100vw',
        '(max-width: 1024px) 75vw',
        '(max-width: 1280px) 50vw',
        '33vw',
      ].join(', ');

      return {
        srcset: srcSet,
        sizes: sizesAttribute,
      };
    },
    []
  );

  const lazyLoadImage = useCallback((imageRef: HTMLImageElement) => {
    if ('loading' in HTMLImageElement.prototype) {
      imageRef.loading = 'lazy';
    } else {
      // Fallback to Intersection Observer for browsers that don't support native lazy loading
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = img.dataset['src'] || img.src;
            observer.unobserve(img);
          }
        });
      });

      observer.observe(imageRef);
    }
  }, []);

  return {
    getOptimalImageSize,
    generateSrcSet,
    lazyLoadImage,
    viewportWidth,
  };
};
