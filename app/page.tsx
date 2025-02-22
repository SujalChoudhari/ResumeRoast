"use client"

import FileUpload from "@/components/file-upload"
import JobDescription from "@/components/job-description"
import { roastResume } from "@/app/actions"
import { useState } from "react"
import RoastResult from "@/components/roast-result"

export default function Home() {
  const [roastContent, setRoastContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true)
    const result = await roastResume(formData)
    setRoastContent(result)
    setIsLoading(false)
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Resume Roast</h1>
      <form action={handleSubmit} className="max-w-2xl mx-auto space-y-6">
        <FileUpload />
        <JobDescription />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300"
          disabled={isLoading}
        >
          {isLoading ? "Roasting..." : "Roast My Resume"}
        </button>
      </form>
      {roastContent && <RoastResult content={roastContent} />}
    </main>
  )
}

