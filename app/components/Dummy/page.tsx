/* eslint-disable */

'use client'

import { useEffect, useState } from "react";

type Dataset = {
  id: number;
  name: string;
  description: string;
};

export default function Home() {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const response = await fetch("https://unfold-hackathon.onrender.com/getDatasets");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("API Response:", data);

        if (Array.isArray(data)) {
          setDatasets(data);
        } else {
          setError("Unexpected API response structure.");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDatasets();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Available Datasets</h1>
      {datasets.length === 0 ? (
        <p>No datasets available.</p>
      ) : (
        <ul>
          {datasets.map((dataset) => (
            <li key={dataset.id}>
              <strong>{dataset.name}</strong>: {dataset.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
