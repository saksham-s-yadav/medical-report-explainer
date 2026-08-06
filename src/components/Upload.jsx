import { useState } from "react";
import axios from "axios";

function Upload({ onAnalyze }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
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
      setSelectedFile(null);
      e.target.value = "";
    }
  };
const handleUpload = async () => {
  if (!selectedFile) {
    alert("Please select a file first.");
    return;
  }

  const formData = new FormData();
  formData.append("report", selectedFile);

  try {
    const response = await axios.post(
      "http://localhost:5001/analyze",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(response.data.analysis);

    alert(response.data.analysis);

    if (onAnalyze) {
      onAnalyze();
    }
  } catch (error) {
    console.error(error);
    alert("Upload failed.");
  }
};
  return (
    <section className="upload">

      <h2>Upload Your Medical Report</h2>

      <p className="upload-description">
        Upload your blood test, prescription, or health report and receive an AI-powered explanation in seconds.
      </p>

      <input
        type="file"
        id="fileUpload"
        accept=".pdf,.jpg,.jpeg,.png"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <div className="upload-box">

        <div className="upload-icon">📄</div>

        <h3>Drag & Drop Your Medical Report</h3>

        <p className="upload-text">
          or click below to browse files
        </p>

        <label htmlFor="fileUpload" className="primary">
          Choose File
        </label>

      </div>

      {selectedFile && (
        <div className="selected-file">

          <div className="success-message">
            ✅ File Selected Successfully
          </div>

          <h4>Selected File</h4>

          <p><strong>Name:</strong> {selectedFile.name}</p>

          <p>
            <strong>Size:</strong>{" "}
            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
          </p>

          <button
            className="primary"
            onClick={handleUpload}
            style={{ marginTop: "15px", marginRight: "10px" }}
          >
            Analyze Report
          </button>

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

    </section>
  );
}

export default Upload;