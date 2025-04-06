"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Code, Bug, Beaker, Save, Play, Settings, Undo, X, Sun, GripVertical, Home, Moon} from 'lucide-react';
import Image from 'next/image';

// Initialize dark mode from system preference or localStorage on client side
// We'll place this functionality inside a useEffect in the component instead

// TypeScript interfaces for our data structures
interface PromptCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface PromptBlockType {
  id: string;
  name: string;
  color: string;
}

interface PromptBlockData {
  id: string;
  type: string;
  content: string;
}

// Sample prompt templates
const promptCategories: PromptCategory[] = [
  { id: 'feature', name: 'New Feature', icon: <Code size={18} /> },
  { id: 'bugfix', name: 'Bug Fix', icon: <Bug size={18} /> },
  { id: 'test', name: 'Test Cases', icon: <Beaker size={18} /> }
];

// Sample prompt blocks
const promptBlockTypes: PromptBlockType[] = [
  { id: 'context', name: 'Context', color: 'bg-blue-500' },
  { id: 'requirement', name: 'Requirement', color: 'bg-green-500' },
  { id: 'constraint', name: 'Constraint', color: 'bg-red-500' },
  { id: 'example', name: 'Example', color: 'bg-purple-500' },
  { id: 'output_format', name: 'Output Format', color: 'bg-yellow-500' }
];

// Props interface for PromptBlock component
interface PromptBlockProps {
  id: string;
  content: string;
  type: string;
  onRemove: (id: string) => void;
  onContentChange: (id: string, content: string) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
  isFirst: boolean;
  isLast: boolean;
  darkMode: boolean;
}

// Draggable implementation
const PromptBlock: React.FC<PromptBlockProps> = ({ 
  id, 
  content, 
  type, 
  onRemove, 
  onContentChange, 
  onMoveUp, 
  onMoveDown, 
  isFirst, 
  isLast,
  darkMode 
}) => {
  const blockType = promptBlockTypes.find(b => b.id === type) || promptBlockTypes[0];
  const dragRef = useRef<HTMLDivElement>(null);
  
  // Drag start handler
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', id);
    // Apply opacity directly to the current target without setTimeout
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '0.3'; // More transparent as requested
    }
  };
  
  // Drag end handler
  const handleDragEnd = (e: React.DragEvent) => {
    // Reset opacity directly without relying on classList
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '1';
    }
  };
  
  return (
    <div 
      ref={dragRef}
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} rounded-lg shadow-md mb-3 overflow-hidden cursor-move`}
    >
      <div className={`${blockType.color} px-4 py-2 flex justify-between items-center text-white`}>
        <div className="flex items-center">
          <span className="mr-2">
            <GripVertical size={16} className="opacity-70" />
          </span>
          <span className="font-medium">{blockType.name}</span>
        </div>
        <div className="flex items-center">
          <button 
            onClick={() => onRemove(id)} 
            className="p-1 rounded focus:outline-none hover:bg-opacity-20 hover:bg-transparent"
            type="button"
          >
            <X size={16} className="text-white" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <textarea 
          value={content} 
          onChange={(e) => onContentChange(id, e.target.value)}
          className={`w-full p-2 border ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-200 text-gray-800'} rounded resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          rows={3}
          placeholder={`Enter ${blockType.name.toLowerCase()} here...`}
          onClick={(e) => e.stopPropagation()} // Prevent drag when clicking on textarea
        />
      </div>
    </div>
  );
};

