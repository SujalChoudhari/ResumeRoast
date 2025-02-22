export default function FileUpload() {
  return (
    <div className="space-y-2">
      <label htmlFor="resume" className="block text-sm font-medium text-gray-700">
        Upload your resume (PDF)
      </label>
      <input
        type="file"
        id="resume"
        name="resume"
        accept=".pdf"
        required
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100
        "
      />
    </div>
  )
}

