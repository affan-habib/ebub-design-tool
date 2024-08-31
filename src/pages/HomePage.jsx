import React from 'react';
import { useState } from 'react';

// Mock functions for drag-and-drop and text-to-speech
const handleDragStart = (e) => {
  e.dataTransfer.setData("text/plain", e.target.id);
};

const handleDrop = (e) => {
  e.preventDefault();
  const data = e.dataTransfer.getData("text/plain");
  console.log("Dropped item: ", data);
};

const handleDragOver = (e) => {
  e.preventDefault();
};

const textToSpeech = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
};

const Homepage = () => {
  const [text, setText] = useState('');

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6 container">
      <main className="flex flex-col items-center w-full max-w-4xl mt-6 space-y-4">
        <header className="w-full">
        </header>
          <h1 className="text-3xl font-bold text-gray-600 mx-10">EPUB Design Tool</h1>
        <section className="w-full p-4 bg-white shadow-md rounded-md">
          <h2 className="text-xl font-semibold text-blue-500">Drag and Drop Area</h2>
          <div
            id="drop-area"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-dashed border-2 border-gray-300 p-6 mt-2 flex items-center justify-center h-48"
          >
            <p className='text-gray-400'>Drop items here</p>
          </div>
        </section>

        <section className="w-full p-4 bg-white shadow-md rounded-md">
          <h2 className="text-xl font-semibold text-blue-500">Text-to-Speech</h2>
          <textarea
            className="w-full h-32 p-2 border border-gray-300 rounded-md text-gray-300"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type text here..."
          ></textarea>
          <button
            onClick={() => textToSpeech(text)}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Read Text
          </button>
        </section>

        <section className="w-full p-4 bg-white shadow-md rounded-md">
          <h2 className="text-xl font-semibold text-blue-500">Dynamic MCQs</h2>
          {/* Placeholder for MCQs */}
          <p className="text-gray-600">MCQ functionality coming soon!</p>
        </section>

        <section className="w-full p-4 bg-white shadow-md rounded-md">
          <h2 className="text-xl font-semibold text-blue-500">Flashcards</h2>
          {/* Placeholder for Flashcards */}
          <p className="text-gray-600">Flashcards functionality coming soon!</p>
        </section>

        <section className="w-full p-4 bg-white shadow-md rounded-md">
          <h2 className="text-xl font-semibold text-blue-500">Typography Work</h2>
          {/* Placeholder for Typography Work */}
          <p className="text-gray-600">Typography features coming soon!</p>
        </section>
        <section className="w-full p-4 bg-white shadow-md rounded-md mt-4">
          <h2 className="text-xl font-semibold text-blue-500">Login for More</h2>
          <p className="text-gray-600">To access more features, please login.</p>
          <button
            onClick={() => window.location.href = '/admin'}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            See more
          </button>
        </section>
      </main>
    </div>
  );
};

export default Homepage;
