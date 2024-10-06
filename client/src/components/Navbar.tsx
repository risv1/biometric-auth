import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-gray-100 shadow-lg">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/" className="font-bold text-xl text-orange-500">VoiceAuth</Link>
        <div className="space-x-4">
          <Link href="/" className="hover:text-orange-300">Home</Link>
          <Link href="/login" className="hover:text-orange-300">Login</Link>
          <Link href="/recorder" className="hover:text-orange-300">Recorder</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;