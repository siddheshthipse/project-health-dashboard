import React, { useState } from 'react';
import { SparklesIcon, XMarkIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/20/solid';

const AIAssistantChatbot = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {/* Chatbot window */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl w-80 md:w-96 mb-2 flex flex-col max-h-[80vh] transition-all duration-300 ease-in-out">
          {/* Chat header */}
          <div className="bg-indigo-900 text-white p-3 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center">
              <SparklesIcon className="h-5 w-5 mr-2" />
              <h3 className="font-semibold">KTern.AI Assistant</h3>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-300"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
          
          {/* Chat content area */}
          <div className="p-4 flex-1 overflow-y-auto max-h-[400px]">
            <div className="mb-4">
              <h3 className="font-medium text-gray-700 mb-2">What's causing project delays?</h3>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <p className="text-sm text-gray-700">
                  Based on analysis of current project data, the <b>primary factors causing delays</b> are:
                </p>
                <ul className="list-disc ml-5 mt-2 text-sm text-gray-700 space-y-1">
                  <li>Resource overallocation in the development team (142% capacity)</li>
                  <li>Delayed approval cycles (averaging 5.3 days per approval)</li>
                  <li>Incomplete dependency mapping for UAT activities</li>
                </ul>
                <div className="mt-3 text-sm text-blue-700">
                  <a href="#" className="hover:underline">View detailed analysis</a>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-medium text-gray-700 mb-2 flex items-center">
                <SparklesIcon className="h-4 w-4 mr-1.5 text-blue-500" />
                Recommended Actions
              </h3>
              <div className="space-y-2">
                <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700">Rebalance workload for development team</p>
                    <p className="text-xs text-gray-500">High impact on schedule recovery</p>
                  </div>
                  <button className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700">Assign</button>
                </div>
                <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700">Create missing dependencies for UAT tasks</p>
                    <p className="text-xs text-gray-500">Medium impact on risk reduction</p>
                  </div>
                  <button className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700">Assign</button>
                </div>
                <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700">Update project plan with current status</p>
                    <p className="text-xs text-gray-500">Required for accurate forecasting</p>
                  </div>
                  <button className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700">Assign</button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Chat input */}
          <div className="p-3 border-t">
            <div className="flex relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-blue-500 to-pink-500 rounded-lg opacity-75 blur-sm"></div>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask a question about your project..."
                className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none bg-white relative z-10"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg relative z-10 flex items-center hover:bg-blue-700">
                <SparklesIcon className="h-4 w-4 mr-1.5" />
                Ask
              </button>
            </div>
            <div className="mt-2 text-xs text-gray-500 flex items-center">
              <SparklesIcon className="h-3 w-3 mr-1 text-blue-400" />
              Try: "What milestones are at risk?" or "How can we improve resource utilization?"
            </div>
          </div>
        </div>
      )}
      
      {/* Toggle button (only shown when chat is closed) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-indigo-900 text-white rounded-full p-3 shadow-lg hover:bg-indigo-800 flex items-center space-x-2"
        >
          <SparklesIcon className="h-6 w-6" />
          <span className="mr-1">KTern.AI Assistant</span>
        </button>
      )}
    </div>
  );
};

export default AIAssistantChatbot;