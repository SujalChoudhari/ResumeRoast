// components/job-description.tsx
export default function JobDescription() {
  return (
    <div className="space-y-3">
      <label
        htmlFor="jobDescription"
        className="block text-sm font-medium text-gray-300"
      >
        Job Description (Optional):
      </label>
      <textarea
        id="jobDescription"
        name="job-description"
        rows={5}
        className="shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm bg-gray-800 border-gray-700 text-white rounded-xl p-3"
        placeholder="Paste the job description here for a more tailored roast..."
      />
    </div>
  );
}
