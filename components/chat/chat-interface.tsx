"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import {
  Search,
  Mic,
  Paperclip,
  Smile,
  Send,
  MessageSquare,
  Video,
  Users,
  Heart,
  Download,
  ImageIcon,
  Phone,
  MoreVertical,
  ArrowLeft,
  Moon,
  Sun,
  LogOut,
  Settings,
  Bell,
  X,
  Check,
  Camera,
} from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import { useMobile } from "@/hooks/use-mobile"

type Contact = {
  id: string
  name: string
  message: string
  time: string
  read: boolean
  active: boolean
  online: boolean
  avatar: string
  typing?: boolean
  unreadCount?: number
}

type Message = {
  id: string
  sender: string
  content: string
  time: string
  isMe: boolean
  status?: "sent" | "delivered" | "read"
  attachment?: {
    type: string
    name: string
    url?: string
  }
}

export default function ChatInterface() {
  const [darkMode, setDarkMode] = useState(false)
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "1",
      name: "Brad Forst",
      message: "Message for brad frost",
      time: "10:46 AM",
      read: false,
      active: false,
      online: true,
      avatar: "/placeholder.svg?height=40&width=40",
      unreadCount: 1,
    },
    {
      id: "2",
      name: "Paul Irish",
      message: "Message for Paul Irish",
      time: "09:06 AM",
      read: true,
      active: false,
      online: false,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      name: "Lina Roy",
      message: "Message for Line",
      time: "01:34 PM",
      read: true,
      active: false,
      online: true,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "4",
      name: "Jessica Giloy",
      message: "Message for Jessica Giloy",
      time: "3:29 PM",
      read: true,
      active: false,
      online: true,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "5",
      name: "Eric Peterson",
      message: "Message for Eric Peterson",
      time: "4:08 PM",
      read: false,
      active: false,
      online: false,
      avatar: "/placeholder.svg?height=40&width=40",
      unreadCount: 1,
    },
    {
      id: "6",
      name: "Elizabeth Olsen",
      message: "Message for Elizabeth Olsen",
      time: "8:30 AM",
      read: true,
      active: true,
      online: true,
      avatar: "/placeholder.svg?height=40&width=40",
      typing: true,
    },
  ])

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "Elizabeth Olsen",
      content: "That's Great",
      time: "Yesterday",
      isMe: false,
      status: "read",
    },
    {
      id: "2",
      sender: "Me",
      content: "I am refer to the project structure and found some mistakes",
      time: "Today",
      isMe: true,
      status: "read",
    },
    {
      id: "3",
      sender: "Me",
      content: "There are some bugs in this project",
      time: "Today",
      isMe: true,
      status: "read",
    },
    {
      id: "4",
      sender: "Elizabeth Olsen",
      content: "I see that project",
      time: "Today",
      isMe: false,
      status: "read",
    },
    {
      id: "5",
      sender: "Elizabeth Olsen",
      content: "Yes there are many bugs in that project",
      time: "Today",
      isMe: false,
      status: "read",
    },
    {
      id: "6",
      sender: "Elizabeth Olsen",
      content: "",
      time: "Today",
      isMe: false,
      status: "read",
      attachment: {
        type: "PDF",
        name: "Report.PDF",
        url: "#",
      },
    },
    {
      id: "7",
      sender: "Me",
      content: "Can you send me the report",
      time: "Just now",
      isMe: true,
      status: "delivered",
    },
  ])

  const [inputMessage, setInputMessage] = useState("")
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showAttachmentOptions, setShowAttachmentOptions] = useState(false)
  const [showMobileContacts, setShowMobileContacts] = useState(true)
  const [showMobileProfile, setShowMobileProfile] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const isMobile = useMobile()
  const router = useRouter()

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Simulate typing indicator
  useEffect(() => {
    const typingTimeout = setTimeout(() => {
      setContacts((prev) => prev.map((contact) => (contact.id === "6" ? { ...contact, typing: false } : contact)))

      // Add a new message after typing stops
      const newMessage: Message = {
        id: (messages.length + 1).toString(),
        sender: "Elizabeth Olsen",
        content: "I've fixed most of the bugs. Let me know if you find any more issues.",
        time: "Just now",
        isMe: false,
        status: "read",
      }

      setMessages((prev) => [...prev, newMessage])
    }, 5000)

    return () => clearTimeout(typingTimeout)
  }, [])

  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: (messages.length + 1).toString(),
        sender: "Me",
        content: inputMessage,
        time: "Just now",
        isMe: true,
        status: "sent",
      }

      setMessages([...messages, newMessage])
      setInputMessage("")

      // Simulate message being delivered
      setTimeout(() => {
        setMessages((prev) => prev.map((msg) => (msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg)))
      }, 1000)

      // Simulate message being read
      setTimeout(() => {
        setMessages((prev) => prev.map((msg) => (msg.id === newMessage.id ? { ...msg, status: "read" } : msg)))

        // Simulate typing indicator
        setContacts((prev) => prev.map((contact) => (contact.id === "6" ? { ...contact, typing: true } : contact)))
      }, 2000)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true)

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)

            // Add the image message
            const newMessage: Message = {
              id: (messages.length + 1).toString(),
              sender: "Me",
              content: "",
              time: "Just now",
              isMe: true,
              status: "sent",
              attachment: {
                type: "Image",
                name: e.target.files?.[0].name || "image.jpg",
                url: URL.createObjectURL(e.target.files?.[0]),
              },
            }

            setMessages((prev) => [...prev, newMessage])
            setIsUploading(false)
            setUploadProgress(0)
            return 0
          }
          return prev + 10
        })
      }, 300)
    }
  }

  const handleContactClick = (id: string) => {
    setContacts((prev) =>
      prev.map((contact) => ({
        ...contact,
        active: contact.id === id,
        read: contact.id === id ? true : contact.read,
        unreadCount: contact.id === id ? 0 : contact.unreadCount,
      })),
    )

    if (isMobile) {
      setShowMobileContacts(false)
    }
  }

  const handleLogout = () => {
    router.push("/")
  }

  const activeContact = contacts.find((contact) => contact.active)

  const renderMessageStatus = (status?: string) => {
    switch (status) {
      case "sent":
        return <Check className="h-3 w-3 text-gray-400" />
      case "delivered":
        return (
          <div className="flex">
            <Check className="h-3 w-3 text-gray-400" />
            <Check className="h-3 w-3 -ml-1 text-gray-400" />
          </div>
        )
      case "read":
        return (
          <div className="flex">
            <Check className="h-3 w-3 text-blue-500" />
            <Check className="h-3 w-3 -ml-1 text-blue-500" />
          </div>
        )
      default:
        return null
    }
  }

  const emojis = ["😊", "😂", "❤️", "👍", "🎉", "🔥", "😍", "🙏", "👏", "🤔"]

  return (
    <div
      className={cn(
        "flex h-screen max-h-screen overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-300",
        darkMode ? "dark" : "",
      )}
    >
      {/* Left Sidebar - Contacts */}
      <div
        className={cn(
          "w-80 border-r flex flex-col bg-white dark:bg-gray-900 dark:border-gray-800 transition-all duration-300",
          isMobile && !showMobileContacts ? "hidden" : "block",
          isMobile ? "w-full" : "w-80",
        )}
      >
        <div className="p-4 border-b dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
              <MessageSquare className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              ChatPulse
            </h1>
          </div>

          <div className="flex items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setDarkMode(!darkMode)}>
                    {darkMode ? (
                      <Sun className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300" />
                    ) : (
                      <Moon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{darkMode ? "Light mode" : "Dark mode"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <MoreVertical className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56" align="end">
                <div className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    <Bell className="h-4 w-4 mr-2" />
                    Notifications
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                    size="sm"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search Friends"
              className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 focus:outline-none border-none"
            />
          </div>
        </div>

        <Tabs defaultValue="chats" className="px-4">
          <TabsList className="w-full grid grid-cols-3 mb-4">
            <TabsTrigger value="chats">Chats</TabsTrigger>
            <TabsTrigger value="groups">Groups</TabsTrigger>
            <TabsTrigger value="calls">Calls</TabsTrigger>
          </TabsList>

          <TabsContent value="chats" className="m-0">
            <div className="flex-1 overflow-y-auto max-h-[calc(100vh-200px)]">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className={cn(
                    "flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer rounded-xl transition-all duration-200 mb-1",
                    contact.active && "bg-indigo-50 dark:bg-indigo-950",
                  )}
                  onClick={() => handleContactClick(contact.id)}
                >
                  <div className="relative">
                    <Avatar className="h-12 w-12 border-2 border-white dark:border-gray-800">
                      <AvatarImage src={contact.avatar} alt={contact.name} />
                      <AvatarFallback className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                        {contact.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {contact.online && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></span>
                    )}
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between items-center">
                      <h3
                        className={cn(
                          "font-medium",
                          contact.active ? "text-indigo-600 dark:text-indigo-400" : "text-gray-800 dark:text-gray-200",
                        )}
                      >
                        {contact.name}
                      </h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{contact.time}</span>
                    </div>
                    <div className="flex items-center">
                      {contact.typing ? (
                        <span className="text-xs text-indigo-600 dark:text-indigo-400 italic">typing...</span>
                      ) : (
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{contact.message}</p>
                      )}
                    </div>
                  </div>
                  {contact.unreadCount && contact.unreadCount > 0 ? (
                    <Badge variant="default" className="ml-2 bg-indigo-600 hover:bg-indigo-700">
                      {contact.unreadCount}
                    </Badge>
                  ) : contact.read ? (
                    <div className="ml-2 text-indigo-600">
                      <Check className="h-4 w-4" />
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="groups" className="m-0">
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <Users className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">No Groups Yet</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mt-2">
                Create a group to chat with multiple friends at once
              </p>
              <Button className="mt-4">Create Group</Button>
            </div>
          </TabsContent>

          <TabsContent value="calls" className="m-0">
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <Phone className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">No Recent Calls</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mt-2">
                When you make or receive calls, they will appear here
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Middle - Chat */}
      <div
        className={cn(
          "flex-1 flex flex-col bg-gray-50 dark:bg-gray-900 transition-all duration-300",
          isMobile && showMobileContacts ? "hidden" : "block",
          isMobile && showMobileProfile ? "hidden" : "block",
        )}
      >
        <div className="border-b dark:border-gray-800 p-4 flex items-center justify-between">
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={() => setShowMobileContacts(true)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}

          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={activeContact?.avatar} alt={activeContact?.name} />
              <AvatarFallback className="bg-indigo-100 text-indigo-800">
                {activeContact?.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{activeContact?.name}</h2>
              {activeContact?.online ? (
                <p className="text-xs text-green-500">Online</p>
              ) : (
                <p className="text-xs text-gray-500 dark:text-gray-400">Offline</p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Phone className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Voice Call</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Video className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Video Call</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {isMobile && (
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setShowMobileProfile(true)}>
                <MoreVertical className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </Button>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
          {messages.map((message, index) => {
            const showDate = index === 0 || messages[index - 1].time !== message.time

            return (
              <div key={message.id} className="space-y-2">
                {showDate && (
                  <div className="text-center text-xs text-gray-500 dark:text-gray-400 my-2">{message.time}</div>
                )}
                <div className={cn("flex", message.isMe ? "justify-end" : "justify-start")}>
                  {!message.isMe && (
                    <div className="mr-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                        <AvatarFallback className="bg-indigo-100 text-indigo-800">
                          {activeContact?.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[70%] rounded-lg p-3 shadow-sm",
                      message.isMe
                        ? "bg-indigo-600 text-white dark:bg-indigo-700"
                        : "bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200",
                    )}
                  >
                    {message.content && <p>{message.content}</p>}
                    {message.attachment && (
                      <div>
                        {message.attachment.type === "PDF" ? (
                          <div className="flex items-center space-x-2 bg-indigo-700 dark:bg-indigo-800 rounded-md p-2 text-white">
                            <div className="bg-indigo-600 dark:bg-indigo-900 rounded-md p-1">
                              <span>{message.attachment.type}</span>
                            </div>
                            <span>{message.attachment.name}</span>
                            <Download className="h-4 w-4" />
                          </div>
                        ) : message.attachment.type === "Image" && message.attachment.url ? (
                          <div className="rounded-md overflow-hidden mt-2">
                            <Image
                              src={message.attachment.url || "/placeholder.svg"}
                              alt="Shared image"
                              width={300}
                              height={200}
                              className="object-cover max-w-full rounded-md"
                            />
                          </div>
                        ) : null}
                      </div>
                    )}
                    {message.isMe && <div className="flex justify-end mt-1">{renderMessageStatus(message.status)}</div>}
                  </div>
                  {message.isMe && (
                    <div className="ml-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                        <AvatarFallback className="bg-indigo-100 text-indigo-800">ME</AvatarFallback>
                      </Avatar>
                    </div>
                  )}
                </div>
              </div>
            )
          })}

          {isUploading && (
            <div className="flex justify-end">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm max-w-[70%]">
                <div className="flex items-center space-x-2">
                  <ImageIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Uploading image...</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                </div>
              </div>
            </div>
          )}

          {activeContact?.typing && (
            <div className="flex justify-start">
              <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                <div className="flex space-x-1">
                  <span
                    className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></span>
                  <span
                    className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></span>
                  <span
                    className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t dark:border-gray-800">
          <div className="flex items-center bg-white dark:bg-gray-800 rounded-full p-1 shadow-md">
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <Mic className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Write Something"
              className="flex-1 bg-transparent border-none focus:outline-none px-3 py-2 text-gray-800 dark:text-gray-200"
            />

            <Popover open={showAttachmentOptions} onOpenChange={setShowAttachmentOptions}>
              <PopoverTrigger asChild>
                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Paperclip className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-56" align="end" side="top">
                <div className="grid grid-cols-3 gap-2">
                  <button
                    className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => {
                      fileInputRef.current?.click()
                      setShowAttachmentOptions(false)
                    }}
                  >
                    <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mb-1">
                      <ImageIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <span className="text-xs">Image</span>
                  </button>
                  <button className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-1">
                      <Camera className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-xs">Camera</span>
                  </button>
                  <button className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                    <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-1">
                      <Video className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <span className="text-xs">Video</span>
                  </button>
                </div>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
              </PopoverContent>
            </Popover>

            <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
              <PopoverTrigger asChild>
                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Smile className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-56" align="end" side="top">
                <div className="grid grid-cols-5 gap-2">
                  {emojis.map((emoji, index) => (
                    <button
                      key={index}
                      className="text-2xl hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded"
                      onClick={() => {
                        setInputMessage((prev) => prev + emoji)
                        setShowEmojiPicker(false)
                      }}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            <button
              onClick={handleSendMessage}
              className="p-2 rounded-full bg-indigo-600 hover:bg-indigo-700 transition-colors"
              disabled={!inputMessage.trim()}
            >
              <Send className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Profile */}
      <div
        className={cn(
          "w-80 border-l bg-white dark:bg-gray-900 dark:border-gray-800 transition-all duration-300",
          !isMobile ? "block" : showMobileProfile ? "block w-full" : "hidden",
        )}
      >
        {isMobile && showMobileProfile && (
          <div className="p-4 border-b dark:border-gray-800">
            <Button variant="ghost" size="icon" onClick={() => setShowMobileProfile(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        )}

        <div className="p-6 flex flex-col items-center text-center">
          <Avatar className="h-24 w-24 mb-4 border-4 border-indigo-100 dark:border-indigo-900">
            <AvatarImage src="/placeholder.svg?height=120&width=120" alt="Elizabeth Olsen" />
            <AvatarFallback className="bg-indigo-100 text-indigo-800 text-2xl">
              {activeContact?.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">{activeContact?.name}</h2>
          <p className="text-gray-500 dark:text-gray-400">Junior Developer</p>

          <div className="flex w-full mt-8 border-b dark:border-gray-800 pb-8">
            <div className="flex-1 flex flex-col items-center">
              <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full mb-2">
                <MessageSquare className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300">Chat</span>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full mb-2">
                <Video className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300">Video Call</span>
            </div>
          </div>

          <div className="w-full mt-6">
            <button className="flex items-center text-gray-700 dark:text-gray-300 mb-4 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              <Users className="h-5 w-5 mr-3" />
              <span>View Friends</span>
            </button>
            <button className="flex items-center text-gray-700 dark:text-gray-300 mb-6 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              <Heart className="h-5 w-5 mr-3" />
              <span>Add to Favorites</span>
            </button>

            <h3 className="text-left font-medium mb-4 text-gray-800 dark:text-gray-200">Attachments</h3>
            <div className="grid grid-cols-4 gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <button className="bg-indigo-100 dark:bg-indigo-900 aspect-square rounded-md flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-sm hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors">
                    PDF
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Shared Documents</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-3 mt-4">
                    <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="bg-indigo-100 dark:bg-indigo-900 p-2 rounded mr-3">
                        <span className="text-indigo-600 dark:text-indigo-400 font-medium">PDF</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">Report.PDF</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">2.4 MB • Today</p>
                      </div>
                      <Button size="sm" variant="ghost">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <button className="bg-indigo-100 dark:bg-indigo-900 aspect-square rounded-md flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-sm hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors">
                Video
              </button>
              <button className="bg-indigo-100 dark:bg-indigo-900 aspect-square rounded-md flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-sm hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors">
                MP3
              </button>
              <button className="bg-indigo-100 dark:bg-indigo-900 aspect-square rounded-md flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-sm hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors">
                Image
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

