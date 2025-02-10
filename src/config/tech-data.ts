// src/config/tech-data.ts
import {
  Code2,
  Server,
  Smartphone,
  Cloud,
  Library,
  Database,
  Layout,
  ShoppingCart,
  type LucideIcon,
} from 'lucide-react';

export interface TechItem {
  name: string;
  description: string;
  link: string;
  popular?: boolean;
  category?: string;
  categoryName?: string;
  categoryIcon?: LucideIcon;
}

export interface TechCategory {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  technologies: TechItem[];
}

const addCategoryInfo = (category: TechCategory): TechItem[] =>
  category.technologies.map((tech) => ({
    ...tech,
    category: category.id,
    categoryName: category.title,
    categoryIcon: category.icon,
  }));

export const techCategories: TechCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    icon: Code2,
    description:
      'Modern frontend frameworks and libraries for building responsive web applications',
    technologies: addCategoryInfo({
      id: 'frontend',
      title: 'Frontend Development',
      icon: Code2,
      description: '',
      technologies: [
        {
          name: 'React',
          description: 'A JavaScript library for building user interfaces',
          link: '/tech/react',
          popular: true,
        },
        {
          name: 'Angular',
          description: 'Platform for building web applications',
          link: '/tech/angular',
        },
        {
          name: 'Vue.js',
          description: 'Progressive JavaScript framework',
          link: '/tech/vuejs',
          popular: true,
        },
        {
          name: 'Vite.js',
          description: 'Next generation frontend tooling',
          link: '/tech/vitejs',
        },
      ],
    }),
  },
  {
    id: 'backend',
    title: 'Backend Development',
    icon: Server,
    description: 'Robust backend technologies for scalable server-side applications',
    technologies: addCategoryInfo({
      id: 'backend',
      title: 'Backend Development',
      icon: Server,
      description: '',
      technologies: [
        {
          name: 'Java',
          description: 'Enterprise-grade backend development',
          link: '/tech/java',
          popular: true,
        },
        {
          name: '.NET',
          description: 'Framework for building web applications',
          link: '/tech/dotnet',
        },
        {
          name: 'Python',
          description: 'Versatile programming language',
          link: '/tech/python',
          popular: true,
        },
        {
          name: 'PHP',
          description: 'Server-side scripting language',
          link: '/tech/php',
        },
        {
          name: 'Node.js',
          description: 'JavaScript runtime environment',
          link: '/tech/nodejs',
          popular: true,
        },
        {
          name: 'Next.js',
          description: 'React framework for production',
          link: '/tech/nextjs',
        },
      ],
    }),
  },
  {
    id: 'mobile',
    title: 'Mobile Development',
    icon: Smartphone,
    description: 'Cross-platform and native mobile app development solutions',
    technologies: addCategoryInfo({
      id: 'mobile',
      title: 'Mobile Development',
      icon: Smartphone,
      description: '',
      technologies: [
        {
          name: 'Android',
          description: 'Native Android development',
          link: '/tech/android',
          popular: true,
        },
        {
          name: 'iOS',
          description: 'Native iOS development',
          link: '/tech/ios',
          popular: true,
        },
        {
          name: 'Flutter',
          description: 'Cross-platform app development',
          link: '/tech/flutter',
        },
        {
          name: 'React Native',
          description: 'Mobile apps with React',
          link: '/tech/react-native',
          popular: true,
        },
        {
          name: 'Swift',
          description: 'iOS app development',
          link: '/tech/swift',
        },
        {
          name: 'Kotlin',
          description: 'Modern Android development',
          link: '/tech/kotlin',
        },
      ],
    }),
  },
  {
    id: 'cloud',
    title: 'Cloud Services',
    icon: Cloud,
    description: 'Cloud platforms and infrastructure solutions',
    technologies: addCategoryInfo({
      id: 'cloud',
      title: 'Cloud Services',
      icon: Cloud,
      description: '',
      technologies: [
        {
          name: 'AWS',
          description: 'Amazon Web Services cloud platform',
          link: '/tech/aws',
          popular: true,
        },
        {
          name: 'Azure',
          description: 'Microsoft cloud platform',
          link: '/tech/azure',
          popular: true,
        },
        {
          name: 'GCP',
          description: 'Google Cloud Platform',
          link: '/tech/gcp',
        },
      ],
    }),
  },
  {
    id: 'frameworks',
    title: 'Frameworks',
    icon: Library,
    description: 'Development frameworks for rapid application development',
    technologies: addCategoryInfo({
      id: 'frameworks',
      title: 'Frameworks',
      icon: Library,
      description: '',
      technologies: [
        {
          name: 'Laravel',
          description: 'PHP web framework',
          link: '/tech/laravel',
          popular: true,
        },
        {
          name: 'CodeIgniter',
          description: 'PHP framework',
          link: '/tech/codeigniter',
        },
        {
          name: 'Django',
          description: 'Python web framework',
          link: '/tech/django',
          popular: true,
        },
        {
          name: 'MEAN Stack',
          description: 'Full-stack JavaScript',
          link: '/tech/mean',
        },
        {
          name: 'CakePHP',
          description: 'PHP framework',
          link: '/tech/cakephp',
        },
      ],
    }),
  },
  {
    id: 'database',
    title: 'Databases',
    icon: Database,
    description: 'Database management systems and solutions',
    technologies: addCategoryInfo({
      id: 'database',
      title: 'Databases',
      icon: Database,
      description: '',
      technologies: [
        {
          name: 'MySQL',
          description: 'Open-source relational database',
          link: '/tech/mysql',
          popular: true,
        },
        {
          name: 'SQL Server',
          description: 'Microsoft database solution',
          link: '/tech/sql-server',
        },
        {
          name: 'PostgreSQL',
          description: 'Advanced open-source database',
          link: '/tech/postgresql',
          popular: true,
        },
        {
          name: 'MongoDB',
          description: 'NoSQL database',
          link: '/tech/mongodb',
          popular: true,
        },
        {
          name: 'SQLite',
          description: 'Lightweight database',
          link: '/tech/sqlite',
        },
        {
          name: 'Firebase',
          description: "Google's mobile platform",
          link: '/tech/firebase',
        },
      ],
    }),
  },
  {
    id: 'cms',
    title: 'Content Management',
    icon: Layout,
    description: 'Content management systems for web applications',
    technologies: addCategoryInfo({
      id: 'cms',
      title: 'Content Management',
      icon: Layout,
      description: '',
      technologies: [
        {
          name: 'WordPress',
          description: 'Popular CMS platform',
          link: '/tech/wordpress',
          popular: true,
        },
        {
          name: 'Joomla',
          description: 'Open-source CMS',
          link: '/tech/joomla',
        },
        {
          name: 'Drupal',
          description: 'Enterprise CMS solution',
          link: '/tech/drupal',
          popular: true,
        },
        {
          name: 'Ecwid',
          description: 'E-commerce solution',
          link: '/tech/ecwid',
        },
      ],
    }),
  },
  {
    id: 'ecommerce',
    title: 'E-commerce',
    icon: ShoppingCart,
    description: 'E-commerce platforms and solutions',
    technologies: addCategoryInfo({
      id: 'ecommerce',
      title: 'E-commerce',
      icon: ShoppingCart,
      description: '',
      technologies: [
        {
          name: 'WooCommerce',
          description: 'WordPress e-commerce',
          link: '/tech/woocommerce',
          popular: true,
        },
        {
          name: 'Magento',
          description: 'Enterprise e-commerce',
          link: '/tech/magento',
          popular: true,
        },
        {
          name: 'Shopify',
          description: 'Cloud e-commerce platform',
          link: '/tech/shopify',
          popular: true,
        },
      ],
    }),
  },
];

export type FlattenedTechItem = TechItem & {
  category: string;
  categoryName: string;
  categoryIcon: LucideIcon;
};

export const getAllTechnologies = (): FlattenedTechItem[] =>
  techCategories.flatMap((category) =>
    category.technologies.map((tech) => ({
      ...tech,
      category: category.id,
      categoryName: category.title,
      categoryIcon: category.icon,
    }))
  );
