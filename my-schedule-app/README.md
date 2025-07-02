# RoosterApp - Login/Signup Interface

A beautiful, modern login and signup interface built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🌍 **Bilingual Support**: English and Dutch
- 🎨 **Modern UI**: Glassmorphism design with dark theme
- 📱 **Responsive**: Mobile-first design
- ✅ **Form Validation**: Client-side validation with error messages
- 🔐 **Authentication Flow**: Login and signup modes
- 🎯 **TypeScript**: Fully typed for better development experience
- 🚀 **Next.js 15**: Latest version with App Router

## Technologies Used

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: Custom UI components (shadcn/ui inspired)
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd roosterapp/my-schedule-app
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

### Deploy to Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Set the root directory to `my-schedule-app`
4. Deploy!

## Project Structure

```
my-schedule-app/
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   │   └── page.tsx        # Main login/signup page
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/
│   │   └── ui/
│   │       ├── button.tsx      # Button component
│   │       └── input.tsx       # Input component
│   └── lib/
│       └── utils.ts           # Utility functions
├── public/                    # Static assets
├── package.json
└── README.md
```

## Features Overview

### Authentication Interface
- Toggle between Login and Signup modes
- Form validation with real-time error messages
- Password confirmation for signup
- Success popup with auto-redirect

### UI/UX
- Beautiful background with gradient overlays
- Animated floating elements
- Smooth transitions and hover effects
- Glassmorphism design elements
- Language toggle (EN/NL)

### Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interface

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
