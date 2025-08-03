import { useState } from "react";
import { Search, MapPin, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FoodCategoryCard } from "@/components/FoodCategoryCard";
import { FoodItemCard } from "@/components/FoodItemCard";
import { BottomNavigation } from "@/components/BottomNavigation";
import { Pizza, Sandwich, Coffee, IceCream, Salad, Soup } from "lucide-react";

const categories = [
  { icon: Pizza, title: "Pizza", description: "Cheesy & Hot" },
  { icon: Sandwich, title: "Burgers", description: "Juicy & Fresh" },
  { icon: Coffee, title: "Beverages", description: "Fresh & Cool" },
  { icon: IceCream, title: "Desserts", description: "Sweet & Tasty" },
  { icon: Salad, title: "Healthy", description: "Fresh & Light" },
  { icon: Soup, title: "Soups", description: "Warm & Comfort" },
];

const featuredItems = [
  {
    id: "1",
    name: "Margherita Pizza",
    description: "Fresh tomato sauce, mozzarella, and basil on crispy thin crust",
    price: 299,
    originalPrice: 349,
    image: "/placeholder.svg",
    rating: 4.5,
    isVeg: true,
    isBestseller: true,
  },
  {
    id: "2",
    name: "Chicken Burger",
    description: "Grilled chicken patty with lettuce, tomato, and special sauce",
    price: 249,
    image: "/placeholder.svg",
    rating: 4.3,
    isVeg: false,
  },
  {
    id: "3",
    name: "Mango Smoothie",
    description: "Fresh mango blended with yogurt and a touch of honey",
    price: 129,
    image: "/placeholder.svg",
    rating: 4.7,
    isVeg: true,
  },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddToCart = (id: string) => {
    console.log("Adding to cart:", id);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="gradient-hero text-white p-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5" />
            <div>
              <p className="text-sm opacity-80">Deliver to</p>
              <p className="font-semibold">Home - New Delhi</p>
            </div>
          </div>
          <Button size="icon" variant="ghost" className="text-white hover:bg-white/20">
            <Bell className="w-6 h-6" />
          </Button>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-glow mb-2">DN FOOD AND BEVS</h1>
          <p className="text-lg opacity-90">Your cravings. Delivered.</p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search for food, restaurants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input pl-12 bg-white/90 backdrop-blur-sm border-white/20"
          />
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Categories */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Categories</h2>
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category, index) => (
              <FoodCategoryCard
                key={index}
                icon={category.icon}
                title={category.title}
                description={category.description}
              />
            ))}
          </div>
        </div>

        {/* Featured Items */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Featured Items</h2>
          <div className="space-y-4">
            {featuredItems.map((item) => (
              <FoodItemCard
                key={item.id}
                {...item}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}