
import React from 'react';
import { Mic } from 'lucide-react';

const Header = () => {
  return (
    <header className="border-b">
      <div className="container mx-auto py-4 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Mic className="h-6 w-6 text-sweetvoice-purple" />
          <h1 className="text-xl font-bold text-sweetvoice-darkPurple">SweetVoice</h1>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm text-muted-foreground">
            Diabetes Detection Through Voice Analysis
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
