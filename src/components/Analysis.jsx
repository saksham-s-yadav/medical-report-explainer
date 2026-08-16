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
              return <div key={index} className="analysis-space" />;
            }

            // Section headings
            if (
              trimmedLine.includes("Medical Report Summary") ||
              trimmedLine.includes("Detected Parameters") ||
              trimmedLine.includes("Recommendations")
            ) {
              return (
                <h4 key={index} className="analysis-section-title">
                  {trimmedLine}
                </h4>
              );
            }

            // Detected parameter
            if (trimmedLine.startsWith("•")) {
              return (
                <div className="analysis-point" key={index}>
                  <span className="point-icon">•</span>
                  <span>{trimmedLine.substring(1).trim()}</span>
                </div>
              );
            }

            // Explanation text
            if (trimmedLine.startsWith("Explanation:")) {
              return (
                <div className="explanation-box" key={index}>
                  <span className="explanation-label">
                    💡 Explanation
                  </span>

                  <p>
                    {trimmedLine.replace("Explanation:", "").trim()}
                  </p>
                </div>
              );
            }

            return (
              <p className="analysis-text" key={index}>
                {trimmedLine}
              </p>
            );
          })}

        </div>

        <div className="disclaimer">
          <strong>⚠ Medical Disclaimer</strong>

          <p>
            This AI-generated explanation is intended for educational
            purposes only and should not replace professional medical
            advice. Please consult a qualified healthcare professional
            for accurate interpretation, diagnosis, or treatment.
          </p>
        </div>

      </div>

    </section>
  );
}

export default Analysis;