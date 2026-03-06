'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  Star, 
  Heart,
  ChevronLeft,
  ChevronRight,
  Check,
  Gift,
  Sparkles,
  Calendar,
  Users,
  Camera,
  Cake,
  Music,
  Utensils,
  Shield,
  Award,
  ArrowRight
} from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { packages, siteConfig, menuItems } from '@/lib/ffc-config';
import { galleryItems } from '@/components/ffc-gallery';
import { FFCBookingForm } from '@/components/ffc-booking-form';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// Service categories for header
const services = [
  { name: "Birthday Surprise", emoji: "🎂", slug: "birthday-surprise" },
  { name: "Anniversary", emoji: "💑", slug: "anniversary-celebration" },
  { name: "Proposal", emoji: "💍", slug: "proposal" },
  { name: "Candlelight Dinner", emoji: "🕯️", slug: "candlelight-dinner" },
  { name: "Surprise Date", emoji: "💕", slug: "surprise-date" },
  { name: "Pre-Wedding", emoji: "📸", slug: "pre-wedding-shoot" },
  { name: "Baby Moments", emoji: "👶", slug: "baby-moments" },
];

// Format price helper
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

// WhatsApp booking link generator
const getWhatsAppLink = (packageName?: string) => {
  const message = packageName 
    ? `Hi! I'm interested in booking the "${packageName}" package at Friends Factory Cafe. Please share the availability.`
    : `Hi! I'm interested in booking a celebration at Friends Factory Cafe. Please share the available packages and slots.`;
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
};

// Testimonials data
const testimonials = [
  {
    name: "Priya & Rahul",
    event: "Anniversary Celebration",
    rating: 5,
    text: "The rooftop setup was absolutely magical! Our 5th anniversary was made special beyond words. The staff was so helpful and the ambiance was perfect.",
    image: "/images/gallery/anniversary-celebration-vadodara-1.webp"
  },
  {
    name: "Sneha M.",
    event: "Birthday Surprise",
    rating: 5,
    text: "Surprised my husband with the Forever Us package. He was speechless! The decorations, food, and the entire experience was worth every penny.",
    image: "/images/gallery/birthday-surprise-decoration-vadodara-1.webp"
  },
  {
    name: "Karan & Mira",
    event: "Proposal",
    rating: 5,
    text: "She said YES! The Glass House setup was so romantic. Friends Factory made my proposal absolutely perfect. Highly recommend!",
    image: "/images/gallery/proposal-setup-vadodara-1.webp"
  },
  {
    name: "Ananya P.",
    event: "Candlelight Dinner",
    rating: 5,
    text: "Best date night ever! The candlelight dinner with city views was incredible. The food was delicious and the music was perfect.",
    image: "/images/gallery/candlelight-dinner-setup-vadodara-1.webp"
  }
];

// FAQs
const faqs = [
  {
    question: "How do I book a package?",
    answer: "Simply click the 'Book on WhatsApp' button for your preferred package. Our team will confirm availability, take your details, and guide you through the booking process. A 50% advance payment secures your slot."
  },
  {
    question: "What's included in the packages?",
    answer: "All packages include 3 hours of private celebration time, welcome drink, decorations, ambient music, and delicious snacks. Packages marked with 'Cake Included' come with a complimentary celebration cake. Others have cake available at ₹500 extra."
  },
  {
    question: "Can I customize the decorations?",
    answer: "Yes! We offer customization for decorations, themes, and even personal banners. Let our team know your requirements while booking and we'll make it happen."
  },
  {
    question: "What are your operating hours?",
    answer: "We operate from 11 AM to 11 PM daily. Evening slots (6 PM - 9 PM) are most popular for romantic celebrations. We recommend booking 2-3 days in advance for preferred timing."
  },
  {
    question: "Is parking available?",
    answer: "Yes, free parking is available at OneWest building where we're located. The venue is easily accessible from all areas of Vadodara."
  },
  {
    question: "Can I bring my own cake?",
    answer: "Yes, you can bring your own cake without any extra charges. However, we recommend our in-house celebration cakes which are specially curated for the experience."
  },
  {
    question: "What's your cancellation policy?",
    answer: "Cancellations made 48 hours before the booking get a full refund. Within 24-48 hours, 50% is refunded. Last-minute cancellations within 24 hours are non-refundable but can be rescheduled subject to availability."
  },
  {
    question: "Is photography allowed?",
    answer: "Absolutely! All our setups are designed to be Instagram-worthy. You're welcome to take photos and videos. We can also arrange professional photography at additional cost."
  }
];

