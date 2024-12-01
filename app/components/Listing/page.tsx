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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return <p className="text-center text-gray-500 mt-6">Loading datasets...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-6">Error: {error}</p>;
  }

  return (
    <main className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-black mb-6 text-center">Listing Page</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {datasets.map((dataset) => (
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
            <Link
              href={`/dataset?id=${dataset._id}`}
              className="text-blue-500 hover:underline mt-4 block"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
