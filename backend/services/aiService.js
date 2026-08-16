const analyzeMedicalReport = async (reportText) => {
  const findings = [];

  // Clean extracted PDF text
  const cleanText = reportText
    .replace(/\r/g, "")
    .replace(/\t+/g, " ")
    .replace(/ +/g, " ");

  // Educational explanations for detected parameters
  const explanations = {
    "Hemoglobin":
      "Hemoglobin is a protein in red blood cells that helps transport oxygen throughout the body.",

    "Vitamin D":
      "Vitamin D is an important nutrient involved in maintaining healthy bones and supporting normal body functions.",

    "Blood Sugar":
      "Blood sugar refers to the amount of glucose in the blood and is commonly monitored as part of routine health assessments.",

    "Platelets":
      "Platelets are blood components that help the body form clots and stop bleeding.",

    "Total Cholesterol":
      "Total cholesterol represents the overall amount of cholesterol measured in the blood.",

    "Triglycerides":
      "Triglycerides are a type of fat found in the blood and are commonly included in a lipid profile.",

    "HDL Cholesterol":
      "HDL cholesterol is commonly known as high-density lipoprotein cholesterol and is one of the values measured in a lipid profile.",

    "LDL Cholesterol":
      "LDL cholesterol is commonly known as low-density lipoprotein cholesterol and is an important value monitored in a lipid profile.",

    "VLDL Cholesterol":
      "VLDL cholesterol is a type of lipoprotein that carries certain fats through the bloodstream.",

    "Non-HDL Cholesterol":
      "Non-HDL cholesterol represents the cholesterol contained in lipoproteins other than HDL."
  };

  // Helper function
  const addFinding = (name, regex) => {
    const match = cleanText.match(regex);

    if (match && match[1]) {
      const value = match[1].trim();

      findings.push({
        name,
        value,
        explanation: explanations[name]
      });
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
    return `
🩺 Medical Report Summary

The uploaded medical report was successfully processed.

📋 Detected Parameters:

• No supported medical parameters were detected in the extracted text.

💡 Recommendations:

• Review the report with a qualified healthcare professional.
• Do not use this application as a substitute for medical diagnosis.
• Follow your healthcare provider's advice regarding your report.
`;
  }

  // Format findings for the frontend
  const formattedFindings = findings
    .map(
      (item) =>
        `• ${item.name}: ${item.value}\n  Explanation: ${item.explanation}`
    )
    .join("\n\n");

  return `
🩺 Medical Report Summary

The uploaded medical report was successfully processed.

📋 Detected Parameters:

${formattedFindings}

💡 Recommendations:

• Review the reported values with a qualified healthcare professional.
• Do not use this application as a substitute for medical diagnosis.
• Follow your healthcare provider's advice regarding your report.
`;
};

module.exports = {
  analyzeMedicalReport,
};