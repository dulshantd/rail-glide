import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to search page immediately
    navigate("/search");
  }, [navigate]);

  return null; // This component just redirects
};

export default Index;
