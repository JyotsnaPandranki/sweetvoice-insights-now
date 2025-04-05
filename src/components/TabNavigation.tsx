
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useLocation } from 'react-router-dom';

const TabNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="container mx-auto py-4 px-4">
      <Tabs defaultValue={currentPath} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="/" asChild>
            <Link to="/">Voice Analysis</Link>
          </TabsTrigger>
          <TabsTrigger value="/about" asChild>
            <Link to="/about">About SweetVoice</Link>
          </TabsTrigger>
          <TabsTrigger value="/how-it-works" asChild>
            <Link to="/how-it-works">How It Works</Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default TabNavigation;
