"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  Clock,
  Compass,
  Heart,
  Home,
  LineChart,
  Loader2,
  Puzzle,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

// Assessment categories
const categories = [
  { id: "personality", name: "Personality Traits", icon: User },
  { id: "values", name: "Work Values", icon: Heart },
  { id: "environment", name: "Work Environment", icon: Home },
  { id: "skills", name: "Skills Assessment", icon: Puzzle },
  { id: "learning", name: "Learning Style", icon: BookOpen },
  { id: "goals", name: "Life Goals", icon: Compass },
  { id: "challenges", name: "Challenges & Obstacles", icon: LineChart },
  { id: "experience", name: "Past Experiences", icon: Clock },
]

// Personality questions
const personalityQuestions = [
  {
    id: "introvert-extrovert",
    question: "How do you typically recharge your energy?",
    options: [
      { value: "introvert", label: "Spending time alone or with a few close friends" },
      { value: "ambivert", label: "A mix of social time and alone time, depending on the situation" },
      { value: "extrovert", label: "Being around people and engaging in social activities" },
    ],
  },
  {
    id: "thinking-feeling",
    question: "When making important decisions, do you tend to:",
    options: [
      { value: "thinking", label: "Analyze facts and consider logical consequences" },
      { value: "balanced", label: "Consider both logical analysis and how people will be affected" },
      { value: "feeling", label: "Consider how the decision will affect people and their feelings" },
    ],
  },
  {
    id: "planning-spontaneous",
    question: "How do you approach projects and tasks?",
    options: [
      { value: "planning", label: "Create detailed plans and schedules before starting" },
      { value: "flexible", label: "Have a general plan but remain flexible to changes" },
      { value: "spontaneous", label: "Adapt as you go and prefer to be spontaneous" },
    ],
  },
  {
    id: "practical-creative",
    question: "When solving problems, do you prefer:",
    options: [
      { value: "practical", label: "Practical, proven solutions based on what has worked before" },
      { value: "balanced", label: "A mix of tried-and-true methods with some creative approaches" },
      { value: "creative", label: "Creative, innovative approaches and thinking outside the box" },
    ],
  },
  {
    id: "detail-big-picture",
    question: "Do you tend to focus more on:",
    options: [
      { value: "detail", label: "Details, specifics, and concrete information" },
      { value: "balanced", label: "Both details and the bigger picture, depending on the situation" },
      { value: "big-picture", label: "The big picture, patterns, and future possibilities" },
    ],
  },
]

// Work values questions
const valuesQuestions = [
  {
    id: "achievement",
    question: "How important is it for you to see concrete results from your work?",
    type: "slider",
  },
  {
    id: "autonomy",
    question: "How important is having independence and freedom in your work decisions?",
    type: "slider",
  },
  {
    id: "balance",
    question: "How important is work-life balance to you?",
    type: "slider",
  },
  {
    id: "challenge",
    question: "How important is it that your work regularly challenges you?",
    type: "slider",
  },
  {
    id: "helping",
    question: "How important is it that your work directly helps others?",
    type: "slider",
  },
  {
    id: "income",
    question: "How important is a high income to you?",
    type: "slider",
  },
  {
    id: "prestige",
    question: "How important is social status and recognition in your career?",
    type: "slider",
  },
  {
    id: "security",
    question: "How important is job security and stability?",
    type: "slider",
  },
]

// Work environment questions
const environmentQuestions = [
  {
    id: "environment-type",
    question: "What type of physical work environment do you prefer?",
    options: [
      { value: "office", label: "Traditional office setting" },
      { value: "remote", label: "Remote/work from home" },
      { value: "hybrid", label: "Hybrid (mix of office and remote)" },
      { value: "outdoor", label: "Outdoors or field work" },
      { value: "varied", label: "Varied locations and settings" },
    ],
    type: "checkbox",
  },
  {
    id: "team-size",
    question: "What size of team do you prefer working with?",
    options: [
      { value: "solo", label: "Working mostly independently" },
      { value: "small", label: "Small team (2-5 people)" },
      { value: "medium", label: "Medium team (6-15 people)" },
      { value: "large", label: "Large team (16+ people)" },
    ],
    type: "radio",
  },
  {
    id: "pace",
    question: "What pace of work do you prefer?",
    options: [
      { value: "steady", label: "Steady and predictable" },
      { value: "variable", label: "Variable with some busy periods" },
      { value: "fast", label: "Fast-paced and dynamic" },
    ],
    type: "radio",
  },
  {
    id: "structure",
    question: "How much structure do you prefer in your work?",
    options: [
      { value: "high", label: "Highly structured with clear guidelines" },
      { value: "moderate", label: "Moderate structure with some flexibility" },
      { value: "low", label: "Minimal structure with high autonomy" },
    ],
    type: "radio",
  },
  {
    id: "culture-values",
    question: "Which workplace cultural values are most important to you?",
    options: [
      { value: "innovation", label: "Innovation and creativity" },
      { value: "collaboration", label: "Collaboration and teamwork" },
      { value: "competition", label: "Competition and achievement" },
      { value: "work-life", label: "Work-life balance" },
      { value: "diversity", label: "Diversity and inclusion" },
      { value: "social-impact", label: "Social impact and purpose" },
    ],
    type: "checkbox",
  },
]

