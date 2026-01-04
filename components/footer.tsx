"use client"

import { MapPin, Phone, Mail, Clock } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-3 sm:px-4 py-8 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 mb-8 md:mb-0">
          {/* Company Info */}
          <div>
            <h3 className="text-3xl font-bold mb-4 text-accent">Nesture Interiors</h3>
            <p className="text-primary-foreground/80 font-mono leading-relaxed mb-6">
              {
                "Where innovation meets elegance in interior design. Crafting stunning spaces for homes and businesses across Bangalore."
              }
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {["Home", "About Us", "Gallery", "Packages", "Contact"].map((link) => (
                <li key={link}>
                  <button
                    onClick={() => {
                      const element = document.getElementById(link.toLowerCase().replace(" ", "-"))
                      element?.scrollIntoView({ behavior: "smooth" })
                    }}
                    className="text-primary-foreground/80 hover:text-accent transition-colors font-mono"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-bold mb-6">Our Services</h4>
            <ul className="space-y-3 text-primary-foreground/80 font-mono">
              <li>Residential Interior Design</li>
              <li>Office & Commercial Design</li>
              <li>Space Planning & Layout</li>
              <li>3D Visualization</li>
              <li>Furniture & Material Selection</li>
              <li>Complete Project Management</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-6">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <div>
                  <p className="text-primary-foreground/80 font-mono">
                    Nesture Interiors,
                    <br />
                    Bangalore, Karnataka, India
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <a
                  href="tel:+918618080171"
                  className="text-primary-foreground/80 hover:text-accent transition-colors font-mono"
                >
                  +91 861 808 0171
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <a
                  href="mailto:nestureinterior@gmail.com"
                  className="text-primary-foreground/80 hover:text-accent transition-colors font-mono"
                >
                  nestureinterior@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Service Areas */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <h4 className="text-xl font-bold mb-4 text-center">Interior Design Services - All Areas of Bangalore</h4>
          <p className="text-center text-primary-foreground/80 font-mono text-sm leading-relaxed">
            Covering residential and commercial projects across Bangalore's premium localities including Koramangala, Indiranagar, Whitefield, HSR Layout, Jayanagar, JP Nagar, Marathahalli, Electronic City, and surrounding areas
          </p>
          <p className="text-center text-accent font-mono text-sm mt-3">
            ✓ Residential Interior Design | ✓ Office & Commercial Spaces | ✓ Complete Project Management
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/80 font-mono text-sm text-center md:text-left">
              © 2026 Nesture Interiors. All rights reserved. | Bangalore's Premier Interior Design Studio
            </p>
            <div className="flex gap-6 text-sm font-mono">
              <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Keywords (hidden) */}
      <div className="sr-only">
        Interior design Bangalore, home design Bangalore, office design, commercial interiors, space planning, interior decorator Bangalore, home renovation, luxury interiors, modern design, interior styling, furniture design, kitchen design, bedroom design, living room design
      </div>
    </footer>
  )
}
