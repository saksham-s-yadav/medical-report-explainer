import Features from "./components/Features";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import { useState } from "react";
import "./App.css";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  return (
    <div className="app">

      <Navbar />

      <Hero />

      <Features />
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

  <input
  type="file"
  id="fileUpload"
  accept=".pdf,.jpg,.jpeg,.png"
  style={{ display: "none" }}
  onChange={(e) => {
  const file = e.target.files[0];

  if (!file) return;

  const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png",
  ];

  if (allowedTypes.includes(file.type)) {
    setSelectedFile(file);
  } else {
    alert("Only PDF, JPG, and PNG files are allowed.");
    e.target.value = "";
    setSelectedFile(null);
  }
}}
/>

<label htmlFor="fileUpload" className="primary">
  Choose File
</label>

{selectedFile && (
  <div className="selected-file">

    <h4>Selected File</h4>

    <p><strong>Name:</strong> {selectedFile.name}</p>

    <p>
      <strong>Size:</strong>{" "}
      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
    </p>

    <button
      className="secondary"
      onClick={() => setSelectedFile(null)}
    >
      Remove File
    </button>

  </div>
)}

<p className="file-info">
  Supported formats: PDF, JPG, PNG (Max 10 MB)
</p>

</div>

</section>
</div>
  );
}

export default App;