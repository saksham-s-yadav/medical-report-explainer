const analyzeMedicalReport = async (reportText) => {
  const findings = [];

  // Clean extracted PDF text
  const cleanText = reportText
    .replace(/\r/g, "")
    .replace(/\t+/g, " ")
    .replace(/ +/g, " ")
    .trim();

  // Educational explanations
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

  // Compare value with reference range
  const getStatus = (value, reference) => {
    if (!reference) {
      return "Reference range not detected";
    }

    const numericValue = parseFloat(value);

    if (isNaN(numericValue)) {
      return "Unable to determine";
    }

    // Example: <200.00
    const lessThan = reference.match(
      /<\s*(\d+(?:\.\d+)?)/
    );

    if (lessThan) {
      const limit = parseFloat(lessThan[1]);

      return numericValue < limit
        ? "Within reported range"
        : "Above reported range";
    }

    // Example: >40.00
    const greaterThan = reference.match(
      />\s*(\d+(?:\.\d+)?)/
    );

    if (greaterThan) {
      const limit = parseFloat(greaterThan[1]);

      return numericValue > limit
        ? "Within reported range"
        : "Below reported range";
    }

    // Example: 13.00 - 17.00
    const range = reference.match(
      /(\d+(?:\.\d+)?)\s*[-–]\s*(\d+(?:\.\d+)?)/
    );

    if (range) {
      const min = parseFloat(range[1]);
      const max = parseFloat(range[2]);

      if (numericValue < min) {
        return "Below reported range";
      }

      if (numericValue > max) {
        return "Above reported range";
      }

      return "Within reported range";
    }

    return "Reference range detected";
  };

  /*
    Extract a parameter from the PDF.

    The PDF often places:
    Test Name
    Value
    Unit
    Reference Range

    across separate lines.
  */

  const addFinding = (
    name,
    valueRegex,
    referenceRegex,
    unit
  ) => {
    const valueMatch = cleanText.match(valueRegex);

    if (!valueMatch || !valueMatch[1]) {
      return;
    }

    const value = valueMatch[1].trim();

    const referenceMatch = cleanText.match(referenceRegex);

    const reference =
      referenceMatch && referenceMatch[1]
        ? referenceMatch[1].trim()
        : null;

    findings.push({
      name,
      value,
      unit,
      reference,
      status: getStatus(value, reference),
      explanation: explanations[name]
    });
  };

  // ==========================
  // Hemoglobin
  // ==========================

  addFinding(
    "Hemoglobin",
    /Hemoglobin\s+(\d+(?:\.\d+)?)/i,
    /Hemoglobin\s+\d+(?:\.\d+)?[\s\S]{0,80}?(\d+(?:\.\d+)?\s*[-–]\s*\d+(?:\.\d+)?)/i,
    "g/dL"
  );

  // ==========================
  // Vitamin D
  // ==========================

  addFinding(
    "Vitamin D",
    /Vitamin\s+D[\s\S]{0,80}?(\d+(?:\.\d+)?)/i,
    /Vitamin\s+D[\s\S]{0,150}?(<\s*\d+(?:\.\d+)?|>\s*\d+(?:\.\d+)?|\d+(?:\.\d+)?\s*[-–]\s*\d+(?:\.\d+)?)/i,
    "ng/mL"
  );

  // ==========================
  // Blood Sugar
  // ==========================

  addFinding(
    "Blood Sugar",
    /(?:Blood\s*Sugar|Glucose)[\s\S]{0,80}?(\d+(?:\.\d+)?)/i,
    /(?:Blood\s*Sugar|Glucose)[\s\S]{0,150}?(<\s*\d+(?:\.\d+)?|>\s*\d+(?:\.\d+)?|\d+(?:\.\d+)?\s*[-–]\s*\d+(?:\.\d+)?)/i,
    "mg/dL"
  );

  // ==========================
  // Platelets
  // ==========================

  addFinding(
    "Platelets",
    /Platelets?\s+(\d+(?:\.\d+)?)/i,
    /Platelets?[\s\S]{0,100}?(<\s*\d+(?:\.\d+)?|>\s*\d+(?:\.\d+)?|\d+(?:\.\d+)?\s*[-–]\s*\d+(?:\.\d+)?)/i,
    "/µL"
  );

  // ==========================
  // Total Cholesterol
  // ==========================

  addFinding(
    "Total Cholesterol",
    /(\d+(?:\.\d+)?)\s+Cholesterol\s+Total/i,
    /Cholesterol\s+Total[\s\S]{0,100}?(<\s*\d+(?:\.\d+)?|>\s*\d+(?:\.\d+)?|\d+(?:\.\d+)?\s*[-–]\s*\d+(?:\.\d+)?)/i,
    "mg/dL"
  );

  // ==========================
  // Triglycerides
  // ==========================

  addFinding(
    "Triglycerides",
    /(\d+(?:\.\d+)?)\s+Triglycerides/i,
    /Triglycerides[\s\S]{0,100}?(<\s*\d+(?:\.\d+)?|>\s*\d+(?:\.\d+)?|\d+(?:\.\d+)?\s*[-–]\s*\d+(?:\.\d+)?)/i,
    "mg/dL"
  );

  // ==========================
  // HDL Cholesterol
  // ==========================

  addFinding(
    "HDL Cholesterol",
    /(\d+(?:\.\d+)?)\s+HDL\s+Cholesterol/i,
    /HDL\s+Cholesterol[\s\S]{0,100}?(<\s*\d+(?:\.\d+)?|>\s*\d+(?:\.\d+)?|\d+(?:\.\d+)?\s*[-–]\s*\d+(?:\.\d+)?)/i,
    "mg/dL"
  );

  // ==========================
  // LDL Cholesterol
  // ==========================

  addFinding(
    "LDL Cholesterol",
    /(\d+(?:\.\d+)?)\s+LDL\s+Cholesterol/i,
    /LDL\s+Cholesterol[\s\S]{0,100}?(<\s*\d+(?:\.\d+)?|>\s*\d+(?:\.\d+)?|\d+(?:\.\d+)?\s*[-–]\s*\d+(?:\.\d+)?)/i,
    "mg/dL"
  );

  // ==========================
  // VLDL Cholesterol
  // ==========================

  addFinding(
    "VLDL Cholesterol",
    /(\d+(?:\.\d+)?)\s+VLDL\s+Cholesterol/i,
    /VLDL\s+Cholesterol[\s\S]{0,100}?(<\s*\d+(?:\.\d+)?|>\s*\d+(?:\.\d+)?|\d+(?:\.\d+)?\s*[-–]\s*\d+(?:\.\d+)?)/i,
    "mg/dL"
  );

  // ==========================
  // Non-HDL Cholesterol
  // ==========================

  addFinding(
    "Non-HDL Cholesterol",
    /(\d+(?:\.\d+)?)\s+Non-HDL\s+Cholesterol/i,
    /Non-HDL\s+Cholesterol[\s\S]{0,100}?(<\s*\d+(?:\.\d+)?|>\s*\d+(?:\.\d+)?|\d+(?:\.\d+)?\s*[-–]\s*\d+(?:\.\d+)?)/i,
    "mg/dL"
  );

  // ==========================
  // No parameters detected
  // ==========================

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

  // Format findings
  const formattedFindings = findings
    .map((item) => {
      return `• ${item.name}: ${item.value} ${item.unit}
  Reference Range: ${item.reference || "Not detected"}
  Status: ${item.status}
  Explanation: ${item.explanation}`;
    })
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