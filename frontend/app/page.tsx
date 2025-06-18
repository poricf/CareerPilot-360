"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  GraduationCap,
  Instagram,
  Linkedin,
  Moon,
  Sparkles,
  Sun,
  Twitter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

export default function LandingPage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure theme toggle only renders client-side to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Features data
  const features = [
    {
      icon: <BrainCircuit className="h-6 w-6" />,
      title: "AI-Powered Career Matching",
      description:
        "Our advanced AI analyzes your unique profile to identify career paths that align with your strengths, interests, and goals.",
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "Personalized Roadmaps",
      description:
        "Get step-by-step guidance on education, skills, and experiences needed to succeed in your chosen career path.",
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Skills Assessment",
      description: "Discover your natural aptitudes and track your progress as you develop career-relevant skills.",
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Industry Insights",
      description: "Access up-to-date information on job market trends, salary expectations, and growth opportunities.",
    },
  ]

  // Testimonials data
  const testimonials = [
    {
      quote:
        "PathFinder AI helped me discover a career in cybersecurity that perfectly matches my analytical skills and interests. The personalized roadmap made all the difference!",
      name: "Alex Johnson",
      role: "Cybersecurity Analyst",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      quote:
        "I was undecided about my career path until I used PathFinder AI. The assessment was spot-on, and now I'm confidently pursuing UX design with a clear plan.",
      name: "Maya Patel",
      role: "UX Designer",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      quote:
        "The career insights and industry data provided by PathFinder AI gave me the confidence to transition into data science. Best career decision I've ever made!",
      name: "David Kim",
      role: "Data Scientist",
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background/80 to-background">
      {/* Navbar */}
      <header className="w-full py-4 px-4 sm:px-6 lg:px-8 border-b border-border/40 backdrop-blur-sm fixed top-0 z-50 bg-background/80">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
              <BrainCircuit className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent dark:neon-highlight">
              PathFinder AI
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              Features
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              Testimonials
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              How It Works
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
              >
                {theme === "light" ? (
                  <Moon className="h-5 w-5 text-slate-700" />
                ) : (
                  <Sun className="h-5 w-5 text-yellow-400" />
                )}
              </Button>
            )}
            <Button variant="outline" size="sm" asChild>
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button size="sm" className="hidden sm:flex">
              <Link href="/auth/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-24 md:py-32 mt-16">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="flex flex-col space-y-6 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary dark:bg-primary/20 mb-2 w-fit">
                <Sparkles className="mr-1 h-4 w-4" /> AI-Powered Career Guidance
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Discover Your Ideal{" "}
                <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent dark:neon-highlight">
                  Career Path
                </span>{" "}
                with AI
              </h1>
              <p className="text-lg text-muted-foreground">
                PathFinder AI analyzes your unique strengths, interests, and goals to recommend personalized career
                paths and guide you every step of the way.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  className="rounded-full px-8 bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-600 shadow-md hover:shadow-lg transition-all"
                >
                  <Link href="/auth/signup" className="flex items-center">
                    Start Your Journey
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="rounded-full px-8 border-primary/20 hover:bg-primary/5">
                  <Link href="#how-it-works">Learn More</Link>
                </Button>
              </div>
              <div className="flex items-center gap-2 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-muted overflow-hidden">
                      <Image
                        src={`/placeholder.svg?height=32&width=32&text=${i}`}
                        alt={`User ${i}`}
                        width={32}
                        height={32}
                      />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">5,000+</span> career paths discovered
                </p>
              </div>
            </motion.div>
            <motion.div
              className="flex justify-center relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative w-full max-w-md aspect-square">
                {/* Decorative elements */}
                <div className="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-primary/10 dark:bg-primary/20 blur-xl"></div>
                <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-purple-500/10 dark:bg-purple-500/20 blur-xl"></div>

                <div className="relative z-10 bg-card border border-border/40 shadow-xl rounded-2xl p-6 backdrop-blur-sm dark:neon-border">
                  <Image
                    src="/placeholder.svg?height=500&width=500&text=AI+Career+Guidance"
                    alt="AI Career Guidance Illustration"
                    width={500}
                    height={500}
                    className="object-contain rounded-lg"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/50 dark:bg-muted/10 border-y border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary">98%</p>
              <p className="text-sm text-muted-foreground mt-2">Career Satisfaction</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary">500+</p>
              <p className="text-sm text-muted-foreground mt-2">Career Paths</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary">100+</p>
              <p className="text-sm text-muted-foreground mt-2">Active Users</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary">92%</p>
              <p className="text-sm text-muted-foreground mt-2">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Discover Your Perfect Career Path</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform provides personalized career guidance based on your unique profile.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card border border-border/40 rounded-xl p-6 shadow-sm hover:shadow-md transition-all dark:neon-border"
              >
                <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mb-4 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-muted/30 dark:bg-muted/10 border-y border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">What Our Users Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover how PathFinder AI has helped thousands find their ideal career path.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card border border-border/40 rounded-xl p-6 shadow-sm hover:shadow-md transition-all dark:neon-border flex flex-col"
              >
                <div className="mb-4 text-primary">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-foreground italic mb-6 flex-grow">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full overflow-hidden mr-4 border border-border">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered system analyzes your profile to recommend the perfect career path for you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-1/4 left-0 right-0 h-0.5 bg-primary/20 z-0"></div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-card border border-border/40 rounded-xl p-6 shadow-sm hover:shadow-md transition-all dark:neon-border relative z-10"
            >
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4 text-purple-600 dark:text-purple-400">
                <span className="text-lg font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Share Your Profile</h3>
              <p className="text-muted-foreground">
                Tell us about your interests, strengths, and career goals through our intuitive assessment.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-card border border-border/40 rounded-xl p-6 shadow-sm hover:shadow-md transition-all dark:neon-border relative z-10"
            >
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
                <span className="text-lg font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">AI Analysis</h3>
              <p className="text-muted-foreground">
                Our advanced AI analyzes your profile and matches it with thousands of career paths and outcomes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-card border border-border/40 rounded-xl p-6 shadow-sm hover:shadow-md transition-all dark:neon-border relative z-10"
            >
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4 text-green-600 dark:text-green-400">
                <span className="text-lg font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Get Your Roadmap</h3>
              <p className="text-muted-foreground">
                Receive personalized career recommendations with detailed roadmaps and next steps.
              </p>
            </motion.div>
          </div>

          <div className="mt-16 text-center">
            <Button
              className="rounded-full px-8 bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-600 shadow-md hover:shadow-lg transition-all"
              size="lg"
            >
              <Link href="/auth/signup" className="flex items-center">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-purple-500/10 to-primary/5 dark:from-primary/20 dark:via-purple-500/20 dark:to-primary/10 border-y border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Discover Your Ideal Career Path?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of users who have found their perfect career match with PathFinder AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="rounded-full px-8 bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-600 shadow-md hover:shadow-lg transition-all"
              >
                <Link href="/auth/signup" className="flex items-center">
                  Get Started for Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8 border-primary/20 hover:bg-primary/5">
                <Link href="/explore">Explore Career Paths</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card text-foreground py-12 border-t border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <BrainCircuit className="h-6 w-6 text-primary" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent dark:neon-highlight">
                  PathFinder AI
                </span>
              </div>
              <p className="text-muted-foreground max-w-md">
                Empowering individuals to discover their ideal career paths through the power of artificial
                intelligence.
              </p>
              <div className="flex gap-4 mt-6">
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Career Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Industry Guides
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Research
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Career Library
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/40 mt-12 pt-8 text-center text-muted-foreground text-sm">
            <p>© {new Date().getFullYear()} PathFinder AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

