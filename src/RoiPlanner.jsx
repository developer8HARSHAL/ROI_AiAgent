import React, { useState } from 'react';
import { Send, Brain, TrendingUp, Calculator, DollarSign } from 'lucide-react';

const RoiPlanner = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  const askAgent = async () => {
    if (!input.trim()) {
      setResponse("Please enter a message.");
      return;
    }

    setLoading(true);
    setResponse("⏳ Thinking...");

    try {
      const res = await fetch("https://agent-prod.studio.lyzr.ai/v3/inference/chat/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "sk-default-ugtiWb0WYeKvz0aXK4qLECi2BCT4gWFU"
        },
        body: JSON.stringify({
          user_id: "harshalpinge@gmail.com",
          agent_id: "687316d8d0f8ee0a3ec1bf4b",
          session_id: "687316d8d0f8ee0a3ec1bf4b-web-session",
          message: input
        })
      });

      const data = await res.json();

      if (data && data.response) {
        setResponse(data.response);
        setChatHistory(prev => [...prev, { question: input, answer: data.response }]);
      } else {
        setResponse("⚠️ No response from the agent.");
      }
    } catch (error) {
      setResponse("❌ Error connecting to the agent. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      askAgent();
    }
  };

  const clearChat = () => {
    setInput('');
    setResponse('');
    setChatHistory([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-full">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800">Enterprise AI Investment Planner</h1>
          </div>
          <p className="text-gray-600 text-lg">Find the perfect LLM for your business needs through our 4-question assessment</p>
        </div>

        {/* LLM Options Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Nova</h3>
                <p className="text-sm text-gray-600">Cost-effective solution</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Claude</h3>
                <p className="text-sm text-gray-600">Premium quality</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Mistral</h3>
                <p className="text-sm text-gray-600">Balanced approach</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Chat Interface */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Chat History */}
          {chatHistory.length > 0 && (
            <div className="max-h-96 overflow-y-auto p-6 border-b border-gray-200 bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800">Chat History</h3>
                <button
                  onClick={clearChat}
                  className="text-sm text-red-500 hover:text-red-700 transition-colors"
                >
                  Clear History
                </button>
              </div>
              <div className="space-y-4">
                {chatHistory.map((chat, index) => (
                  <div key={index} className="space-y-2">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <p className="text-sm font-medium text-blue-800">You:</p>
                      <p className="text-gray-700">{chat.question}</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-lg">
                      <p className="text-sm font-medium text-green-800">AI Agent:</p>
                      <p className="text-gray-700 whitespace-pre-wrap">{chat.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Input Section */}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-5 h-5 text-blue-500" />
              <span className="font-medium text-gray-800">AI Investment Planning Advisor</span>
            </div>
            
            <div className="relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Answer the question to get personalized LLM recommendations (Nova, Claude, or Mistral)..."
                className="w-full p-4 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                rows="4"
                disabled={loading}
              />
              <button
                onClick={askAgent}
                disabled={loading || !input.trim()}
                className="absolute bottom-3 right-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            <div className="flex justify-between items-center mt-3">
              <p className="text-sm text-gray-500">
                Questions: Department → Tasks/week → Budget → Priority
              </p>
              {loading && (
                <div className="flex items-center gap-2 text-blue-500">
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm">Processing...</span>
                </div>
              )}
            </div>
          </div>

          {/* Response Section */}
          {response && (
            <div className="border-t border-gray-200 bg-gray-50 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Brain className="w-5 h-5 text-green-500" />
                <span className="font-medium text-gray-800">AI Response</span>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <pre className="whitespace-pre-wrap text-gray-700 font-sans text-sm leading-relaxed">
                  {response}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Powered by Lyzr Agent Studio • Get the right LLM recommendation for your business</p>
        </div>
      </div>
    </div>
  );
};

export default RoiPlanner;