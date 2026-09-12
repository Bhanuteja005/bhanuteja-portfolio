import { ReferenceWork } from '@/components';
import { Contact, Description, Header, Navbar, Transition } from '@/layout';

export const metadata = { title: 'Home' };

export default function Home() {
  return (
    <Transition>
      <Navbar />
      <Header />
      <main>
        <Description />
        <ReferenceWork home />
      </main>
      <Contact />
    </Transition>
  );
}
