import { Metadata } from 'next';
import { BookNowLandingPage } from '@/components/book-now-landing-page';
import { siteConfig } from '@/lib/ffc-config';

export const metadata: Metadata = {
  title: `Book Now - All Packages | ${siteConfig.name}`,
  description: `Book your romantic celebration at ${siteConfig.name}. Choose from 8 premium packages starting at ₹4,700. Rooftop & Glass House setups for birthdays, anniversaries, proposals & candlelight dinners in Vadodara.`,
  keywords: [
    'book romantic dinner vadodara',
    'book birthday surprise vadodara',
    'book anniversary celebration vadodara',
    'book candlelight dinner vadodara',
    'book proposal setup vadodara',
    'friends factory cafe booking',
    'romantic venue booking vadodara'
  ],
  openGraph: {
    title: `Book Now - Premium Celebration Packages | ${siteConfig.name}`,
    description: `Choose from 8 premium celebration packages. Rooftop & Glass House setups starting at ₹4,700. Book your unforgettable experience today!`,
    url: `${siteConfig.website}/book-now`,
    siteName: siteConfig.name,
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Book Your Celebration | ${siteConfig.name}`,
    description: `8 Premium Packages from ₹4,700. Rooftop & Glass House celebrations in Vadodara.`,
  },
};

export default function BookNowPage() {
  return <BookNowLandingPage />;
}
