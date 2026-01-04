import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Nesture Interiors - Best Interior Designer in Bangalore | Transform Your Space",
  description:
    "Nesture Interiors - Where innovation meets elegance. Expert residential & commercial interior design in Bangalore, Karnataka. Beautiful interiors yet affordable. Free consultation & 3D visualization. Call +91 861 808 0171",
  keywords:
    "interior design Bangalore, home interior design, office interior design, commercial interiors, space planning, interior decorator Bangalore, home renovation Bangalore, luxury interiors, modern design, interior styling, furniture design, kitchen design, bedroom interior, living room design, interior design services, best interior designer Bangalore, Nesture Interiors",
  authors: [{ name: "Nesture Interiors Bangalore" }],
  creator: "Nesture Interiors",
  publisher: "Nesture Interiors",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  metadataBase: new URL("https://nestureinteriors.com"),
  alternates: {
    canonical: "https://nestureinteriors.com",
  },
  openGraph: {
    title: "Nesture Interiors - Best Interior Designer in Bangalore",
    description:
      "Transform your space with Nesture Interiors - Where innovation meets elegance. Residential & commercial interior design in Bangalore with expert craftsmanship.",
    url: "https://nestureinteriors.com",
    siteName: "Nesture Interiors",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://nestureinteriors.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nesture Interiors - Premium Interior Design in Bangalore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nesture Interiors - Best Interior Designer in Bangalore",
    description: "Expert interior design for homes, offices & commercial spaces. Where innovation meets elegance. Transform your space today!",
    images: ["https://nestureinteriors.com/og-image.jpg"],
    creator: "@nestureinteriors",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  verification: {
    google: "google-site-verification-code",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://nestureinteriors.com/#organization",
        name: "Nesture Interiors",
        image: "https://nestureinteriors.com/logo.png",
        description: "Where innovation meets elegance - Expert residential & commercial interior design services in Bangalore, Karnataka",
        url: "https://nestureinteriors.com",
        telephone: "+918618080171",
        email: "nestureinterior@gmail.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Nesture Interiors",
          addressLocality: "Bangalore",
          addressRegion: "KA",
          postalCode: "560001",
          addressCountry: "IN",
        },
        sameAs: [],
        priceRange: "$$$",
        serviceArea: {
          "@type": "City",
          name: "Bangalore",
        },
        areaServed: ["Koramangala", "Indiranagar", "Whitefield", "HSR Layout", "Jayanagar", "JP Nagar", "Marathahalli", "Electronic City"],
      },
      {
        "@type": "Organization",
        "@id": "https://nestureinteriors.com/#organization",
        name: "Nesture Interiors",
        url: "https://nestureinteriors.com",
        logo: "https://nestureinteriors.com/logo.png",
        foundingDate: "2024",
        founders: [{ "@type": "Person", name: "Nesture Interiors Team" }],
        knowsAbout: [
          "Interior Design",
          "Home Design",
          "Office Interior Design",
          "Commercial Interior Design",
          "Space Planning",
          "Furniture Design",
        ],
      },
      {
        "@type": "Service",
        "@id": "https://nestureinteriors.com/#service-residential",
        name: "Residential Interior Design",
        description: "Professional residential interior design services including space planning, 3D visualization, and complete project management",
        provider: {
          "@id": "https://nestureinteriors.com/#organization",
        },
        areaServed: "Bangalore",
        priceRange: "$$$",
      },
      {
        "@type": "Service",
        "@id": "https://nestureinteriors.com/#service-commercial",
        name: "Commercial Interior Design",
        description: "Expert commercial and office interior design with brand integration and complete installation supervision",
        provider: {
          "@id": "https://nestureinteriors.com/#organization",
        },
        areaServed: "Bangalore",
        priceRange: "$$$$",
      },
      {
        "@type": "AggregateRating",
        "@id": "https://nestureinteriors.com/#rating",
        ratingValue: "4.9",
        ratingCount: "150",
        bestRating: "5",
        worstRating: "1",
      },
    ],
  }

  return (
    <html lang="en" className={`${playfairDisplay.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
