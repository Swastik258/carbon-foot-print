import React from 'react';
import { HandThumbUpIcon, ChatBubbleLeftIcon, CalendarIcon, ShareIcon, TrophyIcon } from '@heroicons/react/24/outline';

function Community() {
  // Sample data - replace with real data from your backend
  const challenges = [
    { id: 1, title: 'No Plastic Week', progress: 65, participants: 245 },
    { id: 2, title: 'Zero Waste Challenge', progress: 30, participants: 128 },
  ];

  const leaderboard = [
    { name: 'EcoSarah', score: 4500 },
    { name: 'GreenMike', score: 4200 },
    { name: 'SolarJen', score: 3980 },
  ];

  return (
    <div className="min-h-screen bg-green-50 p-4 md:p-8 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-800 mb-2">Eco Community</h1>
        <p className="text-green-600">Connect, Learn, and Act for a Sustainable Future</p>
      </div>

      {/* Discussion Forums & Q&A Section */}
      <section className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-green-800">Discussions</h2>
          <button className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700">
            Start New Discussion
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold">How to reduce plastic waste in daily life?</h3>
            <div className="flex items-center mt-2 space-x-4 text-green-600">
              <div className="flex items-center">
                <HandThumbUpIcon className="h-5 w-5 mr-1" />
                <span>128</span>
              </div>
              <div className="flex items-center">
                <ChatBubbleLeftIcon className="h-5 w-5 mr-1" />
                <span>24 comments</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Green Challenges Section */}
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

      {/* Carbon Footprint Leaderboard */}
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

      {/* Events & Webinars Section */}
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
          {/* Add more social buttons */}
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