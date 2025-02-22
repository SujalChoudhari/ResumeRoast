import ReactMarkdown from "react-markdown"

export default function RoastResult({ content }: { content: string }) {
  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Resume Roast Result</h2>
      <ReactMarkdown className="prose max-w-none">{content}</ReactMarkdown>
    </div>
  )
}

