import dynamic from 'next/dynamic';
import React from 'react';

const VoiceRecorder = dynamic(() => import('../../components/Recorder'), { ssr: false });

const RecorderPage = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-8 text-orange-500">Voice Sample Recorder</h1>
      <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="bg-orange-500 text-gray-900 py-4 px-6">
          <h2 className="text-xl font-semibold">Record Your Voice Samples</h2>
        </div>
        <div className="p-6">
          <p className="mb-4">
            To set up your voice authentication, we need you to record 5 short voice samples. 
            These samples will be used to create your unique voice signature.
          </p>
          <p className="mb-4">
            Please speak clearly and naturally for each recording. You can re-record any sample 
            if you're not satisfied with it.
          </p>
          <VoiceRecorder />
        </div>
      </div>
    </div>
  );
};

export default RecorderPage;