// Skills assessment questions
const skillsQuestions = [
  {
    id: "technical-skills",
    question: "Rate your proficiency in technical/analytical skills:",
    skills: [
      { id: "data-analysis", name: "Data Analysis" },
      { id: "programming", name: "Programming/Coding" },
      { id: "research", name: "Research" },
      { id: "technical-writing", name: "Technical Writing" },
      { id: "mathematics", name: "Mathematics" },
    ],
    type: "rating",
  },
  {
    id: "creative-skills",
    question: "Rate your proficiency in creative skills:",
    skills: [
      { id: "design", name: "Design" },
      { id: "writing", name: "Creative Writing" },
      { id: "problem-solving", name: "Creative Problem Solving" },
      { id: "visual-arts", name: "Visual Arts" },
      { id: "innovation", name: "Innovation" },
    ],
    type: "rating",
  },
  {
    id: "people-skills",
    question: "Rate your proficiency in people skills:",
    skills: [
      { id: "communication", name: "Communication" },
      { id: "leadership", name: "Leadership" },
      { id: "teamwork", name: "Teamwork" },
      { id: "conflict-resolution", name: "Conflict Resolution" },
      { id: "empathy", name: "Empathy" },
    ],
    type: "rating",
  },
  {
    id: "organizational-skills",
    question: "Rate your proficiency in organizational skills:",
    skills: [
      { id: "time-management", name: "Time Management" },
      { id: "project-management", name: "Project Management" },
      { id: "attention-to-detail", name: "Attention to Detail" },
      { id: "planning", name: "Planning" },
      { id: "prioritization", name: "Prioritization" },
    ],
    type: "rating",
  },
]

// Learning style questions
const learningQuestions = [
  {
    id: "learning-method",
    question: "How do you prefer to learn new information?",
    options: [
      { value: "visual", label: "Visual (images, diagrams, videos)" },
      { value: "auditory", label: "Auditory (listening, discussions)" },
      { value: "reading", label: "Reading/Writing (text-based materials)" },
      { value: "kinesthetic", label: "Kinesthetic (hands-on practice)" },
    ],
    type: "checkbox",
  },
  {
    id: "learning-pace",
    question: "What learning pace works best for you?",
    options: [
      { value: "self-paced", label: "Self-paced learning" },
      { value: "structured", label: "Structured with deadlines" },
      { value: "intensive", label: "Intensive, immersive learning" },
      { value: "gradual", label: "Gradual, spaced learning over time" },
    ],
    type: "radio",
  },
  {
    id: "learning-environment",
    question: "In what environment do you learn best?",
    options: [
      { value: "individual", label: "Individual, quiet study" },
      { value: "group", label: "Group learning and collaboration" },
      { value: "mentor", label: "One-on-one mentorship" },
      { value: "classroom", label: "Classroom or structured environment" },
    ],
    type: "radio",
  },
  {
    id: "feedback-preference",
    question: "What type of feedback helps you learn best?",
    options: [
      { value: "immediate", label: "Immediate, frequent feedback" },
      { value: "detailed", label: "Detailed, comprehensive feedback" },
      { value: "self-directed", label: "Self-assessment and reflection" },
      { value: "peer", label: "Peer feedback and discussion" },
    ],
    type: "radio",
  },
]

