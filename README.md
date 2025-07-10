# PREPEN 🛍️ Simple E-commerce Store 

A modern, full-stack e-commerce platform built with Next.js, featuring product listings, shopping cart functionality, order processing, and user authentication.

### 🌟 Features

- **Product Listings**: Browse products with detailed information
- **Shopping Cart**: Add/remove items, update quantities
- **Product Details Page**: Comprehensive product information
- **Order Processing**: Complete checkout flow with Stripe integration
- **User Authentication**: Secure registration and login with Clerk
- **Content Management**: Dynamic product management via Sanity CMS
- **Responsive Design**: Mobile-friendly interface with Material-UI

### 🚀 Tech Stack

#### Frontend
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Material-UI (MUI)**: Component library for consistent UI

#### Backend & Database
- **Supabase**: PostgreSQL database with real-time capabilities
- **Prisma**: Type-safe database ORM
- **tRPC**: End-to-end type-safe APIs

#### Authentication & CMS
- **Clerk**: User authentication and management
- **Sanity**: Headless CMS for product content management

#### Payment & Deployment
- **Stripe**: Payment processing
- **Vercel**: Deployment and hosting

### 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/hammadmajid/prepen.git
   cd prepen
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Variables**
   Create a `.env.local` file with the following variables:
   ```env
   # Database
   DATABASE_URL="your_supabase_database_url"
   
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
   CLERK_SECRET_KEY="your_clerk_secret_key"
   
   # Sanity CMS
   NEXT_PUBLIC_SANITY_PROJECT_ID="your_sanity_project_id"
   NEXT_PUBLIC_SANITY_DATASET="production"
   SANITY_API_TOKEN="your_sanity_api_token"
   
   # Stripe
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your_stripe_publishable_key"
   STRIPE_SECRET_KEY="your_stripe_secret_key"
   STRIPE_WEBHOOK_SECRET="your_stripe_webhook_secret"
   
   # App URL
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

4. **Database Setup**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   pnpm run dev
   ```

Visit `http://localhost:3000` to see the application.

### 🔧 Key Features Implementation

#### Shopping Cart
- Add products to cart with quantity selection
- Update item quantities
- Remove items from cart
- Persistent cart state across sessions

#### Product Management
- Dynamic product listings from Sanity CMS
- Category-based organization
- Rich product descriptions and images

#### Order Processing
- Secure checkout flow
- Stripe payment integration

#### User Authentication
- Secure user registration/login via Clerk
- Protected routes for authenticated users
- User profile management
- Order history tracking

### 🚀 Deployment

This project is deployed on Vercel with the following configuration:

1. **Build Command**: `pnpm run build`
2. **Output Directory**: `.next`
3. **Environment Variables**: Configure all required environment variables in Vercel dashboard
4. **Domain**: [prepen.bine.codes](https://prepen.bine.codes)

### 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1200px+)
- Mobile (320px - 767px)

### 🔒 Security Features

- **Authentication**: Secure user authentication with Clerk
- **Payment Security**: PCI-compliant payment processing via Stripe
- **Data Validation**: Server-side validation with Zod
- **Environment Variables**: Sensitive data protection
- **HTTPS**: SSL/TLS encryption in production

## 🖹 License 

See the MIT license details in `./LICENSE` file.
