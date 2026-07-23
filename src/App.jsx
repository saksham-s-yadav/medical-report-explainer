import "./App.css";

function App() {
  return (
    <div className="app">

      <nav className="navbar">
        <h2>🩺 MedExplain AI</h2>

        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">Features</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>
      </nav>

      <section className="hero">

        <h1>
          AI Medical Report
          <br />
          Explainer
        </h1>

        <p>
          Understand complex medical reports in simple,
          easy-to-read language powered by Artificial Intelligence.
        </p>

        <div className="buttons">
          <button className="primary">
            Upload Report
          </button>

          <button className="secondary">
            Learn More
          </button>
        </div>

      </section>

    </div>
  );
}

export default App;