'use client'

import Link from "next/link";
import { stakeToVerify, uploadDataset, purchaseDataset, voteDataset } from "../../utils/contract";


export default function Header() {
  return (
    <header className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo or Brand Name */}
        <div className="text-lg font-semibold">
          <Link href="/" className="hover:text-gray-300">
            Chakshu
          </Link>
        </div>

        {/* Login Button */}
        <div>
          <a
            href="/login"
            className="text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
          >
            Login
          </a>

           <button onClick={()=>stakeToVerify()}>Stake to Verify</button>
          <button onClick={() =>
        uploadDataset(
            "0.0001", // Price in ETH as a string
            60, // Size as an integer
            "https://example.com/metadata.json" // TokenURI as a valid string
        )
    }>
    Upload Dataset
</button>

            <button
            onClick={() => purchaseDataset(2, "0.0001")} // Pass datasetId and price as parameters
            className="text-sm font-medium bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded transition"
          >
            Purchase Dataset
          </button>
          <button
            onClick={() => voteDataset(2, 85)} // Pass datasetId and rating as parameters
            className="text-sm font-medium bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition"
          > Vote Dataset</button>
        </div>
      </div>
    </header>
  );
}
