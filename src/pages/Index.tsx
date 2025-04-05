
import React, { useState } from 'react';
import Header from '@/components/Header';
import TabNavigation from '@/components/TabNavigation';
import Footer from '@/components/Footer';
import VoiceRecorder from '@/components/voice-analysis/VoiceRecorder';
import ResultsDisplay, { ResultsData } from '@/components/voice-analysis/ResultsDisplay';
import { Card, CardContent } from '@/components/ui/card';
import { analyzeVoice } from '@/services/mockAnalysisService';
import { toast } from 'sonner';
import { Volume2, BarChart2, Stethoscope } from 'lucide-react';

const Index = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<ResultsData | null>(null);

  const handleAudioCaptured = async (audioBlob: Blob) => {
    try {
      setIsAnalyzing(true);
      toast.info('Analyzing your voice...');
      
      // Call the analysis service
      const analysisResults = await analyzeVoice(audioBlob);
      setResults(analysisResults);
      
      // Show appropriate toast based on results
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
    <div className="min-h-screen flex flex-col">
      <Header />
      <TabNavigation />
      
      <main className="flex-1 container mx-auto py-6 px-4 sm:px-6 md:py-8 bg-white">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-sweetvoice-light p-3 rounded-full">
                <Volume2 className="h-8 w-8 text-sweetvoice-purple" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-sweetvoice-darkPurple mb-2">
              Voice Analysis for Diabetes
            </h1>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto mt-4 bg-white p-4 rounded-lg border border-sweetvoice-light shadow-sm">
              SweetVoice analyzes your voice to detect potential signs of diabetes.
              Simply record your voice for at least 10 seconds to begin.
            </p>
            
            <div className="flex justify-center gap-4 sm:gap-6 mt-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-sweetvoice-glucose-lowBg flex items-center justify-center mb-2">
                  <Volume2 size={24} className="text-sweetvoice-glucose-normal" />
                </div>
                <span className="text-sm">Record Voice</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-sweetvoice-glucose-mediumBg flex items-center justify-center mb-2">
                  <BarChart2 size={24} className="text-sweetvoice-orange" />
                </div>
                <span className="text-sm">Analyze</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-sweetvoice-glucose-highBg flex items-center justify-center mb-2">
                  <Stethoscope size={24} className="text-sweetvoice-glucose-high" />
                </div>
                <span className="text-sm">Get Results</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <VoiceRecorder onAudioCaptured={handleAudioCaptured} />
            
            {isAnalyzing ? (
              <Card className="border-2 border-sweetvoice-blue/30 shadow-md">
                <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[200px]">
                  <div className="wave-animation">
                    <div className="wave-bar bg-sweetvoice-blue"></div>
                    <div className="wave-bar bg-sweetvoice-purple"></div>
                    <div className="wave-bar bg-sweetvoice-purple"></div>
                    <div className="wave-bar bg-sweetvoice-purple"></div>
                    <div className="wave-bar bg-sweetvoice-blue"></div>
                  </div>
                  <p className="text-sweetvoice-darkPurple font-medium mt-6">Analyzing your voice...</p>
                  <p className="text-sm text-muted-foreground mt-2">Please wait while we process your recording</p>
                </CardContent>
              </Card>
            ) : results ? (
              <ResultsDisplay results={results} />
            ) : null}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
