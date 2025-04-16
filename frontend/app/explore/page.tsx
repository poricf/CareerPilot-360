"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  BrainCircuit,
  ChevronRight,
  Code,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Lightbulb,
  LogOut,
  Palette,
  RefreshCw,
  Settings,
  User,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
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

// Quiz questions
const quizQuestions = [
  {
    id: 1,
    question: "Do you prefer working in teams or alone?",
    options: [
      { id: "team", label: "I enjoy collaborating with others in a team" },
      { id: "alone", label: "I prefer working independently on my own" },
      { id: "mixed", label: "I like a mix of both team and individual work" },
    ],
  },
  {
    id: 2,
    question: "How do you approach problem-solving?",
    options: [
      { id: "analytical", label: "I analyze data and follow logical steps" },
      { id: "creative", label: "I use creativity and intuition to find solutions" },
      { id: "practical", label: "I prefer hands-on, practical approaches" },
    ],
  },
  {
    id: 3,
    question: "What type of activities energize you?",
    options: [
      { id: "technical", label: "Building, designing, or working with technology" },
      { id: "social", label: "Helping, teaching, or interacting with people" },
      { id: "creative", label: "Creating art, writing, or expressing ideas" },
    ],
  },
  {
    id: 4,
    question: "How do you prefer to learn new information?",
    options: [
      { id: "visual", label: "Through visual aids like diagrams and videos" },
      { id: "auditory", label: "By listening to lectures or discussions" },
      { id: "kinesthetic", label: "By doing hands-on activities and practice" },
    ],
  },
  {
    id: 5,
    question: "What kind of impact do you want to make?",
    options: [
      { id: "innovation", label: "Creating new technologies or solutions" },
      { id: "social", label: "Helping people and improving society" },
      { id: "knowledge", label: "Advancing knowledge and understanding" },
    ],
  },
]

// Career paths based on quiz responses
const careerPaths = {
  technical: [
    {
      title: "Computer Science",
      description: "Develop software, design algorithms, and build the digital future.",
      icon: Code,
      color: "bg-blue-500",
      courses: ["Introduction to Programming", "Data Structures", "Software Engineering"],
    },
    {
      title: "Data Science",
      description: "Analyze complex data to extract insights and drive decision-making.",
      icon: BrainCircuit,
      color: "bg-purple-500",
      courses: ["Statistics", "Machine Learning", "Data Visualization"],
    },
    {
      title: "Engineering",
      description: "Design and build solutions to real-world problems.",
      icon: GraduationCap,
      color: "bg-indigo-500",
      courses: ["Physics", "Calculus", "Engineering Design"],
    },
  ],
  creative: [
    {
      title: "UX/UI Design",
      description: "Create intuitive, beautiful digital experiences for users.",
      icon: Palette,
      color: "bg-pink-500",
      courses: ["Design Principles", "User Research", "Prototyping"],
    },
    {
      title: "Digital Media",
      description: "Produce engaging content across various digital platforms.",
      icon: FileText,
      color: "bg-orange-500",
      courses: ["Media Production", "Digital Storytelling", "Web Design"],
    },
    {
      title: "Marketing",
      description: "Develop strategies to connect products and services with audiences.",
      icon: Lightbulb,
      color: "bg-yellow-500",
      courses: ["Marketing Principles", "Consumer Behavior", "Digital Marketing"],
    },
  ],
  social: [
    {
      title: "Psychology",
      description: "Understand human behavior and help others improve their lives.",
      icon: User,
      color: "bg-green-500",
      courses: ["Introduction to Psychology", "Developmental Psychology", "Counseling"],
    },
    {
      title: "Education",
      description: "Inspire and guide others through teaching and mentorship.",
      icon: BookOpen,
      color: "bg-teal-500",
      courses: ["Educational Psychology", "Curriculum Development", "Teaching Methods"],
    },
    {
      title: "Healthcare",
      description: "Provide care and support to improve health and wellbeing.",
      icon: Users,
      color: "bg-cyan-500",
      courses: ["Biology", "Anatomy", "Healthcare Ethics"],
    },
  ],
}

