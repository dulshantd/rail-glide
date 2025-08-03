import { Clock, Train, ArrowRight, CircleCheck, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TrainCardProps {
  trainNumber: string;
  departure: {
    time: string;
    station: string;
    platform?: string;
  };
  arrival: {
    time: string;
    station: string;
    platform?: string;
  };
  duration: string;
  status: "on-time" | "delayed" | "cancelled";
  price: string;
  operator: string;
  onClick: () => void;
}

export function TrainCard({
  trainNumber,
  departure,
  arrival,
  duration,
  status,
  price,
  operator,
  onClick,
}: TrainCardProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "on-time":
        return {
          icon: CircleCheck,
          label: "On Time",
          className: "bg-success text-success-foreground",
        };
      case "delayed":
        return {
          icon: AlertTriangle,
          label: "Delayed",
          className: "bg-warning text-warning-foreground",
        };
      case "cancelled":
        return {
          icon: AlertTriangle,
          label: "Cancelled",
          className: "bg-destructive text-destructive-foreground",
        };
    }
  };

  const statusConfig = getStatusConfig();
  const StatusIcon = statusConfig.icon;

  return (
    <div
      className="train-card cursor-pointer hover:border-primary/20 transition-all duration-200"
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Train className="h-5 w-5 text-primary" />
          <div>
            <div className="font-semibold text-foreground">{trainNumber}</div>
            <div className="text-sm text-muted-foreground">{operator}</div>
          </div>
        </div>
        <Badge className={cn("flex items-center gap-1", statusConfig.className)}>
          <StatusIcon className="h-3 w-3" />
          {statusConfig.label}
        </Badge>
      </div>

      {/* Journey Details */}
      <div className="flex items-center justify-between">
        {/* Departure */}
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">{departure.time}</div>
          <div className="text-sm text-muted-foreground">{departure.station}</div>
          {departure.platform && (
            <div className="text-xs text-muted-foreground">Platform {departure.platform}</div>
          )}
        </div>

        {/* Journey Info */}
        <div className="flex-1 mx-6">
          <div className="flex items-center justify-center mb-1">
            <div className="flex-1 h-px bg-border"></div>
            <ArrowRight className="h-4 w-4 mx-2 text-muted-foreground" />
            <div className="flex-1 h-px bg-border"></div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-3 w-3" />
              {duration}
            </div>
          </div>
        </div>

        {/* Arrival */}
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">{arrival.time}</div>
          <div className="text-sm text-muted-foreground">{arrival.station}</div>
          {arrival.platform && (
            <div className="text-xs text-muted-foreground">Platform {arrival.platform}</div>
          )}
        </div>
      </div>

      {/* Price */}
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-border">
        <div className="text-sm text-muted-foreground">From</div>
        <div className="text-xl font-bold text-primary">{price}</div>
      </div>
    </div>
  );
}