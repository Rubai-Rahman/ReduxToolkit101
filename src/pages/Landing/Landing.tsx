'use client';;
import { CheckCircle } from 'lucide-react';
import Testimonials from '@/components/Landing/Testimonials';
import HeroSection from '@/components/Landing/HeroSection';
import Features from '@/components/Landing/Features';
import CtaSection from '@/components/Landing/CtaSection';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[var(--destructive)]/20 to-[var(--color-accent-end)]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[var(--color-accent-middle)]/20 to-[var(--color-accent-yellow)]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[var(--color-primary-start)]/10 to-[var(--color-primary-end)]/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <Features />

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-[var(--destructive)]/5 via-[var(--color-primary-start)]/5 to-[var(--color-accent-end)]/5 relative">
        <div className="absolute inset-0 backdrop-blur-3xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="stat-card stat-card-hover">
              <div className="stat-number bg-gradient-to-r from-[var(--destructive)] to-[var(--color-primary-start)]">
                10,000+
              </div>
              <div className="stat-label">Active Teams</div>
            </div>
            <div className="stat-card stat-card-hover">
              <div className="stat-number bg-gradient-to-r from-[var(--color-accent-start)] to-[var(--color-accent-end)]">
                1M+
              </div>
              <div className="stat-label">Tasks Completed</div>
            </div>
            <div className="stat-card stat-card-hover">
              <div className="stat-number bg-gradient-to-r from-[var(--color-primary-start)] to-[var(--color-primary-end)]">
                99.9%
              </div>
              <div className="stat-label">Uptime</div>
            </div>
            <div className="stat-card stat-card-hover">
              <div className="stat-number bg-gradient-to-r from-[#ffd93d] to-[#ffed4e]">
                4.9/5
              </div>
              <div className="stat-label">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
     <CtaSection/>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-xl border-t border-border/50 py-12 relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-[#ff6b6b] via-[var(--color-primary-start)] to-[var(--color-primary-end)] rounded-lg flex items-center justify-center shadow-lg">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-[#ff6b6b] to-[var(--color-primary-end)] bg-clip-text text-transparent">
                  taskNest
                </span>
              </div>
              <p className="text-muted-foreground">
                Empowering teams to achieve more through{' '}
                <span className="bg-gradient-to-r from-[var(--color-primary-start)] to-[var(--color-primary-end)] bg-clip-text text-transparent font-semibold">
                  intelligent task management
                </span>
                .
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-card-foreground">
                Product
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-transparent hover:bg-gradient-to-r hover:from-[var(--color-primary-start)] hover:to-[var(--color-primary-end)] hover:bg-clip-text transition-all duration-300"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-transparent hover:bg-gradient-to-r hover:from-[var(--color-primary-start)] hover:to-[var(--color-primary-end)] hover:bg-clip-text transition-all duration-300"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-transparent hover:bg-gradient-to-r hover:from-[var(--color-primary-start)] hover:to-[var(--color-primary-end)] hover:bg-clip-text transition-all duration-300"
                  >
                    Integrations
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-transparent hover:bg-gradient-to-r hover:from-[var(--color-primary-start)] hover:to-[var(--color-primary-end)] hover:bg-clip-text transition-all duration-300"
                  >
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-card-foreground">
                Company
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-transparent hover:bg-gradient-to-r hover:from-[var(--color-primary-start)] hover:to-[var(--color-primary-end)] hover:bg-clip-text transition-all duration-300"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-transparent hover:bg-gradient-to-r hover:from-[var(--color-primary-start)] hover:to-[var(--color-primary-end)] hover:bg-clip-text transition-all duration-300"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-transparent hover:bg-gradient-to-r hover:from-[var(--color-primary-start)] hover:to-[var(--color-primary-end)] hover:bg-clip-text transition-all duration-300"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-transparent hover:bg-gradient-to-r hover:from-[var(--color-primary-start)] hover:to-[var(--color-primary-end)] hover:bg-clip-text transition-all duration-300"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-card-foreground">
                Support
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-transparent hover:bg-gradient-to-r hover:from-[var(--color-primary-start)] hover:to-[var(--color-primary-end)] hover:bg-clip-text transition-all duration-300"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-transparent hover:bg-gradient-to-r hover:from-[var(--color-primary-start)] hover:to-[var(--color-primary-end)] hover:bg-clip-text transition-all duration-300"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-transparent hover:bg-gradient-to-r hover:from-[var(--color-primary-start)] hover:to-[var(--color-primary-end)] hover:bg-clip-text transition-all duration-300"
                  >
                    Community
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-transparent hover:bg-gradient-to-r hover:from-[var(--color-primary-start)] hover:to-[var(--color-primary-end)] hover:bg-clip-text transition-all duration-300"
                  >
                    Status
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/30 mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 taskNest. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
