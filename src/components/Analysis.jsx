function Analysis({ analysis }) {
  const lines = analysis ? analysis.split("\n") : [];

  return (
    <section className="analysis">

      <h2>🩺 AI Medical Report Analysis</h2>

      <div className="analysis-card">

        {/* Analysis Status */}
        <div className="analysis-status">
          <span>✅</span>
          <span>Analysis Completed Successfully</span>
        </div>

        {/* Main Content */}
        <div className="analysis-content">

          {lines.map((line, index) => {
            const trimmedLine = line.trim();

            if (!trimmedLine) {
              return <div key={index} className="analysis-space" />;
            }

            /* Medical Report Summary */
            if (trimmedLine.includes("Medical Report Summary")) {
              return (
                <div className="analysis-section-title" key={index}>
                  🩺 Medical Report Summary
                </div>
              );
            }

            /* Detected Parameters */
            if (trimmedLine.includes("Detected Parameters")) {
              return (
                <div className="analysis-section-title" key={index}>
                  📋 Detected Parameters
                </div>
              );
            }

            /* Recommendations */
            if (trimmedLine.includes("Recommendations")) {
              return (
                <div className="analysis-section-title" key={index}>
                  💡 Recommendations
                </div>
              );
            }

            /* Disclaimer coming from backend */
            if (trimmedLine.includes("Disclaimer")) {
              return null;
            }

            /* Parameter / recommendation bullet */
            if (trimmedLine.startsWith("•")) {
              const text = trimmedLine.replace("•", "").trim();

              return (
                <div className="analysis-point" key={index}>
                  <span className="point-icon">•</span>
                  <span>{text}</span>
                </div>
              );
            }

            /* Normal text */
            return (
              <p className="analysis-text" key={index}>
                {trimmedLine}
              </p>
            );
          })}

        </div>

        {/* Disclaimer */}
        <div className="disclaimer">
          <strong>⚠️ Medical Disclaimer</strong>

          <p>
            This AI-generated explanation is intended for educational
            purposes only and should not replace professional medical advice.
            Please consult a qualified healthcare professional for accurate
            interpretation, diagnosis, or treatment.
          </p>
        </div>

      </div>

    </section>
  );
}

export default Analysis;