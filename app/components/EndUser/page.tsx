"use client";

import React, { useState } from "react";

interface Dataset {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dataType: string;
  price: number; // Price of the dataset
}

const datasets: Dataset[] = [
  {
    id: 1,
    title: "Dataset A",
    description: "Description for Dataset A",
    tags: ["AI", "Blockchain"],
    dataType: "Text",
    price: 2,
  },
  {
    id: 2,
    title: "Dataset B",
    description: "Description for Dataset B",
    tags: ["Data", "ML"],
    dataType: "Numerical",
    price: 5,
  },
  {
    id: 3,
    title: "Dataset C",
    description: "Description for Dataset C",
    tags: ["Image", "Vision"],
    dataType: "Image",
    price: 10,
  },
];

export default function Enduser() {
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);
  const [isBuying, setIsBuying] = useState(false);

  const handleBuy = (dataset: Dataset) => {
    setSelectedDataset(dataset);
    setIsBuying(true); // Simulate the buying process
    setTimeout(() => {
      alert(`You have successfully purchased ${dataset.title} for ${dataset.price} tokens!`);
      setIsBuying(false);
    }, 1500); // Simulate a delay for the purchase
  };

  return (
    <main className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-black mb-6 text-center">
        Available Datasets
      </h1>

      {/* Dataset List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {datasets.map((dataset) => (
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
            <p className="text-sm text-gray-600 mt-2">
              <span className="font-medium">Price:</span> {dataset.price} Tokens
            </p>
            <button
              className="w-full bg-blue-500 text-white py-2 px-4 mt-4 rounded-lg hover:bg-blue-600 transition"
              onClick={() => handleBuy(dataset)}
              disabled={isBuying}
            >
              {isBuying && selectedDataset?.id === dataset.id ? "Processing..." : "Buy Now"}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
