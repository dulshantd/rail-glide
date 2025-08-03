import { useState } from "react";
import { Search as SearchIcon, Train } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StationInput } from "@/components/StationInput";
import { DateTimeSelector } from "@/components/DateTimeSelector";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const navigate = useNavigate();
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [date, setDate] = useState(new Date());

  const handleSwapStations = () => {
    const temp = departure;
    setDeparture(arrival);
    setArrival(temp);
  };

  const handleSearch = () => {
    if (departure && arrival) {
      // In a real app, you would pass search parameters
      navigate("/results");
    }
  };

  const isSearchDisabled = !departure.trim() || !arrival.trim();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <div className="gradient-hero text-white px-4 py-8">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Train className="h-8 w-8" />
              <h1 className="text-2xl font-bold">RailGlide</h1>
            </div>
            <p className="text-white/80 text-lg">Find trains, compare prices, book tickets</p>
          </div>
        </div>
      </div>

      {/* Search Form */}
      <div className="max-w-lg mx-auto px-4 -mt-6 relative z-10">
        <div className="bg-card rounded-2xl shadow-[var(--shadow-elevated)] p-6 border border-border">
          <div className="space-y-6">
            {/* Station Inputs */}
            <StationInput
              departure={departure}
              arrival={arrival}
              onDepartureChange={setDeparture}
              onArrivalChange={setArrival}
              onSwap={handleSwapStations}
            />

            {/* Date & Time */}
            <DateTimeSelector date={date} onDateChange={setDate} />

            {/* Search Button */}
            <Button
              onClick={handleSearch}
              disabled={isSearchDisabled}
              className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed gradient-primary"
            >
              <SearchIcon className="mr-2 h-5 w-5" />
              Search Trains
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Popular Routes</h3>
          <div className="grid grid-cols-1 gap-3">
            {[
              { from: "London", to: "Edinburgh", duration: "4h 20m" },
              { from: "Paris", to: "Lyon", duration: "2h 5m" },
              { from: "Berlin", to: "Munich", duration: "4h 15m" },
            ].map((route, index) => (
              <button
                key={index}
                onClick={() => {
                  setDeparture(route.from);
                  setArrival(route.to);
                }}
                className="flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:border-primary/20 transition-all text-left"
              >
                <div>
                  <div className="font-medium text-foreground">
                    {route.from} → {route.to}
                  </div>
                  <div className="text-sm text-muted-foreground">From {route.duration}</div>
                </div>
                <SearchIcon className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}