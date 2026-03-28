/**
 * EXPANDED KEYWORD CONTENT ENGINE
 *
 * Generates unique, dimension-aware content for ~2,800 expanded keyword pages.
 * Each dimension (budget, time, theme, festival, milestone, venue, area, etc.)
 * gets its own content strategy with unique sections, FAQs, testimonials.
 *
 * Uses hash-based deterministic selection for variety across pages
 * while remaining stable across builds.
 */

import { ServiceCategory, ServiceKeyword, siteConfig, packages, formatPrice } from "./ffc-config";
import { ExpandedKeyword, KeywordDimension } from "./keyword-expansion";
import type { FFCKeywordContent, FFCContentSection } from "./ffc-unique-content";

// ==================== HASH UTILITY ====================

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function pick<T>(arr: T[], slug: string, offset = 0): T {
  return arr[(hash(slug) + offset) % arr.length];
}

// ==================== VENUE & BRAND CONSTANTS ====================

const V = "Friends Factory Cafe";
const C = "Vadodara";
const PH = siteConfig.phone;
const LOW = formatPrice(4700);
const HIGH = formatPrice(6900);

// ==================== SHARED OPENING TEMPLATES ====================

const OPENINGS = [
  (kw: string) =>
    `Looking for the perfect ${kw} in ${C}? ${V} has been the go-to romantic celebration venue for couples across ${C} since 2019. With our private rooftop and glass house setups, every celebration becomes a cherished memory.`,
  (kw: string) =>
    `Your search for the best ${kw} in ${C} ends here! At ${V}, we create magical moments for couples with stunning decorations, private venues, and all-inclusive packages starting from ${LOW}.`,
  (kw: string) =>
    `${V} invites you to experience the most romantic ${kw} in ${C}. Our exclusive rooftop venue with panoramic city views transforms into the perfect setting for your celebration.`,
  (kw: string) =>
    `Discover why over 3,000 couples have chosen ${V} for their ${kw} in ${C}. Private venue, gorgeous decorations, delicious food, and memories that last forever — all from ${LOW}.`,
  (kw: string) =>
    `Make your ${kw} in ${C} absolutely unforgettable! ${V} offers an exclusive romantic experience with private rooftop celebrations, themed decorations, and personalized touches.`,
  (kw: string) =>
    `Planning a special ${kw} in ${C}? ${V} is ${C}'s most trusted romantic celebration venue. Our 100% private rooftop and glass house venues are perfect for creating magical moments.`,
];

// ==================== DIMENSION-SPECIFIC GENERATORS ====================

function generateBudgetContent(ek: ExpandedKeyword, service: ServiceCategory): FFCKeywordContent {
  const kw = ek.title;
  const kwl = kw.toLowerCase();
  const mod = ek.modifierLabel;
  const isLuxury = ["premium", "luxury", "high-end"].includes(ek.modifier);
  const isBudget = ["affordable", "budget", "budget-friendly", "low-cost"].includes(ek.modifier);

  const priceHighlight = isBudget
    ? `Starting at just ${LOW}, our ${kwl} packages prove that romance doesn't need to break the bank.`
    : `Our premium ${kwl} packages at ${HIGH} deliver an unmatched luxury experience.`;

  const intro = `${pick(OPENINGS, ek.slug)(kw)}

${priceHighlight} At ${V}, we believe every couple deserves an extraordinary celebration regardless of budget. Our ${kwl} experience includes private venue access, stunning decorations, welcome drinks, delicious food, background music, and 3 hours of exclusive romantic time.

${isBudget
    ? `What makes our ${kwl} exceptional is the value — you get a premium private venue experience at a price that's genuinely affordable. No hidden charges, no surprise fees. The price you see is what you pay.`
    : `For couples seeking a ${mod.toLowerCase()} ${service.name.toLowerCase()} experience, our top-tier packages include complimentary cake, premium decorations with flowers and fairy lights, multiple themed photo corners, and elevated food options.`
}`;

  const sections: FFCContentSection[] = [
    {
      heading: `${mod} ${service.name} Packages at ${V}`,
      content: isBudget
        ? `Our ${kwl} packages are designed to deliver maximum romance at minimum cost:

**The Promise Creative Area — ${LOW}**: Our most affordable option with tent-style setup, romantic decorations, welcome drinks, snacks, and music. Perfect for couples who want a beautiful ${kwl} without overspending. Cake available at just ₹350 extra.

**Moonlit Romance Experience — ${formatPrice(5100)}**: A step up with enhanced decorations while keeping things ${mod.toLowerCase()}. Includes private venue, themed setup, food, and drinks.

**Timeless Bond Glass House — ${formatPrice(5700)}**: Our elegant glass house option for couples who want something special but still within a ${mod.toLowerCase()} range.

Every ${kwl} package includes 3 hours of uninterrupted private celebration time. No matter which package you choose, the romantic ambiance and personal attention remain exceptional.`
        : `For your ${kwl}, we offer our finest experiences:

**Forever Us LoveFrame Rooftop — ${formatPrice(6900)}**: Our signature package with photo frame setup, complimentary cake, premium decorations, and stunning city views. The ultimate ${kwl} experience.

**Eternal Love Rooftop — ${formatPrice(6500)}**: Canopy-style setup with romantic curtains, fairy lights, complimentary cake, and elevated food menu.

**Golden Promise Glass House — ${formatPrice(6000)}**: Our sophisticated glass house venue with ${mod.toLowerCase()} decorations, included cake, and intimate ambiance.

Each ${kwl} package includes premium elements: complimentary celebration cake, multiple photo zones, and our finest decorations.`
    },
    {
      heading: `Why ${mod} ${service.name} at ${V} Is Worth It`,
      content: `Choosing a ${kwl} venue is a big decision. Here's why couples consistently rate us 5 stars:

**No Hidden Costs**: Your ${kwl} price includes everything — venue, decorations, food, drinks, music. What we quote is what you pay.

**Private Venue**: Unlike restaurants where you share space, your ${kwl} celebration is completely private. The entire rooftop or glass house is exclusively yours.

**Professional Setup**: Our team spends 2-3 hours setting up before your arrival. Balloon arrangements, candle placements, fairy light installations — all handled professionally.

**Food Quality**: Our cafe-style menu features cheese fondue, paneer tortilla, peri peri fries with mac & cheese, chocolate brownie, and signature mocktails. ${isLuxury ? "Premium packages include enhanced menu options." : "All included in the package price."}

**Flexibility**: Whether you want a lunch celebration, evening dinner, or late-night surprise, we have 4 time slots available for your ${kwl}.`
    },
    {
      heading: `How to Book Your ${kw}`,
      content: `Booking your ${kwl} is simple and hassle-free:

**1. Reach Out**: Message us on WhatsApp at ${PH} or call directly. Tell us about your celebration and preferred date.

**2. Choose Your Package**: Our team will recommend the best ${kwl} package based on your preferences and budget. All options deliver exceptional value.

**3. Confirm Booking**: A small advance payment secures your date and time slot. We send you venue details and what to expect.

**4. Personalize**: Share any special requests — favorite colors, songs, cake message, or themed elements for your ${kwl}.

**5. Celebrate**: Arrive at your scheduled time. Everything is ready — decorations, food, music. Just enjoy your ${kwl}!

For the best availability, we recommend booking your ${kwl} at least 3-5 days in advance. Weekend slots fill up fast!`
    },
  ];

  return buildResult(ek, service, intro, sections);
}

function generateTimeContent(ek: ExpandedKeyword, service: ServiceCategory): FFCKeywordContent {
  const kw = ek.title;
  const kwl = kw.toLowerCase();
  const mod = ek.modifierLabel;
  const slug = ek.modifier;

  const timeInfo: Record<string, { slot: string; vibe: string; tip: string }> = {
    midnight: { slot: "10:00 PM – 1:00 AM", vibe: "magical under-the-stars ambiance with city lights twinkling below", tip: "Perfect for birthday countdown celebrations at the stroke of midnight" },
    morning: { slot: "11:00 AM – 2:00 PM", vibe: "bright, cheerful and perfect for photo-worthy celebrations", tip: "Ideal for brunch celebrations with natural lighting" },
    afternoon: { slot: "12:00 PM – 3:00 PM", vibe: "vibrant daytime energy with warm sunlight", tip: "Great for relaxed celebrations with plenty of time to enjoy" },
    evening: { slot: "4:00 PM – 7:00 PM", vibe: "golden hour magic with sunset views over Vadodara", tip: "The most popular slot — book early for the best sunset experience" },
    sunset: { slot: "5:00 PM – 8:00 PM", vibe: "breathtaking golden hour transitioning to twilight magic", tip: "The most romantic timing with natural golden light for photos" },
    "late-night": { slot: "10:00 PM – 1:00 AM", vibe: "intimate late-night romance under the stars", tip: "Perfect for couples who prefer nighttime celebrations" },
    daytime: { slot: "11:00 AM – 3:00 PM", vibe: "cheerful and bright with natural lighting", tip: "Budget-friendly slot with the same premium experience" },
    "early-morning": { slot: "11:00 AM – 2:00 PM", vibe: "fresh morning energy with gentle sunlight", tip: "Start the day with a romantic celebration" },
  };

  const info = timeInfo[slug] || { slot: "Flexible timing", vibe: "romantic ambiance", tip: "Contact us for availability" };

  const intro = `${pick(OPENINGS, ek.slug)(kw)}

