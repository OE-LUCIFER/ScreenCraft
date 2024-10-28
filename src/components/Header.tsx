import React from 'react';
import { Video } from 'lucide-react';

export default function Header() {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-6 px-8 rounded-xl shadow-lg mb-8">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-white/10 rounded-lg">
          <Video size={24} className="text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">ScreenCraft Pro</h1>
          <p className="text-white/80 mt-1">Professional Screen Recording Studio</p>
        </div>
      </div>
    </div>
  );
}