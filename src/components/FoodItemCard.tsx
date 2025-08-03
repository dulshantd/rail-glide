import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FoodItemCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  isVeg?: boolean;
  isBestseller?: boolean;
  className?: string;
  onAddToCart?: (id: string) => void;
}

export const FoodItemCard = ({
  id,
  name,
  description,
  price,
  originalPrice,
  image,
  rating,
  isVeg = true,
  isBestseller = false,
  className,
  onAddToCart
}: FoodItemCardProps) => {
  return (
    <div className={cn("food-card relative group", className)}>
      {isBestseller && (
        <Badge className="absolute top-4 left-4 z-10 bg-food-orange text-white font-semibold">
          Bestseller
        </Badge>
      )}
      
      <div className="relative overflow-hidden rounded-xl mb-4">
        <img 
          src={image} 
          alt={name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110 glow-effect"
        />
        
        <div className="absolute top-4 right-4">
          <div className={cn(
            "w-6 h-6 rounded-full border-2 flex items-center justify-center",
            isVeg ? "border-food-green bg-food-green" : "border-food-red bg-food-red"
          )}>
            <div className={cn(
              "w-2 h-2 rounded-full",
              isVeg ? "bg-white" : "bg-white"
            )} />
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-foreground line-clamp-1">{name}</h3>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-food-yellow text-food-yellow" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm line-clamp-2">{description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-food-red">₹{price}</span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">₹{originalPrice}</span>
            )}
          </div>
          
          <Button 
            size="sm"
            className="bg-gradient-primary hover:bg-gradient-primary/90 text-white font-semibold rounded-full px-6 glow-card"
            onClick={() => onAddToCart?.(id)}
          >
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};