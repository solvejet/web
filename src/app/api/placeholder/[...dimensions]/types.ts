// src/app/api/placeholder/[...dimensions]/types.ts
export interface ImageProps {
  width: number;
  height: number;
  text: string | undefined;
  bgColor: string | undefined;
  textColor: string | undefined;
}

export interface PlaceholderParams {
  dimensions?: string[] | undefined;
}
