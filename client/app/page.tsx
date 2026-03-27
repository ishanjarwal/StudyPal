import { Button } from "@/components/ui/button";
import { RedirectToSignIn, Show } from "@clerk/nextjs";
import {
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  FileText,
  Globe,
  Layers,
  MessageSquare,
  Sparkles,
  Zap,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Background patterns */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary opacity-20 blur-[100px]"></div>
      </div>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden lg:pt-32 lg:pb-48">
          <div className="container px-4 mx-auto relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center px-3 py-1 mb-6 text-sm font-medium rounded-full border border-primary/20 bg-primary/5 text-primary backdrop-blur-sm animate-in fade-in slide-in-from-bottom-3 duration-1000">
                <Sparkles className="w-4 h-4 mr-2" />
                <span>AI-Powered Learning is here</span>
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl mb-8 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 text-balance animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
                Master Any Subject with Your{" "}
                <span className="text-primary">AI Study Companion</span>
              </h1>

              <p className="max-w-2xl mx-auto mb-10 text-lg text-muted-foreground sm:text-xl text-pretty animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-300">
                Transform your study materials into interactive conversations.
                StudyPal uses context-aware RAG to help you chat with PDFs,
                notes, and research papers seamlessly.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-500">
                <Button
                  size="lg"
                  className="h-12 px-8 text-base font-semibold rounded-xl bg-primary hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(var(--primary),0.3)]"
                >
                  Start Studying Free
                  <ChevronRight className="w-5 h-5 ml-1" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 px-8 text-base font-semibold rounded-xl border-border bg-background/50 backdrop-blur-sm hover:bg-muted transition-all"
                >
                  Watch Demo
                </Button>
              </div>

              {/* Image Placeholder / Mockup */}
              <div className="mt-16 sm:mt-24 relative rounded-2xl border border-border bg-muted/30 p-2 backdrop-blur-sm animate-in zoom-in-95 duration-1000 delay-700">
                <div className="relative overflow-hidden rounded-xl border border-border bg-card aspect-[16/9] flex items-center justify-center shadow-2xl">
                  {/* Dashboard Mockup Placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-accent/5"></div>
                  <div className="z-10 flex flex-col items-center gap-4 text-muted-foreground/50">
                    <Layers className="w-16 h-16" />
                    <p className="font-medium">Dashboard Preview Placeholder</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-muted/30 relative">
          <div className="container px-4 mx-auto">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Studying, but{" "}
                <span className="text-primary italic">Smarter</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Everything you need to master your coursework, powered by the
                latest in AI and Retrieval Augmented Generation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="group p-8 rounded-2xl border border-border bg-card hover:bg-accent/5 transition-all hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Context-Aware Chat</h3>
                <p className="text-muted-foreground">
                  Ask anything about your documents and get instant, accurate
                  answers based purely on your study content.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group p-8 rounded-2xl border border-border bg-card hover:bg-accent/5 transition-all hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Multi-PDF Knowledge</h3>
                <p className="text-muted-foreground">
                  Upload entire folders of textbooks and research papers.
                  StudyPal links ideas across all your materials.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group p-8 rounded-2xl border border-border bg-card hover:bg-accent/5 transition-all hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <BrainCircuit className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Smart Summaries</h3>
                <p className="text-muted-foreground">
                  Get concise summaries of long chapters or complex papers,
                  highlighting key concept and definitions.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="group p-8 rounded-2xl border border-border bg-card hover:bg-accent/5 transition-all hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Instant Flashcards</h3>
                <p className="text-muted-foreground">
                  Automatically generate flashcards from your notes to test your
                  knowledge and prepare for exams.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="group p-8 rounded-2xl border border-border bg-card hover:bg-accent/5 transition-all hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Citation Tracking</h3>
                <p className="text-muted-foreground">
                  Every answer comes with source citations, so you can always
                  verify the information in your textbooks.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="group p-8 rounded-2xl border border-border bg-card hover:bg-accent/5 transition-all hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Study Groups</h3>
                <p className="text-muted-foreground">
                  Share your chat sessions and knowledge bases with classmates
                  for collaborative AI-assisted learning.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 relative overflow-hidden">
          <div className="container px-4 mx-auto">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Simple, Student-Friendly Pricing
              </h2>
              <p className="text-lg text-muted-foreground">
                Choose the plan that fits your study needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Free Plan */}
              <div className="p-8 rounded-3xl border border-border bg-card relative overflow-hidden">
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-2">Basic</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">$0</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <p className="mt-4 text-muted-foreground">
                    Perfect for light studying and trying out AI chat.
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {[
                    "Up to 3 PDFs per month",
                    "Max 10MB per file",
                    "Standard RAG models",
                    "Basic citations",
                    "Community support",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button variant="outline" className="w-full h-12 rounded-xl">
                  Get Started Free
                </Button>
              </div>

              {/* Pro Plan */}
              <div className="p-8 rounded-3xl border-2 border-primary bg-card relative overflow-hidden shadow-xl shadow-primary/5">
                <div className="absolute top-0 right-0 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-bl-xl uppercase tracking-wider">
                  Most Popular
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-2 text-primary">
                    Pro Librarian
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">$9</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <p className="mt-4 text-muted-foreground">
                    Unleash the full power of AI for your entire library.
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {[
                    "Unlimited PDF uploads",
                    "Up to 100MB per file",
                    "Advanced GPT-4o models",
                    "Smart Flashcard groups",
                    "Priority search speed",
                    "Priority support",
                  ].map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-sm font-medium"
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                  Upgrade Now
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto rounded-[2rem] bg-foreground text-background p-12 text-center relative overflow-hidden">
              {/* Decorative background for CTA */}
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none overflow-hidden">
                <div className="absolute -top-1/2 -left-1/4 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_70%)] opacity-30"></div>
              </div>

              <div className="relative z-10">
                <h2 className="text-3xl font-bold sm:text-5xl mb-6 tracking-tight">
                  Ready to ace your next exam?
                </h2>
                <p className="text-xl text-background/70 mb-10 max-w-xl mx-auto">
                  Join thousands of students who are already using StudyPal to
                  learn faster and retain more.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    size="lg"
                    className="h-14 px-10 text-lg font-bold rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 transition-transform hover:scale-105 active:scale-95 shadow-2xl"
                  >
                    Get Started Now — It's Free
                  </Button>
                </div>
                <p className="mt-6 text-sm text-background/50 italic">
                  No credit card required for the free plan.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
