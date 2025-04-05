
import React from 'react';
import { Mic } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto py-4 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-sweetvoice-ios-blue w-8 h-8 rounded-xl flex items-center justify-center">
            <Mic className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-semibold text-gray-800">SweetVoice</h1>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm text-gray-500">
            Diabetes Detection Through Voice Analysis
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
