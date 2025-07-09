
import { GoogleGenerativeAI } from '@google/generative-ai';
import Typewriter from 'typewriter-effect';
import { motion } from "framer-motion";
import Navbar from './Navbar'


import { useState } from 'react';



import React from 'react'

const Mainn = () => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [customPrompt, setCustomPrompt] = useState('Analyze this image');
    const [selectedFile, setSelectedFile] = useState(null);
    
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setFilePreview(URL.createObjectURL(file));
        setSelectedFile(file);
      }
    };
  
    const handleClearFile = () => {
      setFilePreview(null);
      setSelectedFile(null);
      setResponse(null);
      setError(null);
    };
  
    const handleGenerateContent = async () => {
      if (!selectedFile) {
        setError("Please select a file before analyzing.");
        return;
      }
  
      setLoading(true);
      setResponse(null);
      setError(null);
  
      try {
        const APIKEY = import.meta.env.VITE_GEMINI_API_KEY;
        const genAI = new GoogleGenerativeAI(APIKEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
        const fileToGenerativePart = async (file) => {
          const arrayBuffer = await file.arrayBuffer();
          const base64Data = btoa(
            new Uint8Array(arrayBuffer).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          return {
            inlineData: {
              data: base64Data,
              mimeType: file.type,
            },
          };
        };
  
        const parts = [customPrompt];
        const imagePart = await fileToGenerativePart(selectedFile);
        parts.push(imagePart);
  
        const result = await model.generateContent(parts);
  
        if (result.response && result.response.text) {
          const responseText = await result.response.text();
          setResponse(responseText.trim()); // Clean response
        } else {
          throw new Error("Invalid response from the AI model.");
        }
      } catch (err) {
        setError(err.message || "An error occurred while generating content.");
        console.error(err);
        alert('network error')
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className="h-screen w-full text-black bg-vl relative">
        {/* Background Image Div */}
        <div className="h-full w-full absolute z-0 bg-red-400">
          
        </div>
  
        {/* Overlay Div */}
        <div className="h-full w-full bg-red-300 absolute z-5 opacity-50"></div>
  
        {/* Navbar */}
        <div className="h-[8%] w-full relative z-10">
  
          <Navbar />
        </div>
  
        {/* Main Content */}
        <div className="min-h-[92%] flex items-center justify-start flex-col gap-7 bg-blue-400 relative z-10">
          <div className="min-h-fit bg-blue-100 text-black w-[70%] rounded-xl px-5 py-4 flex flex-col gap-4 mt-6">
            <div className="text-xl font-bold flex justify-center items-center">Upload an Image</div>
            <div className="flex items-center justify-start gap-7">
              <input
                type="file"
                accept="image/*"
                className="text-black file:bg-blue-500 file:border-none file:px-8 file:py-2 file:rounded-lg file:text-white file:font-bold"
                onChange={handleFileChange}
              />
              {filePreview && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-2 bg-red-600 rounded-lg font-bold text-white"
                  onClick={handleClearFile}
                >
                  Clear
                </motion.button>
              )}
            </div>
  
            {filePreview && (
              <div className="mt-4 flex justify-center items-center flex-col">
                <h3 className="text-lg">Preview :</h3>
                <img
                  src={filePreview}
                  alt="Uploaded Preview"
                  className="max-w-full max-h-96 rounded-md"
                />
              </div>
            )}
  
            {filePreview && (
              <div className="flex justify-center items-center">
                <motion.button
                  className="px-6 py-3 bg-blue-500 text-white w-[90%] font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-300"
                  onClick={handleGenerateContent}
                  disabled={loading}
  
                >
                  {loading ? "Analyzing..." : "Analyze"}
                </motion.button>
              </div>
            )}
          </div>
  
          {/* Generated Content Section */}
          {response && (
            <div className="min-h-fit w-[70%] bg-blue-100 rounded-lg px-3 py-5 text-lg font-semibold text-gray-800">
              <h2 className="font-bold text-xl mb-4">AI-Generated Output</h2>
              <div className="space-y-3">
                {response.split("*").map((line, index) => (
                  <p key={index} className="list-inside list-disc">
                    {line.trim()}
                  </p>
                ))}
              </div>
            </div>
          )}
  
          {/* How It Works Section */}
          <div className="p-7 bg">
            <h1 className="font-bold text-black text-2xl">How It Works</h1>
          </div>
          <div className="flex items-center justify-center p-5 gap-2">
            {/* Cards */}
            <div className="h-[250px] w-[400px] bg-blue-100 rounded-md">
              <div className="flex items-start flex-col justify-center p-4 gap-2">
                <h1 className="font-bold text-5xl text-blue-500">1</h1>
                <h1 className="text-2xl font-bold text-black">Upload an Image</h1>
              </div>
              <p className="font-semibold text-gray-800 p-4 text-lg">
                Our advanced AI analyzes your uploaded image and provides detailed information about its content.
              </p>
            </div>
            <div className="h-[250px] w-[400px] bg-blue-100 rounded-md">
              <div className="flex items-start flex-col justify-center p-4 gap-2">
                <h1 className="font-bold text-5xl text-blue-500">2</h1>
                <h1 className="text-2xl font-bold text-black">AI Analysis</h1>
              </div>
              <p className="font-semibold text-gray-800 p-4 text-lg">
                Analyze the uploaded image for key details and insights.
              </p>
            </div>
            <div className="h-[250px] w-[400px] bg-blue-100 rounded-md">
              <div className="flex items-start flex-col justify-center p-4 gap-2">
                <h1 className="font-bold text-5xl text-blue-500">3</h1>
                <h1 className="text-2xl font-bold text-black">Get Results</h1>
              </div>
              <p className="font-semibold text-gray-800 p-4 text-lg">
                Receive a detailed analysis of your image.
              </p>
            </div>
          </div>
        </div>
      </div>
  
  
    );
}

export default Mainn;
