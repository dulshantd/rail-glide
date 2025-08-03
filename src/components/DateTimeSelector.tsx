import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DateTimeSelectorProps {
  date: Date;
  onDateChange: (date: Date) => void;
}

export function DateTimeSelector({ date, onDateChange }: DateTimeSelectorProps) {
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isTimeOpen, setIsTimeOpen] = useState(false);

  const timeSlots = [
    "Now", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"
  ];

  const handleTimeSelect = (timeSlot: string) => {
    if (timeSlot === "Now") {
      onDateChange(new Date());
    } else {
      const [hours, minutes] = timeSlot.split(":").map(Number);
      const newDate = new Date(date);
      newDate.setHours(hours, minutes, 0, 0);
      onDateChange(newDate);
    }
    setIsTimeOpen(false);
  };

  const isToday = date.toDateString() === new Date().toDateString();
  const displayTime = isToday && Math.abs(Date.now() - date.getTime()) < 60000 ? "Now" : format(date, "HH:mm");

  return (
    <div className="flex gap-3">
      {/* Date Selector */}
      <Popover open={isDateOpen} onOpenChange={setIsDateOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "flex-1 justify-start text-left font-normal h-14 bg-card border-border",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-3 h-5 w-5 text-muted-foreground" />
            <div>
              <div className="text-sm font-medium">
                {format(date, "MMM dd")}
              </div>
              <div className="text-xs text-muted-foreground">
                {format(date, "EEEE")}
              </div>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(selectedDate) => {
              if (selectedDate) {
                onDateChange(selectedDate);
                setIsDateOpen(false);
              }
            }}
            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
            initialFocus
            className="pointer-events-auto"
          />
        </PopoverContent>
      </Popover>

      {/* Time Selector */}
      <Popover open={isTimeOpen} onOpenChange={setIsTimeOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="flex-1 justify-start text-left font-normal h-14 bg-card border-border"
          >
            <Clock className="mr-3 h-5 w-5 text-muted-foreground" />
            <div>
              <div className="text-sm font-medium">{displayTime}</div>
              <div className="text-xs text-muted-foreground">Departure</div>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-2" align="start">
          <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
            {timeSlots.map((timeSlot) => (
              <Button
                key={timeSlot}
                variant="ghost"
                size="sm"
                onClick={() => handleTimeSelect(timeSlot)}
                className="h-10 text-sm justify-center hover:bg-accent"
              >
                {timeSlot}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}