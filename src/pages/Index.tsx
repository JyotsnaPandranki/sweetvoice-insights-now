
import React, { useState } from 'react';
import Header from '@/components/Header';
import TabNavigation from '@/components/TabNavigation';
import Footer from '@/components/Footer';
import VoiceRecorder from '@/components/voice-analysis/VoiceRecorder';
import ResultsDisplay, { ResultsData } from '@/components/voice-analysis/ResultsDisplay';
import { Card, CardContent } from '@/components/ui/card';
import { analyzeVoice } from '@/services/mockAnalysisService';
import { toast } from 'sonner';
import { ActivitySquare, MicVocal, Stethoscope } from 'lucide-react';

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
      
      <main className="flex-1 container mx-auto py-8 px-4 bg-gradient-to-b from-white to-sweetvoice-light/30">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-sweetvoice-light p-3 rounded-full">
                <MicVocal className="h-8 w-8 text-sweetvoice-purple" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-sweetvoice-darkPurple mb-2 relative inline-block">
              Voice Analysis
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-sweetvoice-purple to-sweetvoice-blue rounded-full"></span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4 bg-white/80 p-4 rounded-lg border border-sweetvoice-light shadow-sm">
              SweetVoice analyzes vocal biomarkers to detect potential indicators of diabetes.
              Record your voice for at least 10 seconds or upload an audio file to begin.
            </p>
            
            <div className="flex justify-center gap-6 mt-6">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-sweetvoice-glucose-lowBg flex items-center justify-center mb-2">
                  <MicVocal size={20} className="text-sweetvoice-glucose-normal" />
                </div>
                <span className="text-xs text-muted-foreground">Record</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-sweetvoice-glucose-mediumBg flex items-center justify-center mb-2">
                  <ActivitySquare size={20} className="text-sweetvoice-orange" />
                </div>
                <span className="text-xs text-muted-foreground">Analyze</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-sweetvoice-glucose-highBg flex items-center justify-center mb-2">
                  <Stethoscope size={20} className="text-sweetvoice-glucose-high" />
                </div>
                <span className="text-xs text-muted-foreground">Results</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-8">
            <VoiceRecorder onAudioCaptured={handleAudioCaptured} />
            
            {isAnalyzing ? (
              <Card className="border-2 border-sweetvoice-blue/30 bg-gradient-to-r from-white to-sweetvoice-light/30 shadow-md">
                <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[250px]">
                  <div className="wave-animation">
                    <div className="wave-bar bg-sweetvoice-blue"></div>
                    <div className="wave-bar bg-sweetvoice-purple"></div>
                    <div className="wave-bar bg-sweetvoice-teal"></div>
                    <div className="wave-bar bg-sweetvoice-purple"></div>
                    <div className="wave-bar bg-sweetvoice-blue"></div>
                  </div>
                  <p className="text-sweetvoice-darkPurple font-medium mt-6 animate-pulse">Analyzing voice biomarkers...</p>
                  <p className="text-xs text-muted-foreground mt-2">Detecting patterns in vocal features</p>
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