// Life goals questions
const goalsQuestions = [
  {
    id: "short-term-goals",
    question: "What are your most important short-term career goals (1-3 years)?",
    type: "textarea",
  },
  {
    id: "long-term-goals",
    question: "What are your most important long-term career goals (5+ years)?",
    type: "textarea",
  },
  {
    id: "impact-goals",
    question: "What kind of impact do you want to make through your work?",
    options: [
      { value: "individual", label: "Directly helping individuals" },
      { value: "community", label: "Strengthening communities" },
      { value: "society", label: "Addressing societal challenges" },
      { value: "environment", label: "Environmental sustainability" },
      { value: "innovation", label: "Advancing knowledge or technology" },
      { value: "economic", label: "Economic development" },
    ],
    type: "checkbox",
  },
  {
    id: "life-priorities",
    question: "Rank the following life priorities in order of importance to you:",
    options: [
      { id: "career", label: "Career advancement" },
      { id: "family", label: "Family life" },
      { id: "health", label: "Health and wellness" },
      { id: "learning", label: "Continuous learning" },
      { id: "community", label: "Community involvement" },
      { id: "leisure", label: "Leisure and recreation" },
    ],
    type: "ranking",
  },
]

// Challenges questions
const challengesQuestions = [
  {
    id: "career-obstacles",
    question: "What obstacles have you faced in your career or education so far?",
    options: [
      { value: "financial", label: "Financial constraints" },
      { value: "time", label: "Time limitations" },
      { value: "skills", label: "Skill gaps" },
      { value: "confidence", label: "Confidence or imposter syndrome" },
      { value: "opportunities", label: "Limited opportunities" },
      { value: "support", label: "Lack of mentorship or support" },
      { value: "discrimination", label: "Discrimination or bias" },
      { value: "health", label: "Health or personal challenges" },
    ],
    type: "checkbox",
  },
  {
    id: "strengths-challenges",
    question: "What aspects of work do you find most challenging?",
    options: [
      { value: "public-speaking", label: "Public speaking or presentations" },
      { value: "conflict", label: "Handling conflict" },
      { value: "networking", label: "Networking and relationship building" },
      { value: "technical", label: "Technical or analytical tasks" },
      { value: "creative", label: "Creative or innovative thinking" },
      { value: "leadership", label: "Leadership responsibilities" },
      { value: "detail", label: "Detail-oriented tasks" },
      { value: "ambiguity", label: "Working with ambiguity" },
    ],
    type: "checkbox",
  },
  {
    id: "growth-areas",
    question: "What skills or qualities would you most like to develop?",
    type: "textarea",
  },
  {
    id: "support-needs",
    question: "What kind of support would help you overcome your career challenges?",
    options: [
      { value: "mentorship", label: "Mentorship" },
      { value: "education", label: "Additional education or training" },
      { value: "networking", label: "Networking opportunities" },
      { value: "resources", label: "Financial resources" },
      { value: "coaching", label: "Career coaching" },
      { value: "flexibility", label: "Workplace flexibility" },
    ],
    type: "checkbox",
  },
]

// Experience questions
const experienceQuestions = [
  {
    id: "enjoyed-activities",
    question: "What activities or projects have you most enjoyed in the past?",
    type: "textarea",
  },
  {
    id: "disliked-activities",
    question: "What activities or projects have you disliked or found draining?",
    type: "textarea",
  },
  {
    id: "proudest-achievements",
    question: "What are your proudest achievements (professional or personal)?",
    type: "textarea",
  },
  {
    id: "feedback-received",
    question: "What positive feedback have you consistently received from others?",
    type: "textarea",
  },
  {
    id: "role-models",
    question: "Are there any careers or professionals you admire? What do you admire about them?",
    type: "textarea",
  },
]

