import Features from "./components/Features";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Upload from "./components/Upload";
import "./App.css";

function App() {
  return (
    <div className="app">

      <Navbar />

      <Hero />

      <Features />

      <Upload />

</div>
  );
}

export default App;