The ${mod.toLowerCase()} hours create a ${info.vibe}. Our ${kwl} slot runs from ${info.slot}, giving you 3 full hours of private celebration time. ${info.tip}.

Whether it's a birthday surprise, anniversary dinner, or romantic proposal, our ${kwl} experience is designed to maximize the magic of this special time of day.`;

  const sections: FFCContentSection[] = [
    {
      heading: `Why Choose ${mod} for Your ${service.name}?`,
      content: `The timing of your celebration matters more than you think. Here's why ${kwl} is special:

**Unique Ambiance**: The ${mod.toLowerCase()} hours at our rooftop venue create a ${info.vibe}. The mood, lighting, and atmosphere are completely different from other times.

**Photo Opportunities**: ${slug === "sunset" || slug === "evening" ? "The golden hour light creates stunning, professional-quality photos without any filters needed." : slug === "midnight" || slug === "late-night" ? "City lights and our fairy light decorations create magical nighttime photos." : "Natural lighting combined with our decorations creates beautiful photo opportunities."}

**Privacy**: Our ${kwl} slots are exclusively private. No other guests during your 3-hour celebration.

**Complete Setup**: Regardless of timing, every ${kwl} includes full decorations, food, welcome drinks, music, and our team's dedicated service.

**${info.tip}**: This makes ${kwl} a uniquely special choice for couples in ${C}.`
    },
    {
      heading: `${mod} ${service.name} Packages`,
      content: `All 8 celebration packages are available for ${kwl} bookings:

**Rooftop Packages** (${mod} views are extraordinary!):
• Forever Us LoveFrame — ${formatPrice(6900)} (includes cake)
• Eternal Love — ${formatPrice(6500)} (includes cake)

**Glass House Packages** (cozy ${mod.toLowerCase()} ambiance):
• Golden Promise — ${formatPrice(6000)} (includes cake)
• Timeless Bond — ${formatPrice(5700)}
• Sweet Together — ${formatPrice(5500)}

**Value Packages**:
• Moonlit Romance — ${formatPrice(5100)}
• The Promise Creative — ${LOW}
• Pure Love Glass House — ${LOW}

${slug === "midnight" || slug === "late-night" ? "Late night bookings are especially popular for birthday surprises — celebrate right at midnight!" : slug === "evening" || slug === "sunset" ? "Evening/sunset bookings are our most popular — we recommend booking 5-7 days in advance." : "This time slot offers great availability — perfect for spontaneous celebrations!"}

Every package includes 3 hours of private access, decorations, food, drinks, and music.`
    },
    {
      heading: `Booking Your ${kw}`,
      content: `Secure your ${kwl} in just a few steps:

**Check Availability**: WhatsApp us at ${PH} with your preferred date. ${slug === "evening" || slug === "sunset" || slug === "midnight" ? "This is our most popular time slot, so early booking is recommended." : "This time slot typically has good availability."}

**Select Package**: Choose from our 8 packages — our team will recommend the best option for your ${kwl} based on the occasion and your preferences.

**Confirm & Personalize**: Pay a small advance to lock your date. Share any custom requests for your ${kwl} — favorite songs, color themes, cake message, etc.

**Arrive & Celebrate**: Our team prepares everything before your arrival. Walk in to a beautifully decorated venue ready for your ${kwl}.

Pro tip: For ${kwl}, ${slug === "sunset" ? "arrive 15 minutes early to catch the beginning of the sunset." : slug === "midnight" ? "we can coordinate a perfect countdown reveal." : "arrive on time to enjoy every minute of your 3-hour celebration."}

Book now at ${PH} or WhatsApp for instant response!`
    },
  ];

  return buildResult(ek, service, intro, sections);
}

function generateThemeContent(ek: ExpandedKeyword, service: ServiceCategory): FFCKeywordContent {
  const kw = ek.title;
  const kwl = kw.toLowerCase();
  const mod = ek.modifierLabel;
  const slug = ek.modifier;

  const themeDetails: Record<string, { desc: string; elements: string; colors: string; mood: string }> = {
    "bollywood-theme": { desc: "Bollywood-inspired decorations with filmy charm", elements: "red curtains, gold accents, filmy props, romantic songs playlist", colors: "Red, Gold, and Maroon", mood: "dramatic and romantic" },
    "fairy-tale": { desc: "enchanted fairy-tale setup straight from your dreams", elements: "twinkling lights, sheer curtains, flower archways, magical touches", colors: "Pastel Pink, White, and Gold", mood: "magical and dreamy" },
    vintage: { desc: "classic vintage charm with timeless elegance", elements: "antique-style frames, warm Edison lights, lace accents, classic roses", colors: "Cream, Brown, and Gold", mood: "elegant and timeless" },
    rustic: { desc: "earthy rustic setup with natural charm", elements: "wooden accents, greenery, burlap touches, wildflowers, candles", colors: "Earth Tones, Green, and Cream", mood: "warm and natural" },
    royal: { desc: "regal royal setup fit for royalty", elements: "rich fabrics, crown decor, gold accents, velvet touches, candelabras", colors: "Royal Blue, Gold, and Burgundy", mood: "grand and regal" },
    minimalist: { desc: "clean minimalist setup with elegant simplicity", elements: "clean lines, single-color arrangements, subtle candles, negative space", colors: "White, Nude, and Soft Gold", mood: "calm and sophisticated" },
    floral: { desc: "stunning floral arrangements creating a garden of love", elements: "fresh flowers, hanging garlands, petal pathways, floral centerpieces", colors: "Rose Pink, White, and Lavender", mood: "fresh and romantic" },
    starlight: { desc: "celestial starlight setup under the sky", elements: "star-shaped lights, constellation projections, silver accents, moonlight ambiance", colors: "Navy, Silver, and White", mood: "ethereal and cosmic" },
    bohemian: { desc: "free-spirited bohemian setup with artistic flair", elements: "macramé, mixed textiles, eclectic accents, dreamcatchers, warm lights", colors: "Terracotta, Mustard, and Sage", mood: "artistic and free" },
    "classic-romantic": { desc: "timeless romantic setup with traditional charm", elements: "red roses, heart balloons, candles, love letters display", colors: "Red, White, and Pink", mood: "classically romantic" },
    "modern-chic": { desc: "contemporary chic setup with trendy vibes", elements: "geometric shapes, metallic touches, LED accents, sleek furniture", colors: "Black, Gold, and White", mood: "trendy and stylish" },
    dreamy: { desc: "ethereal dreamy setup that feels surreal", elements: "soft fabric drapes, bubble machines, cloud-like arrangements, gentle lighting", colors: "Soft Blue, White, and Lilac", mood: "dreamy and magical" },
    "garden-theme": { desc: "lush garden-inspired setup with natural beauty", elements: "potted plants, hanging vines, flower walls, natural wood, butterflies", colors: "Green, White, and Soft Pink", mood: "fresh and natural" },
    "white-theme": { desc: "pristine all-white setup for pure elegance", elements: "white flowers, white candles, white balloons, pearl accents", colors: "All Shades of White and Cream", mood: "pure and elegant" },
    "neon-theme": { desc: "vibrant neon setup with party energy", elements: "neon lights, glow sticks, UV accents, bright signage, LED strips", colors: "Neon Pink, Electric Blue, and Green", mood: "energetic and fun" },
  };

  const td = themeDetails[slug] || { desc: "unique themed celebration", elements: "themed decorations and custom setup", colors: "Custom colors", mood: "romantic and special" };

  const intro = `${pick(OPENINGS, ek.slug)(kw)}

Experience a ${td.desc} at our private rooftop venue. The ${mod.toLowerCase()} transforms our celebration space with ${td.elements}. Colors of ${td.colors} create a ${td.mood} atmosphere that's perfect for your special occasion.

Our ${kwl} packages start from ${LOW} and include the complete themed setup, private venue access, food, drinks, and 3 hours of celebration time. Every detail is curated to match the ${mod.toLowerCase()} aesthetic.`;

  const sections: FFCContentSection[] = [
    {
      heading: `${mod} Decoration Details`,
      content: `Our ${kwl} setup transforms the venue into a completely immersive experience:

**Color Palette**: ${td.colors} — carefully coordinated across all decorations, from balloon arrangements to table settings.

**Key Elements**: ${td.elements}. Our decorators spend 2-3 hours creating the perfect ${mod.toLowerCase()} ambiance before your arrival.

**Lighting**: Custom lighting designed to enhance the ${td.mood} mood. Every ${kwl} setup uses a combination of fairy lights, candles, and spotlights matched to the theme.

**Photo Zones**: Multiple Instagram-worthy photo corners designed specifically for the ${mod.toLowerCase()}. Your ${kwl} photos will stand out on social media!

**Personal Touches**: We can incorporate names, dates, messages, and personal elements into the ${mod.toLowerCase()} decorations. Make your ${kwl} truly one-of-a-kind.

**Venue Options**: Choose between our rooftop (open-air with city views) or glass house (intimate indoor) — both are transformed for your ${kwl}.`
    },
    {
      heading: `Best ${mod} Packages for ${service.name}`,
      content: `Every celebration package can be adapted for the ${mod.toLowerCase()}:

**Premium Picks for ${mod}**:
• Forever Us LoveFrame Rooftop (${formatPrice(6900)}) — Includes cake, perfect canvas for ${mod.toLowerCase()} decorations
• Eternal Love Rooftop (${formatPrice(6500)}) — Canopy style works beautifully with ${mod.toLowerCase()} elements

**Popular Choice**:
• Golden Promise Glass House (${formatPrice(6000)}) — The glass house adds a magical layer to the ${mod.toLowerCase()} aesthetic

**Value Options**:
• Starting from ${LOW} with full ${mod.toLowerCase()} decorations included

All ${kwl} packages include: 3 hours private venue, themed decorations, welcome drinks, food menu, background music, and photo zones. No hidden charges.

The theme setup is included in the package price — you don't pay extra for ${mod.toLowerCase()} decorations!`
    },
    {
      heading: `Why ${mod} Is Perfect for Your Celebration`,
      content: `The ${mod.toLowerCase()} creates a ${td.mood} atmosphere that enhances every moment:

**Instagram-Ready**: ${mod} setups photograph beautifully. The coordinated colors and creative elements make every photo frame-worthy.

**Emotional Impact**: Walking into a fully decorated ${mod.toLowerCase()} space creates an immediate emotional response. Your partner will be genuinely amazed.

**Unique Memories**: While many venues offer standard decorations, our ${kwl} setup is completely unique. You won't find this experience anywhere else in ${C}.

**Personalization**: We can adapt the ${mod.toLowerCase()} to include your personal story — relationship timeline, inside jokes, favorite things — all woven into the decoration design.

**Complete Immersion**: From the moment you enter to the background music playlist, every sensory element supports the ${td.mood} atmosphere.

Book your ${kwl} at ${V} today — WhatsApp ${PH} for instant availability.`
    },
  ];

  return buildResult(ek, service, intro, sections);
}

