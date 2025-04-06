import React, { useState, useRef } from 'react';
import { Code, Bug, Beaker, Save, Play, Settings, Undo, X, PlusCircle, GripVertical } from 'lucide-react';

// Sample prompt templates
const promptCategories = [
  { id: 'feature', name: 'New Feature', icon: <Code size={18} /> },
  { id: 'bugfix', name: 'Bug Fix', icon: <Bug size={18} /> },
  { id: 'test', name: 'Test Cases', icon: <Beaker size={18} /> }
];

// Sample prompt blocks
const promptBlockTypes = [
  { id: 'context', name: 'Context', color: 'bg-blue-500' },
  { id: 'requirement', name: 'Requirement', color: 'bg-green-500' },
  { id: 'constraint', name: 'Constraint', color: 'bg-red-500' },
  { id: 'example', name: 'Example', color: 'bg-purple-500' },
  { id: 'output_format', name: 'Output Format', color: 'bg-yellow-500' }
];

// Simple drag and drop implementation
const PromptBlock = ({ id, content, type, onRemove, onContentChange, onMoveUp, onMoveDown, isFirst, isLast }) => {
  const blockType = promptBlockTypes.find(b => b.id === type);
  
  return (
    <div className="bg-white rounded-lg shadow-md mb-3 overflow-hidden">
      <div className={`${blockType.color} px-4 py-2 flex justify-between items-center text-white`}>
        <div className="flex items-center">
          <span className="mr-2">
            <GripVertical size={16} className="cursor-move opacity-70" />
          </span>
          <span className="font-medium">{blockType.name}</span>
        </div>
        <div className="flex items-center space-x-2">
          {!isFirst && (
            <button onClick={() => onMoveUp(id)} className="hover:bg-white hover:bg-opacity-20 p-1 rounded">
              ↑
            </button>
          )}
          {!isLast && (
            <button onClick={() => onMoveDown(id)} className="hover:bg-white hover:bg-opacity-20 p-1 rounded">
              ↓
            </button>
          )}
          <button onClick={() => onRemove(id)} className="hover:bg-white hover:bg-opacity-20 p-1 rounded">
            <X size={16} />
          </button>
        </div>
      </div>
      <div className="p-4">
        <textarea 
          value={content} 
          onChange={(e) => onContentChange(id, e.target.value)}
          className="w-full p-2 border border-gray-200 rounded resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
          placeholder={`Enter ${blockType.name.toLowerCase()} here...`}
        />
      </div>
    </div>
  );
};

