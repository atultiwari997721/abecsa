# Abecsa Software Solutions

A premium full-stack website for Abecsa Software Company, inspired by Envato Elements' clean and professional design. Built with Next.js, TypeScript, and modern web technologies. Features include website templates marketplace with advanced filtering, service offerings, customer testimonials, and integrated WhatsApp ordering system.

## 🌟 Features

- **Premium Design**: Glassmorphism UI with smooth animations powered by Framer Motion
- **Authentication**: Clerk-based user authentication for secure ordering
- **E-commerce Store**: Browse and purchase website templates with cart functionality
- **Service Showcase**: Detailed service packages with transparent pricing
- **Customer Reviews**: Testimonials with website links and ratings
- **WhatsApp Integration**: Direct ordering through WhatsApp for seamless customer experience
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Modern Tech Stack**: Next.js 16, TypeScript, Tailwind CSS

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd abecsa
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory with your Clerk credentials:

```env
# Clerk Authentication (Get from https://clerk.com)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key
CLERK_SECRET_KEY=sk_test_your_secret_key

# Optional: Clerk URLs (defaults provided)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) to view the website.

## 📁 Project Structure

```
abecsa/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── cart/           # Shopping cart page
│   │   ├── help/           # Help/Support page
│   │   ├── service/        # Services page
│   │   ├── sign-in/        # Authentication pages
│   │   ├── sign-up/
│   │   ├── websites/       # Website templates store
│   │   ├── globals.css     # Global styles
│   │   └── layout.tsx      # Root layout
│   ├── components/         # Reusable components
│   │   ├── Hero.tsx        # Landing section
│   │   ├── Navbar.tsx      # Navigation
│   │   ├── Footer.tsx      # Footer
│   │   ├── FeaturedWebsites.tsx
│   │   ├── Partners.tsx    # Partner logos
│   │   └── Testimonials.tsx
│   └── context/            # React Context
│       └── CartContext.tsx # Shopping cart state
├── public/                 # Static assets
└── package.json
```

## 🛠️ Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **Authentication**: Clerk
- **Icons**: Lucide React
- **Fonts**: Outfit (headings), Inter (body)

## 🎨 Design System

### Colors

- Primary: Blue gradient (#3b82f6 to #8b5cf6 to #ec4899)
- Background: Dark theme (#050505)
- Glass Effect: Semi-transparent panels with blur

### Components

- Glass panels with backdrop blur
- Gradient text effects
- Smooth hover animations
- Responsive grid layouts

## 📱 Pages

1. **Home (/)**: Hero section, featured templates, partners, testimonials
2. **Services (/service)**: Detailed service packages and pricing
3. **Websites (/websites)**: Template marketplace with filtering
4. **Cart (/cart)**: Shopping cart with WhatsApp ordering
5. **Help (/help)**: Support contact information
6. **Auth (/sign-in, /sign-up)**: Clerk-powered authentication

## 🔐 Authentication

The app uses Clerk for authentication. Users must be logged in to place orders. The cart system integrates with WhatsApp for order processing.

### Setting up Clerk

1. Create account at [clerk.com](https://clerk.com)
2. Create a new application
3. Copy the publishable key and secret key
4. Add them to your `.env.local` file

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The app can be deployed to any platform supporting Next.js:

- Netlify
- Railway
- DigitalOcean App Platform

## 📞 Contact

- **Website**: [abecsa.in](https://abecsa.in) | [abecsa.vercel.app](https://abecsa.vercel.app)
- **Email**: support@abecsa.in
- **Phone**: +91 9876543210
- **WhatsApp**: [wa.me/919876543210](https://wa.me/919876543210)

## 📝 License

This project is proprietary software for Abecsa Software Solutions.

## 🤝 Contributing

This is a commercial project. Please contact the development team for contributions.
