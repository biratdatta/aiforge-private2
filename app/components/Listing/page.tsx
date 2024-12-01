'use client';

import React, { useState } from "react";

interface Dataset {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dataType: string;
}

const datasets: Dataset[] = [
  { id: 1, title: "Dataset A", description: "Description for Dataset A", tags: ["AI", "Blockchain"], dataType: "Text" },
  { id: 2, title: "Dataset B", description: "Description for Dataset B", tags: ["Data", "ML"], dataType: "Numerical" },
  { id: 3, title: "Dataset C", description: "Description for Dataset C", tags: ["Image", "Vision"], dataType: "Image" },
   
];

export default function ListingComponent() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [selectedDataType, setSelectedDataType] = useState<string>("");

  const filteredDatasets = datasets.filter((dataset) => {
    const matchesSearch = dataset.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag ? dataset.tags.includes(selectedTag) : true;
    const matchesDataType = selectedDataType ? dataset.dataType === selectedDataType : true;
    return matchesSearch && matchesTag && matchesDataType;
  });

  const uniqueTags = Array.from(new Set(datasets.flatMap((dataset) => dataset.tags)));
  const uniqueDataTypes = Array.from(new Set(datasets.map((dataset) => dataset.dataType)));

  return (
    <main className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-black mb-6 text-center"> Listing Page</h1>

      {/* Filters and Search */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 border rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500"
        />

        {/* Tag Filter */}
        <select
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
          className="border rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500"
        >
          <option value="">All Tags</option>
          {uniqueTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>

        {/* Data Type Filter */}
        <select
          value={selectedDataType}
          onChange={(e) => setSelectedDataType(e.target.value)}
          className="border rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500"
        >
          <option value="">All Data Types</option>
          {uniqueDataTypes.map((dataType) => (
            <option key={dataType} value={dataType}>
              {dataType}
            </option>
          ))}
        </select>
      </div>

      {/* Dataset List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDatasets.map((dataset) => (
          <div key={dataset.id} className="p-4 border rounded-lg shadow hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-black">{dataset.title}</h2>
            <p className="text-sm text-gray-600 mt-1">{dataset.description}</p>
            <div className="mt-2">
              <span className="text-sm font-medium text-gray-800">Tags: </span>
              {dataset.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-sm text-blue-500 bg-blue-100 px-2 py-1 rounded-full mr-2"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              <span className="font-medium">Data Type:</span> {dataset.dataType}
            </p>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredDatasets.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No datasets found matching your criteria.</p>
      )}
    </main>
  );
}
