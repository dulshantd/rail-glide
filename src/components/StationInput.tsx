import { useState } from "react";
import { MapPin, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface StationInputProps {
  departure: string;
  arrival: string;
  onDepartureChange: (value: string) => void;
  onArrivalChange: (value: string) => void;
  onSwap: () => void;
}

export function StationInput({
  departure,
  arrival,
  onDepartureChange,
  onArrivalChange,
  onSwap,
}: StationInputProps) {
  const [focusedInput, setFocusedInput] = useState<'departure' | 'arrival' | null>(null);

  return (
    <div className="space-y-4">
      {/* Departure Station */}
      <div className="relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground z-10">
          <MapPin className="h-5 w-5" />
        </div>
        <Input
          value={departure}
          onChange={(e) => onDepartureChange(e.target.value)}
          onFocus={() => setFocusedInput('departure')}
          onBlur={() => setFocusedInput(null)}
          placeholder="From"
          className={cn(
            "station-input pl-12 h-14 text-lg",
            focusedInput === 'departure' && "ring-2 ring-primary"
          )}
        />
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground font-medium">
          DEPARTURE
        </div>
      </div>

      {/* Swap Button */}
      <div className="flex justify-center">
        <Button
          variant="outline"
          size="icon"
          onClick={onSwap}
          className="rounded-full bg-card border-2 border-border hover:bg-accent transition-all duration-200 hover:scale-105"
        >
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      </div>

      {/* Arrival Station */}
      <div className="relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground z-10">
          <MapPin className="h-5 w-5" />
        </div>
        <Input
          value={arrival}
          onChange={(e) => onArrivalChange(e.target.value)}
          onFocus={() => setFocusedInput('arrival')}
          onBlur={() => setFocusedInput(null)}
          placeholder="To"
          className={cn(
            "station-input pl-12 h-14 text-lg",
            focusedInput === 'arrival' && "ring-2 ring-primary"
          )}
        />
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground font-medium">
          ARRIVAL
        </div>
      </div>
    </div>
  );
}