import type { Metadata, Viewport } from 'next';
import '@fontsource/cherry-bomb-one/400.css';
import '@fontsource/fraunces/900.css';
import '@fontsource/yellowtail/400.css';
import '@fontsource/metal-mania/400.css';
import '@fontsource/permanent-marker/400.css';
import '@fontsource/instrument-sans/400.css';
import '@fontsource/instrument-sans/600.css';
import '@fontsource/dm-mono/500.css';
import './globals.css';
import './parts.css';
import { Providers } from '@/lib/state';
import { Header, NavPill } from '@/components/chrome';
import Footer from '@/components/Footer';
import BoxDrawer from '@/components/BoxDrawer';
import CrumbRain from '@/components/CrumbRain';
import { BASE } from '@/lib/data';

export const metadata: Metadata = {
  metadataBase: new URL('https://thepeerscollective.github.io'),
  title: { default: 'heavy cream · bakery & coffee, dalston', template: '%s · heavy cream' },
  description: 'pink outside, loud inside. croissants, cakes you write on yourself and coffee that spells your name wrong. 12 kingsland road, london e8.',
  icons: { icon: `${BASE}/favicon.svg` },
  openGraph: { title: 'heavy cream · bakery & coffee', description: 'pink outside, loud inside. dalston, london.', images: [`${BASE}/og.jpg`] },
};
export const viewport: Viewport = { themeColor: '#ffdce6', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="open" suppressHydrationWarning>
      <body>
        <Providers>
          <a className="skip" href="#main">skip to content</a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <NavPill />
          <BoxDrawer />
          <CrumbRain />
        </Providers>
      </body>
    </html>
  );
}
