
import React, { useState } from 'react';
import Header from '@/components/Header';
import TabNavigation from '@/components/TabNavigation';
import Footer from '@/components/Footer';
import VoiceRecorder from '@/components/voice-analysis/VoiceRecorder';
import ResultsDisplay, { ResultsData } from '@/components/voice-analysis/ResultsDisplay';
import { Card, CardContent } from '@/components/ui/card';
import { analyzeVoice } from '@/services/mockAnalysisService';
import { toast } from 'sonner';

const Index = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<ResultsData | null>(null);

  const handleAudioCaptured = async (audioBlob: Blob) => {
    try {
      setIsAnalyzing(true);
      toast.info('Analyzing voice patterns...');
      
      // Call the analysis service
      const analysisResults = await analyzeVoice(audioBlob);
      setResults(analysisResults);
      
      // Show appropriate toast based on results
      if (analysisResults.prediction === 'normal') {
        toast.success('Analysis complete: No significant indicators detected');
      } else {
        toast.warning('Analysis complete: Potential indicators detected');
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
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-sweetvoice-darkPurple mb-2">Voice Analysis</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              SweetVoice analyzes vocal biomarkers to detect potential indicators of diabetes.
              Record your voice or upload an audio file to begin.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8">
            <VoiceRecorder onAudioCaptured={handleAudioCaptured} />
            
            {isAnalyzing ? (
              <Card>
                <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[250px]">
                  <div className="wave-animation">
                    <div className="wave-bar"></div>
                    <div className="wave-bar"></div>
                    <div className="wave-bar"></div>
                    <div className="wave-bar"></div>
                    <div className="wave-bar"></div>
                  </div>
                  <p className="text-sweetvoice-purple mt-4">Analyzing voice patterns...</p>
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
