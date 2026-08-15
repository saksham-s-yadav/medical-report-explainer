const analyzeMedicalReport = async (reportText) => {
  const findings = [];

  // Clean extracted PDF text
  const cleanText = reportText
    .replace(/\r/g, "")
    .replace(/\t+/g, " ")
    .replace(/ +/g, " ");

  // Helper function
  const addFinding = (name, regex) => {
    const match = cleanText.match(regex);

    if (match && match[1]) {
      findings.push(`• ${name}: ${match[1].trim()}`);
    }
  };

  // Hemoglobin
  addFinding(
    "Hemoglobin",
    /hemoglobin[\s:]*(?:[:\-]|is)?\s*(\d+(?:\.\d+)?\s*(?:g\/dL|g\/dl)?)/i
  );

  // Vitamin D
  addFinding(
    "Vitamin D",
    /vitamin\s*d[\s:]*(?:[:\-]|is)?\s*(\d+(?:\.\d+)?\s*(?:ng\/mL|ng\/ml)?)/i
  );

  // Blood Sugar / Glucose
  addFinding(
    "Blood Sugar",
    /(?:blood\s*sugar|glucose)[\s:]*(?:[:\-]|is)?\s*(\d+(?:\.\d+)?\s*(?:mg\/dL|mg\/dl)?)/i
  );

  

  // Platelets
  addFinding(
    "Platelets",
    /platelets?[\s:]*(?:[:\-]|is)?\s*(\d+(?:\.\d+)?(?:\s*(?:\/µL|\/uL|\/μL))?)/i
  );
// Total Cholesterol
addFinding(
  "Total Cholesterol",
  /(\d+(?:\.\d+)?)\s+Cholesterol\s+Total/i
);

// Triglycerides
addFinding(
  "Triglycerides",
  /(\d+(?:\.\d+)?)\s+Triglycerides/i
);

// HDL Cholesterol
addFinding(
  "HDL Cholesterol",
  /(\d+(?:\.\d+)?)\s+HDL\s+Cholesterol/i
);

// LDL Cholesterol
addFinding(
  "LDL Cholesterol",
  /(\d+(?:\.\d+)?)\s+LDL\s+Cholesterol/i
);

// VLDL Cholesterol
addFinding(
  "VLDL Cholesterol",
  /(\d+(?:\.\d+)?)\s+VLDL\s+Cholesterol/i
);

// Non-HDL Cholesterol
addFinding(
  "Non-HDL Cholesterol",
  /(\d+(?:\.\d+)?)\s+Non-HDL\s+Cholesterol/i
);

  // If nothing was detected
  if (findings.length === 0) {
    findings.push(
      "• No supported medical parameters were detected in the extracted text."
    );
  }

  return `
🩺 Medical Report Summary

The uploaded medical report was successfully processed.

📋 Detected Parameters:

${findings.join("\n")}

💡 Recommendations:

• Review the reported values with a qualified healthcare professional.
• Do not use this application as a substitute for medical diagnosis.
• Follow your healthcare provider's advice regarding your report.


`;
};

module.exports = {
  analyzeMedicalReport,
};