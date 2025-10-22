"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar, Trophy, DollarSign, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function CreatePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    club: "",
    location: "",
    date: "",
    time: "",
    duration: "90",
    skillLevel: "",
    matchType: "Doubles",
    courtType: "Indoor",
    totalSpots: "4",
    pricePerPerson: "",
    description: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In a real app, this would create the match in the database
    console.log("Creating match:", formData)

    setIsSubmitting(false)
    router.push("/home")
  }

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="p-4 pb-20">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Create Match</h1>
        <p className="text-sm text-muted-foreground">Set up a new match and find players to join</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Club & Location */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Venue Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="club">Club Name *</Label>
              <Input
                id="club"
                placeholder="e.g., Padel Pro Center"
                value={formData.club}
                onChange={(e) => updateField("club", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                placeholder="e.g., Downtown, 123 Main St"
                value={formData.location}
                onChange={(e) => updateField("location", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="courtType">Court Type *</Label>
              <RadioGroup value={formData.courtType} onValueChange={(value) => updateField("courtType", value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Indoor" id="indoor" />
                  <Label htmlFor="indoor" className="font-normal cursor-pointer">
                    Indoor
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Outdoor" id="outdoor" />
                  <Label htmlFor="outdoor" className="font-normal cursor-pointer">
                    Outdoor
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        {/* Date & Time */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => updateField("date", e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time *</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => updateField("time", e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes) *</Label>
              <Select value={formData.duration} onValueChange={(value) => updateField("duration", value)}>
                <SelectTrigger id="duration">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="60">60 minutes</SelectItem>
                  <SelectItem value="90">90 minutes</SelectItem>
                  <SelectItem value="120">120 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Match Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Match Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="matchType">Match Type *</Label>
              <Select value={formData.matchType} onValueChange={(value) => updateField("matchType", value)}>
                <SelectTrigger id="matchType">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Singles">Singles (2 players)</SelectItem>
                  <SelectItem value="Doubles">Doubles (4 players)</SelectItem>
                  <SelectItem value="Mixed Doubles">Mixed Doubles (4 players)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="skillLevel">Skill Level *</Label>
              <Select value={formData.skillLevel} onValueChange={(value) => updateField("skillLevel", value)}>
                <SelectTrigger id="skillLevel">
                  <SelectValue placeholder="Select skill level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                  <SelectItem value="Professional">Professional</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="totalSpots">Total Spots *</Label>
              <Select value={formData.totalSpots} onValueChange={(value) => updateField("totalSpots", value)}>
                <SelectTrigger id="totalSpots">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 players</SelectItem>
                  <SelectItem value="3">3 players</SelectItem>
                  <SelectItem value="4">4 players</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Pricing */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Pricing
            </CardTitle>
            <CardDescription>Set the price per person for this match</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pricePerPerson">Price per Person ($) *</Label>
              <Input
                id="pricePerPerson"
                type="number"
                min="0"
                step="0.01"
                placeholder="15.00"
                value={formData.pricePerPerson}
                onChange={(e) => updateField("pricePerPerson", e.target.value)}
                required
              />
            </div>
            {formData.pricePerPerson && formData.totalSpots && (
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Total court cost</p>
                <p className="text-2xl font-bold">
                  ${(Number.parseFloat(formData.pricePerPerson) * Number.parseInt(formData.totalSpots)).toFixed(2)}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Additional Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Additional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Add any additional details about the match, court amenities, parking info, etc."
                value={formData.description}
                onChange={(e) => updateField("description", e.target.value)}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex gap-3">
          <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" className="flex-1" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Match"}
          </Button>
        </div>
      </form>
    </div>
  )
}
