import { useState } from "react";
import Features from "./components/Features";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Upload from "./components/Upload";
import Loading from "./components/Loading";
import Analysis from "./components/Analysis";
import "./App.css";

function App() {

  const [loading, setLoading] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const handleAnalyze = () => {

    setLoading(true);
    setShowAnalysis(false);

    setTimeout(() => {
      setLoading(false);
      setShowAnalysis(true);
    }, 3000);

  };

  return (
    <div className="app">

      <Navbar />

      <Hero />

      <Features />

      <Upload onAnalyze={handleAnalyze} />

      {loading && <Loading />}

      {showAnalysis && <Analysis />}

    </div>
  );
}

export default App;