"use server"

import { parseBuffer } from "pdf-parse"
import { GoogleGenerativeAI } from "@google/generative-ai"

export async function roastResume(formData: FormData) {
  const file = formData.get("resume") as File
  const jobDescription = formData.get("job-description") as string

  if (!file) {
    throw new Error("No file uploaded")
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const { text: resumeText } = await parseBuffer(buffer)

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
  const model = genAI.getGenerativeModel({ model: "gemini-pro" })

  const prompt = `
    Analyze the following resume and provide a roast. Include what is good, what is bad, and how to improve it.
    If a job description is provided, analyze the resume in context of the job requirements.
    Format your response in Markdown.

    Resume:
    ${resumeText}

    ${jobDescription ? `Job Description: ${jobDescription}` : ""}

    Roast:
  `

  const result = await model.generateContent(prompt)
  const response = await result.response
  const text = response.text()

  return text
}

