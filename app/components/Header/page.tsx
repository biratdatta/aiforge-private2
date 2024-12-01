import Link from "next/link";


export default function Header() {
  return (
    <header className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo or Brand Name */}
        <div className="text-lg font-semibold">
          <Link href="/" className="hover:text-gray-300">
            MyApp
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
        </div>
      </div>
    </header>
  );
}