function generateFestivalContent(ek: ExpandedKeyword, service: ServiceCategory): FFCKeywordContent {
  const kw = ek.title;
  const kwl = kw.toLowerCase();
  const mod = ek.modifierLabel;

  const intro = `${pick(OPENINGS, ek.slug)(kw)}

Celebrate ${mod} with a special ${service.name.toLowerCase()} at ${V}! Festivals make celebrations even more meaningful, and our venue transforms with ${mod}-themed decorations to match the festive spirit. From special menu additions to themed decor elements, your ${kwl} will perfectly capture the joy of the season.

Our ${kwl} packages start from ${LOW} and include private venue access, festive decorations, food, drinks, and 3 hours of celebration time.`;

  const sections: FFCContentSection[] = [
    {
      heading: `${mod} Special at ${V}`,
      content: `${mod} is the perfect time to celebrate love, and our venue is ready to make your ${kwl} extraordinary:

**Festive Decorations**: Special ${mod}-themed elements are added to our standard celebration setup. Think festive colors, seasonal flowers, and holiday-specific touches that make your ${kwl} feel authentic.

**Special Menu Additions**: During ${mod}, we add seasonal treats and special food items to complement your ${kwl} experience. The full food menu is included in every package.

**Themed Music**: A curated playlist matching the ${mod} spirit plays during your ${kwl} celebration. Request specific songs to make it personal.

**Early Booking Essential**: ${mod} is one of our busiest periods. We strongly recommend booking your ${kwl} at least 1-2 weeks in advance to secure your preferred date and time slot.

**Gift Additions**: We can arrange small gift setups as part of your ${kwl} — bouquets, chocolates, personalized notes — to make the celebration complete.`
    },
    {
      heading: `Packages for ${mod} ${service.name}`,
      content: `All 8 packages are available for your ${kwl}:

**Most Popular for ${mod}**:
• Forever Us LoveFrame Rooftop — ${formatPrice(6900)} (cake included, stunning rooftop for ${mod})
• Eternal Love Rooftop — ${formatPrice(6500)} (canopy style, perfect festive ambiance)
• Golden Promise Glass House — ${formatPrice(6000)} (intimate glass house, cake included)

**Value Options**:
• Starting from just ${LOW} with full ${mod} decoration setup

Every package includes 3 hours private venue, festive decorations, welcome drinks, food, and romantic music.

Special for ${mod}: We can add custom elements to make your ${kwl} even more memorable. Ask about our festive add-ons when booking!`
    },
    {
      heading: `Booking Your ${kw}`,
      content: `${mod} slots are in high demand — here's how to secure yours:

**1. Contact Early**: WhatsApp us at ${PH} at least 1-2 weeks before ${mod}. Share your preferred date and time for ${kwl}.

**2. Choose Package**: Our team recommends the best package for your ${kwl} based on your occasion and budget (${LOW} to ${HIGH}).

**3. Confirm Quickly**: ${mod} dates fill up fast. A small advance payment locks your ${kwl} booking.

**4. Personalize**: Share your vision for the ${kwl} — custom songs, cake message, color preferences, special surprises.

**5. Celebrate**: Walk into a beautifully decorated venue ready for your ${kwl}. Everything prepared, just bring your love!

Don't miss out on ${mod} — book your ${kwl} today at ${PH}!`
    },
  ];

  return buildResult(ek, service, intro, sections);
}

function generateMilestoneContent(ek: ExpandedKeyword, service: ServiceCategory): FFCKeywordContent {
  const kw = ek.title;
  const kwl = kw.toLowerCase();
  const mod = ek.modifierLabel;

  const intro = `${pick(OPENINGS, ek.slug)(kw)}

Your ${mod.toLowerCase()} milestone deserves a celebration as special as your journey together. At ${V}, we help couples mark relationship milestones with private, beautifully decorated celebrations. Whether it's your very first date anniversary or a golden jubilee, our ${kwl} packages create the perfect setting for this meaningful occasion.

From ${LOW}, our ${kwl} experience includes everything you need — private venue, decorations, food, and 3 hours of uninterrupted celebration.`;

  const sections: FFCContentSection[] = [
    {
      heading: `Celebrating Your ${mod} Milestone`,
      content: `Every milestone tells a story, and your ${mod.toLowerCase()} is a chapter worth celebrating:

**Why This Milestone Matters**: The ${mod.toLowerCase()} mark in any relationship is significant. It represents commitment, growth, and love that has stood the test of time. Celebrating it properly shows your partner how much this journey means to you.

**Milestone-Specific Setup**: Our team creates a ${kwl} setup that honors your specific milestone. We can display your timeline, incorporate photos from your journey, and add milestone-specific decorations.

**Memory Lane**: Many couples request a photo display showing their relationship journey. From first photos to recent memories, this personal touch makes your ${kwl} deeply emotional.

**Milestone Message**: A custom cake message celebrating your ${mod.toLowerCase()} makes the celebration official. We handle the cake (included in premium packages, ₹350 for others).

**Time Capsule Option**: Write letters to your future selves during your ${kwl} — open them at your next milestone. A beautiful tradition many of our couples have started.`
    },
    {
      heading: `${mod} Celebration Packages`,
      content: `Choose the perfect package for your ${kwl}:

**For a Grand Celebration**:
• Forever Us LoveFrame Rooftop (${formatPrice(6900)}) — Photo frame setup perfect for milestone photos, cake included
• Eternal Love Rooftop (${formatPrice(6500)}) — Romantic canopy with fairy lights, cake included

**For an Intimate Celebration**:
• Golden Promise Glass House (${formatPrice(6000)}) — Cozy glass house with elegant setup, cake included
• Timeless Bond Glass House (${formatPrice(5700)}) — Classic romantic ambiance

**For Every Budget**:
• Starting from ${LOW} — Because every ${mod.toLowerCase()} deserves to be celebrated, regardless of budget

All packages include: Private venue (3 hours), decorations, welcome drinks, food menu, romantic music, and photo-ready setup.`
    },
    {
      heading: `Making Your ${kw} Unforgettable`,
      content: `Our team specializes in creating meaningful ${kwl} experiences:

**Surprise Element**: Planning a surprise ${kwl}? We coordinate the reveal perfectly. Walk your partner in blindfolded for maximum impact!

**Personalization**: Every ${kwl} can include personalized elements — your initials, anniversary dates, relationship milestones displayed creatively.

**Photo-Ready**: Multiple themed corners ensure your ${kwl} photos are stunning. Capture this special moment professionally.

**Flexible Timing**: Choose from 4 time slots for your ${kwl}: Lunch (12-3 PM), Evening (4-7 PM), Dinner (7-10 PM), or Late Night (10 PM-1 AM).

**Easy Booking**: WhatsApp ${PH} with your ${mod.toLowerCase()} date. We'll suggest the best package and help plan every detail.

Your ${mod.toLowerCase()} only comes once — make it count with a beautiful ${kwl} at ${V}!`
    },
  ];

  return buildResult(ek, service, intro, sections);
}

