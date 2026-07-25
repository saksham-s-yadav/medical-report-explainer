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

<section className="features">

  <h2>Why Choose MedExplain AI?</h2>

  <div className="cards">

    <div className="card">
      <h3>📄 Easy Reports</h3>

      <p>
        Understand complex medical reports in
        simple language.
      </p>
    </div>

    <div className="card">
      <h3>🤖 AI Powered</h3>

      <p>
        Get AI generated explanations within
        seconds.
      </p>
    </div>

    <div className="card">
      <h3>🔒 Secure</h3>

      <p>
        Your uploaded reports remain private
        and secure.
      </p>
    </div>

  </div>

</section>
<section className="upload">

  <h2>Upload Your Medical Report</h2>

  <p>
    Upload your blood test, prescription or
    health report to receive an AI-powered
    explanation.
  </p>

  <div className="upload-box">

  <div className="upload-icon">
    📄
  </div>

  <p>Drag & Drop your Medical Report here</p>

  <button className="primary">
    Choose File
  </button>

  <p className="file-info">
    Supported formats: PDF, JPG, PNG (Max 10 MB)
  </p>

</div>

</section>
</div>
  );
}

export default App;