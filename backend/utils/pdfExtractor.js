const pdfParse = require("pdf-parse");

const extractTextFromPDF = async (filePath) => {
  try {
    const fs = require("fs");

    const dataBuffer = fs.readFileSync(filePath);

    const parser = new pdfParse.PDFParse({
      data: dataBuffer,
    });

    const result = await parser.getText();

    await parser.destroy();

    return result.text;

  } catch (error) {
    console.error("PDF extraction error:", error);
    throw new Error("Unable to extract text from PDF.");
  }
};

module.exports = {
  extractTextFromPDF,
};