// Gallery Slider Component
function GallerySlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', slidesToScroll: 1 }
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi]);

  // Auto-slide effect
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 3500);
    return () => clearInterval(interval);
  }, [emblaApi]);

  const imageItems = galleryItems.filter(item => item.type === 'image').slice(0, 16);

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
        <div className="flex">
          {imageItems.map((item, index) => (
            <div 
              key={index} 
              className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 px-2"
            >
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden group">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white font-medium text-sm">{item.title}</p>
                  {item.subtitle && <p className="text-white/70 text-xs">{item.subtitle}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation Buttons */}
      <button
        onClick={scrollPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 text-purple-600" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 text-purple-600" />
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              selectedIndex % 6 === index 
                ? 'bg-purple-600 w-6' 
                : 'bg-purple-300'
            }`}
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// Hero Background - Animated celebration icons
function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-pink-50" />
      
      {/* Floating celebration icons */}
      <div className="absolute inset-0">
        {/* Hearts */}
        <Heart className="absolute top-[10%] left-[5%] w-8 h-8 text-purple-200 animate-float-slow" />
        <Heart className="absolute top-[20%] right-[10%] w-12 h-12 text-pink-200 animate-float-medium fill-pink-100" />
        <Heart className="absolute bottom-[30%] left-[15%] w-6 h-6 text-purple-300 animate-float-fast fill-purple-100" />
        <Heart className="absolute top-[60%] right-[5%] w-10 h-10 text-purple-200 animate-float-slow fill-purple-50" />
        <Heart className="absolute bottom-[15%] right-[20%] w-7 h-7 text-pink-300 animate-float-medium" />
        
        {/* Stars/Sparkles */}
        <Sparkles className="absolute top-[15%] left-[20%] w-6 h-6 text-yellow-300 animate-twinkle" />
        <Sparkles className="absolute top-[40%] right-[15%] w-8 h-8 text-yellow-200 animate-twinkle delay-300" />
        <Sparkles className="absolute bottom-[25%] left-[8%] w-5 h-5 text-yellow-400 animate-twinkle delay-500" />
        <Star className="absolute top-[5%] right-[25%] w-5 h-5 text-purple-300 fill-purple-100 animate-float-fast" />
        <Star className="absolute bottom-[40%] right-[8%] w-6 h-6 text-yellow-300 fill-yellow-100 animate-twinkle delay-700" />
        
        {/* Celebration icons */}
        <Gift className="absolute top-[35%] left-[3%] w-10 h-10 text-purple-200 animate-float-medium" />
        <Cake className="absolute bottom-[20%] left-[25%] w-8 h-8 text-pink-200 animate-float-slow" />
        <Music className="absolute top-[8%] left-[40%] w-6 h-6 text-purple-300 animate-float-fast" />
        <Camera className="absolute bottom-[35%] right-[25%] w-7 h-7 text-purple-200 animate-float-medium" />
        
        {/* More hearts scattered */}
        <Heart className="absolute top-[45%] left-[30%] w-4 h-4 text-pink-200 animate-float-fast fill-pink-50" />
        <Heart className="absolute top-[70%] left-[45%] w-5 h-5 text-purple-200 animate-float-slow" />
        <Heart className="absolute top-[25%] left-[55%] w-6 h-6 text-pink-300 animate-float-medium fill-pink-100" />
        <Heart className="absolute bottom-[10%] left-[60%] w-8 h-8 text-purple-200 animate-float-fast" />
        <Heart className="absolute top-[55%] right-[30%] w-5 h-5 text-pink-200 animate-float-slow fill-pink-50" />
      </div>
    </div>
  );
}

// Package Image Slider Component with Lightbox
function PackageImageSlider({ images, name }: { images: string[]; name: string }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  // Lightbox navigation
  const goToPrevImage = useCallback(() => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goToNextImage = useCallback(() => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxOpen) {
        if (e.key === 'ArrowLeft') goToPrevImage();
        if (e.key === 'ArrowRight') goToNextImage();
        if (e.key === 'Escape') setLightboxOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, goToPrevImage, goToNextImage]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [lightboxOpen]);

  return (
    <>
      <div className="relative group">
        {/* Main Image Container */}
        <div className="rounded-2xl overflow-hidden shadow-xl border border-purple-100">
          <div className="overflow-hidden bg-gray-100 cursor-pointer w-full" ref={emblaRef} onClick={() => setLightboxOpen(true)}>
            <div className="flex w-full">
              {images.map((img, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0 w-full">
                  <div className="relative aspect-[4/5] w-full">
                    <Image
                      src={img}
                      alt={`${name} - Image ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={index === 0}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Zoom Indicator */}
        <div className="absolute top-3 right-3 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity z-10">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </div>

        {/* Image Counter Badge */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1.5 rounded-full text-sm font-medium z-10">
          {selectedIndex + 1} / {images.length}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={(e) => { e.stopPropagation(); scrollPrev(); }}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all z-10"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5 text-gray-800" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); scrollNext(); }}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all z-10"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5 text-gray-800" />
        </button>
      </div>

      {/* Thumbnail Strip */}
      <div className="flex gap-2 mt-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`relative flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden transition-all ${
              selectedIndex === index 
                ? 'ring-2 ring-purple-500 ring-offset-1 opacity-100' 
                : 'opacity-50 hover:opacity-90'
            }`}
          >
            <Image src={img} alt="" fill className="object-cover" sizes="64px" />
          </button>
        ))}
      </div>

      {/* Fullscreen Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close Button */}
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 z-[110] w-12 h-12 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center transition-colors"
            aria-label="Close gallery"
          >
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[110] bg-white/20 text-white px-4 py-1.5 rounded-full text-sm font-medium">
            {selectedIndex + 1} / {images.length}
          </div>

          {/* Lightbox Image */}
          <div
            className="relative w-full h-full flex items-center justify-center p-4 md:p-12"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full max-w-5xl max-h-[85vh]">
              <Image
                src={images[selectedIndex]}
                alt={`${name} - Full view ${selectedIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                quality={90}
                priority
              />
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); goToPrevImage(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-[110] w-12 h-12 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-7 h-7 text-white" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goToNextImage(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-[110] w-12 h-12 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-7 h-7 text-white" />
          </button>

          {/* Lightbox Thumbnail Strip */}
          <div className="absolute bottom-4 left-0 right-0 z-[110]">
            <div className="flex gap-2 overflow-x-auto justify-center px-4 pb-1" style={{ scrollbarWidth: 'none' }}>
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={(e) => { e.stopPropagation(); setSelectedIndex(index); }}
                  className={`flex-shrink-0 w-14 h-10 rounded-md overflow-hidden relative transition-all ${
                    selectedIndex === index
                      ? 'ring-2 ring-purple-400 ring-offset-1 ring-offset-black opacity-100'
                      : 'opacity-40 hover:opacity-70'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Package Showcase - One by One with Image Slider
function PackageShowcase({ pkg, index }: { pkg: typeof packages[0]; index: number }) {
  const [showBookingPopup, setShowBookingPopup] = useState(false);
  const isPopular = index === 0 || index === 2;
  const isBestValue = index === 4 || index === 7;
  const isEven = index % 2 === 0;

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (showBookingPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showBookingPopup]);

  return (
    <>
    <div className="relative group">
      {/* Background Glow Effect */}
      <div className="absolute -inset-1 bg-purple-500 rounded-[2rem] blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
      
      <div className={`relative bg-white rounded-[1.75rem] shadow-2xl overflow-hidden border-2 ${
        isPopular ? 'border-purple-300' : 'border-white/50'
      }`}>
        {/* Top Gradient Bar */}
        <div className="h-2 bg-purple-600" />
        
        <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
          {/* Image Slider - Left/Right alternating */}
          <div className="lg:w-1/2 p-5 md:p-8">
            <PackageImageSlider images={pkg.images} name={pkg.name} />
          </div>

          {/* Package Info - Right/Left alternating */}
          <div className="lg:w-1/2 p-6 md:p-10 flex flex-col justify-center bg-purple-50/50">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-5">
              {isPopular && (
                <Badge className="bg-orange-500 text-white border-0 shadow-lg shadow-orange-300 px-4 py-1.5 text-sm animate-pulse">
                  <Star className="w-4 h-4 mr-1.5 fill-white" /> Most Popular
                </Badge>
              )}
              {isBestValue && !isPopular && (
                <Badge className="bg-purple-500 text-white border-0 shadow-lg shadow-purple-300 px-4 py-1.5 text-sm">
                  <Gift className="w-4 h-4 mr-1.5" /> Best Value
              </Badge>
            )}
            {pkg.cakeIncluded && (
              <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-purple-300 px-4 py-1.5 text-sm shadow-sm">
                <Cake className="w-4 h-4 mr-1.5" /> Free Cake Included
              </Badge>
            )}
          </div>

          {/* Package Number & Emoji */}
          <div className="flex items-center gap-3 mb-3">
            <span className="text-sm font-bold text-purple-600">Setup {index + 1}</span>
            <span className="text-3xl drop-shadow-sm">{pkg.emoji}</span>
          </div>

          {/* Title */}
          <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">{pkg.name}</h3>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-5">
            <span className="text-5xl font-black text-purple-600">{formatPrice(pkg.price)}</span>
            <span className="text-gray-500 font-medium">for 3 hours</span>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-lg leading-relaxed mb-7">{pkg.shortDescription}</p>

          {/* Features Grid - Enhanced */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-7">
            {pkg.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-purple-50 p-3 rounded-xl border border-purple-100">
                <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0 shadow-md">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm text-gray-700 font-medium">{feature.replace(/[✨🍰🥂🎈💡🕯️🌆🎶🌙🤍🌸💞]/g, '').trim()}</span>
              </div>
            ))}
          </div>

          {/* Perfect For - Enhanced */}
          <div className="mb-8">
            <p className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">Perfect For:</p>
            <div className="flex flex-wrap gap-2">
              {pkg.perfectFor.map((tag, idx) => (
                <span key={idx} className="text-sm font-medium px-4 py-2 rounded-full bg-purple-100 text-purple-700 border border-purple-300 shadow-sm hover:bg-purple-200 hover:shadow-md transition-all cursor-default">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Buttons - Enhanced */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={() => setShowBookingPopup(true)}
              size="lg"
              className="flex-1 bg-gradient-to-r from-green-500 to-green-800 hover:from-green-600 hover:to-green-900 text-white shadow-xl shadow-green-700/50 text-lg py-7 rounded-2xl font-bold transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-green-800/40 animate-[pulse_2s_ease-in-out_infinite]"
            >
              <Calendar className="w-6 h-6 mr-2 animate-bounce" />
              Lock Your Date
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className={`border-2 border-purple-300 text-purple-700 hover:bg-purple-50 rounded-2xl font-semibold py-7`}
            >
              <Link href={`/packages/${pkg.slug}`}>
                View Details <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
    </div>

    {/* Booking Popup */}
    {showBookingPopup && (
      <div 
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={() => setShowBookingPopup(false)}
      >
        <div 
          className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Popup Header */}
          <div className="sticky top-0 bg-purple-600 px-6 py-4 rounded-t-3xl z-10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-bold text-lg">Book {pkg.name}</h3>
                <p className="text-white/80 text-sm">{formatPrice(pkg.price)} for 3 hours</p>
              </div>
              <button
                onClick={() => setShowBookingPopup(false)}
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Booking Form */}
          <div className="p-6">
            <FFCBookingForm variant="sidebar" pageTitle={`Book Now - ${pkg.name}`} />
          </div>
        </div>
      </div>
    )}
    </>
  );
}

// Testimonial Card - Enhanced
function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-purple-400 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity" />
      <div className="relative bg-white rounded-2xl p-7 shadow-xl border border-purple-100">
        <div className="flex items-center gap-4 mb-5">
          <div className="relative w-16 h-16 rounded-full overflow-hidden ring-3 ring-purple-200 ring-offset-2 shadow-lg">
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
            <p className="text-sm font-medium text-purple-600">{testimonial.event}</p>
          </div>
        </div>
        <div className="flex gap-1 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-purple-500 text-purple-500 drop-shadow-sm" />
          ))}
        </div>
        <p className="text-gray-700 leading-relaxed italic">&ldquo;{testimonial.text}&rdquo;</p>
      </div>
    </div>
  );
}

// Main Landing Page Component
export function BookNowLandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header with Company Name */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-purple-100 shadow-sm">
        <div className="container mx-auto px-4 relative">
          <div className="flex items-center justify-between py-2.5">
            {/* Logo / Brand Name */}
            <a href="/" className="flex items-center gap-2">
              <span className="text-xl md:text-2xl font-black bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Friends Factory Cafe
              </span>
            </a>
            
            {/* Quick CTA for mobile */}
            <div className="flex items-center gap-2">
              <a 
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold bg-purple-100 text-purple-700 hover:bg-purple-200 transition-all"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">Call</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section - Enhanced */}
      <section className="relative pt-20 pb-16 md:pt-24 md:pb-20 overflow-hidden">
        {/* White Background with Low Opacity Hero Image */}
        <div className="absolute inset-0 bg-white" />
        <HeroBackground />
        
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            {/* Trust Badge - Enhanced with Animation */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="relative">
                {/* Animated glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-purple-500 to-pink-500 rounded-full blur-md opacity-75 animate-pulse" />
                <div className="relative bg-white px-6 py-3 rounded-full shadow-xl border-2 border-purple-200 flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="font-black text-purple-700 text-sm md:text-base">
                    Rated <span className="text-yellow-600">4.9/5</span> by <span className="text-purple-600">1500+</span> Happy Couples
                  </span>
                  <span className="animate-bounce">💜</span>
                </div>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              <span className="text-gray-900">Create </span>
              <span className="text-purple-600">Unforgettable</span>
              <br />
              <span className="text-gray-900">Memories</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl leading-relaxed">
              Premium romantic celebrations in Vadodara&apos;s most beautiful rooftop & glass house venues. 
              <span className="font-bold text-purple-600"> 8 stunning packages</span> starting from just <span className="font-bold text-gray-900">₹4,700</span>
            </p>

            {/* Desktop CTA */}
            <div className="hidden md:flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Button 
                asChild
                size="lg"
                className="text-lg bg-green-500 hover:bg-green-600 text-white shadow-xl shadow-green-300/50 px-10 py-7 rounded-2xl font-bold transition-all hover:scale-105"
              >
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-6 h-6 mr-2" />
                  Book on WhatsApp
                </a>
              </Button>
              <Button 
                asChild
                size="lg"
                className="text-lg bg-purple-600 hover:bg-purple-700 text-white shadow-xl shadow-purple-300/50 px-10 py-7 rounded-2xl font-bold transition-all hover:scale-105"
              >
                <a href={`tel:${siteConfig.phone}`}>
                  <Phone className="w-6 h-6 mr-2" />
                  Call Us
                </a>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="hidden md:flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-purple-100">
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium text-gray-700">100% Safe Booking</span>
              </div>
              <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-purple-100">
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium text-gray-700">Flexible Rescheduling</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar - Enhanced */}
      <section className="py-5 bg-purple-600 relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 text-white">
            <div className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <span className="font-black text-2xl">2000+</span>
                <p className="text-white/80 text-sm">Happy Celebrations</p>
              </div>
            </div>
            <div className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform">
                <Star className="w-6 h-6 fill-white" />
              </div>
              <div>
                <span className="font-black text-2xl">4.9</span>
                <p className="text-white/80 text-sm">Average Rating</p>
              </div>
            </div>
            <div className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform">
                <Heart className="w-6 h-6 fill-white" />
              </div>
              <div>
                <span className="font-black text-2xl">50+</span>
                <p className="text-white/80 text-sm">Proposals Said YES!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section - Enhanced */}
      <section className="py-20 md:py-32 bg-white" id="packages">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-purple-100 text-purple-800 border-purple-200 px-5 py-2 text-sm shadow-sm">
              <Sparkles className="w-4 h-4 mr-2" /> 8 Premium Packages
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
              <span className="text-gray-900">Choose Your </span>
              <span className="text-purple-600">Perfect</span>
              <span className="text-gray-900"> Celebration</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From rooftop celebrations under the stars to intimate glass house experiences. 
              Every package includes <span className="font-bold text-purple-600">3 hours</span>, decorations, snacks & unforgettable memories.
            </p>
          </div>

          {/* Packages - One by One */}
          <div className="space-y-16">
            {packages.map((pkg, index) => (
              <PackageShowcase key={pkg.id} pkg={pkg} index={index} />
            ))}
          </div>

          {/* Bottom CTA - Enhanced */}
          <div className="text-center mt-16 bg-purple-50 rounded-3xl p-10 shadow-inner border border-purple-100">
            <p className="text-xl text-gray-700 mb-6 font-medium">Not sure which package to choose?</p>
            <Button 
              asChild
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white shadow-xl px-10 py-7 rounded-2xl font-bold text-lg"
            >
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-6 h-6 mr-2" />
                Chat with us for recommendations
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Section - Enhanced */}
      <section className="py-20 bg-purple-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-200/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <Badge className="mb-6 bg-purple-100 text-purple-800 border-purple-200 px-5 py-2 text-sm shadow-sm">
              <Camera className="w-4 h-4 mr-2" /> Real Celebrations
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              <span className="text-gray-900">See The </span>
              <span className="text-purple-600">Magic</span>
              <span className="text-gray-900"> Yourself</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Swipe through real photos from actual celebrations. These memories were created right here at Friends Factory.
            </p>
          </div>

          <GallerySlider />
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-6 bg-purple-100 text-purple-800 border-purple-200 px-5 py-2 text-sm shadow-sm">
              <Gift className="w-4 h-4 mr-2" /> Everything Included
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              <span className="text-gray-900">What </span>
              <span className="text-purple-600">You Get</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { icon: Clock, label: "3 Hours Private Time" },
              { icon: Sparkles, label: "Premium Decorations" },
              { icon: Utensils, label: "Delicious Snacks" },
              { icon: Music, label: "Romantic Music" },
              { icon: Camera, label: "Photo-Ready Setup" },
              { icon: Heart, label: "Personalized Touch" },
            ].map((item, idx) => (
              <div key={idx} className="text-center group">
                <div className="w-20 h-20 mx-auto rounded-3xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300" style={{ backgroundColor: '#7c3aed' }}>
                  <item.icon className="w-9 h-9" style={{ color: '#ffffff' }} />
                </div>
                <p className="text-sm font-bold text-gray-800">{item.label}</p>
              </div>
            ))}
          </div>

          {/* Menu Preview - Enhanced */}
          <div className="mt-16 relative">
            <div className="relative bg-purple-50 rounded-3xl p-10 text-center border border-purple-200 shadow-xl">
              <h3 className="text-2xl font-black text-purple-700 mb-8">Delicious Menu Included</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {menuItems.starters.map((item, idx) => (
                  <span key={idx} className="bg-white px-5 py-3 rounded-full shadow-md text-sm font-medium hover:scale-105 transition-transform cursor-default border border-purple-100">
                    <span className="text-xl mr-1">{item.emoji}</span> {item.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Enhanced */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-purple-100 rounded-full blur-3xl -translate-x-1/2" />
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-purple-100 rounded-full blur-3xl translate-x-1/2" />
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-14">
            <Badge className="mb-6 bg-purple-100 text-purple-800 border-purple-200 px-5 py-2 text-sm shadow-sm">
              <Star className="w-4 h-4 mr-2 fill-purple-500" /> Loved by Couples
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              <span className="text-gray-900">What Our </span>
              <span className="text-purple-600">Guests Say</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, idx) => (
              <TestimonialCard key={idx} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Enhanced */}
      <section className="py-16 md:py-24 bg-purple-50 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-200/50 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-100 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 max-w-3xl relative">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-purple-100 text-purple-800 border-purple-200 px-5 py-2 shadow-sm">
              <Sparkles className="w-4 h-4 mr-1.5" /> Common Questions
            </Badge>
            <h2 className="text-3xl md:text-5xl font-black mb-4">
              <span className="text-gray-900">Frequently Asked </span>
              <span className="text-purple-600">Questions</span>
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, idx) => (
              <AccordionItem 
                key={idx} 
                value={`faq-${idx}`}
                className="bg-white rounded-2xl border border-purple-100 px-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-purple-200"
              >
                <AccordionTrigger className="text-left font-bold text-gray-900 hover:text-purple-600 py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Location Section - Enhanced */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-purple-100 text-purple-800 border-purple-200 px-5 py-2 shadow-sm">
              <MapPin className="w-4 h-4 mr-1.5" /> Easy to Reach
            </Badge>
            <h2 className="text-3xl md:text-5xl font-black mb-4">
              <span className="text-gray-900">Visit </span>
              <span className="text-purple-600">Our Location</span>
            </h2>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-purple-100">
              <div className="aspect-video bg-purple-50 flex items-center justify-center">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.9544766449!2d73.16!3d22.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sOneWest%2C%20Gotri%2C%20Vadodara!5e0!3m2!1sen!2sin!4v1000000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
              <div className="p-6 md:p-8 bg-purple-50">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="font-black text-xl text-purple-700">{siteConfig.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{siteConfig.address}</p>
                  </div>
                  <div className="flex gap-3">
                    <Button asChild className="bg-purple-600 hover:bg-purple-700 shadow-lg">
                      <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(siteConfig.address)}`} target="_blank" rel="noopener noreferrer">
                        <MapPin className="w-4 h-4 mr-2" />
                        Get Directions
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-purple-600 relative overflow-hidden">
        <div className="absolute top-1/4 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-56 h-56 bg-white/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur mb-6">
              <Heart className="w-10 h-10 text-white fill-white/50" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6">
              Ready to Create Magic?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Your perfect romantic celebration is just one message away. 
              Book now and let us make your special moment truly unforgettable.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                asChild
                size="lg"
                className="text-lg bg-green-500 text-white hover:bg-green-600 shadow-2xl shadow-green-900/30 px-10 py-7 rounded-2xl font-bold transition-all hover:scale-105"
              >
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-6 h-6 mr-2" />
                  Book on WhatsApp
                </a>
              </Button>
              <Button 
                asChild
                size="lg"
                variant="outline"
                className="text-lg border-2 border-white text-white hover:bg-white/10 px-10 py-7 rounded-2xl font-bold backdrop-blur"
              >
                <a href={`tel:${siteConfig.phone}`}>
                  <Phone className="w-6 h-6 mr-2" />
                  {siteConfig.phone}
                </a>
              </Button>
            </div>

            <p className="mt-8 text-white/70 text-sm flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" />
              Open daily 11 AM - 11 PM | Response within 5 minutes
            </p>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group"
        aria-label="Book on WhatsApp"
      >
        <div className="absolute -inset-1 bg-green-400 rounded-full blur-md opacity-70 group-hover:opacity-100 animate-pulse" />
        <div className="relative w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110">
          <MessageCircle className="w-8 h-8 text-white" />
        </div>
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-gray-800 px-4 py-2.5 rounded-xl shadow-xl text-sm font-bold opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap border border-green-200">
          <span className="text-green-600">Book Now!</span>
        </span>
      </a>
    </div>
  );
}
