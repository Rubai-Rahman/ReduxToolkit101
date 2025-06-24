import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';

const CtaSection = () => {
  return (
    <section className="cta-section">
      <div className="cta-overlay"></div>

      <div className="absolute inset-0">
        <div className="cta-blob top-10 left-10 w-32 h-32 bg-white/10 blur-xl"></div>
        <div className="cta-blob bottom-10 right-10 w-40 h-40 bg-white/5 blur-2xl animate-pulse delay-1000"></div>
        <div className="cta-blob top-1/2 left-1/3 w-24 h-24 bg-white/10 blur-lg animate-pulse delay-500"></div>
      </div>

      <div className="cta-content">
        <div className="max-w-3xl mx-auto">
          <h2 className="cta-heading">Ready to transform your productivity?</h2>
          <p className="cta-subtitle">
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
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="cta-button-secondary"
            >
              Schedule Demo
            </Button>
          </div>
          <p className="cta-footer">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
