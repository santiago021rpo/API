// jest.config.js
module.exports = {
    reporters: [
      "default",
      ["jest-html-reporter", {
        pageTitle: "Reporte de Pruebas Santiago Delgado",
        outputPath: "./test-report.html",
        includeFailureMsg: true,
        includeSuiteFailure: true,
      }]
    ]
  };