// Main Prompt Builder component
const PromptBuilder = () => {
  const [selectedCategory, setSelectedCategory] = useState('feature');
  const [promptBlocks, setPromptBlocks] = useState([
    { id: '1', type: 'context', content: 'I am working on a React application that uses Next.js and Tailwind CSS.' },
    { id: '2', type: 'requirement', content: 'Create a component for user authentication that includes login and signup forms.' }
  ]);
  const [response, setResponse] = useState('');
  
  const addBlock = (type) => {
    setPromptBlocks([
      ...promptBlocks,
      { id: Date.now().toString(), type, content: '' }
    ]);
  };
  
  const removeBlock = (id) => {
    setPromptBlocks(promptBlocks.filter(block => block.id !== id));
  };
  
  const updateBlockContent = (id, content) => {
    setPromptBlocks(
      promptBlocks.map(block => block.id === id ? { ...block, content } : block)
    );
  };
  
  const moveBlockUp = (id) => {
    const index = promptBlocks.findIndex(block => block.id === id);
    if (index > 0) {
      const newBlocks = [...promptBlocks];
      const temp = newBlocks[index];
      newBlocks[index] = newBlocks[index - 1];
      newBlocks[index - 1] = temp;
      setPromptBlocks(newBlocks);
    }
  };
  
  const moveBlockDown = (id) => {
    const index = promptBlocks.findIndex(block => block.id === id);
    if (index < promptBlocks.length - 1) {
      const newBlocks = [...promptBlocks];
      const temp = newBlocks[index];
      newBlocks[index] = newBlocks[index + 1];
      newBlocks[index + 1] = temp;
      setPromptBlocks(newBlocks);
    }
  };
  
  const generatePrompt = () => {
    const fullPrompt = promptBlocks.map(block => {
      const blockType = promptBlockTypes.find(b => b.id === block.type);
      return `[${blockType.name.toUpperCase()}]\n${block.content}\n`;
    }).join('\n');
    
    // This would actually call the backend API
    setResponse("// Sample generated response based on your prompt:\n\nimport React, { useState } from 'react';\n\nconst AuthComponent = () => {\n  const [isLogin, setIsLogin] = useState(true);\n  const [formData, setFormData] = useState({\n    email: '',\n    password: '',\n    name: ''\n  });\n\n  // Form handling logic would go here\n\n  return (\n    <div className=\"max-w-md mx-auto bg-white p-6 rounded-lg shadow-md\">\n      <h2 className=\"text-2xl font-bold mb-6 text-center\">\n        {isLogin ? 'Log In' : 'Sign Up'}\n      </h2>\n      {/* Form fields would go here */}\n      <div className=\"mt-4 text-center\">\n        <button\n          type=\"button\"\n          onClick={() => setIsLogin(!isLogin)}\n          className=\"text-blue-500 hover:underline\"\n        >\n          {isLogin ? 'Need an account? Sign up' : 'Already have an account? Log in'}\n        </button>\n      </div>\n    </div>\n  );\n};\n\nexport default AuthComponent;");
  };
  
  const saveTemplate = () => {
    // This would save the template to the backend
    alert('Template saved successfully!');
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <span className="font-bold text-xl text-blue-600">AI Prompt Builder</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
                <Settings size={20} />
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
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium mb-4">Prompt Templates</h2>
              <div className="space-y-2">
                {promptCategories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center p-3 rounded-md text-left transition ${
                      selectedCategory === category.id
                        ? 'bg-blue-50 text-blue-700'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="mr-3">{category.icon}</span>
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
              
              <hr className="my-4" />
              
              <h2 className="text-lg font-medium mb-4">Block Types</h2>
              <div className="space-y-2">
                {promptBlockTypes.map(blockType => (
                  <button
                    key={blockType.id}
                    onClick={() => addBlock(blockType.id)}
                    className="w-full flex items-center p-2 rounded-md text-left hover:bg-gray-50"
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
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">
                  {promptCategories.find(c => c.id === selectedCategory)?.name} Prompt
                </h2>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md">
                    <Undo size={18} />
                  </button>
                  <button 
                    onClick={saveTemplate}
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    <Save size={18} />
                  </button>
                </div>
              </div>
              
              <div className="prompt-blocks">
                {promptBlocks.map((block, index) => (
                  <PromptBlock
                    key={block.id}
                    id={block.id}
                    type={block.type}
                    content={block.content}
                    onRemove={removeBlock}
                    onContentChange={updateBlockContent}
                    onMoveUp={moveBlockUp}
                    onMoveDown={moveBlockDown}
                    isFirst={index === 0}
                    isLast={index === promptBlocks.length - 1}
                  />
                ))}
              </div>
              
              <button 
                onClick={() => addBlock('context')}
                className="w-full mt-4 border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-500 flex items-center justify-center hover:bg-gray-50"
              >
                <PlusCircle size={18} className="mr-2" />
                <span>Add Block</span>
              </button>
              
              <button
                onClick={generatePrompt}
                className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-medium flex items-center justify-center hover:bg-blue-700"
              >
                <Play size={18} className="mr-2" />
                <span>Generate</span>
              </button>
            </div>
          </div>
          
          {/* Right side - AI response */}
          <div className="col-span-4">
            <div className="bg-white p-5 rounded-lg shadow-sm h-full">
              <h2 className="text-lg font-medium mb-4">AI Response</h2>
              <div className="bg-gray-50 p-4 rounded-lg h-[calc(100%-4rem)] overflow-auto">
                <pre className="text-sm whitespace-pre-wrap">{response}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptBuilder;
