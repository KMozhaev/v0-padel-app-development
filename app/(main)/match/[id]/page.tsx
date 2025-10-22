"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  Trophy,
  DollarSign,
  Building2,
  Info,
  MessageCircle,
  Share2,
  ChevronLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { JoinMatchDialog } from "@/components/join-match-dialog"

// Mock match data
const mockMatch = {
  id: 1,
  club: "Padel Pro Center",
  location: "Downtown, 123 Main St",
  date: "2025-10-24",
  time: "18:00",
  duration: 90,
  skillLevel: "Intermediate",
  matchType: "Doubles",
  spotsLeft: 2,
  totalSpots: 4,
  price: 15,
  courtType: "Indoor",
  description:
    "Looking for 2 more players for a fun doubles match! The club has great facilities with parking available. All skill levels welcome, but intermediate level preferred.",
  organizer: {
    id: 1,
    name: "John Smith",
    avatar: "",
    rating: 4.8,
    matchesPlayed: 45,
  },
  players: [
    {
      id: 1,
      name: "John Smith",
      avatar: "",
      skillLevel: "Intermediate",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      avatar: "",
      skillLevel: "Intermediate",
    },
  ],
  amenities: ["Parking", "Showers", "Equipment Rental", "Cafe"],
}

export default function MatchDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const [showJoinDialog, setShowJoinDialog] = useState(false)
  const [isJoined, setIsJoined] = useState(false)

  const handleJoinMatch = () => {
    setShowJoinDialog(true)
  }

  const handleConfirmJoin = () => {
    setIsJoined(true)
    setShowJoinDialog(false)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Join match at ${mockMatch.club}`,
          text: `${mockMatch.matchType} match on ${new Date(mockMatch.date).toLocaleDateString()}`,
          url: window.location.href,
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
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
          <h1 className="text-lg font-semibold flex-1">Match Details</h1>
          <Button variant="ghost" size="icon" onClick={handleShare}>
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
        {/* Main Info Card */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <CardTitle className="text-xl mb-2">{mockMatch.club}</CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>{mockMatch.location}</span>
                </div>
              </div>
              <Badge variant={mockMatch.courtType === "Indoor" ? "default" : "secondary"}>{mockMatch.courtType}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Date & Time */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">
                    {new Date(mockMatch.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-muted-foreground" />
              <p className="text-sm">
                {mockMatch.time} ({mockMatch.duration} minutes)
              </p>
            </div>

            <Separator />

            {/* Match Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Skill Level</p>
                  <p className="text-sm font-medium">{mockMatch.skillLevel}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Match Type</p>
                  <p className="text-sm font-medium">{mockMatch.matchType}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Spots & Price */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Available Spots</p>
                <p className="text-2xl font-bold">
                  {mockMatch.spotsLeft}/{mockMatch.totalSpots}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground mb-1">Price per Person</p>
                <p className="text-2xl font-bold flex items-center gap-1">
                  <DollarSign className="w-6 h-6" />
                  {mockMatch.price}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Organizer */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Organizer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={mockMatch.organizer.avatar || "/placeholder.svg"} />
                <AvatarFallback>{mockMatch.organizer.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium">{mockMatch.organizer.name}</p>
                <p className="text-sm text-muted-foreground">
                  {mockMatch.organizer.matchesPlayed} matches • {mockMatch.organizer.rating} ★
                </p>
              </div>
              <Button variant="outline" size="sm" className="bg-transparent">
                <MessageCircle className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Current Players */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Players ({mockMatch.players.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockMatch.players.map((player) => (
              <div key={player.id} className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={player.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">{player.name}</p>
                  <p className="text-sm text-muted-foreground">{player.skillLevel}</p>
                </div>
              </div>
            ))}
            {Array.from({ length: mockMatch.spotsLeft }).map((_, idx) => (
              <div key={`empty-${idx}`} className="flex items-center gap-3 opacity-50">
                <Avatar>
                  <AvatarFallback>?</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">Open Spot</p>
                  <p className="text-sm text-muted-foreground">Waiting for player</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Description */}
        {mockMatch.description && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Info className="w-5 h-5" />
                About This Match
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">{mockMatch.description}</p>
            </CardContent>
          </Card>
        )}

        {/* Amenities */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Amenities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {mockMatch.amenities.map((amenity) => (
                <Badge key={amenity} variant="secondary">
                  {amenity}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 shadow-lg">
        <div className="max-w-screen-md mx-auto">
          {isJoined ? (
            <div className="space-y-2">
              <Button className="w-full" disabled>
                Joined
              </Button>
              <p className="text-xs text-center text-muted-foreground">You'll receive a confirmation email shortly</p>
            </div>
          ) : (
            <Button className="w-full" size="lg" onClick={handleJoinMatch} disabled={mockMatch.spotsLeft === 0}>
              {mockMatch.spotsLeft === 0 ? "Match Full" : `Join Match - $${mockMatch.price}`}
            </Button>
          )}
        </div>
      </div>

      {/* Join Dialog */}
      <JoinMatchDialog
        open={showJoinDialog}
        onOpenChange={setShowJoinDialog}
        match={mockMatch}
        onConfirm={handleConfirmJoin}
      />
    </div>
  )
}
