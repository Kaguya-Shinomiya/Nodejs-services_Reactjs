import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Header from "./components/layout/navbar";
import Footer from "./components/layout/footer";
import Spinner from "./components/ui/Spinner";
import AppRoutes from "./routes/AppRoutes"; 
import bgImage from './assets/images/bg-icon.png';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {loading ? (
        <Spinner /> 
      ) : (
        <div className="flex flex-col min-h-screen bg-cover" style={{ backgroundImage: `url(${bgImage})` }}>
          <Header />
          <main className="flex-grow mt-[110px]">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      )}
    </Router>
  );
}

export default App;
