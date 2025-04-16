"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Award,
  BookOpen,
  BrainCircuit,
  Briefcase,
  Building2,
  Check,
  CheckCircle,
  ChevronRight,
  Clock,
  Code,
  Download,
  FileText,
  LayoutDashboard,
  LineChart,
  LogOut,
  Play,
  Settings,
  TrendingUp,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

// Career path data (would come from API in a real app)
const careerData = {
  id: "cybersecurity",
  title: "Cybersecurity Specialist",
  description: "Protect organizations from digital threats and secure sensitive information",
  salaryRange: "$80,000 - $150,000",
  growthRate: "33% (Much faster than average)",
  workLifeBalance: "Good",
  remoteOptions: "Excellent",
  progress: 35,
  lastUpdated: "2023-12-15",
  keySkills: [
    { name: "Network Security", proficiency: 60 },
    { name: "Ethical Hacking", proficiency: 45 },
    { name: "Security Analysis", proficiency: 70 },
    { name: "Incident Response", proficiency: 30 },
    { name: "Risk Management", proficiency: 50 },
  ],
  milestones: [
    {
      id: 1,
      title: "Foundation Knowledge",
      description: "Build fundamental knowledge in IT and security concepts",
      steps: [
        { id: 101, title: "Learn Computer Networking Basics", duration: "2-3 months", completed: true },
        { id: 102, title: "Understand Operating Systems Security", duration: "2-3 months", completed: true },
        { id: 103, title: "Study Cryptography Fundamentals", duration: "1-2 months", completed: false },
        { id: 104, title: "Learn Security Protocols", duration: "1-2 months", completed: false },
      ],
      resources: [
        { id: 201, title: "CompTIA Network+ Certification Guide", type: "Book", url: "#" },
        { id: 202, title: "Introduction to Cybersecurity", type: "Online Course", url: "#" },
      ],
      completed: false,
      progress: 50,
    },
    {
      id: 2,
      title: "Technical Skills Development",
      description: "Acquire hands-on technical skills in security tools and practices",
      steps: [
        { id: 105, title: "Learn Security Tools (Wireshark, Nmap)", duration: "2-3 months", completed: false },
        { id: 106, title: "Practice Vulnerability Assessment", duration: "2-3 months", completed: false },
        { id: 107, title: "Study Penetration Testing", duration: "3-4 months", completed: false },
        { id: 108, title: "Learn Security Information Management", duration: "2-3 months", completed: false },
      ],
      resources: [
        { id: 203, title: "Ethical Hacking Course", type: "Online Course", url: "#" },
        { id: 204, title: "Cybersecurity Labs", type: "Practice Platform", url: "#" },
      ],
      completed: false,
      progress: 0,
    },
    {
      id: 3,
      title: "Certifications",
      description: "Obtain industry-recognized certifications to validate your skills",
      steps: [
        { id: 109, title: "CompTIA Security+", duration: "2-3 months", completed: false },
        { id: 110, title: "Certified Ethical Hacker (CEH)", duration: "3-4 months", completed: false },
        {
          id: 111,
          title: "Certified Information Systems Security Professional (CISSP)",
          duration: "6-12 months",
          completed: false,
        },
      ],
      resources: [
        { id: 205, title: "Security+ Study Guide", type: "Book", url: "#" },
        { id: 206, title: "CEH Practice Exams", type: "Practice Tests", url: "#" },
      ],
      completed: false,
      progress: 0,
    },
    {
      id: 4,
      title: "Professional Experience",
      description: "Gain practical experience through internships or entry-level positions",
      steps: [
        { id: 113, title: "Security Analyst Internship", duration: "3-6 months", completed: false },
        { id: 114, title: "Junior Security Analyst Role", duration: "1-2 years", completed: false },
        { id: 115, title: "Security Operations Center (SOC) Analyst", duration: "1-2 years", completed: false },
      ],
      resources: [
        { id: 207, title: "Cybersecurity Internship Guide", type: "PDF", url: "#" },
        { id: 208, title: "Security Analyst Resume Template", type: "Template", url: "#" },
      ],
      completed: false,
      progress: 0,
    },
    {
      id: 5,
      title: "Specialization",
      description: "Develop expertise in a specific area of cybersecurity",
      steps: [
        {
          id: 117,
          title: "Choose Specialization (e.g., Cloud Security, Forensics)",
          duration: "1 month",
          completed: false,
        },
        { id: 118, title: "Advanced Training in Chosen Field", duration: "6-12 months", completed: false },
        { id: 119, title: "Specialized Certification", duration: "3-6 months", completed: false },
        { id: 120, title: "Build Portfolio of Projects", duration: "Ongoing", completed: false },
      ],
      resources: [
        { id: 209, title: "Cybersecurity Specialization Paths", type: "Guide", url: "#" },
        { id: 210, title: "Advanced Security Projects", type: "Project Ideas", url: "#" },
      ],
      completed: false,
      progress: 0,
    },
  ],
  educationPaths: [
    {
      type: "Traditional",
      description: "Bachelor's degree in Computer Science, Cybersecurity, or related field",
      timeline: "4 years",
      institutions: ["University of Washington", "Georgia Tech", "Purdue University"],
      pros: ["Comprehensive foundation", "Networking opportunities", "Structured learning"],
      cons: ["Time-intensive", "Higher cost", "Some outdated curriculum"],
    },
    {
      type: "Bootcamp",
      description: "Intensive cybersecurity bootcamp program",
      timeline: "3-6 months",
      institutions: ["Flatiron School", "Fullstack Academy", "SecureSet"],
      pros: ["Fast-track to skills", "Practical focus", "Career services"],
      cons: ["Less comprehensive", "Intense pace", "Fewer fundamentals"],
    },
    {
      type: "Self-Directed",
      description: "Self-paced learning through online courses and certifications",
      timeline: "1-2 years",
      platforms: ["Coursera", "Udemy", "TryHackMe", "HackTheBox"],
      pros: ["Flexible schedule", "Lower cost", "Learn at your pace"],
      cons: ["Requires self-discipline", "Less structured", "No formal credentials"],
    },
  ],
  careerOutlook: {
    demandLevel: "Very High",
    jobGrowth: "33% over the next decade",
    topEmployers: ["Tech Companies", "Financial Institutions", "Government Agencies", "Healthcare Organizations"],
    entryLevelSalary: "$70,000 - $90,000",
    midCareerSalary: "$100,000 - $130,000",
    seniorLevelSalary: "$130,000 - $200,000+",
  },
  personalityFit: ["Analytical thinker", "Detail-oriented", "Problem solver", "Continuous learner", "Ethical mindset"],
}

