// next.config.ts
import type { NextConfig } from 'next';
import crypto from 'crypto';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Optimize JavaScript bundles
  webpack: (config, { dev, isServer }) => {
    // Production optimizations only
    if (!dev && !isServer) {
      // Optimize chunk splitting
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 70000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        cacheGroups: {
          default: false,
          vendors: false,
          framework: {
            name: 'framework',
            chunks: 'all',
            // Package in the framework chunk
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
            priority: 40,
            enforce: true,
          },
          commons: {
            name: 'commons',
            chunks: 'all',
            minChunks: 2,
            priority: 20,
          },
          lib: {
            test(module: any): boolean {
              return module.size() > 160000 && /node_modules[/\\]/.test(module.identifier() || '');
            },
            name(module: any): string {
              const hash = crypto.createHash('sha1');

              if (module.libIdent) {
                const id = module.libIdent({ context: __dirname });
                hash.update(id);
              } else {
                hash.update(module.identifier());
              }

              return hash.digest('hex').substring(0, 8);
            },
            priority: 30,
            minChunks: 1,
            reuseExistingChunk: true,
          },
          shared: {
            name(module: any, chunks: any[]): string {
              const hash = crypto.createHash('sha1');
              chunks.forEach((chunk) => {
                hash.update(chunk.name || '');
              });
              return hash.digest('hex').substring(0, 8);
            },
            priority: 10,
            minChunks: 2,
            reuseExistingChunk: true,
          },
        },
      };
    }

    return config;
  },

  // Cache Control Headers
  headers: async () => [
    {
      source: '/:all*(svg|jpg|png|webp)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
    {
      source: '/_next/image/:all*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
    {
      source: '/_next/static/:all*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],

  // Image Optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Experimental Features
  experimental: {
    optimizeCss: true, // Enable CSS optimization
    optimizePackageImports: ['@/components', '@/lib', '@/utils'],
    webpackBuildWorker: true,
  },
};

export default nextConfig;
