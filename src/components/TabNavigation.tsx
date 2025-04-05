
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useLocation } from 'react-router-dom';

const TabNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="container mx-auto py-4 px-4">
      <Tabs defaultValue={currentPath} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1 rounded-xl">
          <TabsTrigger 
            value="/" 
            className={`rounded-lg ${currentPath === '/' ? 'data-[state=active]:bg-white data-[state=active]:text-gray-800 data-[state=active]:shadow-sm' : ''}`}
            asChild
          >
            <Link to="/">Voice Analysis</Link>
          </TabsTrigger>
          <TabsTrigger 
            value="/about" 
            className={`rounded-lg ${currentPath === '/about' ? 'data-[state=active]:bg-white data-[state=active]:text-gray-800 data-[state=active]:shadow-sm' : ''}`}
            asChild
          >
            <Link to="/about">About SweetVoice</Link>
          </TabsTrigger>
          <TabsTrigger 
            value="/how-it-works" 
            className={`rounded-lg ${currentPath === '/how-it-works' ? 'data-[state=active]:bg-white data-[state=active]:text-gray-800 data-[state=active]:shadow-sm' : ''}`}
            asChild
          >
            <Link to="/how-it-works">How It Works</Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default TabNavigation;
