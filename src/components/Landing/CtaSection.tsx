import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';

const CtaSection = () => {
  return (
    <section className="py-20 relative  gradient-bg-2">
      <div className="mx-auto px-4 text-center relative z-10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl font bold text-foreground font-bold drop-shadow-lg mb-6">
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
            <Button
              size="lg"
              variant="secondary"
              className="cta-button-primary"
            >
              <Sparkles className="mr-2 h-5 w-5" />
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
      </div>
    </section>
  );
};

export default CtaSection;
