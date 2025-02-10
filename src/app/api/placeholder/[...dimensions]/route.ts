// src/app/api/placeholder/[...dimensions]/route.ts
import { NextRequest } from 'next/server';
import { type ImageProps, type PlaceholderParams } from './types';

export const runtime = 'edge';

// Helper to validate dimensions
const validateDimensions = (width: number, height: number): boolean => {
  return (
    !isNaN(width) &&
    !isNaN(height) &&
    width > 0 &&
    height > 0 &&
    width <= 1920 && // Max width
    height <= 1080 // Max height
  );
};

// Generate random pastel color
const generatePastelColor = (): string => {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 80%)`;
};

// Create SVG placeholder
const createPlaceholderSVG = (props: ImageProps): string => {
  const {
    width,
    height,
    text = `${width}×${height}`,
    bgColor = generatePastelColor(),
    textColor = '#4A5568',
  } = props;

  // Calculate text size based on dimensions
  const fontSize = Math.floor(Math.min(width, height) / 10);

  return `
    <svg
      width="${width}"
      height="${height}"
      viewBox="0 0 ${width} ${height}"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="${width}" height="${height}" fill="${bgColor}" />
      
      <!-- Grid Pattern -->
      <path d="M${width} 0 L0 ${height}" stroke="rgba(255,255,255,0.1)" stroke-width="1" />
      <path d="M0 0 L${width} ${height}" stroke="rgba(255,255,255,0.1)" stroke-width="1" />
      
      <!-- Border -->
      <rect
        width="${width - 2}"
        height="${height - 2}"
        x="1"
        y="1"
        fill="none"
        stroke="rgba(0,0,0,0.1)"
        stroke-width="2"
      />
      
      <!-- Text -->
      <text
        x="50%"
        y="50%"
        font-family="system-ui, -apple-system, sans-serif"
        font-size="${fontSize}px"
        fill="${textColor}"
        text-anchor="middle"
        dominant-baseline="middle"
      >
        ${text}
      </text>
    </svg>
  `;
};

export async function GET(
  request: NextRequest,
  { params }: { params: PlaceholderParams }
): Promise<Response> {
  try {
    // Validate params
    if (!params.dimensions || !Array.isArray(params.dimensions) || params.dimensions.length < 2) {
      return new Response('Invalid dimensions format', { status: 400 });
    }

    // After validation, we know dimensions exists and has at least 2 elements
    const widthStr = params.dimensions[0];
    const heightStr = params.dimensions[1];

    if (!widthStr || !heightStr) {
      return new Response('Invalid dimensions format', { status: 400 });
    }

    const width = parseInt(widthStr, 10);
    const height = parseInt(heightStr, 10);

    // Validate dimensions
    if (!validateDimensions(width, height)) {
      return new Response('Invalid dimensions', { status: 400 });
    }

    // Get color parameters from URL
    const { searchParams } = new URL(request.url);
    const bgColor = searchParams.get('bg') || undefined;
    const textColor = searchParams.get('text') || undefined;
    const text = searchParams.get('content') || undefined;

    // Generate SVG with type-safe props
    const svg = createPlaceholderSVG({
      width,
      height,
      bgColor,
      textColor,
      text,
    });

    // Return SVG with proper headers
    return new Response(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Placeholder generation error:', error);
    return new Response('Error generating placeholder', { status: 500 });
  }
}
