function Loading() {
  return (
    <section className="loading">

      <div className="loading-card">

        <div className="loading-icon">🤖</div>

        <h2>AI is Analyzing Your Report...</h2>

        <p>Please wait while our AI reads and understands your medical report.</p>

        <div className="loading-steps">

          <p>⏳ Reading Report...</p>

          <p>🩸 Detecting Medical Values...</p>

          <p>🧠 Preparing AI Explanation...</p>

        </div>

      </div>

    </section>
  );
}

export default Loading;