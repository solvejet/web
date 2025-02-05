# SolveJet - Next.js Enterprise Application Template

A fully optimized Next.js application template with built-in SEO, analytics, performance monitoring, and security features.

## 🚀 Features

- **Performance Optimization**

  - Automated performance monitoring and reporting
  - Image optimization with lazy loading
  - Font optimization with next/font
  - Client-side performance metrics collection

- **SEO & Analytics**

  - Built-in SEO components and metadata management
  - Google Analytics 4 integration
  - Google Tag Manager support
  - LinkedIn Insight Tag integration
  - Custom analytics events tracking
  - UTM parameter tracking

- **Security**

  - CSRF protection
  - Rate limiting
  - Secure headers configuration
  - Content Security Policy (CSP)
  - Cross-Origin Resource Sharing (CORS)
  - MongoDB connection security

- **Development Features**
  - TypeScript support
  - ESLint configuration
  - Prettier configuration
  - Stylelint setup
  - Tailwind CSS with dark mode support
  - Modular component architecture

## 📋 Prerequisites

- Node.js 18.x or higher
- MongoDB database
- npm or yarn package manager

## 🛠 Installation

1. Clone the repository:

```bash
git clone https://github.com/solvejet/solvejet.git
cd solvejet
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

4. Update `.env.local` with your configuration:

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# MongoDB
MONGODB_URI=your_mongodb_uri

# Analytics
NEXT_PUBLIC_GA_ID=your_ga_id
NEXT_PUBLIC_GTM_ID=your_gtm_id
NEXT_PUBLIC_LINKEDIN_ID=your_linkedin_id
```

5. Run the development server:

```bash
npm run dev
# or
yarn dev
```

## 🏗 Project Structure

```
src/
├── app/                   # App router pages and API routes
├── components/           # Reusable components
│   ├── ui/              # UI components
│   └── analytics/       # Analytics components
├── hooks/               # Custom React hooks
├── lib/                 # Utility libraries
├── middleware/          # Next.js middleware
├── models/              # MongoDB models
├── types/               # TypeScript types
└── utils/               # Utility functions
```

## 📊 Analytics Setup

The project includes support for multiple analytics platforms:

### Google Analytics 4

1. Create a GA4 property
2. Add your Measurement ID to `.env.local`
3. Analytics will automatically start tracking

### Google Tag Manager

1. Create a GTM container
2. Add your Container ID to `.env.local`
3. Tags will be managed through GTM interface

### LinkedIn Insight Tag

1. Get your LinkedIn Partner ID
2. Add it to `.env.local`
3. LinkedIn conversion tracking will be enabled

## 🔒 Security Features

### CSRF Protection

- Automatic CSRF token generation
- Token validation for all POST/PUT/DELETE requests
- Secure cookie handling

### Rate Limiting

- Configurable rate limits per endpoint
- Memory-based rate limiting
- IP-based tracking

### Content Security Policy

- Strict CSP rules configured
- Inline script handling
- Resource loading restrictions

## 💻 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build       # Build production application
npm run start       # Start production server

# Linting and Formatting
npm run lint        # Run ESLint
npm run lint:fix    # Fix ESLint issues
npm run lint:css    # Run Stylelint
npm run format      # Run Prettier

# Type Checking
npm run type-check  # Run TypeScript compiler
```

### Code Quality Tools

- **ESLint**: JavaScript/TypeScript linting
- **Prettier**: Code formatting
- **Stylelint**: CSS/SCSS linting
- **TypeScript**: Static type checking

### Performance Monitoring

The application includes built-in performance monitoring for:

- Core Web Vitals
- Custom performance metrics
- User interactions
- Page load times

## 🚀 Deployment

1. Build the application:

```bash
npm run build
```

2. Start the production server:

```bash
npm run start
```

### Deployment Considerations

- Set up proper environment variables
- Configure MongoDB connection string
- Set up proper security headers
- Enable HTTPS
- Configure proper CORS settings

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)
- [TypeScript](https://www.typescriptlang.org/)

## ⚠️ Known Issues

- Web Vitals reporting may require a CSRF token refresh in some cases
- Image optimization requires proper configuration in production
- Rate limiting may need adjustment based on your usage patterns

## 📫 Contact

- Website: [solvejet.net](https://solvejet.net)
- Twitter: [@karansxa](https://twitter.com/karansxa)
- Email: your.email@example.com
