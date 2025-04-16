"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, BookOpen, BrainCircuit, CheckCircle2, GraduationCap, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Form steps
const steps = [
  { id: 1, name: "Academic History", icon: BookOpen },
  { id: 2, name: "Interests", icon: Sparkles },
  { id: 3, name: "Personality", icon: BrainCircuit },
  { id: 4, name: "Career Goals", icon: GraduationCap },
]

// Subjects for academic history
const subjects = [
  "Mathematics",
  "English",
  "Science",
  "History",
  "Geography",
  "Computer Science",
  "Art",
  "Music",
  "Physical Education",
  "Foreign Language",
]

// Grades for dropdown
const grades = ["A+", "A", "B+", "B", "C+", "C", "D", "F"]

// Interest options
const interestOptions = [
  { id: "tech", label: "Technology & Computing" },
  { id: "science", label: "Science & Research" },
  { id: "arts", label: "Arts & Creativity" },
  { id: "business", label: "Business & Entrepreneurship" },
  { id: "health", label: "Health & Medicine" },
  { id: "humanities", label: "Humanities & Social Sciences" },
  { id: "engineering", label: "Engineering & Design" },
  { id: "education", label: "Education & Teaching" },
  { id: "environment", label: "Environment & Sustainability" },
  { id: "media", label: "Media & Communication" },
]

// Personality traits
const personalityTraits = [
  {
    id: "analytical",
    title: "Analytical Thinker",
    description: "You enjoy solving complex problems and working with data",
  },
  {
    id: "creative",
    title: "Creative Mind",
    description: "You thrive when expressing yourself and thinking outside the box",
  },
  {
    id: "practical",
    title: "Practical Doer",
    description: "You prefer hands-on work and seeing tangible results",
  },
  {
    id: "social",
    title: "Social Connector",
    description: "You excel at communication and working with others",
  },
]

