'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface Dataset {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  dataType: string;
  rating: number;
  uploader: string;
}

export default function ListingPage() {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [filteredDatasets, setFilteredDatasets] = useState<Dataset[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Search and Filter States
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [selectedDataType, setSelectedDataType] = useState<string>("");

  // Fetch datasets from API
  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const response = await fetch("https://unfold-hackathon.onrender.com/getdatasets");
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        if (data.success) {
          setDatasets(data.datasets);
          setFilteredDatasets(data.datasets); // Initialize with all datasets
        } else {
          throw new Error(data.message || "Failed to fetch datasets.");
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDatasets();
  }, []);

  // Handle Search and Filters
  useEffect(() => {
    const applyFilters = () => {
      let filtered = datasets;

      // Apply search filter
      if (searchTerm.trim()) {
        filtered = filtered.filter((dataset) =>
          dataset.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Apply tag filter
      if (selectedTag) {
        filtered = filtered.filter((dataset) => dataset.tags.includes(selectedTag));
      }

      // Apply data type filter
      if (selectedDataType) {
        filtered = filtered.filter((dataset) => dataset.dataType === selectedDataType);
      }

      setFilteredDatasets(filtered);
    };

    applyFilters();
  }, [searchTerm, selectedTag, selectedDataType, datasets]);

  if (loading) {
    return <p className="text-center text-gray-500 mt-6">Loading datasets...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-6">Error: {error}</p>;
  }

  // Extract unique tags and data types for filters
  const uniqueTags = Array.from(new Set(datasets.flatMap((dataset) => dataset.tags)));
  const uniqueDataTypes = Array.from(new Set(datasets.map((dataset) => dataset.dataType)));

  return (
    <main className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-black mb-6 text-center">Listing Page</h1>

      {/* Filters and Search */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        {/* Search Input */}
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
          <div
            key={dataset._id}
            className="p-4 border rounded-lg shadow hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-black">{dataset.title}</h2>
            <p className="text-sm text-gray-600 mt-1">{dataset.description}</p>
            <p className="text-sm text-gray-600 mt-2">
              <span className="font-medium">Data Type:</span> {dataset.dataType}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              <span className="font-medium">Uploader:</span> {dataset.uploader}
            </p>

            {/* Tags Section */}
            <div className="flex flex-wrap items-center gap-2 mt-4">
              {dataset.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs text-blue-500 bg-blue-100 px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <Link
              href={`/dataset?id=${dataset._id}`}
              className="text-blue-500 hover:underline mt-4 block"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {filteredDatasets.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No datasets found matching your criteria.</p>
      )}
    </main>
  );
}
