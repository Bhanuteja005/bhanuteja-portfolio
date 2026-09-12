import Link from 'next/link';
export default function NotFound() {
  return (
    <main className='portfolio-section inner-content'>
      <p className='section-eyebrow'>404</p>
      <h1>This page isn’t here.</h1>
      <Link href='/' className='portfolio-link dark-link'>
        Back to home ↗
      </Link>
    </main>
  );
}
