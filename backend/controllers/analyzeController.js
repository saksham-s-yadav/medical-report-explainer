const { analyzeMedicalReport } = require("../services/aiService");

const analyzeReport = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded.",
      });
    }

    // Temporary sample text until OCR is added
    const sampleReport = `
Hemoglobin: 11.2 g/dL
Vitamin D: 14 ng/mL
Platelets: Normal
Blood Sugar: 95 mg/dL
`;

    const aiResponse = await analyzeMedicalReport(sampleReport);

    res.json({
      success: true,
      analysis: aiResponse,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  analyzeReport,
};