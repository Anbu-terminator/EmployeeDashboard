// client/src/lib/pdf-generator.ts
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Employee } from "@shared/schema";

/** Download the generated PDF */
export function downloadPDF(pdf: jsPDF, filename: string) {
  pdf.save(filename);
}

/** Generate one PDF for all employees */
export function generateEmployeePDF(employees: Employee[]): jsPDF {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text("Employee Directory", 10, 10);

  employees.forEach((emp, index) => {
    const y = 20 + index * 10;
    doc.setFontSize(12);
    doc.text(
      `${emp.fullName} | ${emp.designation} | ${emp.department} | ${emp.location}`,
      10,
      y
    );
  });

  return doc;
}

/** Generate a PDF for a single employee */
export function generateSingleEmployeePDF(employee: Employee): jsPDF {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text("Employee Profile", 10, 10);
  doc.setFontSize(12);
  doc.text(`Name: ${employee.fullName}`, 10, 20);
  doc.text(`Designation: ${employee.designation}`, 10, 30);
  doc.text(`Department: ${employee.department}`, 10, 40);
  doc.text(`Location: ${employee.location}`, 10, 50);
  return doc;
}
