import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Upload from "./components/Upload";
import Loading from "./components/Loading";
import Analysis from "./components/Analysis";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState("");

  return (
    <div className="app">

      <Navbar />

      <Hero />

      <Features />

      <Upload
        setLoading={setLoading}
        setAnalysis={setAnalysis}
      />

      {loading && <Loading />}

      {analysis && (
        <Analysis analysis={analysis} />
      )}

    </div>
  );
}

export default App;