/**
 * Reusable SEO Page Template
 * Dynamically injects:
 * - Service name
 * - Location (Vadodara)
 * - Niche
 * - Keywords
 * - Breadcrumb Schema (JSON-LD)
 * - Local Business Schema (JSON-LD)
 * - FAQ Schema (JSON-LD)
 * - Internal linking
 * 
 * Use this template for any new SEO landing page.
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Star, Check, Phone, Heart, Clock, MapPin, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FFCHeader, FFCFooter } from '@/components/ffc-layout';
import { FFCBookingForm, FFCWhatsAppFloat, FFCBookNowButton } from '@/components/ffc-booking-form';
import SEOInternalLinking from '@/components/seo-internal-linking';
import { siteConfig, packages, formatPrice } from '@/lib/ffc-config';

// ==================== INTERFACES ====================

export interface SEOPageData {
  /** Page slug for URL */
  slug: string;
  /** Service/keyword title */
  title: string;
  /** H1 heading */
  h1: string;
  /** Hero subtitle */
  heroSubtitle: string;
  /** Location name */
  location: string;
  /** Niche/category name */
  niche: string;
  /** Parent service slug (for internal linking) */
  serviceSlug?: string;
  /** Page type */
  pageType: 'keyword' | 'area' | 'service' | 'package';
  /** Target keywords */
  keywords: string[];
  /** Introduction paragraph (300+ words recommended) */
  introduction: string;
  /** Content sections */
  sections: {
    title: string;
    content: string;
    icon?: React.ReactNode;
  }[];
  /** Why Choose Us points */
  whyChooseUs: string[];
  /** Unique features/highlights */
  features: string[];
  /** Process steps */
  process?: { step: string; description: string }[];
  /** FAQs for FAQ schema */
  faqs: { question: string; answer: string }[];
  /** Testimonial */
  testimonial?: { name: string; text: string; rating: number };
  /** Closing CTA text */
  closingText: string;
}

/** Breadcrumb item for JSON-LD */
export interface BreadcrumbItem {
  name: string;
  url: string;
}

// ==================== SCHEMA GENERATORS ====================

/** Generate BreadcrumbList JSON-LD */
export function generateBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url,
    })),
  };
}

/** Generate LocalBusiness JSON-LD */
export function generateLocalBusinessJsonLd(serviceName: string, serviceUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": siteConfig.name,
    "description": `${serviceName} in Vadodara at ${siteConfig.name}. Premium romantic celebration venue.`,
    "url": serviceUrl,
    "telephone": siteConfig.phone,
    "email": siteConfig.email,
    "priceRange": "₹4700 - ₹6900",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "424, OneWest, Asopalav W, 4th Floor, Priya Talkies Road",
      "addressLocality": "Vadodara",
      "addressRegion": "Gujarat",
      "postalCode": "391101",
      "addressCountry": "IN",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 22.3072,
      "longitude": 73.1812,
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      "opens": "11:00",
      "closes": "23:00",
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "500",
      "bestRating": "5",
    },
    "areaServed": {
      "@type": "City",
      "name": "Vadodara",
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Celebration Packages",
      "itemListElement": packages.slice(0, 4).map((pkg) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": pkg.name,
          "url": `https://friendsfactorycafe.com/packages/${pkg.slug}`,
        },
        "price": pkg.price.toString(),
        "priceCurrency": "INR",
      })),
    },
  };
}

/** Generate FAQPage JSON-LD */
export function generateFaqJsonLd(faqs: { question: string; answer: string }[]) {
  if (!faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
}

/** Generate combined JSON-LD for a page */
export function generatePageJsonLd(
  data: SEOPageData,
  breadcrumbs: BreadcrumbItem[]
) {
  const baseUrl = "https://friendsfactorycafe.com";
  const pageUrl = `${baseUrl}/${data.slug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      generateLocalBusinessJsonLd(data.title, pageUrl),
      generateBreadcrumbJsonLd(breadcrumbs),
      {
        "@type": "WebPage",
        "name": data.h1,
        "description": data.introduction.substring(0, 160),
        "url": pageUrl,
        "isPartOf": { "@type": "WebSite", "name": siteConfig.name, "url": baseUrl },
        "about": { "@type": "Thing", "name": `${data.title} in ${data.location}` },
        "inLanguage": "en-IN",
        "dateModified": new Date().toISOString().split("T")[0],
      },
      {
        "@type": "Service",
        "name": `${data.title} in ${data.location}`,
        "description": data.introduction.substring(0, 250),
        "url": pageUrl,
        "provider": {
          "@type": "LocalBusiness",
          "name": siteConfig.name,
          "url": baseUrl,
        },
        "areaServed": {
          "@type": "City",
          "name": data.location,
        },
        "offers": {
          "@type": "AggregateOffer",
          "lowPrice": "4700",
          "highPrice": "6900",
          "priceCurrency": "INR",
        },
      },
      ...(data.faqs.length > 0
        ? [generateFaqJsonLd(data.faqs)]
        : []),
    ].filter(Boolean),
  };
}

// ==================== METADATA GENERATOR ====================

/**
 * Generate Next.js Metadata object for any SEO page
 * Use in generateMetadata() function of page.tsx
 */
export function generateSEOMetadata(data: {
  title: string;
  metaTitle: string;
  metaDescription: string;
  slug: string;
  keywords: string[];
  location?: string;
}) {
  const baseUrl = "https://friendsfactorycafe.com";
  const url = `${baseUrl}/${data.slug}`;
  const location = data.location || "Vadodara";

  return {
    title: data.metaTitle,
    description: data.metaDescription,
    keywords: [
      ...data.keywords,
      `${data.title.toLowerCase()} ${location.toLowerCase()}`,
      `friends factory cafe ${data.title.toLowerCase()}`,
      `best ${data.title.toLowerCase()} ${location.toLowerCase()}`,
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      url: url,
      type: "website" as const,
      locale: "en_IN",
      siteName: siteConfig.name,
      images: [
        {
          url: "/og-image.svg",
          width: 1200,
          height: 630,
          alt: `${data.title} - ${siteConfig.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: data.metaTitle,
      description: data.metaDescription,
      images: ["/og-image.svg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large" as const,
        "max-snippet": -1,
      },
    },
  };
}

