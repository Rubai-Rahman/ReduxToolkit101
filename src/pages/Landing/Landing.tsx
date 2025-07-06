'use client';
import Testimonials from '@/components/landing/Testimonials';
import HeroSection from '@/components/landing/HeroSection';
import Features from '@/components/landing/Features';
import CtaSection from '@/components/landing/CtaSection';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[var(--destructive)]/20 to-[var(--accent-end)]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[var(--color-accent-middle)]/20 to-[var(--accent-yellow)]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[var(--primary-start)]/10 to-[var(--primary-end)]/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <Features />

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-[var(--destructive)]/5 via-[var(--primary-start)]/5 to-[var(--accent-end)]/5 relative">
        <div className="absolute inset-0 backdrop-blur-3xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="stat-card stat-card-hover">
              <div className="stat-number bg-gradient-to-r from-[var(--destructive)] to-[var(--primary-start)]">
                10,000+
              </div>
              <div className="stat-label">Active Teams</div>
            </div>
            <div className="stat-card stat-card-hover">
              <div className="stat-number bg-gradient-to-r from-[var(--color-accent-start)] to-[var(--accent-end)]">
                1M+
              </div>
              <div className="stat-label">Tasks Completed</div>
            </div>
            <div className="stat-card stat-card-hover">
              <div className="stat-number bg-gradient-to-r from-[var(--primary-start)] to-[var(--primary-end)]">
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
      <CtaSection />
    </div>
  );
}
