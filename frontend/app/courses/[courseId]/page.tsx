"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  BookOpen,
  BrainCircuit,
  Check,
  CheckCircle,
  ChevronRight,
  Clock,
  Code,
  Download,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LineChart,
  LogOut,
  Play,
  Settings,
  Star,
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
import { Separator } from "@/components/ui/separator"
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

// Course data (would come from API in a real app)
const courseData = {
  id: "data-science",
  title: "Data Science Fundamentals",
  description: "Master the core concepts and tools of data science and machine learning",
  instructor: "Dr. Sarah Johnson",
  totalModules: 5,
  estimatedHours: 40,
  level: "Intermediate",
  rating: 4.8,
  reviews: 342,
  progress: 35,
  lastAccessed: "2023-12-15",
  modules: [
    {
      id: 1,
      title: "Introduction to Data Science",
      description: "Understand the fundamentals of data science and its applications",
      lessons: [
        { id: 101, title: "What is Data Science?", duration: "15 min", completed: true },
        { id: 102, title: "The Data Science Process", duration: "20 min", completed: true },
        { id: 103, title: "Tools and Technologies", duration: "25 min", completed: false },
        { id: 104, title: "Ethics in Data Science", duration: "18 min", completed: false },
      ],
      resources: [
        { id: 201, title: "Data Science Handbook", type: "PDF", url: "#" },
        { id: 202, title: "Introduction to Python", type: "Video", url: "#" },
      ],
      completed: false,
      progress: 50,
    },
    {
      id: 2,
      title: "Data Collection and Preprocessing",
      description: "Learn how to gather, clean, and prepare data for analysis",
      lessons: [
        { id: 105, title: "Data Collection Methods", duration: "22 min", completed: false },
        { id: 106, title: "Data Cleaning Techniques", duration: "30 min", completed: false },
        { id: 107, title: "Feature Engineering", duration: "28 min", completed: false },
        { id: 108, title: "Handling Missing Data", duration: "20 min", completed: false },
      ],
      resources: [
        { id: 203, title: "Data Preprocessing Guide", type: "PDF", url: "#" },
        { id: 204, title: "Pandas Tutorial", type: "Notebook", url: "#" },
      ],
      completed: false,
      progress: 0,
    },
    {
      id: 3,
      title: "Exploratory Data Analysis",
      description: "Discover patterns and insights through data visualization and analysis",
      lessons: [
        { id: 109, title: "Statistical Analysis Basics", duration: "25 min", completed: false },
        { id: 110, title: "Data Visualization Techniques", duration: "35 min", completed: false },
        { id: 111, title: "Pattern Recognition", duration: "30 min", completed: false },
        { id: 112, title: "Correlation and Causation", duration: "22 min", completed: false },
      ],
      resources: [
        { id: 205, title: "Visualization Best Practices", type: "PDF", url: "#" },
        { id: 206, title: "Matplotlib & Seaborn Tutorial", type: "Notebook", url: "#" },
      ],
      completed: false,
      progress: 0,
    },
    {
      id: 4,
      title: "Machine Learning Fundamentals",
      description: "Understand core machine learning algorithms and their applications",
      lessons: [
        { id: 113, title: "Supervised vs. Unsupervised Learning", duration: "20 min", completed: false },
        { id: 114, title: "Classification Algorithms", duration: "40 min", completed: false },
        { id: 115, title: "Regression Algorithms", duration: "35 min", completed: false },
        { id: 116, title: "Model Evaluation", duration: "25 min", completed: false },
      ],
      resources: [
        { id: 207, title: "Machine Learning Cheat Sheet", type: "PDF", url: "#" },
        { id: 208, title: "Scikit-Learn Tutorial", type: "Notebook", url: "#" },
      ],
      completed: false,
      progress: 0,
    },
    {
      id: 5,
      title: "Capstone Project",
      description: "Apply your knowledge to a real-world data science problem",
      lessons: [
        { id: 117, title: "Project Planning", duration: "15 min", completed: false },
        { id: 118, title: "Data Collection and Analysis", duration: "60 min", completed: false },
        { id: 119, title: "Model Development", duration: "90 min", completed: false },
        { id: 120, title: "Results Presentation", duration: "30 min", completed: false },
      ],
      resources: [
        { id: 209, title: "Project Guidelines", type: "PDF", url: "#" },
        { id: 210, title: "Sample Projects", type: "ZIP", url: "#" },
      ],
      completed: false,
      progress: 0,
    },
  ],
}

