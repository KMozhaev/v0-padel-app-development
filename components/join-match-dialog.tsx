"use client"

import { useState } from "react"
import { CreditCard, Check } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"

interface JoinMatchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  match: {
    club: string
    date: string
    time: string
    price: number
  }
  onConfirm: () => void
}

export function JoinMatchDialog({ open, onOpenChange, match, onConfirm }: JoinMatchDialogProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const handleConfirm = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsProcessing(false)
    onConfirm()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Join Match</DialogTitle>
          <DialogDescription>Review your booking details and complete payment</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Match Summary */}
          <div className="space-y-2">
            <h3 className="font-medium">Match Details</h3>
            <div className="p-3 bg-muted rounded-lg space-y-1 text-sm">
              <p>
                <span className="text-muted-foreground">Club:</span> {match.club}
              </p>
              <p>
                <span className="text-muted-foreground">Date:</span>{" "}
                {new Date(match.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </p>
              <p>
                <span className="text-muted-foreground">Time:</span> {match.time}
              </p>
            </div>
          </div>

          <Separator />

          {/* Payment Details */}
          <div className="space-y-3">
            <h3 className="font-medium flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Payment Information
            </h3>
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry</Label>
                  <Input id="expiry" placeholder="MM/YY" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" />
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Price Summary */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Match fee</span>
              <span>${match.price.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Service fee</span>
              <span>${(match.price * 0.1).toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between font-bold">
              <span>Total</span>
              <span>${(match.price * 1.1).toFixed(2)}</span>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-start space-x-2">
            <Checkbox id="terms" checked={agreedToTerms} onCheckedChange={(checked) => setAgreedToTerms(!!checked)} />
            <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
              I agree to the cancellation policy and terms of service
            </label>
          </div>
        </div>

        <DialogFooter className="flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isProcessing}
            className="flex-1 bg-transparent"
          >
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!agreedToTerms || isProcessing} className="flex-1">
            {isProcessing ? (
              "Processing..."
            ) : (
              <>
                <Check className="w-4 h-4 mr-2" />
                Confirm & Pay
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
