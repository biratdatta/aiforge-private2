'use client'

import React from "react";
import Link from "next/link";
import Image from "next/image";
import illustration from "../../images/1032.jpg";
import { FaUsers, FaProjectDiagram, FaCogs, FaShieldAlt } from "react-icons/fa";

export default function HeroSection() {
  return (
    <div>
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center mt-10 max-w-6xl mx-auto px-4">
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Chakshu: AI Dataset Marketplace
          </h1>
          <p className="text-gray-700 text-lg">
            Transforming the AI dataset ecosystem with blockchain and AI-powered verification.
          </p>
          <div className="mt-6 flex flex-col md:flex-row justify-center md:justify-start space-y-4 md:space-y-0 md:space-x-4">
            <Link
              href="/newdataset"
              className="text-white bg-blue-500 py-3 px-6 rounded-lg hover:bg-blue-600 transition text-center"
            >
              Upload Dataset
            </Link>
            <Link
              href="/listing"
              className="text-blue-500 border border-blue-500 py-3 px-6 rounded-lg hover:bg-blue-500 hover:text-white transition text-center"
            >
              Explore Marketplace
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
            className="w-full rounded-lg shadow-lg"
            priority
          />
        </div>
      </section>

      {/* About Chakshu Section */}
      <section className="mt-16 max-w-6xl mx-auto px-4 text-gray-700">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">About Chakshu</h2>
          <p className="mt-2 text-lg">
            Learn how Chakshu is reshaping the AI dataset landscape.
          </p>
        </div>

        {/* Grid with Transparent Background and Blur */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Team Section */}
          <InfoCard
            icon={<FaUsers size={40} color="blue" />}
            title="Our Team"
            content={
              <ul className="space-y-2">
                <li>Ishita Agarwal</li>
                <li>Kavita Rana</li>
                <li>Birat Datta</li>
              </ul>
            }
          />

          {/* Mission Section */}
          <InfoCard
            icon={<FaProjectDiagram size={40} color="green" />}
            title="Our Mission"
            content="To solve real-world problems with AI datasets, using blockchain for transparency and scalability."
          />

          {/* How It Works Section */}
          <InfoCard
            icon={<FaCogs size={40} color="orange" />}
            title="How It Works"
            content="AI-powered verification and blockchain transactions ensure secure, efficient dataset management."
          />

          {/* Features Section */}
          <InfoCard
            icon={<FaShieldAlt size={40} color="purple" />}
            title="Key Features"
            content={
              <ul className="space-y-2">
                <li>Blockchain Integration</li>
                <li>AI Validation System</li>
                <li>User-Friendly Interface</li>
              </ul>
            }
          />
        </div>
      </section>
    </div>
  );
}

/* Updated InfoCard Component with Transparent Background and Blur Effect */
const InfoCard = ({ icon, title, content }) => (
  <div className="flex flex-col items-center text-center bg-white bg-opacity-40 p-6 rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl backdrop-blur-md hover:bg-opacity-60">
    <div className="bg-white p-4 rounded-full mb-4 shadow-md">{icon}</div>
    <h3 className="text-xl font-semibold text-black">{title}</h3>
    <div className="mt-4 text-black text-opacity-90">{content}</div>
  </div>
);
