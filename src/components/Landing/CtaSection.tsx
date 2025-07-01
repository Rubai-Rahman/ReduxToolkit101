import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';

const CtaSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-2 py-20">
      {/* Top Curve */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
        <svg
          className="relative block w-[calc(100%+1.3px)] h-[100px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="1200 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.57C180.65,34.85,75.34,8.3,0,0V120H1200V0C1041.89,33.59,908.54,78.44,765.54,96.89,639.47,113.13,500.55,93.29,321.39,56.57Z"
            fill="currentColor"
            className="text-background"
          ></path>
        </svg>
      </div>

      {/* CTA Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <h2 className="text-5xl font-bold text-foreground drop-shadow-lg mb-6">
          Ready to transform your productivity?
        </h2>
        <p className="text-xl text-foreground/90 mb-8 drop-shadow">
          Join thousands of teams who have already made the switch to{' '}
          <span className="font-semibold text-white">
            AI-powered task management
          </span>
          .
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary" className="">
            <Sparkles className="mr-2 h-5 w-5 text-accent-end" />
            Start Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" className="hover:scale-105">
            Schedule Demo
          </Button>
        </div>
        <p className="text-sm mt-4 drop-shadow">
          No credit card required • 14-day free trial • Cancel anytime
        </p>
      </div>

      {/* Bottom Curve */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-[calc(100%+1.3px)] h-[100px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.57C180.65,34.85,75.34,8.3,0,0V120H1200V0C1041.89,33.59,908.54,78.44,765.54,96.89,639.47,113.13,500.55,93.29,321.39,56.57Z"
            fill="currentColor"
            className="text-background"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default CtaSection;
