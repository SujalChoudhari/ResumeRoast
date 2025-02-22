// app/page.tsx
"use client";

import FileUpload from "@/components/file-upload";
import JobDescription from "@/components/job-description";
import { roastResume } from "@/app/actions";
import logo from "@/app/logo.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import RoastResult from "@/components/roast-result";

export default function Home() {
  const [roastContent, setRoastContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    try {
      const result = await roastResume(formData);
      setRoastContent(result);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (roastContent) {
      setIsLoading(false);
    }
  }, [roastContent]);

  return (
    <main className="bg-gradient-to-br from-gray-900 to-gray-800 text-white min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-gray-700 rounded-2xl shadow-2xl overflow-hidden">
          <div className=" bg-indigo-950 py-6 px-8">
            <h1 className="text-4xl font-extrabold text-center tracking-tight flex items-center justify-center gap-2">
              Resume Roast
              <Image
                src={logo}
                alt="RoastResume Logo"
                width={40} // Adjust the width as needed
                height={40} // Adjust the height as needed
                className="inline-block"
              />
            </h1>
            <p className="text-lg text-center mt-2 opacity-80">
              Get brutally honest feedback on your resume.
            </p>
          </div>
          <div className="p-8">
            <form
              action={handleSubmit}
              className="space-y-6"
              onSubmit={(e) => {
                setIsLoading(true);
              }}
            >
              <FileUpload />
              <JobDescription />
              <button
                type="submit"
                className="w-full bg-indigo-900 text-white font-bold py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    Roasting...
                    <svg
                      className="animate-spin h-5 w-5 ml-2 inline-block"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </>
                ) : (
                  "Roast My Resume"
                )}
              </button>
            </form>
            {roastContent && <RoastResult content={roastContent} />}
          </div>
        </div>
      </div>
    </main>
  );
}
