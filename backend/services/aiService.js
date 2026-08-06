const analyzeMedicalReport = async (reportText) => {
  return `
🩺 Medical Report Summary

Patient appears to be in generally good health.

📋 Key Findings:
• Blood sugar is within the normal range.
• Hemoglobin level is normal.
• White blood cell count is normal.
• Cholesterol levels are acceptable.
• No major abnormalities were detected.

💡 Recommendations:
• Drink plenty of water.
• Maintain a balanced diet.
• Exercise for at least 30 minutes daily.
• Follow up with your doctor if you experience any symptoms.

⚠️ Disclaimer:
This is a mock AI response for development purposes only.
`;
};

module.exports = {
  analyzeMedicalReport,
};