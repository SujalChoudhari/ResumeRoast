export default function JobDescription() {
  return (
    <div className="space-y-2">
      <label htmlFor="job-description" className="block text-sm font-medium text-gray-700">
        Job Description (Optional)
      </label>
      <textarea
        id="job-description"
        name="job-description"
        rows={4}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        placeholder="Paste the job description here..."
      ></textarea>
    </div>
  )
}

