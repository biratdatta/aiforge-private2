'use client'

import React from "react";
import Link from "next/link";
import Image from "next/image";
import illustration from "../../images/HighLevel.jpeg"
export default function HeroSection() {
   


  return (
    <section className="flex flex-col md:flex-row items-center mt-10 max-w-6xl mx-auto px-4">
      {/* Text Content */}
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          Secure AI Data Validation
        </h1>
        <p className="text-black mt-4">
          Validate your data effortlessly with AI-powered blockchain
          technology. Secure, transparent, and fast.
        </p>
        <div className="mt-6 flex flex-col md:flex-row justify-center md:justify-start space-y-4 md:space-y-0 md:space-x-4">
          {/* Upload Button */}
           <Link
            href="/newdataset"
            className="text-white border bg-blue-500 border-blue-500 py-3 px-6 rounded-lg hover:bg-blue-500 hover:text-white transition text-center"
          >
            Upload Database
          </Link>
          

          {/* Check Databases Button */}
          <Link
            href="/listing"
            className="text-blue-500 border border-blue-500 py-3 px-6 rounded-lg hover:bg-blue-500 hover:text-white transition text-center"
          >
            Check Databases
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <div className="flex-1 mt-10 md:mt-0">
        <Image
          src={illustration}
          alt="AI Data Validation Illustration"
          width={500}
          height={400}
          className="w-full"
          priority
        />
      </div>
    </section>
  );
}
