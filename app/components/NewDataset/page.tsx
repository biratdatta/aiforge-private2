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

    const formData = new FormData();
    formData.append("file", csvFile);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("dataType", dataType);
    formData.append("price", "2");  
    formData.append("tags", tags);

    try {
      const response = await fetch(
        "https://unfold-hackathon.onrender.com/uploadDataset?walletAddress=0x1234567890abcdef1234567890abcdef12345678",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log("Dataset uploaded successfully:", responseData);
        alert("Dataset submitted successfully!");
      } else {
        console.error("Failed to upload dataset:", response);
        const errorMsg = await response.text();
        alert(`Failed to upload dataset. Error: ${errorMsg}`);
      }
    } catch (error) {
      console.error("Error uploading dataset:", error);
      alert("An error occurred while uploading the dataset.");
    }
  };

  return (
    <main className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-black text-center mb-6">
        Create a New Dataset Repository
      </h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-lg shadow"
      >
        {/* Title Input */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-black"
          >
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
          <label
            htmlFor="description"
            className="block text-sm font-medium text-black"
          >
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

        {/* Data Type Input */}
        <div>
          <label
            htmlFor="data-type"
            className="block text-sm font-medium text-black"
          >
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
            className="block text-sm font-medium text-black"
          >
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
          <label
            htmlFor="file-upload"
            className="block text-sm font-medium text-black"
          >
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
    </main>
  );
}
