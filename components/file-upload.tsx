import { useState, useEffect } from "react";

let pdfjs: any;
if (typeof window !== "undefined") {
  pdfjs = require("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
}

export default function FileUpload(): JSX.Element {
  const [resumeText, setResumeText] = useState<string>("");
  const [fileError, setFileError] = useState<string | null>(null);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      return; // No file selected
    }

    if (file.type !== "application/pdf") {
      setFileError("Please upload a valid PDF file.");
      setResumeText(""); // Clear previous text
      return;
    }

    setFileError(null); // Clear any previous error

    if (pdfjs) {
      try {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = async () => {
          const typedArray = new Uint8Array(reader.result as ArrayBuffer);
          const pdf = await pdfjs.getDocument(typedArray).promise;
          let text = "";
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            text +=
              content.items.map((item: any) => item.str).join(" ") + "\n";
          }
          setResumeText(text);
        };
      } catch (error: any) {
        console.error("Error extracting text from PDF:", error);
        setFileError("Error extracting text from PDF. Please try again.");
        setResumeText(""); // Clear previous text
      }
    }
  };

  return (
    <div className="space-y-3">
      <label
        htmlFor="resumeFile"
        className="block text-sm font-medium text-gray-300"
      >
        Upload your resume (PDF):
      </label>
      <input
        type="file"
        id="resumeFile"
        accept="application/pdf"
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
        onChange={handleFileUpload}
      />
      {fileError && <p className="text-red-500 text-sm">{fileError}</p>}
      <label
        htmlFor="resumeText"
        className="block text-sm font-medium text-gray-300"
      >
        Or paste your resume text here:
      </label>
      <textarea
        id="resumeText"
        name="resume"
        rows={10}
        className="shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm bg-gray-800 border-gray-700 text-white rounded-xl p-3"
        placeholder="Paste your resume text here..."
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
        required
      />
    </div>
  );
}
