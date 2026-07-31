function Analysis() {
  return (
    <section className="analysis">

      <h2>AI Analysis Result</h2>

      <div className="analysis-card">

        <div className="analysis-status">
          🟢 Analysis Complete
        </div>

        <h3>Medical Report Summary</h3>

        <p>
          Your uploaded medical report has been analyzed successfully.
          This is currently a sample result. In the final project,
          AI will generate a real explanation based on your report.
        </p>

        <div className="analysis-points">

          <div className="point">
            <strong>Hemoglobin:</strong> Normal
          </div>

          <div className="point">
            <strong>Blood Sugar:</strong> Slightly High
          </div>

          <div className="point">
            <strong>Cholesterol:</strong> Normal
          </div>

          <div className="point">
            <strong>Recommendation:</strong> Consult your doctor for proper interpretation.
          </div>

        </div>

      </div>

    </section>
  );
}

export default Analysis;