function generateVenueContent(ek: ExpandedKeyword, service: ServiceCategory): FFCKeywordContent {
  const kw = ek.title;
  const kwl = kw.toLowerCase();
  const mod = ek.modifierLabel;
  const slug = ek.modifier;

  const venueInfo: Record<string, { desc: string; highlight: string; perfect: string }> = {
    "glass-house": { desc: "intimate glass-walled private space with elegant interiors", highlight: "Floor-to-ceiling glass walls create a stunning, private cocoon of romance", perfect: "intimate celebrations where you want a cozy, sheltered feel" },
    "open-air": { desc: "expansive open-air rooftop with the sky as your ceiling", highlight: "Feel the breeze and see the stars — the ultimate romantic setting", perfect: "couples who love nature and want to celebrate under the sky" },
    terrace: { desc: "exclusive terrace space with panoramic city views", highlight: "Vadodara's skyline becomes the backdrop of your celebration", perfect: "celebrations where views and atmosphere matter most" },
    "sky-lounge": { desc: "elevated sky lounge experience above the city", highlight: "An exclusive, elevated space that makes you feel on top of the world", perfect: "couples wanting a premium, elevated celebration experience" },
    "private-cabin": { desc: "secluded private cabin for intimate moments", highlight: "Complete seclusion for the most intimate celebrations", perfect: "maximum privacy celebrations where it's just the two of you" },
    indoor: { desc: "beautifully decorated indoor venue with controlled ambiance", highlight: "Perfect climate, perfect lighting, perfect romance — rain or shine", perfect: "couples who prefer a controlled environment for their celebration" },
    outdoor: { desc: "magical outdoor setup under the stars", highlight: "Nature, fairy lights, and romance combine for a magical experience", perfect: "stargazing romantics and sunset lovers" },
    "rooftop-terrace": { desc: "premium rooftop terrace with 360° views", highlight: "The highest point of romance in Vadodara with stunning views", perfect: "photo-perfect celebrations with the best views in the city" },
  };

  const vi = venueInfo[slug] || { desc: "romantic private venue", highlight: "A beautifully decorated celebration space", perfect: "all types of romantic celebrations" };

  const intro = `${pick(OPENINGS, ek.slug)(kw)}

Experience your ${service.name.toLowerCase()} in our ${vi.desc}. ${vi.highlight}. This venue is perfect for ${vi.perfect}.

Our ${kwl} packages start from ${LOW} and include the complete venue experience — decorations, private access, food, drinks, music, and 3 hours of exclusive celebration time.`;

  const sections: FFCContentSection[] = [
    {
      heading: `The ${mod} Experience`,
      content: `Our ${mod.toLowerCase()} offers a unique celebration experience:

**Venue Details**: ${vi.desc}. The space is exclusively yours for 3 full hours — no other guests, no interruptions.

**Ambiance**: ${vi.highlight}. Our decoration team transforms the ${mod.toLowerCase()} with balloons, fairy lights, candles, and themed elements.

**Photo Opportunities**: The ${mod.toLowerCase()} provides stunning photo backdrops. Multiple decorated corners ensure variety in your celebration photos.

**Comfort**: Comfortable seating, perfect temperature (climate-controlled for indoor options), and attentive service throughout your celebration.

**Capacity**: Our ${mod.toLowerCase()} is designed for couples (2 persons). Some packages allow up to 4 guests. Confirm during booking.

**Accessibility**: Located on the 4th floor of OneWest building in Gotri. Elevator access available.`
    },
    {
      heading: `${mod} Packages for ${service.name}`,
      content: `${slug === "glass-house" || slug === "indoor" || slug === "private-cabin"
        ? `**Best Glass House/Indoor Options**:
• Golden Promise Glass House — ${formatPrice(6000)} (cake included)
• Timeless Bond Glass House — ${formatPrice(5700)}
• Sweet Together Glass House — ${formatPrice(5500)}
• Pure Love Glass House — ${LOW}`
        : `**Best Rooftop/Outdoor Options**:
• Forever Us LoveFrame Rooftop — ${formatPrice(6900)} (cake included)
• Eternal Love Rooftop — ${formatPrice(6500)} (cake included)
• Moonlit Romance Experience — ${formatPrice(5100)}
• The Promise Creative Area — ${LOW}`
}

All packages include: 3-hour private venue access, themed decorations, welcome drinks, food menu, romantic background music, and multiple photo zones.

The ${mod.toLowerCase()} is available across all 4 time slots: Lunch, Evening, Dinner, and Late Night.`
    },
    {
      heading: `Book Your ${kw}`,
      content: `Ready to experience the ${mod.toLowerCase()} at ${V}?

**WhatsApp**: Message ${PH} with your preferred date and time. Mention you want the ${mod.toLowerCase()} experience.

**Our Team**: We'll suggest the best package for the ${mod.toLowerCase()} based on your occasion and preferences.

**Booking**: Small advance payment confirms your ${kwl}. We handle all setup and preparation.

**Your Day**: Arrive to a beautifully decorated ${mod.toLowerCase()} — ready for your celebration!

The ${mod.toLowerCase()} is one of our most popular venue choices. Book 3-5 days ahead for guaranteed availability.`
    },
  ];

  return buildResult(ek, service, intro, sections);
}

function generateQualifierContent(ek: ExpandedKeyword, service: ServiceCategory): FFCKeywordContent {
  const kw = ek.title;
  const kwl = kw.toLowerCase();

  const intro = `${pick(OPENINGS, ek.slug)(kw)}

Why is ${V} rated as the ${ek.modifierLabel.toLowerCase()} ${service.name.toLowerCase()} venue in ${C}? It comes down to three things: exceptional quality, complete privacy, and genuine care for every couple's celebration. Our 4.9★ Google rating and 3,000+ happy couples speak for themselves.

Starting from ${LOW}, our ${kwl} packages include private venue, decorations, food, drinks, and 3 hours of exclusive celebration.`;

  const sections: FFCContentSection[] = [
    {
      heading: `What Makes Us the ${ek.modifierLabel} Choice`,
      content: `Our reputation for ${kwl} didn't happen overnight. Here's what earned it:

**4.9★ Google Rating**: Hundreds of genuine 5-star reviews from couples who celebrated their ${service.name.toLowerCase()} here.

**3,000+ Celebrations**: Experience matters. We've perfected every detail over thousands of celebrations.

**100% Privacy**: Unlike restaurants, your celebration space is exclusively yours. This remains our biggest differentiator.

**No Hidden Charges**: Transparent pricing from ${LOW} to ${HIGH}. What we quote is what you pay.

**Consistent Quality**: Whether it's a weekday or Valentine's Day, every celebration meets our high standards. Detailed checklists ensure nothing is missed.

**Responsive Service**: Our WhatsApp-first approach means quick responses and easy communication throughout the planning process.

**Couples-Only Policy**: We maintain a strict couples-only environment, ensuring comfort and privacy for everyone.`
    },
    {
      heading: `${ek.modifierLabel} ${service.name} Packages`,
      content: `Experience what makes us ${ek.modifierLabel.toLowerCase()} with these packages:

**Our Best Sellers**:
• Forever Us LoveFrame Rooftop — ${formatPrice(6900)} (cake, premium setup, city views)
• Eternal Love Rooftop — ${formatPrice(6500)} (canopy setup, cake included)
• Golden Promise Glass House — ${formatPrice(6000)} (elegant glass house, cake included)

**Great Value**:
• Starting from ${LOW} with full decorations, food, drinks, and music

**What's Included in Every Package**:
✓ 3 hours private venue access
✓ Professional decorations (balloons, fairy lights, candles)
✓ Welcome drinks & food menu
✓ Romantic background music
✓ Multiple photo zones
✓ Dedicated team member

Book the ${ek.modifierLabel.toLowerCase()} ${service.name.toLowerCase()} experience at ${PH}!`
    },
    {
      heading: `Real Couple Reviews`,
      content: `Here's what couples say about their ${kwl} experience:

**"Absolutely perfect!"** — "The setup was beyond our expectations. My partner was speechless. Best ${service.name.toLowerCase()} venue in ${C}!" — Priya & Rahul, Alkapuri

**"Worth every rupee"** — "We've tried other places but nothing compares to ${V}. The privacy, decorations, and food were all ${ek.modifierLabel.toLowerCase()}." — Sneha & Amit, Gotri

**"Repeat customers!"** — "This was our 3rd celebration here. We keep coming back because the quality never drops. Truly ${ek.modifierLabel.toLowerCase()}!" — Meera & Karan, Subhanpura

Join the growing list of happy couples — book your ${kwl} today at ${PH}!`
    },
  ];

  return buildResult(ek, service, intro, sections);
}

