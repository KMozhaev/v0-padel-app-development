"use client"

import { useState } from "react"
import { Search, SlidersHorizontal, MapPin, Calendar, Users, Trophy } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FilterSheet } from "@/components/filter-sheet"
import { MatchCard } from "@/components/match-card"

// Mock data for matches
const mockMatches = [
  {
    id: 1,
    club: "Padel Pro Center",
    location: "Downtown",
    date: "2025-10-24",
    time: "18:00",
    skillLevel: "Intermediate",
    matchType: "Doubles",
    spotsLeft: 2,
    totalSpots: 4,
    price: 15,
    courtType: "Indoor",
  },
  {
    id: 2,
    club: "Elite Padel Club",
    location: "Westside",
    date: "2025-10-24",
    time: "19:30",
    skillLevel: "Advanced",
    matchType: "Doubles",
    spotsLeft: 1,
    totalSpots: 4,
    price: 20,
    courtType: "Outdoor",
  },
  {
    id: 3,
    club: "City Sports Complex",
    location: "North District",
    date: "2025-10-25",
    time: "10:00",
    skillLevel: "Beginner",
    matchType: "Doubles",
    spotsLeft: 3,
    totalSpots: 4,
    price: 12,
    courtType: "Indoor",
  },
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    location: "",
    date: "",
    skillLevel: [] as string[],
    matchType: [] as string[],
    courtType: [] as string[],
    priceRange: [0, 50] as [number, number],
  })

  const filteredMatches = mockMatches.filter((match) => {
    const matchesSearch =
      searchQuery === "" ||
      match.club.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesLocation = !filters.location || match.location.toLowerCase().includes(filters.location.toLowerCase())
    const matchesDate = !filters.date || match.date === filters.date
    const matchesSkillLevel = filters.skillLevel.length === 0 || filters.skillLevel.includes(match.skillLevel)
    const matchesMatchType = filters.matchType.length === 0 || filters.matchType.includes(match.matchType)
    const matchesCourtType = filters.courtType.length === 0 || filters.courtType.includes(match.courtType)
    const matchesPrice = match.price >= filters.priceRange[0] && match.price <= filters.priceRange[1]

    return (
      matchesSearch &&
      matchesLocation &&
      matchesDate &&
      matchesSkillLevel &&
      matchesMatchType &&
      matchesCourtType &&
      matchesPrice
    )
  })

  const activeFilterCount = [
    filters.location,
    filters.date,
    filters.skillLevel.length > 0,
    filters.matchType.length > 0,
    filters.courtType.length > 0,
  ].filter(Boolean).length

  return (
    <div className="flex flex-col h-full">
      {/* Search Header */}
      <div className="sticky top-0 z-10 bg-surface border-b border-border p-4 space-y-3">
        <h1 className="text-2xl font-bold">Find Matches</h1>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by club or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4"
          />
        </div>

        {/* Filter Button */}
        <Button
          variant="outline"
          className="w-full justify-between bg-transparent"
          onClick={() => setShowFilters(true)}
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </span>
          {activeFilterCount > 0 && (
            <Badge variant="default" className="ml-2">
              {activeFilterCount}
            </Badge>
          )}
        </Button>

        {/* Active Filters */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2">
            {filters.location && (
              <Badge variant="secondary" className="gap-1">
                <MapPin className="w-3 h-3" />
                {filters.location}
              </Badge>
            )}
            {filters.date && (
              <Badge variant="secondary" className="gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(filters.date).toLocaleDateString()}
              </Badge>
            )}
            {filters.skillLevel.map((level) => (
              <Badge key={level} variant="secondary" className="gap-1">
                <Trophy className="w-3 h-3" />
                {level}
              </Badge>
            ))}
            {filters.matchType.map((type) => (
              <Badge key={type} variant="secondary" className="gap-1">
                <Users className="w-3 h-3" />
                {type}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-muted-foreground">
            {filteredMatches.length} {filteredMatches.length === 1 ? "match" : "matches"} found
          </p>
        </div>

        {filteredMatches.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Search className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-2">No matches found</p>
              <p className="text-sm text-muted-foreground text-center">
                Try adjusting your search or filters to find more matches
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredMatches.map((match) => <MatchCard key={match.id} match={match} />)
        )}
      </div>

      {/* Filter Sheet */}
      <FilterSheet open={showFilters} onOpenChange={setShowFilters} filters={filters} onFiltersChange={setFilters} />
    </div>
  )
}
