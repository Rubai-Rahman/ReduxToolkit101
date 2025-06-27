import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart3,
  Bell,
  Calendar,
  CheckCircle,
  Users,
  Zap,
} from "lucide-react";

const Features = () => {
  return (
    <section
      id="features"
      className="py-20 bg-gradient-to-b from-background to-muted/20 relative"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Everything you need to stay{" "}
            <span className="bg-gradient-to-r from-[var(--destructive)] to-[var(--color-primary-end)] bg-clip-text text-transparent">
              productive
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed with{" "}
            <span className="bg-gradient-to-r from-[var(--color-primary-start)] to-[var(--color-accent-end)] bg-clip-text text-transparent font-semibold">
              cutting-edge AI
            </span>{" "}
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
                Create, organize, and prioritize tasks with{" "}
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
                Work together with{" "}
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
                Track progress with{" "}
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
                Sync with your favorite calendar apps. View deadlines, meetings,
                and tasks in{" "}
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
                Stay informed with{" "}
                <span className="text-[var(--color-accent-middle)] font-semibold">
                  AI-powered notifications
                </span>{" "}
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
                Automate repetitive tasks with{" "}
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
  );
};

export default Features;
