import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto mobile-pt pb-12 md:pb-24">
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
        <h1 className="text-5xl sm:text-6xl font-bold text-primary mb-3 md:mb-4">404</h1>
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Page Not Found</h2>
        <p className="text-gray-600 mb-6 sm:mb-8 max-w-md text-sm sm:text-base">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link href="/" className="btn-primary py-2 px-6 w-full sm:w-auto text-center max-w-xs">
          Return Home
        </Link>
      </div>
    </div>
  );
} 