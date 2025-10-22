"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"

interface FilterSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  filters: {
    location: string
    date: string
    skillLevel: string[]
    matchType: string[]
    courtType: string[]
    priceRange: [number, number]
  }
  onFiltersChange: (filters: FilterSheetProps["filters"]) => void
}

const skillLevels = ["Beginner", "Intermediate", "Advanced", "Professional"]
const matchTypes = ["Singles", "Doubles", "Mixed Doubles"]
const courtTypes = ["Indoor", "Outdoor"]

export function FilterSheet({ open, onOpenChange, filters, onFiltersChange }: FilterSheetProps) {
  const handleCheckboxChange = (category: "skillLevel" | "matchType" | "courtType", value: string) => {
    const currentValues = filters[category]
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value]
    onFiltersChange({ ...filters, [category]: newValues })
  }

  const handleClearAll = () => {
    onFiltersChange({
      location: "",
      date: "",
      skillLevel: [],
      matchType: [],
      courtType: [],
      priceRange: [0, 50],
    })
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Filter Matches</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 py-6">
          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="Enter location..."
              value={filters.location}
              onChange={(e) => onFiltersChange({ ...filters, location: e.target.value })}
            />
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={filters.date}
              onChange={(e) => onFiltersChange({ ...filters, date: e.target.value })}
            />
          </div>

          {/* Skill Level */}
          <div className="space-y-3">
            <Label>Skill Level</Label>
            <div className="space-y-2">
              {skillLevels.map((level) => (
                <div key={level} className="flex items-center space-x-2">
                  <Checkbox
                    id={`skill-${level}`}
                    checked={filters.skillLevel.includes(level)}
                    onCheckedChange={() => handleCheckboxChange("skillLevel", level)}
                  />
                  <label
                    htmlFor={`skill-${level}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {level}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Match Type */}
          <div className="space-y-3">
            <Label>Match Type</Label>
            <div className="space-y-2">
              {matchTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`match-${type}`}
                    checked={filters.matchType.includes(type)}
                    onCheckedChange={() => handleCheckboxChange("matchType", type)}
                  />
                  <label
                    htmlFor={`match-${type}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Court Type */}
          <div className="space-y-3">
            <Label>Court Type</Label>
            <div className="space-y-2">
              {courtTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`court-${type}`}
                    checked={filters.courtType.includes(type)}
                    onCheckedChange={() => handleCheckboxChange("courtType", type)}
                  />
                  <label
                    htmlFor={`court-${type}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Price Range</Label>
              <span className="text-sm text-muted-foreground">
                ${filters.priceRange[0]} - ${filters.priceRange[1]}
              </span>
            </div>
            <Slider
              min={0}
              max={50}
              step={5}
              value={filters.priceRange}
              onValueChange={(value) => onFiltersChange({ ...filters, priceRange: value as [number, number] })}
              className="w-full"
            />
          </div>
        </div>

        <SheetFooter className="flex-row gap-2">
          <Button variant="outline" onClick={handleClearAll} className="flex-1 bg-transparent">
            Clear All
          </Button>
          <Button onClick={() => onOpenChange(false)} className="flex-1">
            Apply Filters
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
