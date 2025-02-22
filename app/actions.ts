"use server"

import { GoogleGenerativeAI } from "@google/generative-ai"

export async function roastResume(formData: FormData) {
  const resumeData = formData.get("resume") as string
  const jobDescription = formData.get("job-description") as string


  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

  const prompt = `
You are tasked with analyzing a resume and providing a roast-style critique. 
Your goal is to identify the good and bad aspects of the resume, suggest improvements, 
and if a job description is provided, analyze the resume in the context of the job requirements. Follow these instructions carefully:

1. First, carefully read the resume provided within the <resume> tags:
The below text is extracted from a PDF, don't worry about the formatting or length. 
OCR might have introduced some errors, but let's roll with it.
<resume>
${resumeData}
</resume>

${jobDescription ? `2. Job Description:  <jd> ${jobDescription} </jd>` : ""}

3. Analyze the resume, focusing on the following aspects:
   a. Identify and list the good elements of the resume.
   b. Identify and list the bad elements or weaknesses of the resume.
   c. Suggest specific improvements for the resume.

4. If a job description was provided, compare the resume to the job requirements. Analyze how well the candidate's qualifications match the job requirements.

5. Prepare your response in Markdown format. Use appropriate headings, bullet points, and formatting to structure your analysis.

6. Your response should include the following sections:
   - Introduction (brief overview of the resume)
   - The Good (positive aspects of the resume)
   - The Bad (weaknesses or areas needing improvement)
   - How to Improve (specific suggestions for enhancement)
   - Job Fit Analysis (only if a job description was provided)

7. Maintain a roast-style tone throughout your critique. 
  Be humorous and slightly exaggerated in your criticism, but ensure your analysis remains constructive and helpful. 
  Use witty language, puns, or pop culture references if appropriate.

8. Begin your response with the phrase "Alright, let's roast this dumpster fire of a resume!" to set the tone.

9. Conclude your analysis with a brief, humorous summary statement about the overall quality of the resume.

10. Use Emojis and slangs for fun.

11. Make sure you rate the sections out of 10. like lit/10, fire/10, absolute trash/10, etc.

Remember, while the tone should be humorous and roast-like, the ultimate goal is to provide valuable feedback that can help improve the resume. 
Balance your criticism with constructive advice.
    `
  const result = await model.generateContent(prompt)
  const response = await result.response
  const text = response.text()

  return text
}

