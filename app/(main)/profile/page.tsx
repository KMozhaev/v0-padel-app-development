"use client"

import { useState } from "react"
import { Settings, Calendar, Trophy, TrendingUp, MapPin, Edit, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

// Mock user data
const mockUser = {
  name: "Alex Thompson",
  email: "alex.thompson@email.com",
  avatar: "",
  skillLevel: "Intermediate",
  location: "Downtown",
  memberSince: "2024-01-15",
  rating: 4.7,
  stats: {
    totalMatches: 45,
    thisMonth: 12,
    upcomingMatches: 3,
    winRate: 68,
  },
}

// Mock match history
const mockHistory = [
  {
    id: 1,
    club: "Padel Pro Center",
    date: "2025-10-20",
    time: "18:00",
    result: "completed",
    players: ["You", "John S.", "Sarah J.", "Mike C."],
    score: "6-4, 6-3",
  },
  {
    id: 2,
    club: "Elite Padel Club",
    date: "2025-10-18",
    time: "19:30",
    result: "completed",
    players: ["You", "Emma W.", "Alex B.", "Lisa M."],
    score: "4-6, 6-2, 6-4",
  },
  {
    id: 3,
    club: "City Sports Complex",
    date: "2025-10-15",
    time: "10:00",
    result: "completed",
    players: ["You", "David L.", "Rachel K.", "Tom H."],
    score: "6-2, 6-1",
  },
]

const mockUpcoming = [
  {
    id: 4,
    club: "Padel Pro Center",
    date: "2025-10-24",
    time: "18:00",
    status: "confirmed",
    players: ["You", "John S.", "Sarah J."],
    spotsLeft: 1,
  },
  {
    id: 5,
    club: "Elite Padel Club",
    date: "2025-10-25",
    time: "19:30",
    status: "confirmed",
    players: ["You", "Mike C.", "Emma W.", "Alex B."],
    spotsLeft: 0,
  },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("upcoming")

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  const memberDuration = () => {
    const start = new Date(mockUser.memberSince)
    const now = new Date()
    const months = (now.getFullYear() - start.getFullYear()) * 12 + now.getMonth() - start.getMonth()
    return months < 12 ? `${months} months` : `${Math.floor(months / 12)} year${Math.floor(months / 12) > 1 ? "s" : ""}`
  }

  return (
    <div className="p-4 pb-20 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Profile</h1>
        <Button variant="ghost" size="icon">
          <Settings className="w-5 h-5" />
        </Button>
      </div>

      {/* User Info Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-4 mb-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={mockUser.avatar || "/placeholder.svg"} />
              <AvatarFallback className="text-2xl">{mockUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-1">{mockUser.name}</h2>
              <p className="text-sm text-muted-foreground mb-2">{mockUser.email}</p>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="secondary">{mockUser.skillLevel}</Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  {mockUser.location}
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" className="bg-transparent">
              <Edit className="w-4 h-4" />
            </Button>
          </div>

          <Separator className="my-4" />

          <div className="flex items-center justify-between text-sm">
            <div>
              <p className="text-muted-foreground">Member since</p>
              <p className="font-medium">{formatDate(mockUser.memberSince)}</p>
            </div>
            <div className="text-right">
              <p className="text-muted-foreground">Rating</p>
              <p className="font-medium">{mockUser.rating} ★</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Trophy className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockUser.stats.totalMatches}</p>
                <p className="text-xs text-muted-foreground">Total Matches</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockUser.stats.thisMonth}</p>
                <p className="text-xs text-muted-foreground">This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockUser.stats.winRate}%</p>
                <p className="text-xs text-muted-foreground">Win Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockUser.stats.upcomingMatches}</p>
                <p className="text-xs text-muted-foreground">Upcoming</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Match History Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>My Matches</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upcoming">Upcoming ({mockUpcoming.length})</TabsTrigger>
              <TabsTrigger value="history">History ({mockHistory.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-3 mt-4">
              {mockUpcoming.map((match) => (
                <Card key={match.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold mb-1">{match.club}</h3>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(match.date)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {match.time}
                          </div>
                        </div>
                      </div>
                      <Badge variant="default">{match.status}</Badge>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm text-muted-foreground">Players:</span>
                      <div className="flex gap-1 flex-wrap">
                        {match.players.map((player, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {player}
                          </Badge>
                        ))}
                        {match.spotsLeft > 0 && (
                          <Badge variant="outline" className="text-xs">
                            +{match.spotsLeft} spot{match.spotsLeft > 1 ? "s" : ""}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="history" className="space-y-3 mt-4">
              {mockHistory.map((match) => (
                <Card key={match.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold mb-1">{match.club}</h3>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(match.date)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {match.time}
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary">{match.result}</Badge>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-muted-foreground">Players:</span>
                      <div className="flex gap-1 flex-wrap">
                        {match.players.map((player, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {player}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm font-medium">Score: {match.score}</p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card>
        <CardContent className="pt-6 space-y-2">
          <Button variant="outline" className="w-full justify-start bg-transparent">
            <Settings className="w-4 h-4 mr-2" />
            Account Settings
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start text-destructive hover:text-destructive bg-transparent"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Log Out
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
