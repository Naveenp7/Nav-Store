import Link from 'next/link';

export default function ProjectNotFound() {
  return (
    <div className="container mx-auto mobile-pt pb-12 md:pb-24">
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
        <h1 className="text-5xl sm:text-6xl font-bold text-primary mb-3 md:mb-4">404</h1>
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">App Not Found</h2>
        <p className="text-gray-600 mb-6 sm:mb-8 max-w-md text-sm sm:text-base">
          The app you are looking for doesn't exist or has been removed from our store.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
          <Link href="/projects" className="btn-primary w-full sm:w-auto text-center py-2 px-6">
            Browse Apps
          </Link>
          <Link href="/" className="btn border border-primary text-primary hover:bg-primary-light w-full sm:w-auto text-center py-2 px-6">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
} 