export default function CourseDetailPage({ params }) {
  const [course, setCourse] = useState(courseData)
  const [activeModule, setActiveModule] = useState(1)

  // Function to toggle lesson completion
  const toggleLessonCompletion = (moduleId, lessonId) => {
    const updatedCourse = { ...course }
    const moduleIndex = updatedCourse.modules.findIndex((m) => m.id === moduleId)

    if (moduleIndex !== -1) {
      const lessonIndex = updatedCourse.modules[moduleIndex].lessons.findIndex((l) => l.id === lessonId)

      if (lessonIndex !== -1) {
        // Toggle the completed status
        updatedCourse.modules[moduleIndex].lessons[lessonIndex].completed =
          !updatedCourse.modules[moduleIndex].lessons[lessonIndex].completed

        // Update module progress
        const totalLessons = updatedCourse.modules[moduleIndex].lessons.length
        const completedLessons = updatedCourse.modules[moduleIndex].lessons.filter((l) => l.completed).length
        updatedCourse.modules[moduleIndex].progress = Math.round((completedLessons / totalLessons) * 100)

        // Update module completion status
        updatedCourse.modules[moduleIndex].completed = completedLessons === totalLessons

        // Update overall course progress
        const totalModuleLessons = updatedCourse.modules.reduce((acc, module) => acc + module.lessons.length, 0)
        const totalCompletedLessons = updatedCourse.modules.reduce(
          (acc, module) => acc + module.lessons.filter((l) => l.completed).length,
          0,
        )
        updatedCourse.progress = Math.round((totalCompletedLessons / totalModuleLessons) * 100)

        setCourse(updatedCourse)
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
              <h1 className="text-xl font-semibold text-foreground">Course Details</h1>
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
            {/* Course Header */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                      variant="outline"
                      className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                    >
                      {course.level}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                    >
                      <Star className="mr-1 h-3 w-3" /> {course.rating} ({course.reviews} reviews)
                    </Badge>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground">{course.title}</h1>
                  <p className="text-muted-foreground mt-1">{course.description}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="gap-2">
                    <Play className="h-4 w-4" /> Continue Learning
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" /> Download Materials
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className="bg-card/50">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <BrainCircuit className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Instructor</p>
                      <p className="font-medium">{course.instructor}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-card/50">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Estimated Time</p>
                      <p className="font-medium">{course.estimatedHours} hours</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-card/50">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Modules</p>
                      <p className="font-medium">{course.totalModules} modules</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Progress Bar */}
              <Card className="mb-8">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-medium">Your Progress</h3>
                      <p className="text-sm text-muted-foreground">
                        Last accessed on {formatDate(course.lastAccessed)}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-primary">{course.progress}%</span>
                      <p className="text-sm text-muted-foreground">Completed</p>
                    </div>
                  </div>
                  <Progress value={course.progress} className="h-3 mt-2" />
                </CardContent>
              </Card>
            </div>

            {/* Course Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Module Navigation */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader className="pb-3">
                    <CardTitle>Course Modules</CardTitle>
                    <CardDescription>Track your progress through each module</CardDescription>
                  </CardHeader>
                  <CardContent className="px-2 pb-2">
                    <div className="space-y-1">
                      {course.modules.map((module, index) => (
                        <Button
                          key={module.id}
                          variant={activeModule === module.id ? "default" : "ghost"}
                          className={`w-full justify-start ${activeModule === module.id ? "" : "hover:bg-accent"}`}
                          onClick={() => setActiveModule(module.id)}
                        >
                          <div className="flex items-center gap-3 w-full">
                            <div
                              className={`h-8 w-8 rounded-full flex items-center justify-center border-2 ${
                                module.completed
                                  ? "bg-green-100 border-green-500 text-green-700 dark:bg-green-900/30 dark:border-green-700 dark:text-green-400"
                                  : module.progress > 0
                                    ? "bg-blue-100 border-blue-500 text-blue-700 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-400"
                                    : "bg-muted border-muted-foreground/30 text-muted-foreground"
                              }`}
                            >
                              {module.completed ? <Check className="h-4 w-4" /> : <span>{index + 1}</span>}
                            </div>
                            <div className="flex-1 flex flex-col">
                              <span className="font-medium">{module.title}</span>
                              <div className="flex items-center gap-2">
                                <Progress value={module.progress} className="h-1.5 flex-1" />
                                <span className="text-xs text-muted-foreground">{module.progress}%</span>
                              </div>
                            </div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Module Content */}
              <div className="lg:col-span-2">
                {course.modules.map((module) => (
                  <div key={module.id} className={activeModule === module.id ? "block" : "hidden"}>
                    <Card className="mb-6">
                      <CardHeader>
                        <CardTitle>{module.title}</CardTitle>
                        <CardDescription>{module.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Tabs defaultValue="lessons">
                          <TabsList className="mb-4">
                            <TabsTrigger value="lessons">Lessons</TabsTrigger>
                            <TabsTrigger value="resources">Resources</TabsTrigger>
                          </TabsList>

                          <TabsContent value="lessons" className="space-y-4">
                            {module.lessons.map((lesson) => (
                              <div
                                key={lesson.id}
                                className={`p-4 rounded-lg border ${
                                  lesson.completed
                                    ? "bg-green-50 border-green-200 dark:bg-green-900/10 dark:border-green-900/30"
                                    : "bg-card border-border"
                                }`}
                              >
                                <div className="flex items-start gap-3">
                                  <Checkbox
                                    id={`lesson-${lesson.id}`}
                                    checked={lesson.completed}
                                    onCheckedChange={() => toggleLessonCompletion(module.id, lesson.id)}
                                    className="mt-1"
                                  />
                                  <div className="flex-1">
                                    <Label
                                      htmlFor={`lesson-${lesson.id}`}
                                      className={`font-medium ${lesson.completed ? "line-through opacity-70" : ""}`}
                                    >
                                      {lesson.title}
                                    </Label>
                                    <div className="flex items-center gap-4 mt-1">
                                      <span className="text-xs text-muted-foreground flex items-center">
                                        <Clock className="h-3 w-3 mr-1" /> {lesson.duration}
                                      </span>
                                      {lesson.completed ? (
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
                            {module.resources.map((resource) => (
                              <div key={resource.id} className="p-4 rounded-lg border bg-card">
                                <div className="flex items-center gap-3">
                                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                    {resource.type === "PDF" ? (
                                      <FileText className="h-5 w-5 text-primary" />
                                    ) : resource.type === "Video" ? (
                                      <Play className="h-5 w-5 text-primary" />
                                    ) : resource.type === "Notebook" ? (
                                      <Code className="h-5 w-5 text-primary" />
                                    ) : (
                                      <Download className="h-5 w-5 text-primary" />
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <p className="font-medium">{resource.title}</p>
                                    <p className="text-xs text-muted-foreground">{resource.type}</p>
                                  </div>
                                  <Button size="sm" variant="outline" asChild>
                                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                      <Download className="h-4 w-4 mr-1" /> Download
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
                          disabled={activeModule === 1}
                          onClick={() => setActiveModule((prev) => Math.max(1, prev - 1))}
                        >
                          <ArrowLeft className="mr-2 h-4 w-4" /> Previous Module
                        </Button>
                        <Button
                          disabled={activeModule === course.modules.length}
                          onClick={() => setActiveModule((prev) => Math.min(course.modules.length, prev + 1))}
                        >
                          Next Module <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                ))}
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
            <p className="text-xs text-muted-foreground">Academic Guide</p>
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
                <Link href="/courses/data-science">
                  <div className="h-8 w-8 rounded-md bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 flex items-center justify-center mr-3">
                    <GraduationCap className="h-4 w-4" />
                  </div>
                  <span>My Courses</span>
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

        <Separator className="my-4 bg-border/50" />

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

