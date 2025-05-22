# Nav Store - Project Showcase WebApp

A modern, futuristic project showcase webapp that mimics the design and functionality of app stores (Google Play Store, Apple App Store) but for displaying personal projects including both mobile apps and web applications.

## Features

### Project Categories
- **Mobile Apps**: Flutter apps, React Native apps, native mobile applications
- **Web Applications**: Full-stack web projects, frontend showcases, web tools
- **AI/ML Projects**: Computer vision applications, NLP tools, data science projects
- **APIs & Backend**: REST APIs, microservices, backend solutions
- **Open Source**: GitHub repositories, libraries, frameworks

### Project Display Structure
- App icon/logo
- App name and tagline
- Developer info
- Screenshots carousel
- App description and features
- Tech stack used
- Version information
- Download links
- GitHub repository link
- Live demo links

### Enhanced Features
- **Search & Filter System**: Search by project name, technology, or category
- **Interactive Elements**: Project Preview Modal, Live Demo Integration
- **Social Features**: Share individual projects on social media

## Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **UI Components**: Custom components with animations
- **Icons**: React Icons

## Getting Started

### Prerequisites
- Node.js 14.0 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/nav-store.git
cd nav-store
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
nav-store/
├── public/
│   ├── projects/
│   │   ├── screenshots/
│   │   ├── icons/
│   │   └── demos/
├── src/
│   ├── components/
│   │   ├── ProjectCard/
│   │   ├── ProjectModal/
│   │   ├── FilterSidebar/
│   │   └── SearchBar/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── projects/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── data/
│   │   └── projects.ts
│   ├── styles/
│   │   └── globals.css
│   └── utils/
│       └── filters.ts
```

## Design

### Visual Theme - "Futuristic Elegance"
- **Color Scheme**: Deep navy (#0B1426), Electric blue (#00D4FF), Accent gradients
- **Typography**: Modern, clean sans-serif (Inter, Poppins, SF Pro)
- **Layout Elements**: Responsive cards with hover effects, Glassmorphism, Neumorphism

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by modern app store designs
- Built with Next.js and Tailwind CSS 