export default function StudentForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    academicHistory: [{ subject: "", grade: "" }],
    interests: [],
    personalityTrait: "",
    careerGoals: "",
  })
  const [formComplete, setFormComplete] = useState(false)

  // Handle next step
  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    } else {
      setFormComplete(true)
    }
  }

  // Handle previous step
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Add another subject field
  const addSubject = () => {
    setFormData({
      ...formData,
      academicHistory: [...formData.academicHistory, { subject: "", grade: "" }],
    })
  }

  // Remove a subject field
  const removeSubject = (index) => {
    const updatedHistory = [...formData.academicHistory]
    updatedHistory.splice(index, 1)
    setFormData({
      ...formData,
      academicHistory: updatedHistory,
    })
  }

  // Update academic history
  const updateAcademicHistory = (index, field, value) => {
    const updatedHistory = [...formData.academicHistory]
    updatedHistory[index][field] = value
    setFormData({
      ...formData,
      academicHistory: updatedHistory,
    })
  }

  // Handle interest checkbox changes
  const handleInterestChange = (id) => {
    setFormData({
      ...formData,
      interests: formData.interests.includes(id)
        ? formData.interests.filter((item) => item !== id)
        : [...formData.interests, id],
    })
  }

  // Calculate progress percentage
  const progress = (currentStep / steps.length) * 100

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tell Us About Yourself</h1>
          <p className="mt-2 text-gray-600">Help us understand your academic background and preferences</p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary bg-primary/10">
                  Step {currentStep} of {steps.length}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-primary">{Math.round(progress)}%</span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-gray-200">
              <motion.div
                initial={{ width: `${((currentStep - 1) / steps.length) * 100}%` }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
              />
            </div>
          </div>

          {/* Step indicators */}
          <div className="hidden sm:flex justify-between">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex flex-col items-center ${
                  step.id === currentStep ? "text-primary" : step.id < currentStep ? "text-primary/70" : "text-gray-400"
                }`}
              >
                <div
                  className={`
                  flex items-center justify-center w-8 h-8 rounded-full border-2 mb-2
                  ${
                    step.id === currentStep
                      ? "border-primary bg-primary/10"
                      : step.id < currentStep
                        ? "border-primary/70 bg-primary/5"
                        : "border-gray-300 bg-white"
                  }
                `}
                >
                  {step.id < currentStep ? <CheckCircle2 className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
                </div>
                <span className="text-xs font-medium hidden md:block">{step.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form card */}
        <Card className="shadow-md rounded-xl overflow-hidden">
          <div className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {!formComplete ? (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Step 1: Academic History */}
                  {currentStep === 1 && (
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-primary" />
                        Academic History
                      </h2>
                      <p className="text-gray-600 mb-6">
                        Please select the subjects you've studied and the grades you received.
                      </p>

                      {formData.academicHistory.map((item, index) => (
                        <div key={index} className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="font-medium">Subject {index + 1}</h3>
                            {formData.academicHistory.length > 1 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeSubject(index)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                Remove
                              </Button>
                            )}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`subject-${index}`}>Subject</Label>
                              <Select
                                value={item.subject}
                                onValueChange={(value) => updateAcademicHistory(index, "subject", value)}
                              >
                                <SelectTrigger id={`subject-${index}`}>
                                  <SelectValue placeholder="Select a subject" />
                                </SelectTrigger>
                                <SelectContent>
                                  {subjects.map((subject) => (
                                    <SelectItem key={subject} value={subject}>
                                      {subject}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`grade-${index}`}>Grade</Label>
                              <Select
                                value={item.grade}
                                onValueChange={(value) => updateAcademicHistory(index, "grade", value)}
                              >
                                <SelectTrigger id={`grade-${index}`}>
                                  <SelectValue placeholder="Select a grade" />
                                </SelectTrigger>
                                <SelectContent>
                                  {grades.map((grade) => (
                                    <SelectItem key={grade} value={grade}>
                                      {grade}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      ))}

                      <Button type="button" variant="outline" onClick={addSubject} className="w-full mt-2">
                        Add Another Subject
                      </Button>
                    </div>
                  )}

                  {/* Step 2: Interests */}
                  {currentStep === 2 && (
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-primary" />
                        Your Interests
                      </h2>
                      <p className="text-gray-600 mb-6">
                        Select the areas that interest you the most. Choose as many as you like.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {interestOptions.map((interest) => (
                          <div key={interest.id} className="flex items-start space-x-2">
                            <Checkbox
                              id={interest.id}
                              checked={formData.interests.includes(interest.id)}
                              onCheckedChange={() => handleInterestChange(interest.id)}
                            />
                            <Label
                              htmlFor={interest.id}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                              {interest.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 3: Personality Traits */}
                  {currentStep === 3 && (
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                        <BrainCircuit className="w-5 h-5 text-primary" />
                        Personality Traits
                      </h2>
                      <p className="text-gray-600 mb-6">
                        Select the trait that best describes your approach to learning and problem-solving.
                      </p>

                      <RadioGroup
                        value={formData.personalityTrait}
                        onValueChange={(value) => setFormData({ ...formData, personalityTrait: value })}
                        className="space-y-4"
                      >
                        {personalityTraits.map((trait) => (
                          <div
                            key={trait.id}
                            className="flex items-start space-x-2 p-4 rounded-lg border border-gray-200 hover:border-primary/50 transition-colors"
                          >
                            <RadioGroupItem value={trait.id} id={trait.id} className="mt-1" />
                            <div className="grid gap-1.5">
                              <Label htmlFor={trait.id} className="font-medium">
                                {trait.title}
                              </Label>
                              <p className="text-sm text-gray-500">{trait.description}</p>
                            </div>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  )}

                  {/* Step 4: Career Goals */}
                  {currentStep === 4 && (
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-primary" />
                        Career Goals
                      </h2>
                      <p className="text-gray-600 mb-6">
                        Share your career aspirations or goals (optional). This helps us provide more tailored
                        recommendations.
                      </p>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="career-goals">What are your career aspirations?</Label>
                          <Textarea
                            id="career-goals"
                            placeholder="I'm interested in becoming..."
                            value={formData.careerGoals}
                            onChange={(e) => setFormData({ ...formData, careerGoals: e.target.value })}
                            className="min-h-[150px]"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation buttons */}
                  <div className="mt-8 flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handlePrevious}
                      disabled={currentStep === 1}
                      className={currentStep === 1 ? "invisible" : ""}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                    </Button>
                    <Button type="button" onClick={handleNext}>
                      {currentStep === steps.length ? "Submit" : "Next"}
                      {currentStep !== steps.length && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-8"
                >
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
                  <p className="text-gray-600 mb-6">
                    Your information has been submitted successfully. We're generating your personalized academic
                    recommendations.
                  </p>
                  <Button
                    onClick={() => (window.location.href = "/dashboard")}
                    className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                  >
                    View Your Recommendations
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Card>
      </div>
    </div>
  )
}

