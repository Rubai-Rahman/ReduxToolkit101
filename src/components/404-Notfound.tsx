'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { useCallback, useState } from 'react';

export default function NotFound() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = useCallback(() => {
    // In a real application, you would redirect to a search results page
    // or trigger a search action here.
    console.log('Search:', searchTerm);
    // Example: window.location.href = `/search?q=${searchTerm}`;
  }, [searchTerm]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/30 relative overflow-hidden flex items-center justify-center">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[var(--accent-start-light)]/10 to-[var(--accent-end)]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[var(--accent-end-light)]/10 to-[var(--accent-yellow-light)]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="border border-border/50 shadow-2xl bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-xl">
            <CardHeader className="pb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-destructive/20 to-[var(--primary-end)]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl font-bold bg-gradient-to-r from-destructive to-[var(--primary-end)] bg-clip-text text-transparent">
                  404
                </span>
              </div>
              <CardTitle className="text-3xl mb-2">
                <span className="bg-gradient-to-r from-destructive to-[var(--primary-end)] bg-clip-text text-transparent">
                  Page Not Found
                </span>
              </CardTitle>
              <CardDescription className="text-lg">
                The page you're looking for doesn't exist or has been moved.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => window.history.back()}
                  variant="outline"
                  className="border-2 border-transparent bg-gradient-to-r from-[var(--primary-start)]/10 to-[var(--primary-end)]/10 backdrop-blur-sm hover:from-[var(--primary-start)]/20 hover:to-[var(--primary-end)]/20"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Go Back
                </Button>
                <Button
                  onClick={() => (window.location.href = '/')}
                  className="bg-gradient-to-r from-destructive to-[var(--primary-start)] hover:from-[var(--primary-start)] hover:to-[var(--primary-end)] shadow-lg"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Go Home
                </Button>
              </div>

              <div className="pt-4 border-t border-border/30">
                <p className="text-sm text-muted-foreground mb-4">
                  Looking for something specific? Try searching:
                </p>
                <div className="relative max-w-md mx-auto">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search tasks, projects..."
                    className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSearch();
                      }
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Need help? Contact our{' '}
              <a
                href="/support"
                className="gradient-text-1 font-semibold hover:underline"
              >
                support team
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
