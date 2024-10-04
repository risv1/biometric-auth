import React from 'react';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-8 text-orange-500">Welcome to VoiceAuth</h1>
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-xl mb-6">
          VoiceAuth is a cutting-edge biometric authentication service that uses your unique voice signature to secure your digital identity.
        </p>
        <p className="text-lg mb-8">
          Our advanced AI-powered system analyzes your voice patterns to create a secure, personalized authentication method that's as easy as speaking.
        </p>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-orange-400">How it works:</h2>
          <ol className="list-decimal list-inside text-left">
            <li>Record five short voice samples</li>
            <li>Our AI analyzes your unique voice signature</li>
            <li>Use your voice to securely log in to your accounts</li>
          </ol>
        </div>
        <Link href="/login" className="mt-8 inline-block bg-orange-500 text-gray-900 px-6 py-3 rounded-lg hover:bg-orange-600 transition duration-300">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
