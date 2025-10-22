"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { ChevronLeft, Send, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"

// Mock chat data
const mockChat = {
  id: 1,
  matchTitle: "Padel Pro Center - Oct 24",
  matchDate: "2025-10-24",
  matchTime: "18:00",
  participants: [
    { id: 1, name: "John Smith", avatar: "" },
    { id: 2, name: "Sarah Johnson", avatar: "" },
    { id: 3, name: "You", avatar: "" },
  ],
}

const mockMessages = [
  {
    id: 1,
    senderId: 1,
    senderName: "John Smith",
    message: "Hey everyone! Looking forward to the match tomorrow",
    timestamp: "2025-10-23T14:00:00",
    isCurrentUser: false,
  },
  {
    id: 2,
    senderId: 2,
    senderName: "Sarah Johnson",
    message: "Me too! Should we meet 10 minutes early to warm up?",
    timestamp: "2025-10-23T14:15:00",
    isCurrentUser: false,
  },
  {
    id: 3,
    senderId: 3,
    senderName: "You",
    message: "Sounds good! I'll be there at 5:50pm",
    timestamp: "2025-10-23T14:20:00",
    isCurrentUser: true,
  },
  {
    id: 4,
    senderId: 1,
    senderName: "John Smith",
    message: "Perfect! See you tomorrow at 6pm!",
    timestamp: "2025-10-23T15:30:00",
    isCurrentUser: false,
  },
]

export default function ChatPage() {
  const router = useRouter()
  const params = useParams()
  const [messages, setMessages] = useState(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message = {
      id: messages.length + 1,
      senderId: 3,
      senderName: "You",
      message: newMessage,
      timestamp: new Date().toISOString(),
      isCurrentUser: true,
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    }
  }

  return (
    <div className="flex flex-col h-full bg-surface">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card border-b border-border">
        <div className="flex items-center gap-3 p-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-semibold truncate">{mockChat.matchTitle}</h1>
            <p className="text-xs text-muted-foreground">{mockChat.participants.length} participants</p>
          </div>
          <Button variant="ghost" size="icon">
            <Info className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Match Info Banner */}
      <Card className="m-4 mb-0">
        <div className="p-3 text-center">
          <p className="text-sm font-medium mb-1">Match Details</p>
          <p className="text-xs text-muted-foreground">
            {new Date(mockChat.matchDate).toLocaleDateString("en-US", { month: "long", day: "numeric" })} at{" "}
            {mockChat.matchTime}
          </p>
        </div>
      </Card>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => {
          const showDate = index === 0 || formatDate(messages[index - 1].timestamp) !== formatDate(message.timestamp)

          return (
            <div key={message.id}>
              {showDate && (
                <div className="flex items-center justify-center my-4">
                  <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
                    {formatDate(message.timestamp)}
                  </span>
                </div>
              )}
              <div className={`flex gap-2 ${message.isCurrentUser ? "flex-row-reverse" : ""}`}>
                {!message.isCurrentUser && (
                  <Avatar className="w-8 h-8 shrink-0">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>{message.senderName.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
                <div className={`flex flex-col ${message.isCurrentUser ? "items-end" : "items-start"} max-w-[75%]`}>
                  {!message.isCurrentUser && (
                    <span className="text-xs text-muted-foreground mb-1 px-1">{message.senderName}</span>
                  )}
                  <div
                    className={`rounded-2xl px-4 py-2 ${
                      message.isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.message}</p>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1 px-1">{formatTime(message.timestamp)}</span>
                </div>
              </div>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="sticky bottom-0 bg-card border-t border-border p-4">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!newMessage.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