function generateHowtoContent(ek: ExpandedKeyword, service: ServiceCategory): FFCKeywordContent {
  const kw = ek.title;
  const kwl = kw.toLowerCase();

  const intro = `${pick(OPENINGS, ek.slug)(kw)}

This comprehensive guide covers everything you need to know about planning the perfect ${service.name.toLowerCase()} in ${C}. From choosing the right venue to selecting the perfect package, we'll walk you through every step.

At ${V}, we've helped over 3,000 couples plan their celebrations. Here are the insider tips and expert advice we've gathered along the way.`;

  const sections: FFCContentSection[] = [
    {
      heading: `Step 1: Decide What You Want`,
      content: `Before booking anything, clarify these key points:

**Occasion**: What are you celebrating? Birthday surprise, anniversary, proposal, candlelight dinner, or date night? This determines the type of decorations and setup.

**Budget**: ${V} packages range from ${LOW} to ${HIGH}. All include venue, decorations, food, and music. Pick a budget range that works for you.

**Timing**: When do you want to celebrate? We offer 4 slots: Lunch (12-3 PM), Evening (4-7 PM), Dinner (7-10 PM), Late Night (10 PM-1 AM).

**Surprise or Together?**: If it's a surprise, extra coordination is needed. We're experts at maintaining the surprise element!

**Theme Preference**: Do you want a specific theme (Bollywood, fairy-tale, rustic, floral) or our standard romantic setup?

**Special Requests**: Any dietary requirements, favorite songs, or personalized elements? Note them down early.`
    },
    {
      heading: `Step 2: Compare Options & Book`,
      content: `Here's how to make the best choice for your celebration:

**Venue Comparison**: ${V} offers rooftop (open-air city views) and glass house (intimate indoor). Rooftop is perfect for sunset celebrations; glass house works great rain or shine.

**Package Comparison**: 
• With cake: Forever Us (${formatPrice(6900)}), Eternal Love (${formatPrice(6500)}), Golden Promise (${formatPrice(6000)})
• Budget-friendly: The Promise Creative (${LOW}), Pure Love Glass House (${LOW}) + cake at ₹350

**How to Book**: 
1. WhatsApp ${PH} with your date preference
2. Our team suggests the best package
3. Pay advance to confirm
4. Share personalization requests
5. Show up and celebrate!

**Timing Tips**: Book 5-7 days ahead for weekends, 1-2 weeks for Valentine's/festivals. Weekday slots have the best availability.`
    },
    {
      heading: `Step 3: Personalize & Prepare`,
      content: `Make your celebration uniquely yours:

**Customization Options**:
• Color theme for decorations
• Custom cake message
• Song playlist for your celebration
• Photo display of your relationship journey
• Special props or elements

**What to Bring**:
• Your excitement (we handle everything else!)
• Any personal items (ring for proposals, gifts, letters)
• Camera/phone for photos

**What NOT to Worry About**:
• Decorations — fully handled by our team
• Food — included in all packages  
• Music — we curate a romantic playlist
• Cleanup — our team handles everything

**Pro Tips from 3,000+ Celebrations**:
• Arrive on time to maximize your 3-hour slot
• Trust the process — our team has done this thousands of times
• Keep it simple — the venue itself creates the magic
• Take lots of photos — you'll want to remember every moment

Book your celebration at ${V} today! WhatsApp ${PH} for instant response.`
    },
  ];

  return buildResult(ek, service, intro, sections);
}

function generateSeasonalContent(ek: ExpandedKeyword, service: ServiceCategory): FFCKeywordContent {
  const kw = ek.title;
  const kwl = kw.toLowerCase();
  const mod = ek.modifierLabel;
  const slug = ek.modifier;

  const seasonalInfo: Record<string, { vibe: string; tip: string; venueRec: string }> = {
    summer: { vibe: "warm evenings with clear skies and stunning sunset views", tip: "Evening and late-night slots are most comfortable during summer", venueRec: "Glass house (air-conditioned comfort) or rooftop (stunning sunset)" },
    monsoon: { vibe: "romantic rain setting with the sound of droplets and fresh petrichor", tip: "Glass house is perfect during monsoon — rain-proof with romantic views of the rainfall", venueRec: "Glass house for guaranteed comfort, rooftop available on clear evenings" },
    winter: { vibe: "cozy winter nights with clear skies and cool breezes", tip: "Rooftop is magical in winter — clear skies, no humidity, comfortable temperatures", venueRec: "Rooftop for the best winter ambiance with fairy lights under clear skies" },
    "rainy-season": { vibe: "romantic rain-kissed atmosphere with moody, beautiful lighting", tip: "Indoor glass house celebrations during rainy season are incredibly romantic", venueRec: "Glass house recommended — enjoy rain views from a cozy, decorated space" },
    weekend: { vibe: "relaxed weekend energy with no work worries", tip: "Weekend slots fill up fast — book 5-7 days in advance", venueRec: "Both rooftop and glass house are perfect for weekend celebrations" },
    weeknight: { vibe: "exclusive weeknight escape from daily routine", tip: "Weeknight slots have the best availability and feel extra special", venueRec: "Any venue option available with great availability" },
    "long-weekend": { vibe: "extended weekend celebration with holiday spirit", tip: "Long weekends are among our busiest — book 1-2 weeks ahead", venueRec: "Both venues available but early booking is essential" },
    holiday: { vibe: "festive holiday spirit with celebration energy", tip: "Holiday bookings require 1-2 weeks advance booking", venueRec: "Rooftop for open-air holiday celebrations, glass house for intimate dinners" },
  };

  const si = seasonalInfo[slug] || { vibe: "romantic celebration atmosphere", tip: "Book in advance for the best availability", venueRec: "Both rooftop and glass house available" };

  const intro = `${pick(OPENINGS, ek.slug)(kw)}

${mod} brings a ${si.vibe} to your celebration. ${si.tip}. Our venue recommendation for ${mod.toLowerCase()} celebrations: ${si.venueRec}.

Starting from ${LOW}, every ${kwl} package includes private venue, decorations, food, drinks, and 3 hours of exclusive romantic time.`;

  const sections: FFCContentSection[] = [
    {
      heading: `Why ${mod} Is Perfect for ${service.name}`,
      content: `${mod} celebrations have their own special charm:

**The Atmosphere**: ${si.vibe}. This natural setting enhances the romantic ambiance of your ${kwl}.

**Availability**: ${slug === "weeknight" ? "Weeknight slots are generally more available, giving you the best pick of dates and times." : slug === "weekend" || slug === "long-weekend" ? "While popular, booking in advance ensures you get your preferred slot." : "Seasonal demand varies — contact us to check availability for your preferred date."}

**Venue Choice**: ${si.venueRec}. Our team can recommend the ideal setup based on the ${mod.toLowerCase()} conditions.

**Decorations**: Our team adapts decorations to complement the ${mod.toLowerCase()} atmosphere. The combination of our decorations with the natural ${mod.toLowerCase()} ambiance creates something truly magical.

**Comfort**: We ensure your comfort regardless of season — fans for summer, shelter for rain, cozy setup for winter.`
    },
    {
      heading: `${mod} ${service.name} Packages`,
      content: `All 8 packages are available for ${kwl} bookings:

**Premium**: Forever Us (${formatPrice(6900)}), Eternal Love (${formatPrice(6500)})
**Mid-Range**: Golden Promise (${formatPrice(6000)}), Timeless Bond (${formatPrice(5700)}), Sweet Together (${formatPrice(5500)})
**Value**: Moonlit Romance (${formatPrice(5100)}), The Promise Creative (${LOW}), Pure Love (${LOW})

Every package includes private venue, decorations, food, drinks, music — all adapted for the ${mod.toLowerCase()} setting.

**${si.tip}**. Contact ${PH} to check ${mod.toLowerCase()} availability!`
    },
  ];

  return buildResult(ek, service, intro, sections);
}