export default function ExplorePage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [quizComplete, setQuizComplete] = useState(false)
  const [recommendedPaths, setRecommendedPaths] = useState([])

  // Handle answer selection
  const handleAnswer = (questionId, answerId) => {
    setAnswers({
      ...answers,
      [questionId]: answerId,
    })
  }

  // Move to next question
  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      completeQuiz()
    }
  }

  // Move to previous question
  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  // Complete quiz and generate recommendations
  const completeQuiz = () => {
    // Simple algorithm to determine path type based on answers
    const answerValues = Object.values(answers)

    // Count occurrences of each answer type
    const counts = {
      technical: 0,
      creative: 0,
      social: 0,
    }

    // Map answers to categories (simplified for demo)
    answerValues.forEach((answer) => {
      if (["analytical", "technical", "innovation", "alone"].includes(answer)) {
        counts.technical++
      } else if (["creative", "visual", "mixed"].includes(answer)) {
        counts.creative++
      } else if (["social", "auditory", "kinesthetic", "team"].includes(answer)) {
        counts.social++
      }
    })

    // Find the dominant category
    const dominantCategory = Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b))

    // Set recommended paths based on dominant category
    setRecommendedPaths(careerPaths[dominantCategory])
    setQuizComplete(true)
  }

  // Restart the quiz
  const restartQuiz = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setQuizComplete(false)
    setRecommendedPaths([])
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar>
          <SidebarHeader className="border-b">
            <div className="flex items-center gap-2 px-2 py-3">
              <BrainCircuit className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">PathFinder AI</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard">
                    <LayoutDashboard className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive>
                  <Link href="/explore">
                    <GraduationCap className="h-5 w-5" />
                    <span>Explore Paths</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/profile">
                    <User className="h-5 w-5" />
                    <span>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/settings">
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/">
                    <LogOut className="h-5 w-5" />
                    <span>Sign Out</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1">
          <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center">
              <SidebarTrigger className="mr-4" />
              <h1 className="text-xl font-semibold text-gray-900">Explore Academic Paths</h1>
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

          <main className="p-6">
            <div className="max-w-4xl mx-auto">
              {!quizComplete ? (
                <Card className="shadow-md">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Discover Your Academic Path</CardTitle>
                    <CardDescription>
                      Answer a few simple questions to help us suggest academic paths that might be a good fit for you.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Progress indicator */}
                    <div className="mb-8">
                      <div className="flex justify-between text-sm text-gray-500 mb-2">
                        <span>
                          Question {currentQuestion + 1} of {quizQuestions.length}
                        </span>
                        <span>{Math.round(((currentQuestion + 1) / quizQuestions.length) * 100)}% Complete</span>
                      </div>
                      <Progress value={((currentQuestion + 1) / quizQuestions.length) * 100} className="h-2" />
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentQuestion}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="mb-6">
                          <h3 className="text-xl font-semibold mb-4">{quizQuestions[currentQuestion].question}</h3>
                          <RadioGroup
                            value={answers[quizQuestions[currentQuestion].id]}
                            onValueChange={(value) => handleAnswer(quizQuestions[currentQuestion].id, value)}
                            className="space-y-4"
                          >
                            {quizQuestions[currentQuestion].options.map((option) => (
                              <div
                                key={option.id}
                                className="flex items-start space-x-2 p-4 rounded-lg border border-gray-200 hover:border-primary/50 transition-colors"
                              >
                                <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
                                <div className="grid gap-1.5">
                                  <Label htmlFor={option.id} className="font-medium">
                                    {option.label}
                                  </Label>
                                </div>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t p-6">
                    <Button variant="outline" onClick={handlePreviousQuestion} disabled={currentQuestion === 0}>
                      <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                    </Button>
                    <Button onClick={handleNextQuestion} disabled={!answers[quizQuestions[currentQuestion].id]}>
                      {currentQuestion === quizQuestions.length - 1 ? "See Results" : "Next"}
                      {currentQuestion !== quizQuestions.length - 1 && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <div className="space-y-6">
                  <Card className="shadow-md">
                    <CardHeader>
                      <CardTitle className="text-2xl text-center">Your Recommended Paths</CardTitle>
                      <CardDescription className="text-center">
                        Based on your responses, here are some academic paths that might be a good fit for you.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {recommendedPaths.map((path, index) => (
                          <motion.div
                            key={path.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <Card
                              className="h-full flex flex-col hover:shadow-md transition-shadow border-t-4"
                              style={{ borderTopColor: path.color.split(" ")[0].replace("bg-", "") }}
                            >
                              <CardHeader className="pb-2">
                                <div
                                  className={`p-2 rounded-lg ${path.color.replace("500", "100")} text-${path.color.split("-")[1]} w-fit`}
                                >
                                  <path.icon className="h-5 w-5" />
                                </div>
                                <CardTitle className="text-lg mt-3">{path.title}</CardTitle>
                                <CardDescription className="text-gray-600">{path.description}</CardDescription>
                              </CardHeader>
                              <CardContent className="pb-2 pt-0 flex-grow">
                                <h4 className="font-medium text-sm text-gray-700 mb-2">Recommended Courses:</h4>
                                <ul className="space-y-1 text-sm text-gray-600">
                                  {path.courses.map((course, i) => (
                                    <li key={i} className="flex items-center">
                                      <span className="mr-2">•</span> {course}
                                    </li>
                                  ))}
                                </ul>
                              </CardContent>
                              <CardFooter className="border-t bg-gray-50 mt-auto">
                                <Button variant="ghost" size="sm" className="ml-auto text-primary">
                                  Learn More <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                              </CardFooter>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-center border-t p-6">
                      <Button onClick={restartQuiz} variant="outline" className="gap-2">
                        <RefreshCw className="h-4 w-4" /> Retry Quiz
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Want more personalized recommendations?</CardTitle>
                      <CardDescription>
                        Complete your full profile to get even more tailored academic path suggestions.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">
                        Our comprehensive assessment takes into account your academic history, interests, and career
                        goals to provide highly personalized recommendations.
                      </p>
                      <Button asChild>
                        <Link href="/form">
                          Complete Full Assessment <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