// ==================== PAGE TEMPLATE COMPONENT ====================

interface SEOPageTemplateProps {
  data: SEOPageData;
  breadcrumbs: BreadcrumbItem[];
  /** Optional additional content between sections */
  children?: React.ReactNode;
}

export default function SEOPageTemplate({ data, breadcrumbs, children }: SEOPageTemplateProps) {
  const relatedPackages = packages.slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      <FFCHeader />

      {/* Breadcrumb Navigation */}
      <div className="bg-amber-50 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm flex-wrap" aria-label="Breadcrumb">
            {breadcrumbs.map((item, index) => (
              <React.Fragment key={item.url}>
                {index > 0 && <ChevronRight className="h-4 w-4 text-gray-400" />}
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-amber-600 font-medium">{item.name}</span>
                ) : (
                  <Link href={item.url} className="text-gray-500 hover:text-amber-600">
                    {item.name}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-600 via-orange-500 to-amber-700 text-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              📍 {data.location} &bull; {data.niche}
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-serif">
              {data.h1}
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {data.heroSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <FFCBookNowButton
                pageTitle={data.title}
                className="bg-white text-amber-600 hover:bg-amber-50 text-lg px-8 py-6"
              />
              <a href={`tel:${siteConfig.phone}`}>
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto">
                  <Phone className="h-5 w-5 mr-2" />
                  {siteConfig.phone}
                </Button>
              </a>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <span className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-sm">
                <Star className="h-4 w-4" /> 4.9★ Rating
              </span>
              <span className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-sm">
                <Check className="h-4 w-4" /> 100% Private
              </span>
              <span className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-sm">
                <Heart className="h-4 w-4" /> Couples Only
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p>{data.introduction}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      {data.sections.map((section, index) => (
        <section
          key={index}
          className={`py-10 md:py-14 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 font-serif">
                {section.title}
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <p>{section.content}</p>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Why Choose Us */}
      {data.whyChooseUs.length > 0 && (
        <section className="py-12 md:py-16 bg-amber-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10 font-serif">
              Why Choose {siteConfig.name} for {data.title}?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {data.whyChooseUs.map((point, index) => (
                <Card key={index} className="border-amber-200">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                        <Check className="h-4 w-4 text-amber-600" />
                      </div>
                      <p className="text-gray-700">{point}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      {data.features.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10 font-serif">
              What Makes Our {data.title} Special
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {data.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200"
                >
                  <Gift className="h-5 w-5 text-amber-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Steps */}
      {data.process && data.process.length > 0 && (
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10 font-serif">
              How to Book Your {data.title}
            </h2>
            <div className="max-w-3xl mx-auto space-y-6">
              {data.process.map((step, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{step.step}</h3>
                    <p className="text-gray-600 mt-1">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Packages CTA */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10 font-serif">
            Our Celebration Packages
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {relatedPackages.map((pkg) => (
              <Link key={pkg.slug} href={`/packages/${pkg.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow border-amber-200">
                  <CardContent className="p-5">
                    <div className="text-2xl mb-2">{pkg.emoji}</div>
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                      {pkg.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                      {pkg.shortDescription}
                    </p>
                    <div className="text-lg font-bold text-amber-600">
                      {formatPrice(pkg.price)}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {data.testimonial && (
        <section className="py-12 md:py-16 bg-amber-50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="flex justify-center mb-4">
                {Array.from({ length: data.testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-amber-500 fill-amber-500" />
                ))}
              </div>
              <blockquote className="text-lg text-gray-700 italic mb-4">
                &ldquo;{data.testimonial.text}&rdquo;
              </blockquote>
              <p className="font-semibold text-gray-900">— {data.testimonial.name}</p>
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {data.faqs.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10 font-serif">
              Frequently Asked Questions about {data.title}
            </h2>
            <div className="max-w-3xl mx-auto">
              <Accordion type="multiple">
                {data.faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left font-medium text-gray-900">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      )}

      {/* Closing CTA */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-amber-600 to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 font-serif">
            Ready to Book Your {data.title}?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            {data.closingText}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <FFCBookNowButton
              pageTitle={data.title}
              className="bg-white text-amber-600 hover:bg-amber-50 text-lg px-8 py-6"
            />
            <a href={`tel:${siteConfig.phone}`}>
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto">
                <Phone className="h-5 w-5 mr-2" />
                Call Now
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Optional additional content */}
      {children}

      {/* Booking Form */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <FFCBookingForm pageTitle={data.title} />
          </div>
        </div>
      </section>

      {/* Automatic Internal Linking */}
      <SEOInternalLinking
        currentSlug={data.slug}
        serviceSlug={data.serviceSlug}
        pageType={data.pageType}
      />

      <FFCFooter />
      <FFCWhatsAppFloat />
    </div>
  );
}