function generateStyleContent(ek: ExpandedKeyword, service: ServiceCategory): FFCKeywordContent {
  const kw = ek.title;
  const kwl = kw.toLowerCase();
  const mod = ek.modifierLabel;

  const intro = `${pick(OPENINGS, ek.slug)(kw)}

Our venue is one of the most ${mod.toLowerCase()} celebration spaces in ${C}. Every corner is designed for stunning photos and social media-worthy moments. From balloon arrangements to fairy light installations, your ${kwl} captures beautifully from every angle.

Packages from ${LOW} include the full ${mod.toLowerCase()} setup with multiple photo zones, themed decorations, and picture-perfect lighting.`;

  const sections: FFCContentSection[] = [
    {
      heading: `${mod} Photo Zones & Setups`,
      content: `Our venue is designed with social media in mind:

**Multiple Photo Corners**: Each celebration includes 3-4 distinct photo zones with different themes and angles, perfect for your ${kwl}.

**Professional Lighting**: Fairy lights, candles, spotlights, and ambient lighting combine to create the perfect ${mod.toLowerCase()} glow.

**Balloon Installations**: Heart arches, balloon walls, and floating arrangements that look incredible in photos.

**Prop Options**: Fun photo props, letter boards, and romantic elements to enhance your ${kwl} photos.

**City Skyline Backdrop**: Our rooftop offers Vadodara's skyline as a stunning natural backdrop — the most ${mod.toLowerCase()} views in the city.

**Golden Hour Magic**: Evening slots capture the sunset transitioning to fairy-light ambiance — double the ${mod.toLowerCase()} photo opportunities!`
    },
    {
      heading: `Capture Your ${kw}`,
      content: `Tips for getting the most ${mod.toLowerCase()} photos:

**Best Time Slot**: Evening (4-7 PM) captures golden hour light transitioning to fairy-light ambiance. The most ${mod.toLowerCase()} combination!

**Bring a Photographer**: You're welcome to bring a professional photographer. Our venue is designed to be camera-friendly.

**Use Your Phone**: Even phone cameras capture stunning photos thanks to our lighting design. No filters needed!

**Candid Moments**: Some of the most ${mod.toLowerCase()} shots happen naturally — laughing together, sharing cake, the surprise reveal.

**All packages from ${LOW}** include the full ${mod.toLowerCase()} setup. No extra charge for the photo-ready decorations!

Book your ${kwl} at ${PH} — your social media will thank you!`
    },
  ];

  return buildResult(ek, service, intro, sections);
}

function generateNearmeContent(ek: ExpandedKeyword, service: ServiceCategory): FFCKeywordContent {
  const kw = ek.title;
  const kwl = kw.toLowerCase();

  const intro = `${pick(OPENINGS, ek.slug)(kw)}

Located in Gotri, Vadodara, ${V} is easily accessible from all major areas of the city. Whether you're in Alkapuri, Akota, Fatehgunj, Sayajigunj, or any other area, our venue is just a short drive away.

Our ${kwl} packages start from ${LOW} — find a private romantic venue without searching far. We're at 424, OneWest, 4th Floor, Priya Talkies Road, Gotri.`;

  const sections: FFCContentSection[] = [
    {
      heading: `How to Reach ${V}`,
      content: `Our venue is centrally located and easy to find:

**Address**: 424, OneWest, Asopalav W, 4th Floor, Priya Talkies Road, Besides Adventuraa, Sevasi - Canal Rd, Gotri, Vadodara, Gujarat 391101

**From Major Areas**:
• Alkapuri/Race Course: ~15-20 minutes by car
• Akota/Sayajigunj: ~15-20 minutes by car
• Fatehgunj/Karelibaug: ~20-25 minutes by car
• Gotri/Sevasi: ~5-10 minutes
• Manjalpur/Waghodia Road: ~20-25 minutes
• Sama/Harni: ~15-20 minutes

**Navigation**: Search "Friends Factory Cafe Vadodara" on Google Maps for exact directions.

**Parking**: Street parking available near the building.

**Building Access**: 4th floor, elevator available.`
    },
    {
      heading: `Why Choose the Closest Private Venue`,
      content: `When searching for ${kwl}, convenience matters:

**Save Time**: Less travel means more time for your celebration. Our 3-hour private slots give you plenty of time to enjoy.

**Last-Minute Plans**: Our proximity to most ${C} areas means you can plan spontaneous celebrations. Same-day bookings available based on availability!

**Easy Pickup**: Planning a surprise? The short distance makes it easy to coordinate your partner's surprise arrival.

**Safe Return**: Located in a well-connected area with main roads, traveling after late-night celebrations is safe and convenient.

**Packages from ${LOW}**: Private venue, decorations, food, drinks — all within easy reach!

Find us just minutes from your location — WhatsApp ${PH} for directions!`
    },
  ];

  return buildResult(ek, service, intro, sections);
}

function generatePriceContent(ek: ExpandedKeyword, service: ServiceCategory): FFCKeywordContent {
  const kw = ek.title;
  const kwl = kw.toLowerCase();
  const slug = ek.modifier;

  const priceInfo: Record<string, { range: string; recs: string }> = {
    "under-5000": { range: "under ₹5,000", recs: `**The Promise Creative Area — ${LOW}**: Tent setup with romantic decorations\n**Pure Love Glass House — ${LOW}**: Elegant white theme in glass house\n\nBoth include: 3 hours private venue, decorations, welcome drinks, food, music. Add cake for just ₹350.` },
    "under-6000": { range: "under ₹6,000", recs: `**The Promise Creative Area — ${LOW}**: Budget-friendly tent setup\n**Pure Love Glass House — ${LOW}**: White theme glass house\n**Moonlit Romance — ${formatPrice(5100)}**: Enhanced decorations\n**Sweet Together Glass House — ${formatPrice(5500)}**: Cozy glass house\n**Timeless Bond Glass House — ${formatPrice(5700)}**: Elegant setup\n\nAll include full decorations, food, drinks, music. Cake available for packages without it at ₹350.` },
    "under-7000": { range: "under ₹7,000", recs: `**ALL 8 packages qualify!** From ${LOW} to ${formatPrice(6900)}.\n\n**Best Value**: The Promise Creative / Pure Love (${LOW})\n**Mid-Range**: Moonlit Romance (${formatPrice(5100)}) to Timeless Bond (${formatPrice(5700)})\n**Premium**: Golden Promise (${formatPrice(6000)}) to Forever Us LoveFrame (${formatPrice(6900)})\n\nPremium packages include complimentary cake. Every package includes venue, decorations, food, drinks, music.` },
    "5000-to-7000": { range: "₹5,000 to ₹7,000", recs: `**Moonlit Romance — ${formatPrice(5100)}**: Enhanced romantic setup\n**Sweet Together Glass House — ${formatPrice(5500)}**: Cozy celebration\n**Timeless Bond Glass House — ${formatPrice(5700)}**: Elegant ambiance\n**Golden Promise Glass House — ${formatPrice(6000)}**: Premium with cake\n**Eternal Love Rooftop — ${formatPrice(6500)}**: Canopy setup with cake\n**Forever Us LoveFrame — ${formatPrice(6900)}**: Our signature package with cake` },
  };

  const pi = priceInfo[slug] || { range: "competitive", recs: `Packages from ${LOW} to ${HIGH}` };

  const intro = `${pick(OPENINGS, ek.slug)(kw)}

Looking for ${service.name.toLowerCase()} packages ${pi.range}? ${V} offers premium romantic celebrations at prices that work for every budget. No hidden charges — the price includes everything.

Here's a detailed breakdown of what you get:`;

  const sections: FFCContentSection[] = [
    {
      heading: `${service.name} Packages ${ek.modifierLabel}`,
      content: pi.recs + `\n\nEvery package gives you a complete celebration experience. The only difference is the decoration theme and whether cake is included.`,
    },
    {
      heading: `What's Included at Every Price Point`,
      content: `Regardless of which ${kwl} package you choose, every celebration includes:

✓ **3 Hours Private Venue** — No other guests. The space is exclusively yours.
✓ **Full Decorations** — Balloons, fairy lights, candles, themed elements. Setup by our team.
✓ **Welcome Drink** — A refreshing welcome to start your celebration.
✓ **Food Menu** — Cheese fondue, paneer tortilla, peri peri fries with mac & cheese, chocolate brownie, signature mocktails.
✓ **Background Music** — Romantic playlist (or your song requests).
✓ **Photo Zones** — Multiple Instagram-worthy photo spots.
✓ **Dedicated Service** — Team member for food service and any needs.

**No Hidden Costs**: What we quote for your ${kwl} is the final price. No surprise charges, no mandatory tips, no extras.

Book your ${kwl} at ${PH} — transparent pricing guaranteed!`
    },
    {
      heading: `How to Get the Best Value`,
      content: `Smart tips for your ${kwl}:

**Weekday Bookings**: Same quality, same setup, but easier availability. Great for ${kwl}.

**Lunch Slot**: The 12-3 PM slot is often the most available — perfect time for a ${kwl}.

**Advance Booking**: Booking early ensures you get your preferred date without rush pricing.

**Group the Celebrations**: Celebrating birthday + date night? One package covers it all!

**Add-ons**: Need cake? Only ₹350 extra for packages that don't include it. Affordable add to your ${kwl}.

Contact ${PH} for your ${kwl} — we'll help you pick the best value package!`
    },
  ];

  return buildResult(ek, service, intro, sections);
}

