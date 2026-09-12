import { ReferenceWork } from '@/components';
import { PortfolioPage } from '@/layout';
export const metadata = { title: 'Work' };
export default function Work() {
  return (
    <PortfolioPage
      eyebrow='Selected works'
      title='Creating next level digital products'
      pageClass='reference-work-page'
    >
      <ReferenceWork />
    </PortfolioPage>
  );
}