export default function DeepAssessmentPage() {
  const [currentCategory, setCurrentCategory] = useState("personality")
  const [progress, setProgress] = useState({
    personality: 0,
    values: 0,
    environment: 0,
    skills: 0,
    learning: 0,
    goals: 0,
    challenges: 0,
    experience: 0,
  })
  const [formData, setFormData] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  // Calculate overall progress
  const overallProgress = Object.values(progress).reduce((sum, value) => sum + value, 0) / categories.length

  // Handle category change
  const handleCategoryChange = (category) => {
    setCurrentCategory(category)
  }

  // Handle form input changes
  const handleInputChange = (categoryId, questionId, value) => {
    setFormData((prev) => ({
      ...prev,
      [categoryId]: {
        ...prev[categoryId],
        [questionId]: value,
      },
    }))

    // Update progress for the category
    updateCategoryProgress(categoryId)
  }

  // Update progress for a category
  const updateCategoryProgress = (categoryId) => {
    let totalQuestions = 0
    let answeredQuestions = 0

    switch (categoryId) {
      case "personality":
        totalQuestions = personalityQuestions.length
        answeredQuestions = countAnsweredQuestions(categoryId, personalityQuestions)
        break
      case "values":
        totalQuestions = valuesQuestions.length
        answeredQuestions = countAnsweredQuestions(categoryId, valuesQuestions)
        break
      case "environment":
        totalQuestions = environmentQuestions.length
        answeredQuestions = countAnsweredQuestions(categoryId, environmentQuestions)
        break
      case "skills":
        totalQuestions = skillsQuestions.length * 5 // Each question has 5 skills to rate
        answeredQuestions = countAnsweredSkills(categoryId)
        break
      case "learning":
        totalQuestions = learningQuestions.length
        answeredQuestions = countAnsweredQuestions(categoryId, learningQuestions)
        break
      case "goals":
        totalQuestions = goalsQuestions.length
        answeredQuestions = countAnsweredQuestions(categoryId, goalsQuestions)
        break
      case "challenges":
        totalQuestions = challengesQuestions.length
        answeredQuestions = countAnsweredQuestions(categoryId, challengesQuestions)
        break
      case "experience":
        totalQuestions = experienceQuestions.length
        answeredQuestions = countAnsweredQuestions(categoryId, experienceQuestions)
        break
    }

    const newProgress = Math.round((answeredQuestions / totalQuestions) * 100)

    setProgress((prev) => ({
      ...prev,
      [categoryId]: newProgress,
    }))
  }

  // Count answered questions in a category
  const countAnsweredQuestions = (categoryId, questions) => {
    if (!formData[categoryId]) return 0

    return questions.filter((q) => {
      const answer = formData[categoryId][q.id]
      if (Array.isArray(answer)) {
        return answer.length > 0
      }
      return answer !== undefined && answer !== ""
    }).length
  }

  // Count answered skills in the skills category
  const countAnsweredSkills = (categoryId) => {
    if (!formData[categoryId]) return 0

    let count = 0
    skillsQuestions.forEach((question) => {
      question.skills.forEach((skill) => {
        if (formData[categoryId][question.id] && formData[categoryId][question.id][skill.id] !== undefined) {
          count++
        }
      })
    })

    return count
  }

  // Handle form submission
  const handleSubmit = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsComplete(true)
    }, 2000)
  }

  // Render rating component for skills
  const renderRating = (categoryId, questionId, skillId, skillName) => {
    const value = formData[categoryId]?.[questionId]?.[skillId] || 0

    return (
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor={`${questionId}-${skillId}`} className="text-sm">
            {skillName}
          </Label>
          <span className="text-sm font-medium">{value}/5</span>
        </div>
        <Slider
          id={`${questionId}-${skillId}`}
          min={0}
          max={5}
          step={1}
          value={[value]}
          onValueChange={(vals) => {
            const newValue = vals[0]
            setFormData((prev) => ({
              ...prev,
              [categoryId]: {
                ...prev[categoryId],
                [questionId]: {
                  ...(prev[categoryId]?.[questionId] || {}),
                  [skillId]: newValue,
                },
              },
            }))
            updateCategoryProgress(categoryId)
          }}
        />
      </div>
    )
  }

  // Render ranking component
  const renderRanking = (categoryId, questionId, options) => {
    const rankings = formData[categoryId]?.[questionId] || options.map((o) => o.id)

    const moveItem = (id, direction) => {
      const currentIndex = rankings.indexOf(id)
      if ((direction === "up" && currentIndex > 0) || (direction === "down" && currentIndex < rankings.length - 1)) {
        const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1
        const newRankings = [...rankings]
        newRankings.splice(currentIndex, 1)
        newRankings.splice(newIndex, 0, id)

        handleInputChange(categoryId, questionId, newRankings)
      }
    }

    return (
      <div className="space-y-2">
        {rankings.map((id, index) => {
          const option = options.find((o) => o.id === id)
          return (
            <div key={id} className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                {index + 1}
              </div>
              <span className="flex-grow">{option?.label}</span>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  disabled={index === 0}
                  onClick={() => moveItem(id, "up")}
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Move up</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  disabled={index === rankings.length - 1}
                  onClick={() => moveItem(id, "down")}
                >
                  <ArrowRight className="h-4 w-4" />
                  <span className="sr-only">Move down</span>
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border px-4 py-3 sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold text-foreground">Deep Career Assessment</h1>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        {!isComplete ? (
          <>
            <div className="max-w-3xl mx-auto mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Comprehensive Career Assessment</h2>
              <p className="text-muted-foreground mb-6">
                This in-depth assessment will help us provide highly personalized career recommendations. The more
                questions you answer, the more tailored your results will be. You can save your progress and return
                anytime.
              </p>

              {/* Overall progress */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>Overall Progress</span>
                  <span>{Math.round(overallProgress)}% Complete</span>
                </div>
                <Progress value={overallProgress} className="h-2" />
              </div>

              {/* Category tabs */}
              <Tabs value={currentCategory} onValueChange={handleCategoryChange} className="w-full">
                <TabsList className="grid grid-cols-4 md:grid-cols-8 h-auto">
                  {categories.map((category) => (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="flex flex-col gap-1 py-2 h-auto data-[state=active]:bg-primary/10"
                    >
                      <category.icon className="h-4 w-4" />
                      <span className="text-xs">{category.name}</span>
                      <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${progress[category.id]}%` }}></div>
                      </div>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            <div className="max-w-3xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCategory}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="mb-8">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        {categories.find((c) => c.id === currentCategory)?.icon && (
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            {React.createElement(categories.find((c) => c.id === currentCategory)?.icon, {
                              className: "h-4 w-4 text-primary",
                            })}
                          </div>
                        )}
                        <div>
                          <CardTitle>{categories.find((c) => c.id === currentCategory)?.name}</CardTitle>
                          <CardDescription>
                            {currentCategory === "personality"
                              ? "Understanding your personality traits helps match you with suitable work environments."
                              : currentCategory === "values"
                                ? "Your work values determine what aspects of a career will bring you satisfaction."
                                : currentCategory === "environment"
                                  ? "Your preferred work environment impacts your daily job satisfaction."
                                  : currentCategory === "skills"
                                    ? "Assess your current skills to identify strengths and areas for development."
                                    : currentCategory === "learning"
                                      ? "Your learning style affects how you best acquire new skills and knowledge."
                                      : currentCategory === "goals"
                                        ? "Your life goals help align career recommendations with your broader aspirations."
                                        : currentCategory === "challenges"
                                          ? "Understanding your challenges helps identify potential obstacles and support needs."
                                          : "Your past experiences provide insights into patterns of satisfaction and success."}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-8">
                      {/* Personality Questions */}
                      {currentCategory === "personality" &&
                        personalityQuestions.map((question) => (
                          <div key={question.id} className="space-y-4">
                            <h3 className="font-medium text-foreground">{question.question}</h3>
                            <RadioGroup
                              value={formData.personality?.[question.id] || ""}
                              onValueChange={(value) => handleInputChange("personality", question.id, value)}
                              className="space-y-3"
                            >
                              {question.options.map((option) => (
                                <div
                                  key={option.value}
                                  className="flex items-start space-x-2 p-3 rounded-lg border border-border hover:border-primary/50 transition-colors"
                                >
                                  <RadioGroupItem
                                    value={option.value}
                                    id={`${question.id}-${option.value}`}
                                    className="mt-1"
                                  />
                                  <Label
                                    htmlFor={`${question.id}-${option.value}`}
                                    className="font-medium cursor-pointer"
                                  >
                                    {option.label}
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                          </div>
                        ))}

                      {/* Work Values Questions */}
                      {currentCategory === "values" &&
                        valuesQuestions.map((question) => (
                          <div key={question.id} className="space-y-4">
                            <div className="space-y-2">
                              <h3 className="font-medium text-foreground">{question.question}</h3>
                              <div className="flex justify-between text-sm text-muted-foreground">
                                <span>Not Important</span>
                                <span>Very Important</span>
                              </div>
                              <Slider
                                id={question.id}
                                min={1}
                                max={5}
                                step={1}
                                value={[formData.values?.[question.id] || 3]}
                                onValueChange={(vals) => handleInputChange("values", question.id, vals[0])}
                              />
                            </div>
                          </div>
                        ))}

                      {/* Work Environment Questions */}
                      {currentCategory === "environment" &&
                        environmentQuestions.map((question) => (
                          <div key={question.id} className="space-y-4">
                            <h3 className="font-medium text-foreground">{question.question}</h3>
                            {question.type === "checkbox" ? (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {question.options.map((option) => (
                                  <div key={option.value} className="flex items-start space-x-2">
                                    <Checkbox
                                      id={`${question.id}-${option.value}`}
                                      checked={(formData.environment?.[question.id] || []).includes(option.value)}
                                      onCheckedChange={(checked) => {
                                        const currentValues = formData.environment?.[question.id] || []
                                        const newValues = checked
                                          ? [...currentValues, option.value]
                                          : currentValues.filter((v) => v !== option.value)
                                        handleInputChange("environment", question.id, newValues)
                                      }}
                                    />
                                    <Label
                                      htmlFor={`${question.id}-${option.value}`}
                                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                    >
                                      {option.label}
                                    </Label>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <RadioGroup
                                value={formData.environment?.[question.id] || ""}
                                onValueChange={(value) => handleInputChange("environment", question.id, value)}
                                className="space-y-3"
                              >
                                {question.options.map((option) => (
                                  <div
                                    key={option.value}
                                    className="flex items-start space-x-2 p-3 rounded-lg border border-border hover:border-primary/50 transition-colors"
                                  >
                                    <RadioGroupItem
                                      value={option.value}
                                      id={`${question.id}-${option.value}`}
                                      className="mt-1"
                                    />
                                    <Label
                                      htmlFor={`${question.id}-${option.value}`}
                                      className="font-medium cursor-pointer"
                                    >
                                      {option.label}
                                    </Label>
                                  </div>
                                ))}
                              </RadioGroup>
                            )}
                          </div>
                        ))}

                      {/* Skills Assessment Questions */}
                      {currentCategory === "skills" &&
                        skillsQuestions.map((question) => (
                          <div key={question.id} className="space-y-4">
                            <h3 className="font-medium text-foreground">{question.question}</h3>
                            <div className="space-y-6">
                              {question.skills.map((skill) => (
                                <div key={skill.id} className="space-y-2">
                                  {renderRating("skills", question.id, skill.id, skill.name)}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}

                      {/* Learning Style Questions */}
                      {currentCategory === "learning" &&
                        learningQuestions.map((question) => (
                          <div key={question.id} className="space-y-4">
                            <h3 className="font-medium text-foreground">{question.question}</h3>
                            {question.type === "checkbox" ? (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {question.options.map((option) => (
                                  <div key={option.value} className="flex items-start space-x-2">
                                    <Checkbox
                                      id={`${question.id}-${option.value}`}
                                      checked={(formData.learning?.[question.id] || []).includes(option.value)}
                                      onCheckedChange={(checked) => {
                                        const currentValues = formData.learning?.[question.id] || []
                                        const newValues = checked
                                          ? [...currentValues, option.value]
                                          : currentValues.filter((v) => v !== option.value)
                                        handleInputChange("learning", question.id, newValues)
                                      }}
                                    />
                                    <Label
                                      htmlFor={`${question.id}-${option.value}`}
                                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                    >
                                      {option.label}
                                    </Label>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <RadioGroup
                                value={formData.learning?.[question.id] || ""}
                                onValueChange={(value) => handleInputChange("learning", question.id, value)}
                                className="space-y-3"
                              >
                                {question.options.map((option) => (
                                  <div
                                    key={option.value}
                                    className="flex items-start space-x-2 p-3 rounded-lg border border-border hover:border-primary/50 transition-colors"
                                  >
                                    <RadioGroupItem
                                      value={option.value}
                                      id={`${question.id}-${option.value}`}
                                      className="mt-1"
                                    />
                                    <Label
                                      htmlFor={`${question.id}-${option.value}`}
                                      className="font-medium cursor-pointer"
                                    >
                                      {option.label}
                                    </Label>
                                  </div>
                                ))}
                              </RadioGroup>
                            )}
                          </div>
                        ))}

                      {/* Life Goals Questions */}
                      {currentCategory === "goals" &&
                        goalsQuestions.map((question) => (
                          <div key={question.id} className="space-y-4">
                            <h3 className="font-medium text-foreground">{question.question}</h3>
                            {question.type === "textarea" ? (
                              <Textarea
                                id={question.id}
                                value={formData.goals?.[question.id] || ""}
                                onChange={(e) => handleInputChange("goals", question.id, e.target.value)}
                                placeholder="Your answer..."
                                className="min-h-[120px]"
                              />
                            ) : question.type === "checkbox" ? (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {question.options.map((option) => (
                                  <div key={option.value} className="flex items-start space-x-2">
                                    <Checkbox
                                      id={`${question.id}-${option.value}`}
                                      checked={(formData.goals?.[question.id] || []).includes(option.value)}
                                      onCheckedChange={(checked) => {
                                        const currentValues = formData.goals?.[question.id] || []
                                        const newValues = checked
                                          ? [...currentValues, option.value]
                                          : currentValues.filter((v) => v !== option.value)
                                        handleInputChange("goals", question.id, newValues)
                                      }}
                                    />
                                    <Label
                                      htmlFor={`${question.id}-${option.value}`}
                                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                    >
                                      {option.label}
                                    </Label>
                                  </div>
                                ))}
                              </div>
                            ) : question.type === "ranking" ? (
                              renderRanking("goals", question.id, question.options)
                            ) : null}
                          </div>
                        ))}

                      {/* Challenges Questions */}
                      {currentCategory === "challenges" &&
                        challengesQuestions.map((question) => (
                          <div key={question.id} className="space-y-4">
                            <h3 className="font-medium text-foreground">{question.question}</h3>
                            {question.type === "textarea" ? (
                              <Textarea
                                id={question.id}
                                value={formData.challenges?.[question.id] || ""}
                                onChange={(e) => handleInputChange("challenges", question.id, e.target.value)}
                                placeholder="Your answer..."
                                className="min-h-[120px]"
                              />
                            ) : (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {question.options.map((option) => (
                                  <div key={option.value} className="flex items-start space-x-2">
                                    <Checkbox
                                      id={`${question.id}-${option.value}`}
                                      checked={(formData.challenges?.[question.id] || []).includes(option.value)}
                                      onCheckedChange={(checked) => {
                                        const currentValues = formData.challenges?.[question.id] || []
                                        const newValues = checked
                                          ? [...currentValues, option.value]
                                          : currentValues.filter((v) => v !== option.value)
                                        handleInputChange("challenges", question.id, newValues)
                                      }}
                                    />
                                    <Label
                                      htmlFor={`${question.id}-${option.value}`}
                                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                    >
                                      {option.label}
                                    </Label>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}

                      {/* Experience Questions */}
                      {currentCategory === "experience" &&
                        experienceQuestions.map((question) => (
                          <div key={question.id} className="space-y-4">
                            <h3 className="font-medium text-foreground">{question.question}</h3>
                            <Textarea
                              id={question.id}
                              value={formData.experience?.[question.id] || ""}
                              onChange={(e) => handleInputChange("experience", question.id, e.target.value)}
                              placeholder="Your answer..."
                              className="min-h-[120px]"
                            />
                          </div>
                        ))}
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-6">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                        <span className="text-sm text-muted-foreground">Progress saved automatically</span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => {
                            const currentIndex = categories.findIndex((c) => c.id === currentCategory)
                            if (currentIndex > 0) {
                              setCurrentCategory(categories[currentIndex - 1].id)
                            }
                          }}
                          disabled={categories.findIndex((c) => c.id === currentCategory) === 0}
                        >
                          <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                        </Button>
                        <Button
                          onClick={() => {
                            const currentIndex = categories.findIndex((c) => c.id === currentCategory)
                            if (currentIndex < categories.length - 1) {
                              setCurrentCategory(categories[currentIndex + 1].id)
                            } else {
                              handleSubmit()
                            }
                          }}
                        >
                          {categories.findIndex((c) => c.id === currentCategory) === categories.length - 1 ? (
                            isSubmitting ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                              </>
                            ) : (
                              "Submit Assessment"
                            )
                          ) : (
                            <>
                              Next <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>
          </>
        ) : (
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="text-center py-8 px-4">
                <CardContent className="pt-6">
                  <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
                    <CheckCircle2 className="h-10 w-10 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Assessment Complete!</h2>
                  <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                    Thank you for completing the deep assessment. We're analyzing your responses to generate highly
                    personalized career recommendations.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-600"
                      asChild
                    >
                      <Link href="/dashboard">
                        View Your Enhanced Recommendations <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  )
}

