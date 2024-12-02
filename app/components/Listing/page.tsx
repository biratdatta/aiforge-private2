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
        const response = await fetch(
          "https://unfold-hackathon.onrender.com/getDatasets"
        );
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
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred.");
        }
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
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
        Explore Datasets
      </h1>

      {/* Filters and Search */}
      <div className="flex flex-wrap items-center gap-4 mb-8 p-6 rounded-lg shadow-md bg-gray-50">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 shadow focus:outline-none focus:ring focus:ring-indigo-500"
        />

        {/* Tag Filter */}
        <select
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 shadow focus:outline-none focus:ring focus:ring-indigo-500"
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
          className="border border-gray-300 rounded-lg px-4 py-2 shadow focus:outline-none focus:ring focus:ring-indigo-500"
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDatasets.map((dataset) => (
          <div
            key={dataset._id}
            className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition duration-300"
          >
            <h2 className="text-2xl font-bold text-gray-800">{dataset.title}</h2>
            <p className="text-sm text-gray-600 mt-2">{dataset.description}</p>
            <p className="text-sm text-gray-600 mt-4">
              <span className="font-medium">Data Type:</span> {dataset.dataType}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Uploader:</span> {dataset.uploader}
            </p>

            {/* Tags Section */}
            <div className="flex flex-wrap gap-2 mt-4">
              {dataset.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs text-gray-800 bg-gray-200 px-3 py-1 rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            <Link
              href={`/dataset?id=${dataset._id}`}
              className="inline-block mt-6 text-indigo-600 font-semibold hover:underline"
            >
              View Details →
            </Link>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {filteredDatasets.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No datasets found matching your criteria.
        </p>
      )}
    </main>
  );
}
