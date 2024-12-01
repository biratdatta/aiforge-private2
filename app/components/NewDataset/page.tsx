"use client";

import React, { useState } from "react";

export default function NewDataset() {
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvData, setCsvData] = useState<string[][]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dataType, setDataType] = useState<string>("");
  const [tags, setTags] = useState<string>("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCsvFile(file);

      // Read the CSV file
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const rows = text.split("\n").map((row) => row.split(","));
        setCsvData(rows);
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Title:", title);
    console.log("Description:", description);
    console.log("Data Type:", dataType);
    console.log("Tags:", tags);
    console.log("Uploaded File:", csvFile);
    console.log("CSV Data:", csvData);
    alert("Dataset Submitted!");
  };

  return (
    <main className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-black text-center mb-6">
        Create a New Dataset Repository
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-black">
            Dataset Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter dataset title"
            required
          />
        </div>

        {/* Description Input */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-black">
            Dataset Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter a brief description of the dataset"
            rows={4}
            required
          />
        </div>

        {/* Data Type (ENUM) */}
        <div>
          <label htmlFor="data-type" className="block text-sm font-medium text-black">
            Data Type
          </label>
          <select
            id="data-type"
            value={dataType}
            onChange={(e) => setDataType(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="" disabled>
              Select data type
            </option>
            <option value="Numerical">Numerical</option>
            <option value="Categorical">Categorical</option>
            <option value="Text">Text</option>
            <option value="Image">Image</option>
          </select>
        </div>

        {/* Tags Input */}
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-black">
            Tags (comma-separated)
          </label>
          <input
            id="tags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter tags (e.g., AI, Blockchain, CSV)"
          />
        </div>

        {/* File Upload */}
        <div>
          <label htmlFor="file-upload" className="block text-sm font-medium text-black">
            Upload Dataset (CSV)
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="mt-2 block w-full text-sm text-black file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-gray-300 file:text-sm file:font-semibold file:bg-gray-50 hover:file:bg-gray-100"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-600 transition"
        >
          Create Dataset
        </button>
      </form>

      {/* CSV Preview */}
      {csvData.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-bold text-black">CSV Preview</h2>
          <div className="overflow-x-auto mt-4">
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  {csvData[0].map((header, index) => (
                    <th
                      key={index}
                      className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-black"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {csvData.slice(1).map((row, rowIndex) => (
                  <tr key={rowIndex} className="even:bg-gray-50">
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="border border-gray-200 px-4 py-2 text-sm text-black"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  );
}
