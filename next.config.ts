import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Image configuration
  images: {
    remotePatterns: [
      // Add remote patterns if needed, example:
      // {
      //   protocol: 'https',
      //   hostname: 'example.com',
      //   pathname: '/images/**',
      // },
    ],
  },

  // Headers configuration
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-DNS-Prefetch-Control',
          value: 'on',
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
        },
      ],
    },
  ],

  // Redirects configuration
  redirects: async () => {
    return [];
  },

  // Rewrites configuration
  rewrites: async () => {
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: [],
    };
  },

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },

  // Webpack configuration
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      Object.assign(config.optimization.splitChunks.cacheGroups, {
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
          reuseExistingChunk: true,
        },
      });
    }
    return config;
  },

  // Environment variables configuration
  env: {
    NEXT_PUBLIC_APP_URL: process.env['NEXT_PUBLIC_APP_URL'],
  },

  // Server configuration
  serverExternalPackages: [],

  // Experimental features
  experimental: {
    // Enable modern optimization features
    optimizePackageImports: ['@/components', '@/lib', '@/utils'],
    serverActions: {
      bodySizeLimit: '2mb',
      allowedOrigins: [process.env['NEXT_PUBLIC_APP_URL'] || 'http://localhost:3000'],
    },
  },
};

export default nextConfig;
