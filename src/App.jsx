import Features from "./components/Features";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Upload from "./components/Upload";
import Analysis from "./components/Analysis";
import Loading from "./components/Loading";
import "./App.css";

function App() {
  return (
    <div className="app">

      <Navbar />

      <Hero />

      <Features />

      <Upload />

      <Loading />

      <Analysis />

</div>
  );
}

export default App;