import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

const HeroSection = () => {
  return (
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
              {" "}
              Perfectly Organized
            </span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            TaskNest transforms chaos into clarity with{" "}
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
              Start Now
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
  );
};

export default HeroSection;
