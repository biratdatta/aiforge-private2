'use client';

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface DatasetDetail {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  dataType: string;
  uploader: string;
  price: number;
  rating: number;
  verificationStatus: string;
  storageLocation: string;
}

export default function ProductPage() {
  const searchParams = useSearchParams();
  const datasetId = searchParams.get("id");
  const [dataset, setDataset] = useState<DatasetDetail | null>(null);
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
          const foundDataset = data.datasets.find((dataset: any) => dataset._id === datasetId);
          if (foundDataset) {
            setDataset(foundDataset);
          } else {
            throw new Error("Dataset not found.");
          }
        } else {
          throw new Error(data.message || "Failed to fetch datasets.");
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (datasetId) {
      fetchDatasets();
    }
  }, [datasetId]);

  if (loading) {
    return <p className="text-center text-gray-500 mt-6">Loading dataset details...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-6">Error: {error}</p>;
  }

  if (!dataset) {
    return <p className="text-center text-gray-500 mt-6">No dataset found.</p>;
  }

  return (
    <main className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-black mb-4">{dataset.title}</h1>
      <p className="text-gray-600 mb-6">{dataset.description}</p>
      <div>
        <p>
          <strong>Data Type:</strong> {dataset.dataType}
        </p>
        <p>
          <strong>Uploader:</strong> {dataset.uploader}
        </p>
        <p>
          <strong>Verification Status:</strong> {dataset.verificationStatus}
        </p>
        <p>
          <strong>Rating:</strong> {dataset.rating}/5
        </p>
        <p>
          <strong>Price:</strong> ${dataset.price}
        </p>
        <p>
          <strong>Storage Location:</strong>{" "}
          <a href={dataset.storageLocation} target="_blank" rel="noopener noreferrer">
            {dataset.storageLocation}
          </a>
        </p>
      </div>
    </main>
  );
}
