'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    initials: 'SJ',
    name: 'Sarah Johnson',
    title: 'Product Manager, TechCorp',
    text: `"taskNest has completely transformed how our team manages projects. The AI-powered features make collaboration effortless."`,
    highlight: 'AI-powered features',
  },
  {
    id: 2,
    initials: 'MC',
    name: 'Mike Chen',
    title: 'Creative Director, DesignStudio',
    text: `"The automation features save us hours every week. We can focus on creative work while taskNest handles the routine tasks."`,
    highlight: 'creative work',
  },
  {
    id: 3,
    initials: 'AR',
    name: 'Alex Rodriguez',
    title: 'Team Lead, StartupXYZ',
    text: `"Best task management tool we've used. The predictive analytics help us optimize our workflow."`,
    highlight: 'predictive analytics',
  },
];

const Testimonials = () => {
  return (
    <section className="py-20  relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Loved by {''}
            <span className="gradient-text-2">teams worldwide</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map(
            ({ id, initials, name, title, text, highlight }) => {
              const parts = text.split(highlight);

              return (
                <Card key={id} className="testimonial-card">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 text-yellow-400 fill-current drop-shadow-sm"
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4">
                      {parts[0]}
                      <span className="gradient-text-1">{highlight}</span>
                      {parts[1]}
                    </p>
                    <div className="items-center mt-4 flex gap-4">
                      <div className=" size-10 rounded-full flex items-center justify-center gradient-bg-1">
                        <span className="text-white font-semibold">
                          {initials}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-card-foreground ">
                          {name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {title}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
