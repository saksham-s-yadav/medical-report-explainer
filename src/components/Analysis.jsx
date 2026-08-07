function Analysis({ analysis }) {
  return (
    <section className="analysis">

      <h2>🩺 AI Medical Report Analysis</h2>

      <div className="analysis-card">

        <div className="analysis-status">
          ✅ Analysis Completed Successfully
        </div>

        <h3>AI Explanation</h3>

        <div className="analysis-content">
          {analysis.split("\n").map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>

        <div className="disclaimer">
          <strong>⚠ Disclaimer:</strong> This AI-generated explanation is for
          educational purposes only and should not replace professional medical
          advice. Please consult a qualified healthcare professional for an
          accurate diagnosis.
        </div>

      </div>

    </section>
  );
}

export default Analysis;