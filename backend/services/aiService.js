const analyzeMedicalReport = async (reportText) => {
  const text = reportText.toLowerCase();

  let findings = [];

  // Check whether common parameters exist in the extracted report
  if (text.includes("hemoglobin")) {
    findings.push("• Hemoglobin information was found in the report.");
  }

  if (text.includes("vitamin d")) {
    findings.push("• Vitamin D information was found in the report.");
  }

  if (text.includes("blood sugar") || text.includes("glucose")) {
    findings.push("• Blood sugar/glucose information was found in the report.");
  }

  if (text.includes("cholesterol")) {
    findings.push("• Cholesterol information was found in the report.");
  }

  if (text.includes("platelet")) {
    findings.push("• Platelet information was found in the report.");
  }

  if (findings.length === 0) {
    findings.push("• The report was successfully read, but no common parameters were detected.");
  }

  return `
🩺 Medical Report Summary

The uploaded medical report was successfully processed.

📋 Key Findings:

${findings.join("\n")}

📄 Report Content:

${reportText}

💡 Recommendations:

• Review the reported values with a qualified healthcare professional.
• Do not use this application as a substitute for medical diagnosis.
• Follow your healthcare provider's advice regarding your report.

⚠️ Disclaimer:

This is a mock AI analysis for development purposes only.
The system does not provide a medical diagnosis or determine whether a medical value is normal or abnormal.
`;
};

module.exports = {
  analyzeMedicalReport,
};