const { analyzeMedicalReport } = require("../services/aiService");
const { extractTextFromPDF } = require("../utils/pdfExtractor");

const analyzeReport = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded.",
      });
    }

    // Extract actual text from the uploaded PDF
    const reportText = await extractTextFromPDF(req.file.path);

    if (!reportText || reportText.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "No readable text found in the PDF.",
      });
    }

    console.log("Extracted Report Text:");
    console.log(reportText);

    // Send extracted text for analysis
    const aiResponse = await analyzeMedicalReport(reportText);

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