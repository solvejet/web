// src/components/layout/Header/SkipToContent.tsx
const SkipToContent = () => (
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:outline-none focus:ring-2 focus:ring-accent rounded-md"
  >
    Skip to main content
  </a>
);

export default SkipToContent;
