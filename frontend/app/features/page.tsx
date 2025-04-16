"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  Calendar,
  FileText,
  GraduationCap,
  LineChart,
  MessageSquare,
  PenTool,
  Settings,
  Sparkles,
  Users,
  Video,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border px-4 py-3 sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold text-foreground">PathFinder AI Features</h1>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Powerful Features to Accelerate Your Career Journey
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover all the tools and resources available to help you find and succeed in your ideal career path.
          </p>
        </div>

        <Tabs defaultValue="core" className="w-full mb-12">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="core">Core Features</TabsTrigger>
            <TabsTrigger value="premium">Premium Tools</TabsTrigger>
            <TabsTrigger value="upcoming">Coming Soon</TabsTrigger>
          </TabsList>

          <TabsContent value="core">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coreFeatures.map((feature, index) => (
                <FeatureCard key={index} feature={feature} index={index} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="premium">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {premiumFeatures.map((feature, index) => (
                <FeatureCard key={index} feature={feature} index={index} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upcoming">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingFeatures.map((feature, index) => (
                <FeatureCard key={index} feature={feature} index={index} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="max-w-3xl mx-auto mt-16 text-center">
          <Card className="bg-gradient-to-br from-primary/10 via-purple-500/10 to-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to unlock all features?</CardTitle>
              <CardDescription>
                Upgrade to our premium plan to access all tools and accelerate your career journey.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-600"
                size="lg"
              >
                Upgrade Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

function FeatureCard({ feature, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="h-full flex flex-col hover:shadow-md transition-shadow border-border">
        <CardHeader className="pb-2">
          <div className={`p-2 rounded-lg ${feature.iconBg} w-fit`}>
            <feature.icon className={`h-5 w-5 ${feature.iconColor}`} />
          </div>
          <CardTitle className="text-lg mt-3">{feature.title}</CardTitle>
          <CardDescription>{feature.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <ul className="space-y-2 text-sm">
            {feature.benefits.map((benefit, i) => (
              <li key={i} className="flex items-start">
                <span className="mr-2 text-primary">•</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="border-t pt-4 mt-auto">
          <Button variant="ghost" size="sm" className="ml-auto text-primary" asChild>
            <Link href={feature.link}>
              {feature.linkText} <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

const coreFeatures = [
  {
    title: "AI Career Matching",
    description: "Find your ideal career path with our advanced AI algorithm",
    icon: BrainCircuit,
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-700 dark:text-blue-400",
    benefits: [
      "Personalized career recommendations",
      "Match based on skills, interests, and values",
      "Regularly updated with new career paths",
      "Detailed match score explanations",
    ],
    link: "/explore",
    linkText: "Explore Careers",
  },
  {
    title: "Career Roadmaps",
    description: "Step-by-step guidance to reach your career goals",
    icon: LineChart,
    iconBg: "bg-purple-100 dark:bg-purple-900/30",
    iconColor: "text-purple-700 dark:text-purple-400",
    benefits: [
      "Customized milestone planning",
      "Education and skill requirements",
      "Timeline estimates",
      "Progress tracking",
    ],
    link: "/careers/cybersecurity",
    linkText: "View Sample Roadmap",
  },
  {
    title: "Skills Assessment",
    description: "Identify your strengths and areas for development",
    icon: Sparkles,
    iconBg: "bg-green-100 dark:bg-green-900/30",
    iconColor: "text-green-700 dark:text-green-400",
    benefits: [
      "Comprehensive skill evaluation",
      "Industry-specific assessments",
      "Skill gap analysis",
      "Personalized development recommendations",
    ],
    link: "/deep-assessment",
    linkText: "Take Assessment",
  },
  {
    title: "Learning Resources",
    description: "Access curated educational content for your career path",
    icon: BookOpen,
    iconBg: "bg-amber-100 dark:bg-amber-900/30",
    iconColor: "text-amber-700 dark:text-amber-400",
    benefits: [
      "Curated courses and tutorials",
      "Industry reports and insights",
      "Reading recommendations",
      "Learning path suggestions",
    ],
    link: "/dashboard",
    linkText: "Browse Resources",
  },
  {
    title: "Progress Tracking",
    description: "Monitor your career development journey",
    icon: Settings,
    iconBg: "bg-red-100 dark:bg-red-900/30",
    iconColor: "text-red-700 dark:text-red-400",
    benefits: [
      "Visual progress indicators",
      "Milestone completion tracking",
      "Skill development monitoring",
      "Achievement badges",
    ],
    link: "/profile",
    linkText: "View Your Progress",
  },
  {
    title: "Career Insights",
    description: "Stay informed about industry trends and opportunities",
    icon: FileText,
    iconBg: "bg-indigo-100 dark:bg-indigo-900/30",
    iconColor: "text-indigo-700 dark:text-indigo-400",
    benefits: [
      "Salary information and trends",
      "Job market demand analysis",
      "Industry growth projections",
      "Regional opportunity insights",
    ],
    link: "/dashboard",
    linkText: "Explore Insights",
  },
]

const premiumFeatures = [
  {
    title: "AI Resume Builder",
    description: "Create tailored resumes for your target career paths",
    icon: PenTool,
    iconBg: "bg-teal-100 dark:bg-teal-900/30",
    iconColor: "text-teal-700 dark:text-teal-400",
    benefits: [
      "AI-powered content suggestions",
      "Industry-specific templates",
      "Keyword optimization",
      "ATS compatibility checking",
    ],
    link: "#",
    linkText: "Build Your Resume",
  },
  {
    title: "Mentorship Matching",
    description: "Connect with professionals in your chosen field",
    icon: Users,
    iconBg: "bg-pink-100 dark:bg-pink-900/30",
    iconColor: "text-pink-700 dark:text-pink-400",
    benefits: [
      "Personalized mentor matching",
      "Scheduled video sessions",
      "Career advice from industry experts",
      "Networking opportunities",
    ],
    link: "#",
    linkText: "Find a Mentor",
  },
  {
    title: "Interview Preparation",
    description: "Practice and prepare for job interviews",
    icon: MessageSquare,
    iconBg: "bg-orange-100 dark:bg-orange-900/30",
    iconColor: "text-orange-700 dark:text-orange-400",
    benefits: [
      "AI-powered mock interviews",
      "Industry-specific questions",
      "Performance feedback",
      "Body language and communication tips",
    ],
    link: "#",
    linkText: "Practice Interviews",
  },
  {
    title: "Career Coaching",
    description: "Get personalized guidance from career experts",
    icon: GraduationCap,
    iconBg: "bg-cyan-100 dark:bg-cyan-900/30",
    iconColor: "text-cyan-700 dark:text-cyan-400",
    benefits: [
      "One-on-one coaching sessions",
      "Personalized career strategy",
      "Salary negotiation advice",
      "Career transition support",
    ],
    link: "#",
    linkText: "Book a Coach",
  },
  {
    title: "Job Application Tracker",
    description: "Organize and manage your job applications",
    icon: Calendar,
    iconBg: "bg-violet-100 dark:bg-violet-900/30",
    iconColor: "text-violet-700 dark:text-violet-400",
    benefits: ["Application status tracking", "Follow-up reminders", "Interview scheduling", "Application analytics"],
    link: "#",
    linkText: "Track Applications",
  },
  {
    title: "Advanced Assessments",
    description: "In-depth evaluations for career fit and development",
    icon: LineChart,
    iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
    iconColor: "text-emerald-700 dark:text-emerald-400",
    benefits: [
      "Personality profiling",
      "Cognitive ability testing",
      "Work style analysis",
      "Leadership potential assessment",
    ],
    link: "#",
    linkText: "Take Advanced Assessment",
  },
]

const upcomingFeatures = [
  {
    title: "Virtual Job Shadowing",
    description: "Experience different careers through virtual simulations",
    icon: Video,
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-700 dark:text-blue-400",
    benefits: [
      "Day-in-the-life simulations",
      "Interactive career scenarios",
      "Industry professional interviews",
      "Virtual workplace tours",
    ],
    link: "#",
    linkText: "Join Waitlist",
  },
  {
    title: "Career Community",
    description: "Connect with peers on similar career paths",
    icon: Users,
    iconBg: "bg-purple-100 dark:bg-purple-900/30",
    iconColor: "text-purple-700 dark:text-purple-400",
    benefits: ["Industry-specific discussion forums", "Peer support groups", "Knowledge sharing", "Networking events"],
    link: "#",
    linkText: "Join Waitlist",
  },
  {
    title: "Salary Negotiation Tools",
    description: "Maximize your earning potential with data-driven strategies",
    icon: LineChart,
    iconBg: "bg-green-100 dark:bg-green-900/30",
    iconColor: "text-green-700 dark:text-green-400",
    benefits: [
      "Salary benchmarking data",
      "Negotiation script builder",
      "Benefits comparison calculator",
      "Counter-offer strategies",
    ],
    link: "#",
    linkText: "Join Waitlist",
  },
]

