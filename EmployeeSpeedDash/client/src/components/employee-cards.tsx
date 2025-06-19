import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Employee } from "@shared/schema";

/** Download the generated PDF */
export function downloadPDF(pdf: jsPDF, filename: string): void {
  pdf.save(filename);
}

/** Generate a PDF for all employees */
export function generateEmployeePDF(employees: Employee[]): jsPDF {
  const doc = new jsPDF();
  const marginLeft = 10;
  let y = 20;

  doc.setFontSize(18);
  doc.text("Employee Directory", marginLeft, 10);

  employees.forEach((emp, index) => {
    // Start new page if near bottom
    if (y > 270) {
      doc.addPage();
      y = 20;
    }

    doc.setFontSize(12);
    doc.text(
      `${index + 1}. ${emp.fullName || "N/A"} | ${emp.designation || "N/A"} | ${emp.department || "N/A"} | ${emp.location || "N/A"}`,
      marginLeft,
      y
    );

    y += 10;
  });

  return doc;
}

/** Generate a PDF for a single employee */
export function generateSingleEmployeePDF(employee: Employee): jsPDF {
  const doc = new jsPDF();
  const marginLeft = 10;
  let y = 10;

  doc.setFontSize(18);
  doc.text("Employee Profile", marginLeft, y);
  y += 15;

  doc.setFontSize(12);
  doc.text(`Name: ${employee.fullName || "N/A"}`, marginLeft, y); y += 10;
  doc.text(`Designation: ${employee.designation || "N/A"}`, marginLeft, y); y += 10;
  doc.text(`Department: ${employee.department || "N/A"}`, marginLeft, y); y += 10;
  doc.text(`Location: ${employee.location || "N/A"}`, marginLeft, y); y += 10;

  return doc;
}
