"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { MessageSquare, Upload, Users } from "lucide-react"
import Image from "next/image"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("login")
  const [avatar, setAvatar] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login
    setTimeout(() => {
      setIsLoading(false)
      router.push("/chat")
    }, 1500)
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate signup
    setTimeout(() => {
      setIsLoading(false)
      router.push("/chat")
    }, 1500)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()

      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatar(event.target.result as string)
        }
      }

      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center">
        <div className="hidden md:flex flex-col items-center justify-center space-y-6">
          <div className="relative w-80 h-80">
            <Image
              src="/placeholder.svg?height=400&width=400"
              alt="Chat illustration"
              width={400}
              height={400}
              className="rounded-2xl shadow-2xl"
            />
          </div>
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-indigo-800">Connect Instantly</h1>
            <p className="text-gray-600 max-w-md">
              Experience real-time messaging with a beautiful interface. Share photos, connect with friends, and express
              yourself.
            </p>
            <div className="flex justify-center space-x-4 pt-4">
              <FeatureCard icon={<MessageSquare className="h-6 w-6 text-indigo-600" />} title="Real-time Chat" />
              <FeatureCard icon={<Upload className="h-6 w-6 text-indigo-600" />} title="Photo Sharing" />
              <FeatureCard icon={<Users className="h-6 w-6 text-indigo-600" />} title="Group Chats" />
            </div>
          </div>
        </div>

        <div>
          <Card className="w-full max-w-md mx-auto backdrop-blur-sm bg-white/80 border-none shadow-xl">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold text-indigo-800">Welcome to ChatPulse</CardTitle>
              <CardDescription>Enter your details to get started</CardDescription>
            </CardHeader>

            <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="hello@example.com" required />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <a href="#" className="text-xs text-indigo-600 hover:underline">
                          Forgot password?
                        </a>
                      </div>
                      <Input id="password" type="password" required />
                    </div>
                  </CardContent>

                  <CardFooter>
                    <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700" disabled={isLoading}>
                      {isLoading ? "Logging in..." : "Login"}
                    </Button>
                  </CardFooter>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup}>
                  <CardContent className="space-y-4">
                    <div className="flex justify-center mb-4">
                      <div className="relative group">
                        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border-2 border-indigo-200 group-hover:border-indigo-400 transition-all">
                          {avatar ? (
                            <Image
                              src={avatar || "/placeholder.svg"}
                              alt="Avatar preview"
                              width={96}
                              height={96}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <Users className="h-12 w-12 text-gray-400" />
                          )}
                        </div>
                        <label
                          htmlFor="avatar-upload"
                          className="absolute bottom-0 right-0 bg-indigo-600 text-white p-1.5 rounded-full cursor-pointer shadow-lg"
                        >
                          <Upload className="h-4 w-4" />
                          <input
                            id="avatar-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                          />
                        </label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input id="signup-email" type="email" placeholder="hello@example.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input id="signup-password" type="password" required />
                    </div>
                  </CardContent>

                  <CardFooter>
                    <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700" disabled={isLoading}>
                      {isLoading ? "Creating account..." : "Create account"}
                    </Button>
                  </CardFooter>
                </form>
              </TabsContent>
            </Tabs>

            <div className="px-8 pb-8 pt-2 text-center text-sm text-gray-600">
              By continuing, you agree to our{" "}
              <a href="#" className="underline text-indigo-600 hover:text-indigo-800">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="underline text-indigo-600 hover:text-indigo-800">
                Privacy Policy
              </a>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex flex-col items-center space-y-2 p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-md">
      {icon}
      <span className="text-sm font-medium text-gray-700">{title}</span>
    </div>
  )
}

