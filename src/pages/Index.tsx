import React, { useState } from 'react';
import Header from '@/components/Header';
import TabNavigation from '@/components/TabNavigation';
import Footer from '@/components/Footer';
import VoiceRecorder from '@/components/voice-analysis/VoiceRecorder';
import ResultsDisplay, { ResultsData } from '@/components/voice-analysis/ResultsDisplay';
import { Card, CardContent } from '@/components/ui/card';
import { analyzeVoice } from '@/services/mockAnalysisService';
import { toast } from 'sonner';
import { Mic, BarChart2, Stethoscope, Info, Volume2 } from 'lucide-react';

const Index = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<ResultsData | null>(null);

  const handleAudioCaptured = async (audioBlob: Blob) => {
    try {
      setIsAnalyzing(true);
      toast.info('Analyzing your voice...');
      
      const analysisResults = await analyzeVoice(audioBlob);
      setResults(analysisResults);
      
      if (analysisResults.prediction === 'normal') {
        toast.success('Analysis complete: No significant indicators found');
      } else {
        toast.warning('Analysis complete: Potential indicators found');
      }
    } catch (error) {
      console.error('Error analyzing audio:', error);
      toast.error('Failed to analyze audio. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <TabNavigation />
      
      <main className="flex-1 container mx-auto py-8 px-4 md:px-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <Card className="macos-glass overflow-hidden border-0 shadow-sm animate-fade-in">
            <CardContent className="p-6 md:p-8">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-sweetvoice-ios-lightGray p-4 rounded-full">
                    <Mic className="h-8 w-8 text-sweetvoice-ios-blue" />
                  </div>
                </div>
                <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-3">
                  Voice Analysis for Diabetes
                </h1>
                <p className="text-base text-gray-600 max-w-2xl mx-auto mt-2">
                  SweetVoice analyzes your voice to detect potential signs of diabetes.
                  Simply record your voice for at least 10 seconds to begin.
                </p>
                
                <div className="flex justify-center gap-8 mt-8">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-3 shadow-sm">
                      <Volume2 size={22} className="text-sweetvoice-ios-blue" />
                    </div>
                    <span className="text-sm text-gray-600">Record</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-3 shadow-sm">
                      <BarChart2 size={22} className="text-sweetvoice-ios-blue" />
                    </div>
                    <span className="text-sm text-gray-600">Analyze</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-3 shadow-sm">
                      <Stethoscope size={22} className="text-sweetvoice-ios-blue" />
                    </div>
                    <span className="text-sm text-gray-600">Results</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="macos-glass border-0 overflow-hidden shadow-sm animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardContent className="p-6 md:p-8">
              <VoiceRecorder onAudioCaptured={handleAudioCaptured} />
            </CardContent>
          </Card>
            
          {isAnalyzing ? (
            <Card className="macos-glass border-0 overflow-hidden shadow-sm animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <CardContent className="p-6 md:p-8 flex flex-col items-center justify-center min-h-[200px]">
                <div className="wave-animation">
                  <div className="wave-bar"></div>
                  <div className="wave-bar"></div>
                  <div className="wave-bar"></div>
                  <div className="wave-bar"></div>
                  <div className="wave-bar"></div>
                </div>
                <p className="text-gray-800 font-medium mt-6">Analyzing your voice...</p>
                <p className="text-sm text-gray-500 mt-2">Please wait while we process your recording</p>
              </CardContent>
            </Card>
          ) : results ? (
            <Card className="macos-glass border-0 overflow-hidden shadow-sm animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <CardContent className="p-6 md:p-8">
                <ResultsDisplay results={results} />
              </CardContent>
            </Card>
          ) : null}
          
          <Card className="macos-glass border-0 overflow-hidden shadow-sm animate-fade-in bg-blue-50/50" style={{ animationDelay: "0.3s" }}>
            <CardContent className="p-6 md:p-8">
              <div className="flex items-start">
                <Info className="text-sweetvoice-ios-blue mr-4 mt-1 shrink-0" />
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">How to get the best results</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-center">
                      <span className="bg-blue-100 text-sweetvoice-ios-blue rounded-full w-5 h-5 flex items-center justify-center mr-2 text-xs">1</span>
                      Speak clearly and at a normal pace
                    </li>
                    <li className="flex items-center">
                      <span className="bg-blue-100 text-sweetvoice-ios-blue rounded-full w-5 h-5 flex items-center justify-center mr-2 text-xs">2</span>
                      Record in a quiet environment
                    </li>
                    <li className="flex items-center">
                      <span className="bg-blue-100 text-sweetvoice-ios-blue rounded-full w-5 h-5 flex items-center justify-center mr-2 text-xs">3</span>
                      Hold your device 6-12 inches from your mouth
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
