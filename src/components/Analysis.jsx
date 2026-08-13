function Analysis({ analysis }) {
  const lines = analysis ? analysis.split("\n") : [];

  return (
    <section className="analysis">

      <h2>🩺 AI Medical Report Analysis</h2>

      <div className="analysis-card">

        <div className="analysis-status">
          ✅ Analysis Completed Successfully
        </div>

        <h3>📋 Report Findings</h3>

        <div className="analysis-content">
          {lines.map((line, index) => {
            const trimmedLine = line.trim();

            if (!trimmedLine) {
              return <div key={index} style={{ height: "8px" }} />;
            }

            // Section headings
            if (
              trimmedLine.includes("Medical Report Summary") ||
              trimmedLine.includes("Detected Parameters") ||
              trimmedLine.includes("Recommendations")
            ) {
              return (
                <h4 key={index} style={{ marginTop: "18px" }}>
                  {trimmedLine}
                </h4>
              );
            }

            // Detected parameter lines
            if (trimmedLine.startsWith("•")) {
              return (
                <div className="analysis-point" key={index}>
                  {trimmedLine}
                </div>
              );
            }

            return <p key={index}>{trimmedLine}</p>;
          })}
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