// src/app/industries/[id]/page.tsx
import { type Metadata } from 'next';
import Link from 'next/link';
import { industries, getIndustryById } from '@/config/industry-data';
import IndustryContent, {
  IndustryContentErrorBoundary,
} from '@/components/IndustryDetail/IndustryContent';
import type { IconName, IndustrySolutionInput, Industry } from '@/types/industry';

interface Props {
  params: {
    id: string;
  };
}

// Custom type guard to check if industry exists
function isIndustry(industry: Industry | undefined): industry is Industry {
  return industry !== undefined;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const industry = getIndustryById(params.id);

  if (!isIndustry(industry)) {
    return {
      title: 'Industry Not Found',
      description: 'The requested industry page could not be found.',
      openGraph: {
        title: 'Industry Not Found | SolveJet',
        description: 'The requested industry page could not be found.',
      },
    };
  }

  const ogTitle = `${industry.title} Software Solutions | SolveJet`;
  const ogImage = industry.image || '/images/og/industries.png';

  return {
    title: `${industry.title} Solutions & Services | SolveJet`,
    description: industry.fullDescription,
    openGraph: {
      title: ogTitle,
      description: industry.fullDescription,
      url: `/industries/${industry.id}`,
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: industry.fullDescription,
      images: [ogImage],
    },
  };
}

export async function generateStaticParams() {
  return industries.map((industry) => ({
    id: industry.id,
  }));
}

export default function IndustryDetailPage({ params }: Props) {
  const industry = getIndustryById(params.id);

  if (!isIndustry(industry)) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold">Industry Not Found</h1>
        <p className="mt-4 text-muted-foreground">
          The industry you are looking for does not exist or has been moved.
        </p>
        <div className="mt-8">
          <Link
            href="/industries"
            className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
          >
            View All Industries
          </Link>
        </div>
      </div>
    );
  }

  // Convert icon components to string names
  const iconName = industry.icon.name as IconName;
  const solutions: IndustrySolutionInput[] = industry.solutions.map((solution) => ({
    ...solution,
    icon: solution.icon.name as IconName,
  }));

  return (
    <main className="min-h-screen bg-background">
      <IndustryContentErrorBoundary
        fallback={
          <div className="container mx-auto px-4 py-16 text-center">
            <h2 className="text-2xl font-bold">Unable to load industry content</h2>
            <p className="mt-4 text-muted-foreground">
              We encountered an error while loading the content. Please try refreshing the page.
            </p>
          </div>
        }
      >
        <IndustryContent
          title={industry.title}
          description={industry.fullDescription}
          icon={iconName}
          stats={industry.stats}
          solutions={solutions}
          technologies={industry.technologies}
          gradient={industry.gradient}
          caseStudyStats={industry.caseStudyStats}
        />
      </IndustryContentErrorBoundary>
    </main>
  );
}
