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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [accuracyVote, setAccuracyVote] = useState<string>("");
  const [isBuyModalOpen, setIsBuyModalOpen] = useState<boolean>(false);
  const [previewContent, setPreviewContent] = useState<React.ReactNode>(null);

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

  const handlePreview = async () => {
    if (dataset?.storageLocation) {
      const ipfsURL = dataset.storageLocation.replace("ipfs://", "https://ipfs.io/ipfs/");

      try {
        const response = await fetch(ipfsURL);
        if (!response.ok) {
          throw new Error(`Failed to fetch file for preview. HTTP status: ${response.status}`);
        }

        const contentType = response.headers.get("Content-Type");

        if (contentType === "text/csv") {
          const csvContent = await response.text();
          const rows = csvContent.split("\n").map((row) => row.split(","));

          const headers = rows[0];
          const bodyRows = rows.slice(1).slice(0, 50); // Limit rows to 50

          // Properly render JSX for the table
          setPreviewContent(
            <table className="table-auto border-collapse border border-gray-300 w-full">
              <thead className="bg-gray-100">
                <tr>
                  {headers.map((header, index) => (
                    <th key={index} className="border border-gray-300 p-2">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bodyRows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="border border-gray-300 p-2">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          );
        } else if (contentType?.startsWith("image/")) {
          setPreviewContent(
            <img src={ipfsURL} alt="Dataset Preview" className="max-w-full rounded-lg" />
          );
        } else if (contentType?.startsWith("text/")) {
          const textContent = await response.text();
          setPreviewContent(
            <pre className="bg-gray-50 p-4 rounded-lg overflow-auto max-h-96">{textContent}</pre>
          );
        } else {
          setPreviewContent("Preview not available for this file type.");
        }
      } catch (error) {
        console.error("Error fetching preview:", error);
        setPreviewContent("Error loading preview. Please try again later.");
      }
    } else {
      setPreviewContent("Storage location is unavailable.");
    }
  };

  const handleDownload = async () => {
    if (dataset?.storageLocation) {
      const ipfsURL = dataset.storageLocation.replace("ipfs://", "https://ipfs.io/ipfs/");

      try {
        const response = await fetch(ipfsURL);
        if (!response.ok) {
          throw new Error(`Failed to download file. HTTP status: ${response.status}`);
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${dataset.title.replace(/\s+/g, "_")}.${dataset.dataType || "file"}`;
        link.click();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        //@ts-expect-error{error}
        alert("Error downloading file: " + error.message);
      }
    } else {
      alert("Storage location is unavailable.");
    }
  };

  const handleVerifySubmit = () => {
    alert(`You voted ${accuracyVote}% for dataset accuracy.`);
    setIsModalOpen(false);
    setAccuracyVote("");
  };

  const handleBuyConfirm = () => {
    alert(`You have purchased the dataset: ${dataset?.title}`);
    setIsBuyModalOpen(false);
  };

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
    <main className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-black mb-6 text-center">{dataset.title}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-black mb-4">Dataset Description</h2>
            <p className="text-gray-700">{dataset.description}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <h2 className="text-lg font-semibold text-black mb-4">Dataset Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <strong>Price:</strong> ${dataset.price}
              </p>
              <p>
                <strong>Rating:</strong> {dataset.rating}/5
              </p>
              <p>
                <strong>Storage Location:</strong>{" "}
                <a
                  href={dataset.storageLocation.replace("ipfs://", "https://ipfs.io/ipfs/")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View on IPFS
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-black mb-4">Actions</h2>
          {/* Filled and Outlined Button Variations */}
          <div className="space-y-4">
            <button
              onClick={handlePreview}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition w-full"
            >
              Preview Dataset
            </button>
            <button
              onClick={handleDownload}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition w-full"
            >
              Download Dataset
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition w-full"
            >
              Verify Dataset
            </button>
            <button
              onClick={() => setIsBuyModalOpen(true)}
              className="border-2 border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white px-4 py-2 rounded-lg w-full transition"
            >
              Buy Dataset
            </button>
          </div>
        </div>
      </div>

      {/* Preview Section */}
      {previewContent && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-lg font-semibold text-black mb-4">Dataset Preview</h2>
          <div className="overflow-auto">{previewContent}</div>
        </div>
      )}

      {/* Buy Dataset Modal */}
      {isBuyModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Confirm Purchase</h2>
            <p className="text-gray-700 mb-4">Do you want to purchase the dataset: <strong>{dataset?.title}</strong> for ${dataset?.price}?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsBuyModalOpen(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleBuyConfirm}
                className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700"
              >
                Confirm Purchase
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Verify Dataset</h2>
            <p className="text-gray-700 mb-4">Enter the accuracy percentage you want to vote:</p>
            <input
              type="number"
              value={accuracyVote}
              onChange={(e) => setAccuracyVote(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              placeholder="Enter percentage (e.g., 95)"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleVerifySubmit}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
