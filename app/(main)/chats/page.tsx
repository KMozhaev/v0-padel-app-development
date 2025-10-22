"use client"

import Link from "next/link"
import { Search, MessageCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

// Mock chat data
const mockChats = [
  {
    id: 1,
    matchId: 1,
    matchTitle: "Padel Pro Center - Oct 24",
    participants: ["John Smith", "Sarah Johnson", "You"],
    lastMessage: "See you tomorrow at 6pm!",
    lastMessageTime: "2025-10-23T15:30:00",
    unreadCount: 2,
    avatar: "",
  },
  {
    id: 2,
    matchId: 2,
    matchTitle: "Elite Padel Club - Oct 25",
    participants: ["Mike Chen", "Emma Wilson", "You"],
    lastMessage: "Should we warm up 15 mins early?",
    lastMessageTime: "2025-10-23T12:15:00",
    unreadCount: 0,
    avatar: "",
  },
  {
    id: 3,
    matchId: 3,
    matchTitle: "City Sports Complex - Oct 26",
    participants: ["Alex Brown", "You"],
    lastMessage: "Great! I'll bring extra balls",
    lastMessageTime: "2025-10-22T18:45:00",
    unreadCount: 1,
    avatar: "",
  },
]

export default function ChatsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredChats = mockChats.filter(
    (chat) =>
      chat.matchTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.participants.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 24) {
      return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
    } else if (diffInHours < 48) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-surface border-b border-border p-4 space-y-3">
        <h1 className="text-2xl font-bold">Messages</h1>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8">
            <MessageCircle className="w-16 h-16 text-muted-foreground mb-4" />
            <p className="text-lg font-medium mb-2">No conversations yet</p>
            <p className="text-sm text-muted-foreground text-center">
              Join a match to start chatting with other players
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredChats.map((chat) => (
              <Link key={chat.id} href={`/chats/${chat.id}`} className="block hover:bg-accent/50 transition-colors">
                <div className="p-4 flex items-start gap-3">
                  <Avatar className="w-12 h-12 shrink-0">
                    <AvatarImage src={chat.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      <MessageCircle className="w-6 h-6" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-sm truncate">{chat.matchTitle}</h3>
                      <span className="text-xs text-muted-foreground shrink-0">{formatTime(chat.lastMessageTime)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{chat.participants.join(", ")}</p>
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                      {chat.unreadCount > 0 && (
                        <Badge
                          variant="default"
                          className="shrink-0 h-5 min-w-5 flex items-center justify-center px-1.5"
                        >
                          {chat.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
