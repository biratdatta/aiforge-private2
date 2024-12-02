"use client";

import React, { useState } from "react";

export default function NewDataset() {
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dataType, setDataType] = useState<string>("unstructured");
  const [tags, setTags] = useState<string>("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCsvFile(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!csvFile) {
      alert("Please upload a CSV file.");
      return;
    }

    // Your submission logic here
    alert("Dataset submitted successfully!");
  };

  return (
    <main className="max-w-5xl mx-auto py-10 px-4 lg:px-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
        Create a New Dataset Repository
      </h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-8 bg-white p-8 rounded-lg shadow-md lg:shadow-lg lg:p-12"
      >
        {/* Title Input */}
        <div>
          <label
            htmlFor="title"
            className="block text-lg font-medium text-gray-700"
          >
            Dataset Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 block w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
            placeholder="Enter dataset title"
            required
          />
        </div>

        {/* Description Input */}
        <div>
          <label
            htmlFor="description"
            className="block text-lg font-medium text-gray-700"
          >
            Dataset Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2 block w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
            placeholder="Enter a brief description of the dataset"
            rows={4}
            required
          />
        </div>

        {/* Data Type Input */}
        <div>
          <label
            htmlFor="data-type"
            className="block text-lg font-medium text-gray-700"
          >
            Data Type
          </label>
          <select
            id="data-type"
            value={dataType}
            onChange={(e) => setDataType(e.target.value)}
            className="mt-2 block w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
            required
          >
            <option value="" disabled>
              Select data type
            </option>
            <option value="numerical">Numerical</option>
            <option value="categorical">Categorical</option>
            <option value="text">Text</option>
            <option value="image">Image</option>
            <option value="unstructured">Unstructured</option>
          </select>
        </div>

        {/* Tags Input */}
        <div>
          <label
            htmlFor="tags"
            className="block text-lg font-medium text-gray-700"
          >
            Tags (comma-separated)
          </label>
          <input
            id="tags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="mt-2 block w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
            placeholder="Enter tags (e.g., AI, Blockchain, CSV)"
          />
        </div>

        {/* File Upload */}
        <div>
          <label
            htmlFor="file-upload"
            className="block text-lg font-medium text-gray-700"
          >
            Upload Dataset (CSV)
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="mt-2 block w-full text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-gray-300 file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 px-6 text-lg font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Create Dataset
        </button>
      </form>
    </main>
  );
}
