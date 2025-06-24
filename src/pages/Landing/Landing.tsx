'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle,
  Users,
  BarChart3,
  ArrowRight,
  Calendar,
  Bell,
  Zap,
  Play,
  Sparkles,
} from 'lucide-react';
import Testimonials from '@/components/herosection/Testimonials';

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
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--destructive)]/5 via-background to-[var(--color-accent-end)]/5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge
              variant="secondary"
              className="mb-6 border-2 border-transparent bg-gradient-to-r from-[var(--destructive)]/20 to-[var(--color-primary-end)]/20 backdrop-blur-sm shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300"
            >
              <Sparkles className="h-3 w-3 mr-1 text-[var(--destructive)]" />
              <span className="bg-gradient-to-r from-[var(--destructive)] to-[var(--color-primary-end)] bg-clip-text text-transparent font-semibold">
                Trusted by 10,000+ teams worldwide
              </span>
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
              Your Tasks,
              <span className="bg-gradient-to-r from-[var(--destructive)] via-[var(--color-primary-start)] to-[var(--color-accent-end)] bg-clip-text text-transparent animate-pulse">
                {' '}
                Perfectly Organized
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              taskNest transforms chaos into clarity with{' '}
              <span className="bg-gradient-to-r from-[var(--color-primary-start)] to-[var(--color-primary-end)] bg-clip-text text-transparent font-semibold">
                AI-powered intelligence
              </span>
              . Manage projects, collaborate seamlessly, and achieve more.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                className="text-lg px-8 py-4 h-auto bg-gradient-to-r from-[var(--destructive)] via-[var(--color-primary-start)] to-[var(--color-primary-end)] hover:from-[var(--color-primary-start)] hover:via-[var(--color-primary-end)] hover:to-[var(--color-accent-end)] shadow-2xl shadow-primary/30 hover:shadow-3xl hover:shadow-primary/40 transition-all duration-500 transform hover:scale-105"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 h-auto border-2 border-transparent bg-gradient-to-r from-[var(--color-primary-start)]/10 to-[var(--color-primary-end)]/10 backdrop-blur-sm hover:from-[var(--color-primary-start)]/20 hover:to-[var(--color-primary-end)]/20 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Hero Image Placeholder */}
            <div className="relative max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-card/80 to-accent/30 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-border/50 hover:shadow-3xl hover:shadow-primary/10 transition-all duration-500">
                <div className="bg-gradient-to-br from-card to-card/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-border/30">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-[var(--destructive)] to-[var(--color-primary-end)] rounded-md shadow-lg"></div>
                      <span className="font-semibold text-card-foreground">
                        Project Dashboard
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-gradient-to-r from-[var(--destructive)] to-[var(--color-accent-start-light)] rounded-full shadow-sm"></div>
                      <div className="w-3 h-3 bg-gradient-to-r from-[var(--color-accent-yellow)] to-[var(--color-accent-yellow-light)] rounded-full shadow-sm"></div>
                      <div className="w-3 h-3 bg-gradient-to-r from-[var(--color-accent-end)] to-[var(--color-accent-end-light)] rounded-full shadow-sm"></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gradient-to-r from-muted to-muted/50 rounded-full w-3/4"></div>
                    <div className="h-4 bg-gradient-to-r from-muted to-muted/50 rounded-full w-1/2"></div>
                    <div className="h-4 bg-gradient-to-r from-[var(--destructive)]/60 via-[var(--color-primary-start)]/60 to-[var(--color-primary-end)]/60 rounded-full w-2/3 shadow-lg"></div>
                    <div className="h-4 bg-gradient-to-r from-muted to-muted/50 rounded-full w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 bg-gradient-to-b from-background to-muted/20 relative"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Everything you need to stay{' '}
              <span className="bg-gradient-to-r from-[var(--destructive)] to-[var(--color-primary-end)] bg-clip-text text-transparent">
                productive
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed with{' '}
              <span className="bg-gradient-to-r from-[var(--color-primary-start)] to-[var(--color-accent-end)] bg-clip-text text-transparent font-semibold">
                cutting-edge AI
              </span>{' '}
              to help you accomplish more, faster.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 1st Card */}
            <Card className="border border-border/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm group hover:border-[var(--destructive)]/30">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-[var(--destructive)]/20 to-[var(--destructive)]/10 rounded-xl flex items-center justify-center mb-4 group-hover:from-[var(--destructive)] group-hover:to-[var(--color-primary-start)] transition-all duration-500 shadow-lg group-hover:shadow-xl group-hover:shadow-[var(--destructive)]/25">
                  <CheckCircle className="h-6 w-6 text-[var(--destructive)] group-hover:text-white transition-colors duration-500" />
                </div>
                <CardTitle className="text-xl text-card-foreground group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[var(--destructive)] group-hover:to-[var(--color-primary-start)] group-hover:bg-clip-text transition-all duration-300">
                  Smart Task Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-muted-foreground">
                  Create, organize, and prioritize tasks with{' '}
                  <span className="text-[var(--destructive)] font-semibold">
                    AI-powered automation
                  </span>
                  . Never miss a deadline with intelligent reminders.
                </CardDescription>
              </CardContent>
            </Card>

            {/* 2nd Card */}
            <Card className="border border-border/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm group hover:border-[var(--color-accent-end)]/30">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-[var(--color-accent-end)]/20 to-[var(--color-accent-end)]/10 rounded-xl flex items-center justify-center mb-4 group-hover:from-[var(--color-accent-end)] group-hover:to-[var(--color-accent-end-light)] transition-all duration-500 shadow-lg group-hover:shadow-xl group-hover:shadow-[var(--color-accent-end)]/25">
                  <Users className="h-6 w-6 text-[var(--color-accent-end)] group-hover:text-white transition-colors duration-500" />
                </div>
                <CardTitle className="text-xl text-card-foreground group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[var(--color-accent-end)] group-hover:to-[var(--color-accent-end-light)] group-hover:bg-clip-text transition-all duration-300">
                  Team Collaboration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-muted-foreground">
                  Work together with{' '}
                  <span className="text-[var(--color-accent-end)] font-semibold">
                    real-time sync
                  </span>
                  , comments, file sharing, and team activity feeds.
                </CardDescription>
              </CardContent>
            </Card>

            {/* 3rd Card */}
            <Card className="border border-border/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm group hover:border-[var(--color-primary-start)]/30">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-[var(--color-primary-start)]/20 to-[var(--color-primary-start)]/10 rounded-xl flex items-center justify-center mb-4 group-hover:from-[var(--color-primary-start)] group-hover:to-[var(--color-primary-end)] transition-all duration-500 shadow-lg group-hover:shadow-xl group-hover:shadow-primary/25">
                  <BarChart3 className="h-6 w-6 text-[var(--color-primary-start)] group-hover:text-white transition-colors duration-500" />
                </div>
                <CardTitle className="text-xl text-card-foreground group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[var(--color-primary-start)] group-hover:to-[var(--color-primary-end)] group-hover:bg-clip-text transition-all duration-300">
                  Advanced Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-muted-foreground">
                  Track progress with{' '}
                  <span className="bg-gradient-to-r from-[var(--color-primary-start)] to-[var(--color-primary-end)] bg-clip-text text-transparent font-semibold">
                    AI insights
                  </span>
                  , productivity metrics, and predictive analytics.
                </CardDescription>
              </CardContent>
            </Card>

            {/* 4th Card */}
            <Card className="border border-border/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm group hover:border-[var(--color-accent-yellow)]/30">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-[var(--color-accent-yellow)]/20 to-[var(--color-accent-yellow)]/10 rounded-xl flex items-center justify-center mb-4 group-hover:from-[var(--color-accent-yellow)] group-hover:to-[var(--color-accent-yellow-light)] transition-all duration-500 shadow-lg group-hover:shadow-xl group-hover:shadow-[var(--color-accent-yellow)]/25">
                  <Calendar className="h-6 w-6 text-[var(--color-accent-yellow)] group-hover:text-white transition-colors duration-500" />
                </div>
                <CardTitle className="text-xl text-card-foreground group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[var(--color-accent-yellow)] group-hover:to-[var(--color-accent-yellow-light)] group-hover:bg-clip-text transition-all duration-300">
                  Calendar Integration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-muted-foreground">
                  Sync with your favorite calendar apps. View deadlines,
                  meetings, and tasks in{' '}
                  <span className="text-[var(--color-accent-yellow)] font-semibold">
                    one unified timeline
                  </span>
                  .
                </CardDescription>
              </CardContent>
            </Card>

            {/* 5th Card */}
            <Card className="border border-border/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm group hover:border-[var(--color-accent-middle)]/30">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-[var(--color-accent-middle)]/20 to-[var(--color-accent-middle)]/10 rounded-xl flex items-center justify-center mb-4 group-hover:from-[var(--color-accent-middle)] group-hover:to-[var(--color-accent-middle)] transition-all duration-500 shadow-lg group-hover:shadow-xl group-hover:shadow-[var(--color-accent-middle)]/25">
                  <Bell className="h-6 w-6 text-[var(--color-accent-middle)] group-hover:text-white transition-colors duration-500" />
                </div>
                <CardTitle className="text-xl text-card-foreground group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[var(--color-accent-middle)] group-hover:to-[var(--color-accent-middle)] group-hover:bg-clip-text transition-all duration-300">
                  Smart Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-muted-foreground">
                  Stay informed with{' '}
                  <span className="text-[var(--color-accent-middle)] font-semibold">
                    AI-powered notifications
                  </span>{' '}
                  that adapt to your schedule and preferences.
                </CardDescription>
              </CardContent>
            </Card>

            {/* 6th Card */}
            <Card className="border border-border/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm group hover:border-[var(--color-accent-start-light)]/30">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-[var(--color-accent-start-light)]/20 to-[var(--color-accent-start-light)]/10 rounded-xl flex items-center justify-center mb-4 group-hover:from-[var(--color-accent-start-light)] group-hover:to-[var(--color-accent-start-light)] transition-all duration-500 shadow-lg group-hover:shadow-xl group-hover:shadow-[var(--color-accent-start-light)]/25">
                  <Zap className="h-6 w-6 text-[var(--color-accent-start-light)] group-hover:text-white transition-colors duration-500" />
                </div>
                <CardTitle className="text-xl text-card-foreground group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[var(--color-accent-start-light)] group-hover:to-[var(--color-accent-start-light)] group-hover:bg-clip-text transition-all duration-300">
                  AI Automation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-muted-foreground">
                  Automate repetitive tasks with{' '}
                  <span className="text-[var(--color-accent-start-light)] font-semibold">
                    machine learning workflows
                  </span>
                  . Focus on creativity while AI handles routine.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

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
      <section className="py-20 bg-gradient-to-br from-[#ff6b6b] via-[var(--color-primary-start)] to-[var(--color-primary-end)] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/10 rounded-full blur-lg animate-pulse delay-500"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl font-bold text-white mb-6 drop-shadow-lg">
              Ready to transform your productivity?
            </h2>
            <p className="text-xl text-white/90 mb-8 drop-shadow">
              Join thousands of teams who have already made the switch to{' '}
              <span className="font-semibold text-white">
                AI-powered task management
              </span>
              .
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-4 h-auto bg-white/95 hover:bg-white text-gray-900 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 h-auto border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Schedule Demo
              </Button>
            </div>
            <p className="text-white/70 text-sm mt-4 drop-shadow">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>

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
