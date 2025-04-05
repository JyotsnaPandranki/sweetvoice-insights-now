
import { ResultsData } from '@/components/voice-analysis/ResultsDisplay';

// Mock function to simulate voice analysis
export const analyzeVoice = (audioBlob: Blob): Promise<ResultsData> => {
  return new Promise((resolve) => {
    // Simulate processing delay
    setTimeout(() => {
      // Randomize whether we show normal or diabetes risk (for demo purposes)
      const isNormal = Math.random() > 0.5;
      
      // Generate mock data
      const mockResults: ResultsData = {
        risk_score: isNormal ? Math.floor(Math.random() * 30) : 70 + Math.floor(Math.random() * 30),
        prediction: isNormal ? 'normal' : 'potential_diabetes',
        confidence: 75 + Math.floor(Math.random() * 20),
        features: [
          {
            name: 'Spectral Centroid',
            value: isNormal ? 1500 + Math.random() * 300 : 1200 + Math.random() * 200,
            normal_range: [1400, 1800],
            description: 'Measures the "brightness" of your voice, which can be affected by glucose levels'
          },
          {
            name: 'Spectral Bandwidth',
            value: isNormal ? 1800 + Math.random() * 200 : 1500 + Math.random() * 200,
            normal_range: [1700, 2000],
            description: 'Range of frequencies in your voice, which may alter with blood glucose changes'
          },
          {
            name: 'Zero Crossing Rate',
            value: isNormal ? 0.05 + Math.random() * 0.02 : 0.03 + Math.random() * 0.01,
            normal_range: [0.04, 0.07],
            description: 'Measures voice stability, which can be affected by metabolic changes'
          },
          {
            name: 'MFCC Coefficient',
            value: isNormal ? -20 + Math.random() * 5 : -30 + Math.random() * 5,
            normal_range: [-25, -15],
            description: 'Voice tone patterns that may correlate with glucose fluctuations'
          },
          {
            name: 'Harmonic Ratio',
            value: isNormal ? 0.7 + Math.random() * 0.2 : 0.4 + Math.random() * 0.2,
            normal_range: [0.6, 0.9],
            description: 'Balance of harmonic components in voice that may change with glucose levels'
          }
        ]
      };
      
      resolve(mockResults);
    }, 3000); // 3 second delay to simulate processing
  });
};
