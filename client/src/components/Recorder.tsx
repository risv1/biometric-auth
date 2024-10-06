"use client"

import React, { useState, useRef } from 'react';

const VoiceRecorder = () => {
  const [recordings, setRecordings] = useState<{ blob: Blob; url: string }[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingNumber, setRecordingNumber] = useState(0);
  const mediaRecorder = useRef<MediaRecorder | null>(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream);
    mediaRecorder.current.start();
    setIsRecording(true);

    const audioChunks: BlobPart[] = [];
    mediaRecorder.current.addEventListener("dataavailable", (event) => {
      audioChunks.push(event.data);
    });

    mediaRecorder.current.addEventListener("stop", () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(audioBlob);
      setRecordings(prev => [...prev, { blob: audioBlob, url: audioUrl }]);
      setIsRecording(false);
      setRecordingNumber(prev => prev + 1);
    });
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
    }
  };

  const sendRecordings = async () => {
    const userId = 'user123'; 
    const formData = new FormData();
    recordings.forEach((recording, index) => {
      formData.append('files', recording.blob, `${index}_owner.wav`);
    });

    try {
      const response = await fetch(`http://localhost:8000/user-recordings/${userId}`, {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        alert('Recordings uploaded successfully!');
        setRecordings([]);
        setRecordingNumber(0);
      } else {
        alert('Failed to upload recordings.');
      }
    } catch (error) {
      console.error('Error uploading recordings:', error);
      alert('Error uploading recordings. Please try again.');
    }
  };

  return (
    <div className="bg-gray-700 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-orange-400">Voice Recorder</h2>
      <p className="mb-2">Recording {recordingNumber + 1} of 5</p>
      <div className="w-full bg-gray-600 rounded-full h-2.5 mb-4">
        <div 
          className="bg-orange-500 h-2.5 rounded-full" 
          style={{width: `${(recordingNumber / 5) * 100}%`}}
        ></div>
      </div>
      <div className="flex space-x-2 mb-4">
        <button
          className={`px-4 py-2 rounded ${
            isRecording || recordingNumber >= 5
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-orange-500 hover:bg-orange-600 text-gray-900'
          }`}
          onClick={startRecording}
          disabled={isRecording || recordingNumber >= 5}
        >
          Start Recording
        </button>
        <button
          className={`px-4 py-2 rounded ${
            !isRecording
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-red-500 hover:bg-red-600 text-gray-100'
          }`}
          onClick={stopRecording}
          disabled={!isRecording}
        >
          Stop Recording
        </button>
      </div>
      <button
        className={`w-full px-4 py-2 rounded ${
          recordings.length < 5
            ? 'bg-gray-500 cursor-not-allowed'
            : 'bg-green-500 hover:bg-green-600 text-gray-900'
        }`}
        onClick={sendRecordings}
        disabled={recordings.length < 5}
      >
        Send Recordings
      </button>
      <div className="mt-4 space-y-2">
        {recordings.map((recording, index) => (
          <audio key={index} src={recording.url} controls className="w-full" />
        ))}
      </div>
    </div>
  );
};

export default VoiceRecorder;