import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export default function RoastResult({ content }: { content: string }) {
  return (
    <div className="mt-8 p-6 bg-gray-800 rounded-2xl shadow-2xl">
      <h2 className="text-3xl font-bold mb-4 text-white">
        Resume Roast Result
      </h2>
      <ReactMarkdown
        children={content}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ node, ...props }) => (
            <h1
              {...props}
              className="text-3xl font-bold mt-6 mb-4 leading-tight text-white"
            />
          ),
          h2: ({ node, ...props }) => (
            <h2
              {...props}
              className="text-2xl font-semibold mt-5 mb-3 leading-tight text-white"
            />
          ),
          h3: ({ node, ...props }) => (
            <h3
              {...props}
              className="text-xl font-medium mt-4 mb-2 leading-tight text-white"
            />
          ),
          h4: ({ node, ...props }) => (
            <h4
              {...props}
              className="text-lg font-semibold mt-3 mb-1 leading-tight text-white"
            />
          ),
          h5: ({ node, ...props }) => (
            <h5
              {...props}
              className="text-base font-medium mt-2 mb-1 leading-tight text-white"
            />
          ),
          h6: ({ node, ...props }) => (
            <h6
              {...props}
              className="text-sm font-semibold mt-1 mb-1 leading-tight text-white"
            />
          ),
          a: ({ node, ...props }) => (
            <a
              {...props}
              className="text-pink-500 hover:text-pink-400 underline transition duration-200"
            />
          ),
          p: ({ node, ...props }) => (
            <p {...props} className="mb-4 text-gray-300" />
          ),
          ul: ({ node, ...props }) => (
            <ul {...props} className="list-disc pl-5 mb-4 text-gray-300" />
          ),
          ol: ({ node, ...props }) => (
            <ol {...props} className="list-decimal pl-5 mb-4 text-gray-300" />
          ),
          li: ({ node, ...props }) => (
            <li {...props} className="mb-2 text-gray-300" />
          ),
        }}
      />
    </div>
  );
}
