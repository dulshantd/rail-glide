import { useState } from "react";
import { ArrowLeft, Filter, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrainCard } from "@/components/TrainCard";
import { useNavigate } from "react-router-dom";

export default function Results() {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<"time" | "duration" | "price">("time");

  // Mock data - in a real app, this would come from an API
  const searchResults = [
    {
      id: "1",
      trainNumber: "TGV 8542",
      operator: "SNCF",
      departure: { time: "08:15", station: "London St Pancras", platform: "A1" },
      arrival: { time: "12:35", station: "Edinburgh Waverley", platform: "4" },
      duration: "4h 20m",
      status: "on-time" as const,
      price: "£89",
    },
    {
      id: "2", 
      trainNumber: "AVE 2134",
      operator: "Virgin Trains",
      departure: { time: "10:45", station: "London St Pancras" },
      arrival: { time: "15:20", station: "Edinburgh Waverley", platform: "7" },
      duration: "4h 35m",
      status: "delayed" as const,
      price: "£76",
    },
    {
      id: "3",
      trainNumber: "IC 9876",
      operator: "CrossCountry",
      departure: { time: "14:20", station: "London St Pancras", platform: "B2" },
      arrival: { time: "19:05", station: "Edinburgh Waverley" },
      duration: "4h 45m",
      status: "on-time" as const,
      price: "£65",
    },
  ];

  const handleTrainSelect = (trainId: string) => {
    navigate(`/train/${trainId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-card border-b border-border px-4 py-4">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="font-semibold text-foreground">London → Edinburgh</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Today
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Departing 08:00+
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Sort & Filter */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            {[
              { key: "time", label: "Departure" },
              { key: "duration", label: "Duration" },
              { key: "price", label: "Price" },
            ].map((option) => (
              <Button
                key={option.key}
                variant={sortBy === option.key ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy(option.key as typeof sortBy)}
                className="text-xs"
              >
                {option.label}
              </Button>
            ))}
          </div>
          <Button variant="outline" size="icon" className="rounded-full">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Results Count */}
        <div className="text-sm text-muted-foreground mb-4">
          {searchResults.length} trains found
        </div>

        {/* Train List */}
        <div className="space-y-4">
          {searchResults.map((train) => (
            <TrainCard
              key={train.id}
              trainNumber={train.trainNumber}
              operator={train.operator}
              departure={train.departure}
              arrival={train.arrival}
              duration={train.duration}
              status={train.status}
              price={train.price}
              onClick={() => handleTrainSelect(train.id)}
            />
          ))}
        </div>

        {/* No more results indicator */}
        <div className="text-center py-8">
          <div className="text-sm text-muted-foreground">
            That's all the trains for today
          </div>
          <Button variant="outline" className="mt-4">
            Search another date
          </Button>
        </div>
      </div>
    </div>
  );
}