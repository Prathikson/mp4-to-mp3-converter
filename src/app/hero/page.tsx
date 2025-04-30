'use client';

import { useDropzone } from 'react-dropzone';

export default function HeroSection() {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'video/mp4': ['.mp4'], // Accepts .mp4 files
    },
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles); // Handle the dropped files here
    },
  });

  return (
    <section className="min-h-screen px-6 py-20">
      {/* Hero Content */}
      <div className="flex flex-col items-center justify-center space-y-6 text-center z-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white">
          Convert MP4 to MP3 with Ease
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400">
          Fast, secure, and high-quality MP4 to MP3 conversion without the need to sign up. Simple, seamless, and user-friendly.
        </p>

        {/* DropZone */}
        <div
  {...getRootProps()}
  className="bg-gray-100 dark:bg-gray-700 bg-opacity-20 border-4 border-gray-300 dark:border-gray-600 border-dashed rounded-lg p-8 sm:p-12 md:p-16 text-gray-900 dark:text-white w-full sm:w-11/12 md:w-3/4 lg:w-2/3 mx-auto transition-all duration-300 hover:bg-gray-100/90  transform"
>
  <input {...getInputProps()} />
  <p className="text-sm sm:text-lg md:text-xl">Drag and drop your MP4 file here or click to select</p>
</div>

        {/* Call-to-Action buttons */}
        <div className="space-x-4 sm:space-x-6 mt-10 py-12">
          <a
            href="#"
            className="bg-blue-500 text-white py-3 px-6 sm:px-8 rounded-full text-lg sm:text-xl hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105"
          >
            Convert Now
          </a>
          <a
            href="#"
            className="bg-transparent border-2 border-gray-900 dark:border-white py-3 px-6 sm:px-8 rounded-full text-lg sm:text-xl text-gray-900 dark:text-white hover:bg-opacity-10 hover:border-opacity-80 transition-all duration-300 transform hover:scale-105"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