export default function CareerDetailPage({ params }) {
  const [career, setCareer] = useState(careerData)
  const [activeMilestone, setActiveMilestone] = useState(1)

  // Function to toggle step completion
  const toggleStepCompletion = (milestoneId, stepId) => {
    const updatedCareer = { ...career }
    const milestoneIndex = updatedCareer.milestones.findIndex((m) => m.id === milestoneId)

    if (milestoneIndex !== -1) {
      const stepIndex = updatedCareer.milestones[milestoneIndex].steps.findIndex((s) => s.id === stepId)

      if (stepIndex !== -1) {
        // Toggle the completed status
        updatedCareer.milestones[milestoneIndex].steps[stepIndex].completed =
          !updatedCareer.milestones[milestoneIndex].steps[stepIndex].completed

        // Update milestone progress
        const totalSteps = updatedCareer.milestones[milestoneIndex].steps.length
        const completedSteps = updatedCareer.milestones[milestoneIndex].steps.filter((s) => s.completed).length
        updatedCareer.milestones[milestoneIndex].progress = Math.round((completedSteps / totalSteps) * 100)

        // Update milestone completion status
        updatedCareer.milestones[milestoneIndex].completed = completedSteps === totalSteps

        // Update overall career progress
        const totalMilestoneSteps = updatedCareer.milestones.reduce((acc, milestone) => acc + milestone.steps.length, 0)
        const totalCompletedSteps = updatedCareer.milestones.reduce(
          (acc, milestone) => acc + milestone.steps.filter((s) => s.completed).length,
          0,
        )
        updatedCareer.progress = Math.round((totalCompletedSteps / totalMilestoneSteps) * 100)

        setCareer(updatedCareer)
      }
    }
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <EnhancedSidebar />

        <div className="flex-1">
          <header className="bg-card border-b border-border px-4 py-3 flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center">
              <SidebarTrigger className="mr-4" />
              <h1 className="text-xl font-semibold text-foreground">Career Path Details</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Link>
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </header>

          <main className="p-4 md:p-6">
            {/* Career Header */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                      variant="outline"
                      className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                    >
                      Tech Industry
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    >
                      <TrendingUp className="mr-1 h-3 w-3" /> High Growth
                    </Badge>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground">{career.title}</h1>
                  <p className="text-muted-foreground mt-1">{career.description}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="gap-2">
                    <Briefcase className="h-4 w-4" /> Find Job Openings
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" /> Download Career Guide
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card className="bg-card/50">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Briefcase className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Salary Range</p>
                      <p className="font-medium">{career.salaryRange}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-card/50">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Growth Rate</p>
                      <p className="font-medium">{career.growthRate}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-card/50">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Work-Life Balance</p>
                      <p className="font-medium">{career.workLifeBalance}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-card/50">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Remote Options</p>
                      <p className="font-medium">{career.remoteOptions}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Progress Bar */}
              <Card className="mb-8">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-medium">Your Career Progress</h3>
                      <p className="text-sm text-muted-foreground">Last updated on {formatDate(career.lastUpdated)}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-primary">{career.progress}%</span>
                      <p className="text-sm text-muted-foreground">Completed</p>
                    </div>
                  </div>
                  <Progress value={career.progress} className="h-3 mt-2" />
                </CardContent>
              </Card>
            </div>

            {/* Key Skills */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Key Skills for {career.title}</CardTitle>
                <CardDescription>Track your proficiency in essential skills for this career path</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {career.keySkills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between">
                        <Label>{skill.name}</Label>
                        <span className="text-sm text-muted-foreground">{skill.proficiency}%</span>
                      </div>
                      <Progress value={skill.proficiency} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-6">
                <Button variant="outline" className="w-full">
                  <Award className="mr-2 h-4 w-4" /> Take Skills Assessment
                </Button>
              </CardFooter>
            </Card>

            {/* Career Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Milestone Navigation */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader className="pb-3">
                    <CardTitle>Career Milestones</CardTitle>
                    <CardDescription>Track your progress through each career stage</CardDescription>
                  </CardHeader>
                  <CardContent className="px-2 pb-2">
                    <div className="space-y-1">
                      {career.milestones.map((milestone, index) => (
                        <Button
                          key={milestone.id}
                          variant={activeMilestone === milestone.id ? "default" : "ghost"}
                          className={`w-full justify-start ${activeMilestone === milestone.id ? "" : "hover:bg-accent"}`}
                          onClick={() => setActiveMilestone(milestone.id)}
                        >
                          <div className="flex items-center gap-3 w-full">
                            <div
                              className={`h-8 w-8 rounded-full flex items-center justify-center border-2 ${
                                milestone.completed
                                  ? "bg-green-100 border-green-500 text-green-700 dark:bg-green-900/30 dark:border-green-700 dark:text-green-400"
                                  : milestone.progress > 0
                                    ? "bg-blue-100 border-blue-500 text-blue-700 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-400"
                                    : "bg-muted border-muted-foreground/30 text-muted-foreground"
                              }`}
                            >
                              {milestone.completed ? <Check className="h-4 w-4" /> : <span>{index + 1}</span>}
                            </div>
                            <div className="flex-1 flex flex-col">
                              <span className="font-medium">{milestone.title}</span>
                              <div className="flex items-center gap-2">
                                <Progress value={milestone.progress} className="h-1.5 flex-1" />
                                <span className="text-xs text-muted-foreground">{milestone.progress}%</span>
                              </div>
                            </div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Milestone Content */}
              <div className="lg:col-span-2">
                {career.milestones.map((milestone) => (
                  <div key={milestone.id} className={activeMilestone === milestone.id ? "block" : "hidden"}>
                    <Card className="mb-6">
                      <CardHeader>
                        <CardTitle>{milestone.title}</CardTitle>
                        <CardDescription>{milestone.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Tabs defaultValue="steps">
                          <TabsList className="mb-4">
                            <TabsTrigger value="steps">Required Steps</TabsTrigger>
                            <TabsTrigger value="resources">Resources</TabsTrigger>
                          </TabsList>

                          <TabsContent value="steps" className="space-y-4">
                            {milestone.steps.map((step) => (
                              <div
                                key={step.id}
                                className={`p-4 rounded-lg border ${
                                  step.completed
                                    ? "bg-green-50 border-green-200 dark:bg-green-900/10 dark:border-green-900/30"
                                    : "bg-card border-border"
                                }`}
                              >
                                <div className="flex items-start gap-3">
                                  <Checkbox
                                    id={`step-${step.id}`}
                                    checked={step.completed}
                                    onCheckedChange={() => toggleStepCompletion(milestone.id, step.id)}
                                    className="mt-1"
                                  />
                                  <div className="flex-1">
                                    <Label
                                      htmlFor={`step-${step.id}`}
                                      className={`font-medium ${step.completed ? "line-through opacity-70" : ""}`}
                                    >
                                      {step.title}
                                    </Label>
                                    <div className="flex items-center gap-4 mt-1">
                                      <span className="text-xs text-muted-foreground flex items-center">
                                        <Clock className="h-3 w-3 mr-1" /> {step.duration}
                                      </span>
                                      {step.completed ? (
                                        <span className="text-xs text-green-600 dark:text-green-400 flex items-center">
                                          <CheckCircle className="h-3 w-3 mr-1" /> Completed
                                        </span>
                                      ) : null}
                                    </div>
                                  </div>
                                  <Button size="sm" variant="ghost" className="ml-auto">
                                    <Play className="h-4 w-4 mr-1" /> Start
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </TabsContent>

                          <TabsContent value="resources" className="space-y-4">
                            {milestone.resources.map((resource) => (
                              <div key={resource.id} className="p-4 rounded-lg border bg-card">
                                <div className="flex items-center gap-3">
                                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                    {resource.type === "Book" ? (
                                      <BookOpen className="h-5 w-5 text-primary" />
                                    ) : resource.type === "Online Course" ? (
                                      <Play className="h-5 w-5 text-primary" />
                                    ) : resource.type === "Practice Platform" ? (
                                      <Code className="h-5 w-5 text-primary" />
                                    ) : (
                                      <FileText className="h-5 w-5 text-primary" />
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <p className="font-medium">{resource.title}</p>
                                    <p className="text-xs text-muted-foreground">{resource.type}</p>
                                  </div>
                                  <Button size="sm" variant="outline" asChild>
                                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                      Access Resource
                                    </a>
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </TabsContent>
                        </Tabs>
                      </CardContent>
                      <CardFooter className="border-t pt-6 flex justify-between">
                        <Button
                          variant="outline"
                          disabled={activeMilestone === 1}
                          onClick={() => setActiveMilestone((prev) => Math.max(1, prev - 1))}
                        >
                          <ArrowLeft className="mr-2 h-4 w-4" /> Previous Milestone
                        </Button>
                        <Button
                          disabled={activeMilestone === career.milestones.length}
                          onClick={() => setActiveMilestone((prev) => Math.min(career.milestones.length, prev + 1))}
                        >
                          Next Milestone <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                ))}

                {/* Education Paths */}
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Education Paths</CardTitle>
                    <CardDescription>Different ways to acquire the necessary education for this career</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="traditional">
                      <TabsList className="mb-4">
                        <TabsTrigger value="traditional">Traditional</TabsTrigger>
                        <TabsTrigger value="bootcamp">Bootcamp</TabsTrigger>
                        <TabsTrigger value="self">Self-Directed</TabsTrigger>
                      </TabsList>

                      {career.educationPaths.map((path) => (
                        <TabsContent
                          key={path.type.toLowerCase()}
                          value={path.type.toLowerCase()}
                          className="space-y-4"
                        >
                          <div className="p-4 rounded-lg border bg-card/50">
                            <h3 className="font-semibold text-lg mb-2">{path.type} Education Path</h3>
                            <p className="text-muted-foreground mb-4">{path.description}</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <h4 className="font-medium text-sm mb-2">Timeline</h4>
                                <p>{path.timeline}</p>
                              </div>
                              <div>
                                <h4 className="font-medium text-sm mb-2">
                                  {path.type === "Self-Directed" ? "Recommended Platforms" : "Top Institutions"}
                                </h4>
                                <ul className="list-disc list-inside">
                                  {(path.institutions || path.platforms).map((item, i) => (
                                    <li key={i} className="text-sm">
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-medium text-sm mb-2 text-green-600 dark:text-green-400">Pros</h4>
                                <ul className="list-disc list-inside">
                                  {path.pros.map((pro, i) => (
                                    <li key={i} className="text-sm">
                                      {pro}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h4 className="font-medium text-sm mb-2 text-red-600 dark:text-red-400">Cons</h4>
                                <ul className="list-disc list-inside">
                                  {path.cons.map((con, i) => (
                                    <li key={i} className="text-sm">
                                      {con}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </CardContent>
                </Card>

                {/* Career Outlook */}
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Career Outlook</CardTitle>
                    <CardDescription>Industry trends and future prospects for this career path</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium text-sm text-muted-foreground">Demand Level</h3>
                          <p className="font-semibold">{career.careerOutlook.demandLevel}</p>
                        </div>
                        <div>
                          <h3 className="font-medium text-sm text-muted-foreground">Job Growth</h3>
                          <p className="font-semibold">{career.careerOutlook.jobGrowth}</p>
                        </div>
                        <div>
                          <h3 className="font-medium text-sm text-muted-foreground">Top Employers</h3>
                          <ul className="list-disc list-inside">
                            {career.careerOutlook.topEmployers.map((employer, i) => (
                              <li key={i} className="text-sm">
                                {employer}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium text-sm text-muted-foreground">Entry-Level Salary</h3>
                          <p className="font-semibold">{career.careerOutlook.entryLevelSalary}</p>
                        </div>
                        <div>
                          <h3 className="font-medium text-sm text-muted-foreground">Mid-Career Salary</h3>
                          <p className="font-semibold">{career.careerOutlook.midCareerSalary}</p>
                        </div>
                        <div>
                          <h3 className="font-medium text-sm text-muted-foreground">Senior-Level Salary</h3>
                          <p className="font-semibold">{career.careerOutlook.seniorLevelSalary}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Personality Fit */}
                <Card>
                  <CardHeader>
                    <CardTitle>Personality Fit</CardTitle>
                    <CardDescription>Key traits that make someone successful in this career</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {career.personalityFit.map((trait, index) => (
                        <Badge key={index} variant="secondary" className="text-sm py-1 px-3">
                          {trait}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-6">
                    <Button className="w-full">
                      <BrainCircuit className="mr-2 h-4 w-4" /> Take Personality Assessment
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

// Enhanced Sidebar Component
function EnhancedSidebar() {
  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="border-b border-border bg-gradient-to-r from-primary/10 to-transparent dark:from-primary/20">
        <div className="flex items-center gap-2 px-4 py-5">
          <div className="h-10 w-10 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center shadow-sm">
            <BrainCircuit className="h-5 w-5 text-primary" />
          </div>
          <div>
            <span className="text-lg font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent dark:neon-highlight">
              PathFinder AI
            </span>
            <p className="text-xs text-muted-foreground">Career Guide</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <div className="mb-4">
          <h3 className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Main Navigation
          </h3>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="h-10 px-4 hover:bg-primary/10 dark:hover:bg-primary/20">
                <Link href="/dashboard">
                  <div className="h-8 w-8 rounded-md bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 flex items-center justify-center mr-3">
                    <LayoutDashboard className="h-4 w-4" />
                  </div>
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive className="h-10 px-4 hover:bg-primary/10 dark:hover:bg-primary/20">
                <Link href="/careers/cybersecurity">
                  <div className="h-8 w-8 rounded-md bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 flex items-center justify-center mr-3">
                    <Briefcase className="h-4 w-4" />
                  </div>
                  <span>Career Paths</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="h-10 px-4 hover:bg-primary/10 dark:hover:bg-primary/20">
                <Link href="/explore">
                  <div className="h-8 w-8 rounded-md bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 flex items-center justify-center mr-3">
                    <LineChart className="h-4 w-4" />
                  </div>
                  <span>Explore Paths</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>

        <div className="my-4 h-px bg-border/50" />

        <div>
          <h3 className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Your Account
          </h3>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="h-10 px-4 hover:bg-primary/10 dark:hover:bg-primary/20">
                <Link href="/profile">
                  <div className="h-8 w-8 rounded-md bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 flex items-center justify-center mr-3">
                    <User className="h-4 w-4" />
                  </div>
                  <span>Profile</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="h-10 px-4 hover:bg-primary/10 dark:hover:bg-primary/20">
                <Link href="/settings">
                  <div className="h-8 w-8 rounded-md bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 flex items-center justify-center mr-3">
                    <Settings className="h-4 w-4" />
                  </div>
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-4 mt-auto">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-10 w-10 border-2 border-primary/20">
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
            <AvatarFallback className="bg-primary/10 text-primary">JD</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm">Jane Doe</p>
            <p className="text-xs text-muted-foreground">Student</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link href="/">
            <LogOut className="h-4 w-4 mr-2" /> Sign Out
          </Link>
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}

// Helper function to format dates
function formatDate(dateString) {
  const options = { year: "numeric", month: "short", day: "numeric" }
  return new Date(dateString).toLocaleDateString("en-US", options)
}

