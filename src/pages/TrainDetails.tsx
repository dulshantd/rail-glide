import { ArrowLeft, Clock, MapPin, Users, Wifi, Coffee, CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";

export default function TrainDetails() {
  const navigate = useNavigate();
  const { trainId } = useParams();

  // Mock data - in a real app, this would be fetched based on trainId
  const trainDetails = {
    trainNumber: "TGV 8542",
    operator: "SNCF",
    departure: { time: "08:15", station: "London St Pancras", platform: "A1" },
    arrival: { time: "12:35", station: "Edinburgh Waverley", platform: "4" },
    duration: "4h 20m",
    status: "on-time" as const,
    price: "£89",
    amenities: ["wifi", "coffee", "quiet-coach"],
    stops: [
      { station: "London St Pancras", arrival: null, departure: "08:15", platform: "A1" },
      { station: "Birmingham New Street", arrival: "09:42", departure: "09:45", platform: "3" },
      { station: "Preston", arrival: "10:58", departure: "11:02", platform: "2" },
      { station: "Glasgow Central", arrival: "11:55", departure: "12:00", platform: "8" },
      { station: "Edinburgh Waverley", arrival: "12:35", departure: null, platform: "4" },
    ],
    ticketTypes: [
      { name: "Standard", price: "£65", features: ["Standard seat", "Free WiFi"] },
      { name: "First Class", price: "£89", features: ["First class seat", "Free WiFi", "Complimentary refreshments"] },
      { name: "Flexible", price: "£110", features: ["First class seat", "Free WiFi", "Complimentary refreshments", "Free cancellation"] },
    ],
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "wifi": return <Wifi className="h-4 w-4" />;
      case "coffee": return <Coffee className="h-4 w-4" />;
      case "quiet-coach": return <Users className="h-4 w-4" />;
      default: return null;
    }
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
              <h1 className="font-semibold text-foreground">{trainDetails.trainNumber}</h1>
              <p className="text-sm text-muted-foreground">{trainDetails.operator}</p>
            </div>
            <Badge className="bg-success text-success-foreground">
              <CircleCheck className="h-3 w-3 mr-1" />
              On Time
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Journey Overview */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{trainDetails.departure.time}</div>
              <div className="text-sm text-muted-foreground">{trainDetails.departure.station}</div>
              <div className="text-xs text-muted-foreground">Platform {trainDetails.departure.platform}</div>
            </div>
            <div className="flex-1 mx-6 text-center">
              <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-1">
                <Clock className="h-3 w-3" />
                {trainDetails.duration}
              </div>
              <div className="h-px bg-border relative">
                <div className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary rounded-full -translate-y-1/2"></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{trainDetails.arrival.time}</div>
              <div className="text-sm text-muted-foreground">{trainDetails.arrival.station}</div>
              <div className="text-xs text-muted-foreground">Platform {trainDetails.arrival.platform}</div>
            </div>
          </div>

          {/* Amenities */}
          <div className="flex items-center justify-center gap-4 pt-4 border-t border-border">
            {trainDetails.amenities.map((amenity) => (
              <div key={amenity} className="flex items-center gap-1 text-muted-foreground">
                {getAmenityIcon(amenity)}
                <span className="text-xs capitalize">{amenity.replace('-', ' ')}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Intermediate Stops */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">All Stops</h2>
          <div className="space-y-4">
            {trainDetails.stops.map((stop, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-3 h-3 rounded-full border-2 border-primary bg-background"></div>
                  {index < trainDetails.stops.length - 1 && (
                    <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-px h-8 bg-border"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-foreground">{stop.station}</div>
                  {stop.platform && (
                    <div className="text-xs text-muted-foreground">Platform {stop.platform}</div>
                  )}
                </div>
                <div className="text-right text-sm">
                  {stop.arrival && (
                    <div className="text-muted-foreground">Arr {stop.arrival}</div>
                  )}
                  {stop.departure && (
                    <div className="font-medium">Dep {stop.departure}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Ticket Types */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Select Ticket Type</h2>
          <div className="space-y-3">
            {trainDetails.ticketTypes.map((ticket, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-border rounded-xl hover:border-primary/20 cursor-pointer transition-all"
              >
                <div className="flex-1">
                  <div className="font-medium text-foreground">{ticket.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {ticket.features.join(" • ")}
                  </div>
                </div>
                <div className="text-xl font-bold text-primary">{ticket.price}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Book Button */}
        <Button className="w-full h-14 text-lg font-semibold gradient-primary">
          Book This Train
        </Button>
      </div>
    </div>
  );
}