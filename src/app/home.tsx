"use client";

import React, { useState, useEffect } from 'react';
import { Play, Moon, Sun, Settings, Code} from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  
  // Initialize dark mode when component mounts
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    } else if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark');
      setDarkMode(false);
    } else {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
        setDarkMode(true);
      }
    }
    setMounted(true);
  }, []);
  
  // Toggle dark mode (same as in builder.tsx)
  const toggleDarkMode = (): void => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
    }
  };
  
  if (!mounted) {
    return <div className="min-h-screen bg-gray-50"></div>;
  }
  
  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      darkMode 
        ? 'dark bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100' 
        : 'bg-gradient-to-br from-blue-50 via-white to-blue-50 text-gray-800'
    }`}>
      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-800/70 backdrop-blur-md' : 'bg-white/70 backdrop-blur-md'} sticky top-0 z-50 shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Image src="/logo.png" alt="PromptBricks Logo" width={128} height={128} className="mr-2" />
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={toggleDarkMode} 
                className={`${darkMode ? 'bg-gray-700/80' : 'bg-gray-100/80'} p-2 rounded-full ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'} transition-all duration-200`} 
                type="button"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hero Section */}
      <main className="flex-grow flex items-center justify-center px-4 py-12 md:py-24">
        <div className="max-w-5xl text-center">
          {/* Animated badge */}
          <div className="inline-block mb-6">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              darkMode ? 'bg-blue-900/30 text-blue-300 border border-blue-800/50' : 'bg-blue-100 text-blue-800'
            }`}>
              <span className={`w-2 h-2 rounded-full mr-2 ${darkMode ? 'bg-blue-400' : 'bg-blue-600'} animate-pulse`}></span>
              Now Beta Testing
            </span>
          </div>
          
          <h1 className={`text-4xl sm:text-5xl md:text-6xl font-extrabold mb-8 leading-tight ${
            darkMode 
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500' 
              : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700'
          }`}>
            Transform AI Prompts <br />with Visual Engineering
          </h1>
          
          <p className={`text-lg md:text-xl mb-12 max-w-2xl mx-auto ${
            darkMode 
              ? 'text-gray-300' 
              : 'text-gray-600'
          }`}>
            Build sophisticated, modular prompts with our intuitive drag-and-drop interface. 
            Craft precise AI interactions that deliver consistent, high-quality results.
          </p>
          
          <div className="flex justify-center">
            <a 
              href="/builder" 
              className={`px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                darkMode
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
              }`}
            >
              Start Building
              <Play className="inline-block ml-2 -mt-1" size={20} />
            </a>
          </div>
          
          {/* Feature highlights */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800/50' : 'bg-white/80'} shadow-md`}>
              <div className={`w-12 h-12 rounded-full ${darkMode ? 'bg-blue-900/50' : 'bg-blue-100'} flex items-center justify-center mx-auto mb-4`}>
                <Settings className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <h3 className="text-xl font-bold mb-2">Modular Design</h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Mix and match components to build the perfect prompt for any task.
              </p>
            </div>
            
            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800/50' : 'bg-white/80'} shadow-md`}>
              <div className={`w-12 h-12 rounded-full ${darkMode ? 'bg-purple-900/50' : 'bg-purple-100'} flex items-center justify-center mx-auto mb-4`}>
                <Code className={`${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
              </div>
              <h3 className="text-xl font-bold mb-2">Template Library</h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Access pre-built templates for common AI tasks and workflows.
              </p>
            </div>
            
            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800/50' : 'bg-white/80'} shadow-md`}>
              <div className={`w-12 h-12 rounded-full ${darkMode ? 'bg-green-900/50' : 'bg-green-100'} flex items-center justify-center mx-auto mb-4`}>
                <Play className={`${darkMode ? 'text-green-400' : 'text-green-600'}`} />
              </div>
              <h3 className="text-xl font-bold mb-2">Instant Testing</h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Test and refine your prompts in real-time to get the best results.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <footer className={`py-6 ${
        darkMode 
          ? 'bg-gray-900/80 border-t border-gray-800' 
          : 'bg-gray-50/80 border-t border-gray-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className={`${
            darkMode 
              ? 'text-gray-500' 
              : 'text-gray-600'
          }`}>
            © {new Date().getFullYear()} PromptBricks. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}