function generateRelationshipContent(ek: ExpandedKeyword, service: ServiceCategory): FFCKeywordContent {
  const kw = ek.title;
  const kwl = kw.toLowerCase();
  const mod = ek.modifierLabel;

  const intro = `${pick(OPENINGS, ek.slug)(kw)}

Every relationship stage brings its own magic. Whether you're ${mod.toLowerCase().replace("for ", "")}, the way you celebrate should reflect where you are in your love story. At ${V}, we create celebrations tailored to your unique relationship.

From ${LOW}, our ${kwl} packages include everything you need for a perfect celebration.`;

  const sections: FFCContentSection[] = [
    {
      heading: `Celebrations Designed ${mod}`,
      content: `Our team understands that ${mod.toLowerCase().replace("for ", "")} have special preferences:

${ek.modifier === "for-newly-married" ? `**Newlywed Magic**: You're still in the honeymoon phase — let's keep that magic alive! Our celebrations feature extra romantic touches, couple photo zones, and an ambiance that feels like an extension of your wedding celebrations.

**Photo-Ready Setup**: As newlyweds, you'll want to capture everything. Our venue is designed for stunning photos at every corner.

**Celebration Cake Included**: Premium packages include a complimentary cake — one more reason to celebrate being married!` :
    ek.modifier === "for-engaged-couples" ? `**Engagement Celebration**: Your engagement is a milestone worth celebrating beyond the ring ceremony! Our venue provides the perfect setting for an intimate engagement celebration dinner.

**Ring-Friendly Setup**: Special photo corners designed to highlight your ring and your new status as an engaged couple.

**Pre-Wedding Vibes**: Already planning the wedding? Our celebration can double as a pre-wedding experience with stunning photo opportunities.` :
    ek.modifier === "for-dating-couples" ? `**Date Night Excellence**: Whether it's your 5th date or your 50th, our venue transforms every date into something extraordinary. No more mediocre restaurant dates!

**Impress Factor**: The setup alone will make a lasting impression. Imagine your partner walking into a private, beautifully decorated space just for the two of you.

**Budget-Friendly Romance**: Starting from just ${LOW} — a premium private date experience without premium pricing.` :
    `**Reignite the Spark**: Years together can sometimes make celebrations feel routine. Our unique venue setup breaks that pattern and creates fresh, exciting memories.

**Milestone Celebration**: Long-term couples have lots to celebrate — years of togetherness, shared memories, and continued love. Our setups honor your journey.

**Nostalgia Touches**: We can incorporate elements from your early dating days — first date favorites, meaningful songs, and personal touches that remind you of your journey.`}

Book your ${kwl} at ${PH} today!`
    },
    {
      heading: `Best Packages ${mod}`,
      content: `Our top recommendations for your ${kwl}:

${ek.modifier === "for-dating-couples" ? `**Best First Impression**: Moonlit Romance (${formatPrice(5100)}) — Perfect balance of impressive setup and reasonable pricing for dating couples.

**Budget Date**: The Promise Creative (${LOW}) — Full private experience without splurging.` :
    `**Romantic Choice**: Eternal Love Rooftop (${formatPrice(6500)}) — Canopy setup with cake, stunning views.

**Intimate Choice**: Golden Promise Glass House (${formatPrice(6000)}) — Cozy glass house with elegant setup.`}

All packages include private venue, decorations, food, drinks, and 3 hours of celebration. Personalization available for all.

WhatsApp ${PH} to book your ${kwl}!`
    },
  ];

  return buildResult(ek, service, intro, sections);
}

function generateBookingContent(ek: ExpandedKeyword, service: ServiceCategory): FFCKeywordContent {
  const kw = ek.title;
  const kwl = kw.toLowerCase();
  const mod = ek.modifierLabel;

  const intro = `${pick(OPENINGS, ek.slug)(kw)}

${ek.modifier === "same-day-booking" || ek.modifier === "last-minute"
    ? `Need a ${service.name.toLowerCase()} TODAY? ${V} accepts same-day bookings based on availability! WhatsApp ${PH} right now to check if your preferred slot is open.`
    : ek.modifier === "advance-booking"
    ? `Planning ahead? Smart choice! Advance booking for your ${service.name.toLowerCase()} ensures you get your preferred date, time, and package. Book 1-2 weeks ahead for the best availability.`
    : `Book your ${service.name.toLowerCase()} easily online via WhatsApp at ${PH}. No complicated forms, no waiting — get instant confirmation for your celebration.`
}

All packages from ${LOW} include private venue, decorations, food, drinks, and 3 hours of romantic celebration.`;

  const sections: FFCContentSection[] = [
    {
      heading: `How ${mod} Works`,
      content: `${ek.modifier === "same-day-booking" || ek.modifier === "last-minute"
        ? `**Step 1**: WhatsApp ${PH} right now with your preferred time slot (Lunch, Evening, Dinner, or Late Night)

**Step 2**: We check real-time availability and confirm within minutes

**Step 3**: Quick advance payment via UPI/bank transfer to confirm

**Step 4**: Tell us any preferences — we'll set up as quickly as possible

**Step 5**: Arrive and celebrate! Even same-day setups include full decorations.

**Availability Notice**: Same-day slots depend on what's available. Weekdays have better last-minute availability than weekends.`
        : `**Step 1**: WhatsApp ${PH} with your preferred date (at least 3-7 days ahead)

**Step 2**: Choose your package (${LOW} to ${HIGH}) — we'll recommend based on your occasion

**Step 3**: Confirm with advance payment — your date and time are locked

**Step 4**: Share personalization requests (colors, songs, cake message, etc.)

**Step 5**: On celebration day, arrive to a perfectly prepared venue!

**Pro Tip**: The earlier you book, the better your choices for date and time slots.`}

Easy, fast, and hassle-free — that's our booking promise for your ${kwl}!`
    },
    {
      heading: `Payment & Policies`,
      content: `Clear, transparent booking terms:

**Advance Payment**: A small advance confirms your booking. Balance on the day of celebration.

**Payment Options**: UPI, bank transfer, or cash — whatever works for you.

**Rescheduling**: Free rescheduling up to 48 hours before your booking. We understand plans change!

**Cancellation**: Cancellations 48+ hours ahead receive a refund minus processing fees.

**No Hidden Charges**: The package price includes everything. No surprise additions.

**Confirmation**: You receive a WhatsApp confirmation with venue address, time, and what to expect.

Book your ${kwl} confidently at ${PH} — simple, transparent, trustworthy!`
    },
  ];

  return buildResult(ek, service, intro, sections);
}

function generateAreaServiceContent(ek: ExpandedKeyword, service: ServiceCategory): FFCKeywordContent {
  const kw = ek.title;
  const kwl = kw.toLowerCase();
  const areaName = ek.areaName || "your area";

  const intro = `${pick(OPENINGS, ek.slug)(kw)}

Couples from ${areaName} love celebrating at ${V} — it's just a short drive away! Our private rooftop and glass house venues offer the perfect escape from everyday life for a romantic ${service.name.toLowerCase()} experience.

All packages from ${LOW} include private venue, decorations, food, drinks, and 3 hours of exclusive celebration time. Easily accessible from ${areaName}.`;

  const sections: FFCContentSection[] = [
    {
      heading: `${service.name} for Couples from ${areaName}`,
      content: `${V} is the go-to ${service.name.toLowerCase()} venue for couples in ${areaName}, ${C}:

**Convenient Location**: Located in Gotri, we're just a short drive from ${areaName}. Easy to reach via Vadodara's main roads.

**100% Private**: Unlike restaurants in ${areaName} where privacy is limited, our venue is exclusively yours for 3 hours. No shared spaces, no strangers.

**Professional Setup**: Our team handles everything — decorations, food, music, ambiance. Couples from ${areaName} just need to show up and enjoy!

**Perfect Running Away from Routine**: The short drive from ${areaName} to our venue feels like escaping to a romantic getaway. The change of scenery makes celebrations special.

**All-Inclusive Pricing**: From ${LOW} — no need to search ${areaName} for separate decoration services, cake shops, and restaurants. We handle everything in one package.`
    },
    {
      heading: `Getting Here from ${areaName}`,
      content: `**Address**: 424, OneWest, 4th Floor, Priya Talkies Road, Gotri, Vadodara 391101

**From ${areaName}**: Search "Friends Factory Cafe Vadodara" on Google Maps for the fastest route. Most couples from ${areaName} reach us in 10-25 minutes.

**By Auto/Cab**: Easily available from ${areaName}. Tell the driver "OneWest building, Priya Talkies Road, Gotri."

**Parking**: Street parking available near the building.

**Surprise Planning**: Planning a surprise for your partner from ${areaName}? We help coordinate the reveal! WhatsApp ${PH} for surprise planning assistance.

**All Packages Available**: Choose from 8 celebration packages (${LOW} to ${HIGH}). Every package includes venue, decorations, food, and music.`
    },
  ];

  return buildResult(ek, service, intro, sections);
}

