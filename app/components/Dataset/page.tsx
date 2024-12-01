"use client";

export default function DatasetPage() {
  // Static dataset object
  const dataset = {
    id: "1",
    title: "Example Dataset 1",
    description: "This is a detailed description for Dataset 1.",
    tags: ["AI", "Blockchain"],
    dataType: "Text",
    content: [
      { key: "Field 1", value: "Value 1" },
      { key: "Field 2", value: "Value 2" },
      { key: "Field 3", value: "Value 3" },
    ],
  };

  return (
    <main className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-black mb-6">{dataset.title}</h1>
      <p className="text-gray-600 mb-4">{dataset.description}</p>

      <div className="flex flex-wrap items-center gap-2 mb-6">
        {dataset.tags.map((tag, index) => (
          <span
            key={index}
            className="text-sm text-blue-500 bg-blue-100 px-2 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="text-sm text-gray-800 font-medium mb-4">
        Data Type: <span className="font-normal">{dataset.dataType}</span>
      </p>

      {/* Dataset Content */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-black mb-4">Dataset Content</h2>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-black">
                Field
              </th>
              <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-black">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {dataset.content.map((row, index) => (
              <tr key={index} className="even:bg-gray-50">
                <td className="border border-gray-200 px-4 py-2 text-sm text-black">
                  {row.key}
                </td>
                <td className="border border-gray-200 px-4 py-2 text-sm text-black">
                  {row.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
