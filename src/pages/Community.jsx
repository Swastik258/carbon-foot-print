import React, { useState } from 'react';
import { 
  HandThumbUpIcon, 
  ChatBubbleLeftIcon, 
  CalendarIcon, 
  ShareIcon, 
  TrophyIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { GoogleGenerativeAI } from '@google/generative-ai';

function Community() {
  // Sample data
  const challenges = [
    { id: 1, title: 'No Plastic Week', progress: 65, participants: 245 },
    { id: 2, title: 'Zero Waste Challenge', progress: 30, participants: 128 },
  ];

  const leaderboard = [
    { name: 'EcoSarah', score: 4500 },
    { name: 'GreenMike', score: 4200 },
    { name: 'SolarJen', score: 3980 },
  ];

  // AI Chat State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Initialize Gemini AI
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const handleNewDiscussion = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    try {
      setIsLoading(true);
      // Add user message
      const userMessage = { text: inputMessage, isBot: false };
      setMessages(prev => [...prev, userMessage]);

      // Generate AI response
      const prompt = `As an environmental scientist, provide detailed, practical advice about: ${inputMessage}.
        Include:
        1. Science-backed solutions
        2. Measurable environmental impact
        3. Cost-effective alternatives
        4. Community action steps
        Use markdown-style formatting with bullet points and bold headings.`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Add AI response
      const botMessage = { text, isBot: true };
      setMessages(prev => [...prev, botMessage]);
      
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, { 
        text: '⚠️ Error connecting to eco-advisor. Please try again later.', 
        isBot: true 
      }]);
    } finally {
      setIsLoading(false);
      setInputMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-green-50 p-4 md:p-8 space-y-8">
      {/* AI Discussion Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-semibold">Eco Discussion Assistant</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div 
                  key={i}
                  className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    msg.isBot ? 'bg-green-50' : 'bg-blue-50'
                  }`}>
                    <p className="text-gray-800 whitespace-pre-wrap">
                      {msg.text}
                      {isLoading && i === messages.length - 1 && (
                        <span className="animate-pulse">...</span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleNewDiscussion} className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about sustainability practices..."
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Send'}
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Ask about renewable energy, waste reduction, sustainable living, etc.
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Community Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-800 mb-2">Eco Community</h1>
        <p className="text-green-600">Connect, Learn, and Act for a Sustainable Future</p>
      </div>

      {/* Discussion Section */}
      <section className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-green-800">Discussions</h2>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700"
          >
            Start New Discussion
          </button>
        </div>
      </section>

      {/* Active Challenges */}
      <section className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold text-green-800 mb-4">Active Challenges</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {challenges.map((challenge) => (
            <div key={challenge.id} className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg">{challenge.title}</h3>
              <div className="mt-2">
                <div className="w-full bg-green-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ width: `${challenge.progress}%` }}
                  ></div>
                </div>
                <div className="mt-2 text-sm text-green-600">
                  {challenge.participants} participants
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Leaderboard */}
      <section className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold text-green-800 mb-4">Leaderboard</h2>
        <div className="space-y-3">
          {leaderboard.map((user, index) => (
            <div key={index} className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="font-semibold text-green-600">#{index + 1}</span>
                <span>{user.name}</span>
              </div>
              <span className="font-semibold text-green-600">{user.score} pts</span>
            </div>
          ))}
        </div>
      </section>

      {/* Events Section */}
      <section className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold text-green-800 mb-4">Upcoming Events</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center space-x-3">
              <CalendarIcon className="h-6 w-6 text-green-600" />
              <div>
                <h3 className="font-semibold">Community Clean-up Day</h3>
                <p className="text-sm text-green-600">Sat, 25 Nov - City Park</p>
              </div>
            </div>
            <button className="mt-3 text-green-600 hover:text-green-700 text-sm">
              RSVP Now →
            </button>
          </div>
        </div>
      </section>

      {/* Social Sharing */}
      <section className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold text-green-800 mb-4">Share Your Progress</h2>
        <div className="flex space-x-4">
          <button className="flex items-center bg-green-100 text-green-600 px-4 py-2 rounded-full hover:bg-green-200">
            <ShareIcon className="h-5 w-5 mr-2" />
            Share on Twitter
          </button>
        </div>
      </section>

      {/* Badges Section */}
      <section className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold text-green-800 mb-4">Your Badges</h2>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <TrophyIcon className="h-8 w-8 text-green-600 mx-auto" />
            <span className="text-sm mt-2">Eco-Warrior</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Community;