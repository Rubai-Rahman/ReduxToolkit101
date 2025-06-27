import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const Testimonials = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/10 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Loved by{" "}
            <span className="bg-gradient-to-r from-[var(--destructive)] via-[var(--color-primary-start)] to-[var(--color-accent-start)] bg-clip-text text-transparent">
              teams worldwide
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="testimonial-card testimonial-card-hover">
            <CardContent className="testimonial-content">
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-[#ffd93d] fill-current drop-shadow-sm"
                  />
                ))}
              </div>
              <p className="testimonial-text">
                "taskNest has completely transformed how our team manages
                projects. The{" "}
                <span className="bg-gradient-to-r from-[var(--color-primary-start)] to-[var(--color-primary-end)] bg-clip-text text-transparent font-semibold">
                  AI-powered features
                </span>{" "}
                make collaboration effortless."
              </p>
              <div className="testimonial-user">
                <div className="testimonial-avatar bg-gradient-to-br from-[var(--destructive)] to-[var(--color-primary-start)]">
                  <span className="text-white font-semibold">SJ</span>
                </div>
                <div>
                  <div className="testimonial-user-name">Sarah Johnson</div>
                  <div className="testimonial-user-title">
                    Product Manager, TechCorp
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 2nd card */}
          <Card className="testimonial-card testimonial-card-hover">
            <CardContent className="testimonial-content">
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-[#ffd93d] fill-current drop-shadow-sm"
                  />
                ))}
              </div>
              <p className="testimonial-text">
                "The automation features save us hours every week. We can focus
                on{" "}
                <span className="text-[var(--color-accent-start)] font-semibold">
                  creative work
                </span>{" "}
                while taskNest handles the routine tasks."
              </p>
              <div className="testimonial-user">
                <div className="testimonial-avatar bg-gradient-to-br from-[var(--color-accent-start)] to-[var(--color-accent-end)]">
                  <span className="text-white font-semibold">MC</span>
                </div>
                <div>
                  <div className="testimonial-user-name">Mike Chen</div>
                  <div className="testimonial-user-title">
                    Creative Director, DesignStudio
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 3rd card */}
          <Card className="testimonial-card testimonial-card-hover">
            <CardContent className="testimonial-content">
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-[#ffd93d] fill-current drop-shadow-sm"
                  />
                ))}
              </div>
              <p className="testimonial-text">
                "Best task management tool we've used. The{" "}
                <span className="bg-gradient-to-r from-[var(--color-primary-start)] to-[var(--color-accent-start)] bg-clip-text text-transparent font-semibold">
                  predictive analytics
                </span>{" "}
                help us optimize our workflow."
              </p>
              <div className="testimonial-user">
                <div className="testimonial-avatar bg-gradient-to-br from-[var(--color-primary-start)] to-[var(--color-primary-end)]">
                  <span className="text-white font-semibold">AR</span>
                </div>
                <div>
                  <div className="testimonial-user-name">Alex Rodriguez</div>
                  <div className="testimonial-user-title">
                    Team Lead, StartupXYZ
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