function generateAreaKeywordContent(ek: ExpandedKeyword, service: ServiceCategory): FFCKeywordContent {
  const kw = ek.title;
  const kwl = kw.toLowerCase();
  const areaName = ek.areaName || "your area";
  const baseKw = ek.baseKeywordTitle || service.name;

  const intro = `${pick(OPENINGS, ek.slug)(kw)}

Looking for ${baseKw.toLowerCase()} near ${areaName}? ${V} is the premier romantic celebration venue for couples from ${areaName}, ${C}. Our private rooftop and glass house venues are just a short drive from ${areaName}, offering an unmatched celebration experience.

From ${LOW}, enjoy a complete ${baseKw.toLowerCase()} experience with private venue, stunning decorations, food, drinks, and 3 hours of exclusive romantic time.`;

  const sections: FFCContentSection[] = [
    {
      heading: `${baseKw} Near ${areaName}`,
      content: `Why couples from ${areaName} choose ${V} for ${baseKw.toLowerCase()}:

**Closest Premium Venue**: Just minutes from ${areaName}, our venue offers the most convenient premium ${baseKw.toLowerCase()} experience.

**Complete Privacy**: Unlike public restaurants near ${areaName}, our venue is 100% private. Just you and your partner for 3 uninterrupted hours.

**Everything Included**: No running around ${areaName} for decorations, cake, and restaurants. Our packages include everything — venue, setup, food, drinks, music.

**Professional Quality**: Our experienced team has organized over 3,000 celebrations. Your ${baseKw.toLowerCase()} will be executed flawlessly.

**Multiple Options**: Choose from 8 packages (${LOW} to ${HIGH}) and 2 venue types (rooftop & glass house). Something for every preference and budget.

**Easy Directions from ${areaName}**: Search "Friends Factory Cafe" on Google Maps. Most couples from ${areaName} reach us in 10-25 minutes.`
    },
    {
      heading: `Book Your ${baseKw} from ${areaName}`,
      content: `Booking is quick and easy:

**1. WhatsApp ${PH}**: Mention you're from ${areaName} and want to book ${baseKw.toLowerCase()}.

**2. Choose Package**: Our team recommends the best option based on your occasion and budget.

**3. Select Time**: 4 slots available — Lunch (12-3 PM), Evening (4-7 PM), Dinner (7-10 PM), Late Night (10 PM-1 AM).

**4. Confirm**: Small advance payment locks your date. We send you venue directions from ${areaName}.

**5. Celebrate**: Everything is ready when you arrive — just bring your love!

**Surprise Planning**: Want to surprise your partner? We help couples from ${areaName} coordinate perfect surprise reveals. WhatsApp for details!

Book now and experience the best ${baseKw.toLowerCase()} near ${areaName}!`
    },
  ];

  return buildResult(ek, service, intro, sections);
}

// ==================== RESULT BUILDER ====================

function buildResult(
  ek: ExpandedKeyword,
  service: ServiceCategory,
  intro: string,
  sections: FFCContentSection[]
): FFCKeywordContent {
  const kw = ek.title;
  const kwl = kw.toLowerCase();
  const h = hash(ek.slug);

  const whyChooseUs = [
    `100% private venue – exclusively yours for your ${kwl}`,
    `8 unique celebration packages from ${LOW} to ${HIGH}`,
    `Stunning rooftop views & elegant glass house options`,
    `All-inclusive packages – decorations, food, drinks, music`,
    `Professional setup handled by our team – zero stress for you`,
    `Trusted by 3,000+ ${C} couples with 4.9★ Google rating`,
    `Easy access from all ${C} areas – located in Gotri`,
    `Quick WhatsApp booking at ${PH} with instant confirmation`,
  ];

  const process = [
    { step: "Contact Us", description: `WhatsApp ${PH} to discuss your ${kwl}` },
    { step: "Choose Package", description: `Select from 8 packages (${LOW} to ${HIGH})` },
    { step: "Confirm Booking", description: "Pay advance to lock your date and time" },
    { step: "Personalize", description: "Share custom requests — colors, songs, cake message" },
    { step: "Celebrate", description: "Arrive to a beautifully prepared venue and enjoy!" },
  ];

  const testimonialTemplates = [
    `"Our ${kwl} at ${V} was absolutely magical! The decorations, food, and ambiance were perfect. My partner couldn't stop smiling!" — Happy Couple, ${C}\n\n"We've celebrated at many places but nothing compares to ${V}. The privacy and attention to detail for our ${kwl} was outstanding." — Returning Customer\n\n"Best decision we made! The ${kwl} setup was even better than we imagined. Highly recommend to every couple in ${C}!" — 5-Star Review`,
    `"I planned a surprise ${kwl} and the team helped coordinate everything perfectly. My partner was completely speechless!" — Grateful Partner, ${C}\n\n"The rooftop ambiance during our ${kwl} was incredible. Fairy lights, candles, city views — absolutely romantic!" — Weekend Celebrator\n\n"Affordable yet premium — our ${kwl} experience proved you don't need to spend a fortune for an unforgettable celebration." — Value-Conscious Couple`,
    `"From booking to celebration, the entire ${kwl} experience was seamless. The WhatsApp communication was quick and helpful." — First-Timer, ${C}\n\n"We keep coming back to ${V} for every celebration. Our latest ${kwl} was our 4th time here — that says everything!" — Loyal Customer\n\n"The food, decorations, and service during our ${kwl} exceeded every expectation. Already planning our next visit!" — Delighted Couple`,
  ];

  const faqContent = [
    { question: `How much does ${kwl} cost?`, answer: `Packages range from ${LOW} to ${HIGH}. All include private venue, decorations, food, drinks, music, and 3 hours of celebration. No hidden charges.` },
    { question: `Can I customize my ${kwl}?`, answer: `Yes! Custom color themes, cake messages, song playlists, and personalized decorations are available. Share your preferences when booking.` },
    { question: `Is the venue private for ${kwl}?`, answer: `100% private. No other guests during your 3-hour celebration. The rooftop or glass house is exclusively yours.` },
    { question: `How do I book ${kwl}?`, answer: `WhatsApp ${PH} with your preferred date, time, and occasion. We'll recommend the best package and confirm with a small advance payment.` },
    { question: `What food is included in ${kwl} packages?`, answer: `Welcome drinks, cheese fondue, paneer tortilla, peri peri fries with mac & cheese, chocolate brownie, and signature mocktails. Veg and Jain options available.` },
    { question: `Can I plan a surprise ${kwl}?`, answer: `Absolutely! We help coordinate surprise reveals — timing, setup, and even cover stories. We've successfully executed 500+ surprise celebrations.` },
  ];

  const closingCta = `Ready for your perfect ${kwl} in ${C}? Don't wait — book your celebration at ${V} today! WhatsApp ${PH} for instant response and availability.

Every celebration at ${V} is a memory that lasts forever. With private venues, stunning decorations, delicious food, and packages from ${LOW}, your ${kwl} will be absolutely unforgettable.`;

  return {
    introduction: intro,
    sections,
    whyChooseUs,
    process,
    testimonialContent: testimonialTemplates[h % testimonialTemplates.length],
    pricingIntro: `${kwl} packages start from ${LOW}. All packages include private venue, decorations, food, drinks, and 3 hours of celebration.`,
    faqContent,
    closingCta,
  };
}

// ==================== PUBLIC API ====================

/**
 * Generate dimension-aware content for an expanded keyword.
 * Returns content tailored to the specific dimension (budget, theme, area, etc.)
 */
export function generateExpandedContent(
  ek: ExpandedKeyword,
  service: ServiceCategory,
  _keyword: ServiceKeyword
): FFCKeywordContent {
  const generators: Record<KeywordDimension, (ek: ExpandedKeyword, svc: ServiceCategory) => FFCKeywordContent> = {
    budget: generateBudgetContent,
    time: generateTimeContent,
    theme: generateThemeContent,
    festival: generateFestivalContent,
    milestone: generateMilestoneContent,
    venue: generateVenueContent,
    qualifier: generateQualifierContent,
    howto: generateHowtoContent,
    seasonal: generateSeasonalContent,
    style: generateStyleContent,
    nearme: generateNearmeContent,
    price: generatePriceContent,
    relationship: generateRelationshipContent,
    booking: generateBookingContent,
    "area-service": generateAreaServiceContent,
    "area-keyword": generateAreaKeywordContent,
  };

  const gen = generators[ek.dimension];
  if (gen) return gen(ek, service);

  // Fallback: should never reach here
  return generateBudgetContent(ek, service);
}
