"use client"

import Link from "next/link"
import { MapPin, Calendar, Clock, Users, Trophy, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Match {
  id: number
  club: string
  location: string
  date: string
  time: string
  skillLevel: string
  matchType: string
  spotsLeft: number
  totalSpots: number
  price: number
  courtType: string
}

interface MatchCardProps {
  match: Match
}

export function MatchCard({ match }: MatchCardProps) {
  const spotsPercentage = (match.spotsLeft / match.totalSpots) * 100
  const isAlmostFull = spotsPercentage <= 25

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg">{match.club}</CardTitle>
          <Badge variant={match.courtType === "Indoor" ? "default" : "secondary"} className="shrink-0">
            {match.courtType}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 shrink-0" />
          <span>{match.location}</span>
        </div>

        {/* Date & Time */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 shrink-0 text-muted-foreground" />
            <span>{new Date(match.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 shrink-0 text-muted-foreground" />
            <span>{match.time}</span>
          </div>
        </div>

        {/* Match Details */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-sm">
            <Trophy className="w-4 h-4 shrink-0 text-muted-foreground" />
            <span>{match.skillLevel}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 shrink-0 text-muted-foreground" />
            <span>{match.matchType}</span>
          </div>
        </div>

        {/* Spots & Price */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              {match.spotsLeft} {match.spotsLeft === 1 ? "spot" : "spots"} left
            </span>
            {isAlmostFull && (
              <Badge variant="destructive" className="text-xs">
                Almost Full
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2 text-lg font-bold">
            <DollarSign className="w-5 h-5" />
            {match.price}
          </div>
        </div>

        {/* Action Button */}
        <Button asChild className="w-full">
          <Link href={`/match/${match.id}`}>View Details</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
