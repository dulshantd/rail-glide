import { Home, ShoppingBag, Heart, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: ShoppingBag, label: "Orders", path: "/orders" },
  { icon: Heart, label: "Favourites", path: "/favourites" },
  { icon: User, label: "Profile", path: "/profile" },
];

export const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex items-center justify-around px-4 py-2">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={cn(
                "flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-all duration-200",
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn(
                "w-6 h-6",
                isActive && "glow-effect"
              )} />
              <span className="text-xs font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};