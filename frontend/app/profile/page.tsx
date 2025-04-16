"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  BookOpen,
  BrainCircuit,
  Check,
  ChevronRight,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Settings,
  Shield,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { useTheme } from "next-themes"

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

export default function ProfilePage() {
  const { theme, setTheme } = useTheme()
  const [activeTab, setActiveTab] = useState("profile")
  const [userProfile, setUserProfile] = useState({
    name: "Jane Doe",
    email: "jane.doe@example.com",
    interests: ["tech", "science", "engineering"],
    careerGoals: "I aim to become a data scientist working on AI applications that help solve real-world problems.",
    notificationsEnabled: true,
    emailUpdates: true,
    darkMode: theme === "dark",
  })

  // Completed recommendations
  const completedRecommendations = [
    {
      id: 1,
      title: "Introduction to Computer Science",
      date: "2023-10-15",
      progress: 100,
    },
    {
      id: 2,
      title: "Data Analysis Fundamentals",
      date: "2023-11-20",
      progress: 100,
    },
  ]

  // In-progress recommendations
  const inProgressRecommendations = [
    {
      id: 3,
      title: "Machine Learning Basics",
      date: "2023-12-05",
      progress: 45,
    },
  ]

  // Handle interest toggle
  const toggleInterest = (interestId) => {
    if (userProfile.interests.includes(interestId)) {
      setUserProfile({
        ...userProfile,
        interests: userProfile.interests.filter((id) => id !== interestId),
      })
    } else {
      setUserProfile({
        ...userProfile,
        interests: [...userProfile.interests, interestId],
      })
    }
  }

  // Handle theme toggle
  const handleThemeToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    setUserProfile({
      ...userProfile,
      darkMode: newTheme === "dark",
    })
  }

  // Handle reset recommendations
  const handleResetRecommendations = () => {
    // In a real app, this would call an API to reset recommendations
    alert("Your AI recommendations have been reset. New suggestions will be generated based on your current profile.")
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
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
                <SidebarMenuButton asChild>
                  <Link href="/explore">
                    <GraduationCap className="h-5 w-5" />
                    <span>Explore Paths</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive>
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
          <header className="bg-card border-b border-border px-4 py-3 flex items-center justify-between">
            <div className="flex items-center">
              <SidebarTrigger className="mr-4" />
              <h1 className="text-xl font-semibold text-foreground">Profile Settings</h1>
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

          <main className="p-4 md:p-6 max-w-6xl mx-auto">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="academic">Academic Preferences</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details and how we can contact you</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1 space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={userProfile.name}
                            onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            value={userProfile.email}
                            onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="flex-1 space-y-4">
                        <div className="space-y-2">
                          <Label>Profile Picture</Label>
                          <div className="flex items-center gap-4">
                            <Avatar className="h-20 w-20">
                              <AvatarImage src="/placeholder.svg?height=80&width=80" alt="User" />
                              <AvatarFallback className="text-2xl">JD</AvatarFallback>
                            </Avatar>
                            <div className="space-y-2">
                              <Button size="sm" variant="outline">
                                Change Picture
                              </Button>
                              <p className="text-xs text-muted-foreground">JPG, GIF or PNG. Max size 2MB.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-6">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Changes</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Account Security</CardTitle>
                    <CardDescription>Manage your password and account security settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-6">
                    <Button variant="outline">Cancel</Button>
                    <Button>Update Password</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Academic Preferences Tab */}
              <TabsContent value="academic" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Academic Interests</CardTitle>
                    <CardDescription>
                      Select the areas that interest you to receive more relevant recommendations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {interestOptions.map((interest) => (
                        <div key={interest.id} className="flex items-center space-x-2">
                          <Button
                            variant={userProfile.interests.includes(interest.id) ? "default" : "outline"}
                            size="sm"
                            className="w-full justify-start"
                            onClick={() => toggleInterest(interest.id)}
                          >
                            {userProfile.interests.includes(interest.id) ? (
                              <Check className="mr-2 h-4 w-4" />
                            ) : (
                              <Plus className="mr-2 h-4 w-4" />
                            )}
                            {interest.label}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Career Goals</CardTitle>
                    <CardDescription>
                      Share your career aspirations to help us tailor your academic recommendations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="career-goals">What are your career aspirations?</Label>
                        <Textarea
                          id="career-goals"
                          placeholder="I'm interested in becoming..."
                          value={userProfile.careerGoals}
                          onChange={(e) => setUserProfile({ ...userProfile, careerGoals: e.target.value })}
                          className="min-h-[150px]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time-frame">Time Frame</Label>
                        <Select defaultValue="medium">
                          <SelectTrigger id="time-frame">
                            <SelectValue placeholder="Select a time frame" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="short">Short-term (1-2 years)</SelectItem>
                            <SelectItem value="medium">Medium-term (3-5 years)</SelectItem>
                            <SelectItem value="long">Long-term (5+ years)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-6">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Changes</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Learning History</CardTitle>
                    <CardDescription>Track your completed and in-progress recommendations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-3">Completed</h3>
                        {completedRecommendations.length > 0 ? (
                          <div className="space-y-2">
                            {completedRecommendations.map((item) => (
                              <div
                                key={item.id}
                                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                                    <Check className="h-4 w-4 text-green-600" />
                                  </div>
                                  <div>
                                    <p className="font-medium">{item.title}</p>
                                    <p className="text-xs text-muted-foreground">
                                      Completed on {formatDate(item.date)}
                                    </p>
                                  </div>
                                </div>
                                <Badge variant="outline" className="bg-green-100 text-green-700 hover:bg-green-100">
                                  100% Complete
                                </Badge>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-muted-foreground">No completed recommendations yet.</p>
                        )}
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-3">In Progress</h3>
                        {inProgressRecommendations.length > 0 ? (
                          <div className="space-y-2">
                            {inProgressRecommendations.map((item) => (
                              <div
                                key={item.id}
                                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                    <BookOpen className="h-4 w-4 text-blue-600" />
                                  </div>
                                  <div>
                                    <p className="font-medium">{item.title}</p>
                                    <p className="text-xs text-muted-foreground">Started on {formatDate(item.date)}</p>
                                  </div>
                                </div>
                                <Badge variant="outline" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                                  {item.progress}% Complete
                                </Badge>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-muted-foreground">No in-progress recommendations.</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-6">
                    <Button variant="outline" onClick={handleResetRecommendations}>
                      Reset AI Recommendations
                    </Button>
                    <Button asChild>
                      <Link href="/dashboard">
                        View All Recommendations <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Configure how you want to receive notifications and updates</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="notifications">Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications about new recommendations and updates
                        </p>
                      </div>
                      <Switch
                        id="notifications"
                        checked={userProfile.notificationsEnabled}
                        onCheckedChange={(checked) => setUserProfile({ ...userProfile, notificationsEnabled: checked })}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-updates">Email Updates</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive weekly summaries and important announcements via email
                        </p>
                      </div>
                      <Switch
                        id="email-updates"
                        checked={userProfile.emailUpdates}
                        onCheckedChange={(checked) => setUserProfile({ ...userProfile, emailUpdates: checked })}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>Customize how the application looks and feels</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="dark-mode">Dark Mode</Label>
                        <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
                      </div>
                      <Switch id="dark-mode" checked={theme === "dark"} onCheckedChange={handleThemeToggle} />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Privacy & Data</CardTitle>
                    <CardDescription>Manage your data and privacy settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="data-collection">Data Collection</Label>
                          <Badge variant="outline" className="bg-green-100 text-green-700 hover:bg-green-100">
                            Enabled
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Allow us to collect usage data to improve your recommendations
                        </p>
                      </div>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Shield className="h-4 w-4" /> Manage
                      </Button>
                    </div>
                    <Separator />
                    <div className="pt-2">
                      <Button variant="destructive" size="sm">
                        Delete Account
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2">
                        This will permanently delete your account and all associated data.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

// Helper function to format dates
function formatDate(dateString) {
  const options = { year: "numeric", month: "short", day: "numeric" }
  return new Date(dateString).toLocaleDateString("en-US", options)
}

// Simple plus icon component
function Plus(props) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}

