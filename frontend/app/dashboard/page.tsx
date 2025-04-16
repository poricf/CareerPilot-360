"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  BrainCircuit,
  Briefcase,
  ChevronRight,
  FileText,
  LayoutDashboard,
  LineChart,
  LogOut,
  MessageSquare,
  Palette,
  Settings,
  Shield,
  User,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("recommendations")

  // Mock data for career recommendations
  const recommendedCareers = [
    {
      id: "cybersecurity",
      title: "Cybersecurity Specialist",
      description: "Protect organizations from digital threats and secure sensitive information.",
      progress: 35,
      matchScore: 92,
      icon: Shield,
      color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    },
    {
      id: "data-science",
      title: "Data Scientist",
      description: "Analyze complex data to extract insights and drive decision-making.",
      progress: 25,
      matchScore: 87,
      icon: LineChart,
      color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    },
    {
      id: "ux-designer",
      title: "UX/UI Designer",
      description: "Create intuitive, beautiful digital experiences for users.",
      progress: 0,
      matchScore: 78,
      icon: Palette,
      color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
    },
  ]

  const skillDevelopment = [
    {
      id: 1,
      title: "Critical Thinking",
      description: "Develop analytical reasoning and problem-solving abilities.",
      progress: 65,
      icon: BrainCircuit,
      color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    },
    {
      id: 2,
      title: "Communication Skills",
      description: "Enhance written and verbal communication for professional success.",
      progress: 40,
      icon: MessageSquare,
      color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    },
    {
      id: 3,
      title: "Teamwork & Collaboration",
      description: "Learn to work effectively in group settings and collaborative projects.",
      progress: 55,
      icon: Users,
      color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    },
  ]

  const learningResources = [
    {
      id: 1,
      title: "Career Exploration Library",
      description: "Access to premium resources about various career paths.",
      icon: BookOpen,
      color: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
      link: "#",
    },
    {
      id: 2,
      title: "Industry Reports Database",
      description: "Curated collection of industry trends and job market analysis.",
      icon: FileText,
      color: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
      link: "#",
    },
    {
      id: 3,
      title: "Mentorship Program",
      description: "Connect with professionals in your chosen career field.",
      icon: User,
      color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
      link: "#",
    },
  ]

  // Career roadmap data
  const roadmapSteps = [
    { id: 1, title: "Self Assessment", completed: true },
    { id: 2, title: "Career Exploration", completed: true },
    { id: 3, title: "Skill Development", completed: false },
    { id: 4, title: "Education Planning", completed: false },
    { id: 5, title: "Professional Experience", completed: false },
    { id: 6, title: "Career Launch", completed: false },
  ]

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        {/* Enhanced Sidebar */}
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
                  <SidebarMenuButton
                    asChild
                    isActive
                    className="h-10 px-4 hover:bg-primary/10 dark:hover:bg-primary/20"
                  >
                    <Link href="/dashboard">
                      <div className="h-8 w-8 rounded-md bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 flex items-center justify-center mr-3">
                        <LayoutDashboard className="h-4 w-4" />
                      </div>
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="h-10 px-4 hover:bg-primary/10 dark:hover:bg-primary/20">
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

        <div className="flex-1">
          <header className="bg-card border-b border-border px-4 py-3 flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center">
              <SidebarTrigger className="mr-4" />
              <h1 className="text-xl font-semibold text-foreground">Your Career Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/form">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Update Preferences
                </Link>
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </header>

          <main className="p-4 md:p-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Welcome back, Jane!</h2>
              <p className="text-muted-foreground">
                Here are your personalized career recommendations based on your profile.
              </p>
            </div>

            {/* Interactive Roadmap */}
            <Card className="mb-8 overflow-hidden border-border shadow-sm">
              <CardHeader className="bg-card/50">
                <CardTitle>Your Career Planning Roadmap</CardTitle>
                <CardDescription>Track your progress through your career planning journey</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="relative">
                  <div className="absolute top-1/2 left-0 right-0 h-1 bg-muted -translate-y-1/2"></div>
                  <div className="flex justify-between relative">
                    {roadmapSteps.map((step, index) => (
                      <div key={step.id} className="flex flex-col items-center relative z-10">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 
                            ${
                              step.completed
                                ? "bg-green-500 text-white dark:bg-green-600"
                                : "bg-card border-2 border-muted-foreground/30 text-muted-foreground"
                            }`}
                        >
                          {step.completed ? <CheckIcon className="h-4 w-4" /> : <span>{step.id}</span>}
                        </div>
                        <span
                          className={`text-xs font-medium text-center max-w-[80px] ${step.completed ? "text-green-700 dark:text-green-400" : "text-muted-foreground"}`}
                        >
                          {step.title}
                        </span>
                        {index < roadmapSteps.length - 1 && (
                          <div
                            className={`absolute top-4 left-8 h-0.5 w-[calc(100%-16px)] -translate-y-1/2 
                              ${step.completed ? "bg-green-500 dark:bg-green-600" : "bg-muted"}`}
                            style={{ width: "calc(100% - 16px)", left: "calc(50% + 8px)" }}
                          ></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="careers" className="mb-8">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="careers">Recommended Careers</TabsTrigger>
                <TabsTrigger value="skills">Skill Development</TabsTrigger>
                <TabsTrigger value="resources">Learning Resources</TabsTrigger>
              </TabsList>

              <TabsContent value="careers" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {recommendedCareers.map((career) => (
                    <motion.div
                      key={career.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: career.id === "cybersecurity" ? 0.1 : career.id === "data-science" ? 0.2 : 0.3,
                      }}
                    >
                      <Card className="h-full flex flex-col hover:shadow-md transition-shadow border-border dark:neon-border">
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between">
                            <div className={`p-2 rounded-lg ${career.color}`}>
                              <career.icon className="h-5 w-5" />
                            </div>
                            <span className="text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full">
                              {career.matchScore}% Match
                            </span>
                          </div>
                          <CardTitle className="text-lg mt-3">{career.title}</CardTitle>
                          <CardDescription className="text-muted-foreground">{career.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2 pt-0 flex-grow">
                          {career.progress > 0 && (
                            <div className="mt-4">
                              <div className="flex justify-between text-xs mb-1">
                                <span>Career Path Progress</span>
                                <span>{career.progress}%</span>
                              </div>
                              <Progress value={career.progress} className="h-2" />
                            </div>
                          )}
                        </CardContent>
                        <CardFooter className="border-t bg-muted/30 mt-auto">
                          <Button variant="ghost" size="sm" className="ml-auto text-primary" asChild>
                            <Link href={`/careers/${career.id}`}>
                              {career.progress > 0 ? "Continue Path" : "Explore Path"}{" "}
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="skills" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {skillDevelopment.map((skill) => (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: skill.id * 0.1 }}
                    >
                      <Card className="h-full flex flex-col hover:shadow-md transition-shadow border-border dark:neon-border">
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between">
                            <div className={`p-2 rounded-lg ${skill.color}`}>
                              <skill.icon className="h-5 w-5" />
                            </div>
                            <span className="text-xs font-medium bg-muted px-2 py-1 rounded-full">
                              {skill.progress}% Mastered
                            </span>
                          </div>
                          <CardTitle className="text-lg mt-3">{skill.title}</CardTitle>
                          <CardDescription className="text-muted-foreground">{skill.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2 pt-0 flex-grow">
                          <Progress value={skill.progress} className="h-2 mt-2" />
                        </CardContent>
                        <CardFooter className="border-t bg-muted/30 mt-auto">
                          <Button variant="ghost" size="sm" className="ml-auto text-primary">
                            Develop Skill <ChevronRight className="ml-1 h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="resources" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {learningResources.map((resource) => (
                    <motion.div
                      key={resource.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: resource.id * 0.1 }}
                    >
                      <Card className="h-full flex flex-col hover:shadow-md transition-shadow border-border dark:neon-border">
                        <CardHeader className="pb-4">
                          <div className={`p-2 rounded-lg ${resource.color} w-fit`}>
                            <resource.icon className="h-5 w-5" />
                          </div>
                          <CardTitle className="text-lg mt-3">{resource.title}</CardTitle>
                          <CardDescription className="text-muted-foreground">{resource.description}</CardDescription>
                        </CardHeader>
                        <CardFooter className="border-t bg-muted/30 mt-auto">
                          <Button variant="ghost" size="sm" className="ml-auto text-primary" asChild>
                            <Link href={resource.link}>
                              Access Resource <ChevronRight className="ml-1 h-4 w-4" />
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <Card className="border-border shadow-sm">
              <CardHeader>
                <CardTitle>Not sure about your career path?</CardTitle>
                <CardDescription>Try our exploratory mode to discover more career options</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Our interactive personality quiz can help you discover career paths that align with your natural
                  strengths, interests, and preferences.
                </p>
                <Button asChild>
                  <Link href="/explore">
                    Explore More Careers <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

// Simple check icon component
function CheckIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