// Main Prompt Builder component
const PromptBuilder: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const [draggedOver, setDraggedOver] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Initialize dark mode when component mounts
  useEffect(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    } else if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark');
      setDarkMode(false);
    } else {
      // If no saved preference, check system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
        setDarkMode(true);
      }
    }
    setMounted(true);
  }, []);
  const [selectedCategory, setSelectedCategory] = useState<string>('feature');
  const [promptBlocks, setPromptBlocks] = useState<PromptBlockData[]>([
    { id: '1', type: 'context', content: 'I am working on a React application that uses Next.js and Tailwind CSS.' },
    { id: '2', type: 'requirement', content: 'Create a component for user authentication that includes login and signup forms.' }
  ]);
  const [response, setResponse] = useState<string>('');
  
  // Toggle dark mode
  const toggleDarkMode = (): void => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    // Apply dark mode class to the document
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // You might want to store user preference in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
    }
  };
  
  const addBlock = (type: string): void => {
    setPromptBlocks([
      ...promptBlocks,
      { id: Date.now().toString(), type, content: '' }
    ]);
  };
  
  const removeBlock = (id: string): void => {
    setPromptBlocks(promptBlocks.filter(block => block.id !== id));
  };
  
  const updateBlockContent = (id: string, content: string): void => {
    setPromptBlocks(
      promptBlocks.map(block => block.id === id ? { ...block, content } : block)
    );
  };
  
  const moveBlockUp = (id: string): void => {
    const index = promptBlocks.findIndex(block => block.id === id);
    if (index > 0) {
      const newBlocks = [...promptBlocks];
      const temp = newBlocks[index];
      newBlocks[index] = newBlocks[index - 1];
      newBlocks[index - 1] = temp;
      setPromptBlocks(newBlocks);
    }
  };
  
  const moveBlockDown = (id: string): void => {
    const index = promptBlocks.findIndex(block => block.id === id);
    if (index < promptBlocks.length - 1) {
      const newBlocks = [...promptBlocks];
      const temp = newBlocks[index];
      newBlocks[index] = newBlocks[index + 1];
      newBlocks[index + 1] = temp;
      setPromptBlocks(newBlocks);
    }
  };
  
  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    setDraggedOver(id);
  };
  
  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    const sourceId = e.dataTransfer.getData('text/plain');
    
    if (sourceId !== targetId) {
      const sourceIndex = promptBlocks.findIndex(block => block.id === sourceId);
      const targetIndex = promptBlocks.findIndex(block => block.id === targetId);
      
      const newBlocks = [...promptBlocks];
      const [movedBlock] = newBlocks.splice(sourceIndex, 1);
      newBlocks.splice(targetIndex, 0, movedBlock);
      
      setPromptBlocks(newBlocks);
    }
    
    setDraggedOver(null);
  };
  
  const generatePrompt = async (): Promise<void> => {
    setIsLoading(true);
    
    // Compose the prompt from our blocks
    const promptBlocks2 = promptBlocks.map(block => {
      const blockType = promptBlockTypes.find(b => b.id === block.type);
      return `[${blockType?.name.toUpperCase() || 'BLOCK'}]\n${block.content}\n`;
    }).join('\n');

    const fullPrompt = `You are an expert AI prompt engineer. Based on the context provided by the user, generate a clear, detailed, and actionable prompt that instructs another AI to perform the intended task. First, understand the user's objective and fill in any missing but necessary details. Then, write a well-structured prompt that includes specific instructions, desired output format, tone, and any constraints if applicable. Always output only the final refined prompt, ready to be used

${promptBlocks2}`;
    
    try {
      // Make API call to Gemini
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // In a real app, this would be securely stored
          'x-goog-api-key': process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'AIzaSyDEMB0rLa-BgsWB2EUjvRs1-dXo4w7pJlY' 
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: fullPrompt
            }]
          }]
        })
      });
      
      const data = await response.json();
      
      // Extract the response text from Gemini API
      if (data.candidates && data.candidates.length > 0 && 
          data.candidates[0].content && 
          data.candidates[0].content.parts && 
          data.candidates[0].content.parts.length > 0) {
        setResponse(data.candidates[0].content.parts[0].text);
      } else if (data.error) {
        setResponse(`Error: ${data.error.message || 'Unknown error occurred'}`);
      } else {
        setResponse("No response received from the API.");
      }
    } catch (error) {
      console.error('Error generating prompt:', error);
      setResponse(`Error generating response: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  const saveTemplate = (): void => {
    // This would save the template to the backend
    alert('Template saved successfully!');
  };
  
  // Avoid rendering UI elements that depend on client-side features until after mounting
  if (!mounted) {
    return <div className="min-h-screen bg-gray-50"></div>;
  }
  
  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-4">
              <a href="/" className={`flex items-center ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}>
                <Image src="/logo.png" alt="PromptBricks Logo" width={128} height={128} className="mr-2" />
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={toggleDarkMode} 
                className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'} p-2 rounded-full ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`} 
                type="button"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'} p-2 rounded-full ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`} type="button">
                <Settings size={20} className={darkMode ? 'text-gray-300' : ''} />
              </button>
              <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                US
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Left sidebar */}
          <div className="col-span-3">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-5 rounded-lg shadow-sm`}>
              <h2 className={`text-lg font-medium mb-4 ${darkMode ? 'text-white' : ''}`}>Prompt Templates</h2>
              <div className="space-y-2">
                {promptCategories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center p-3 rounded-md text-left transition ${
                      selectedCategory === category.id
                        ? darkMode 
                          ? 'bg-blue-900/50 text-blue-300' 
                          : 'bg-blue-50 text-blue-700'
                        : darkMode 
                          ? 'hover:bg-gray-700 text-gray-300' 
                          : 'hover:bg-gray-50'
                    }`}
                    type="button"
                  >
                    <span className="mr-3">{category.icon}</span>
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
              
              <hr className={`my-4 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`} />
              
              <h2 className={`text-lg font-medium mb-4 ${darkMode ? 'text-white' : ''}`}>Block Types</h2>
              <div className="space-y-2">
                {promptBlockTypes.map(blockType => (
                  <button
                    key={blockType.id}
                    onClick={() => addBlock(blockType.id)}
                    className={`w-full flex items-center p-2 rounded-md text-left ${
                      darkMode 
                        ? 'hover:bg-gray-700 text-gray-300' 
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                    type="button"
                  >
                    <span className={`w-4 h-4 rounded-full mr-3 ${blockType.color}`}></span>
                    <span>{blockType.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="col-span-5">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-5 rounded-lg shadow-sm`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className={`text-lg font-medium ${darkMode ? 'text-white' : ''}`}>
                  {promptCategories.find(c => c.id === selectedCategory)?.name} Prompt
                </h2>
                <div className="flex space-x-2">
                  <button 
                    className={`p-2 ${
                      darkMode 
                        ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' 
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    } rounded-md`}
                    type="button"
                  >
                    <Undo size={18} />
                  </button>
                  <button 
                    onClick={saveTemplate}
                    className={`p-2 ${
                      darkMode 
                        ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' 
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    } rounded-md`}
                    type="button"
                  >
                    <Save size={18} />
                  </button>
                </div>
              </div>
              
              <div className="prompt-blocks">
                {promptBlocks.map((block, index) => (
                  <div 
                    key={block.id} 
                    onDragOver={(e) => handleDragOver(e, block.id)}
                    onDrop={(e) => handleDrop(e, block.id)}
                    className={`${draggedOver === block.id ? (darkMode ? 'bg-gray-700/50' : 'bg-gray-100/50') : ''} rounded-lg transition-colors duration-150 p-1`}
                  >
                    <PromptBlock
                      id={block.id}
                      type={block.type}
                      content={block.content}
                      onRemove={removeBlock}
                      onContentChange={updateBlockContent}
                      onMoveUp={moveBlockUp}
                      onMoveDown={moveBlockDown}
                      isFirst={index === 0}
                      isLast={index === promptBlocks.length - 1}
                      darkMode={darkMode}
                    />
                  </div>
                ))}
              </div>
              
              <button
                onClick={generatePrompt}
                disabled={isLoading}
                className={`w-full mt-6 ${
                  darkMode 
                    ? `bg-blue-700 ${!isLoading && 'hover:bg-blue-800'}` 
                    : `bg-blue-600 ${!isLoading && 'hover:bg-blue-700'}`
                } text-white py-3 rounded-lg font-medium flex items-center justify-center transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                type="button"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Play size={18} className="mr-2" />
                    <span>Generate</span>
                  </>
                )}
              </button>
            </div>
          </div>
          
          {/* Right side - AI response */}
          <div className="col-span-4">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-5 rounded-lg shadow-sm h-full`}>
              <h2 className={`text-lg font-medium mb-4 ${darkMode ? 'text-white' : ''}`}>AI Response</h2>
              <div className={`${darkMode ? 'bg-gray-900' : 'bg-gray-50'} p-4 rounded-lg h-[calc(100%-4rem)] overflow-auto`}>
                {isLoading ? (
                  <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
                  </div>
                ) : (
                  <pre className={`text-sm whitespace-pre-wrap ${darkMode ? 'text-gray-300' : ''}`}>{response}</pre>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptBuilder;