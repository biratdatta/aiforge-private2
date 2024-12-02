'use client'

import Link from "next/link";

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

        {/* Navigation Links */}
        <div className="space-x-4 flex items-center">
          <Link
            href="/newdataset"
            className="text-sm font-medium text-white hover:text-gray-300 py-2 px-4 rounded transition"
          >
            Upload Dataset
          </Link>
          <Link
            href="/listing"
            className="text-sm font-medium text-white hover:text-gray-300 py-2 px-4 rounded transition"
          >
            Explore Marketplace
          </Link>
        </div>
      </div>
    </header>
  );
}
