import { Contact, Navbar, Transition } from '@/layout';
export function PortfolioPage({
  eyebrow,
  title,
  children,
  showFooter = true,
  dark = false,
  pageClass = '',
}) {
  return (
    <Transition>
      <div className={`inner-page ${dark ? 'inner-dark' : ''}`}>
        <Navbar />
        <main className={`portfolio-section inner-content ${pageClass}`}>
          <p className='section-eyebrow'>{eyebrow}</p>
          <h1>{title}</h1>
          {children}
        </main>
      </div>
      {showFooter && <Contact />}
    </Transition>
  );
}
