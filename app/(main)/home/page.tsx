"use client"

import { Calendar, MapPin, Clock, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MatchCard } from "@/components/match-card"
import Link from "next/link"

// Mock data for today's matches
const todayMatches = [
  {
    id: 1,
    club: "Padel Pro Center",
    location: "Downtown",
    date: "2025-10-23",
    time: "18:00",
    skillLevel: "Intermediate",
    matchType: "Doubles",
    spotsLeft: 2,
    totalSpots: 4,
    price: 15,
    courtType: "Indoor",
  },
]

// Mock data for upcoming bookings
const upcomingBookings = [
  {
    id: 2,
    club: "Elite Padel Club",
    date: "2025-10-25",
    time: "19:30",
    players: ["You", "John D.", "Sarah M."],
    status: "confirmed",
  },
]

export default function HomePage() {
  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold mb-1">My Day</h1>
        <p className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-xs text-muted-foreground">Upcoming</p>
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
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-muted-foreground">This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Bookings */}
      {upcomingBookings.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Your Bookings</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/profile">View All</Link>
            </Button>
          </div>
          {upcomingBookings.map((booking) => (
            <Card key={booking.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base">{booking.club}</CardTitle>
                  <Badge variant="default">Confirmed</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>
                      {new Date(booking.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{booking.time}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Players:</span>
                  <div className="flex gap-1 flex-wrap">
                    {booking.players.map((player, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {player}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href={`/match/${booking.id}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Today's Available Matches */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Available Today</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/search">See All</Link>
          </Button>
        </div>
        {todayMatches.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <MapPin className="w-10 h-10 text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground text-center">No matches available today</p>
              <Button variant="link" size="sm" asChild className="mt-2">
                <Link href="/search">Search for matches</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          todayMatches.map((match) => <MatchCard key={match.id} match={match} />)
        )}
      </div>
    </div>
  )
}
