import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const [isAnimating, setIsAnimating] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen gradient-hero flex flex-col items-center justify-center text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-food-orange/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-food-yellow/20 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-food-green/20 rounded-full blur-xl animate-pulse delay-500" />
      </div>

      <div className="text-center space-y-8 z-10 px-6">
        {/* Logo with Glow Effect */}
        <div className={`transition-all duration-2000 ${isAnimating ? 'scale-110 opacity-80' : 'scale-100 opacity-100'}`}>
          <div className="relative">
            <h1 className="text-6xl font-black text-glow mb-4 tracking-tight">
              DN FOOD
            </h1>
            <p className="text-3xl font-bold text-food-yellow mb-2">& BEVS</p>
            <div className="w-32 h-1 bg-gradient-food mx-auto rounded-full glow-effect" />
          </div>
        </div>

        {/* Tagline */}
        <div className={`transition-all duration-1000 delay-500 ${isAnimating ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'}`}>
          <p className="text-xl font-semibold mb-2">Your cravings.</p>
          <p className="text-xl font-semibold text-food-yellow">Delivered.</p>
        </div>

        {/* Features */}
        <div className={`transition-all duration-1000 delay-1000 ${isAnimating ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'}`}>
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 glow-effect">
                <span className="text-2xl">🍕</span>
              </div>
              <p className="text-sm">Fresh Food</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 glow-effect">
                <span className="text-2xl">⚡</span>
              </div>
              <p className="text-sm">Fast Delivery</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 glow-effect">
                <span className="text-2xl">⭐</span>
              </div>
              <p className="text-sm">Best Quality</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className={`transition-all duration-1000 delay-1500 ${isAnimating ? 'translate-y-12 opacity-0' : 'translate-y-0 opacity-100'}`}>
          <Button
            onClick={handleGetStarted}
            size="lg"
            className="bg-white text-dark-bg hover:bg-white/90 font-bold text-lg px-12 py-4 rounded-full glow-card transform hover:scale-105 transition-all duration-300"
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
}