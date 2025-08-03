import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FoodCategoryCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  onClick?: () => void;
}

export const FoodCategoryCard = ({ 
  icon: Icon, 
  title, 
  description, 
  className,
  onClick 
}: FoodCategoryCardProps) => {
  return (
    <div 
      className={cn(
        "category-card cursor-pointer group overflow-hidden relative",
        className
      )}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
      
      <div className="relative z-10 flex flex-col items-center text-center space-y-3">
        <div className="p-3 bg-white/20 rounded-full glow-effect">
          <Icon className="w-8 h-8 text-white" />
        </div>
        
        <div>
          <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
          <p className="text-white/80 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};