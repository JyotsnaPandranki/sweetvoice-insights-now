
import React from 'react';
import Header from '@/components/Header';
import TabNavigation from '@/components/TabNavigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Mic, 
  Waveform, 
  CircuitBoard, 
  BarChart4, 
  FileSpreadsheet 
} from 'lucide-react';

const HowItWorks = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <TabNavigation />
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-sweetvoice-darkPurple mb-2">How It Works</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Learn about the technology behind SweetVoice's voice-based diabetes detection system.
            </p>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-10">
                <section className="space-y-6">
                  <h2 className="text-xl font-semibold text-sweetvoice-darkPurple text-center">The Process</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-full bg-sweetvoice-light flex items-center justify-center mb-3">
                        <Mic className="h-6 w-6 text-sweetvoice-purple" />
                      </div>
                      <h3 className="font-medium text-sm">Voice Capture</h3>
                      <p className="text-xs text-muted-foreground mt-1">Record or upload audio</p>
                    </div>
                    
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-full bg-sweetvoice-light flex items-center justify-center mb-3">
                        <Waveform className="h-6 w-6 text-sweetvoice-purple" />
                      </div>
                      <h3 className="font-medium text-sm">Feature Extraction</h3>
                      <p className="text-xs text-muted-foreground mt-1">Analyze vocal biomarkers</p>
                    </div>
                    
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-full bg-sweetvoice-light flex items-center justify-center mb-3">
                        <CircuitBoard className="h-6 w-6 text-sweetvoice-purple" />
                      </div>
                      <h3 className="font-medium text-sm">ML Processing</h3>
                      <p className="text-xs text-muted-foreground mt-1">Apply machine learning</p>
                    </div>
                    
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-full bg-sweetvoice-light flex items-center justify-center mb-3">
                        <BarChart4 className="h-6 w-6 text-sweetvoice-purple" />
                      </div>
                      <h3 className="font-medium text-sm">Pattern Analysis</h3>
                      <p className="text-xs text-muted-foreground mt-1">Compare to known patterns</p>
                    </div>
                    
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-full bg-sweetvoice-light flex items-center justify-center mb-3">
                        <FileSpreadsheet className="h-6 w-6 text-sweetvoice-purple" />
                      </div>
                      <h3 className="font-medium text-sm">Results</h3>
                      <p className="text-xs text-muted-foreground mt-1">Generate detailed report</p>
                    </div>
                  </div>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold text-sweetvoice-darkPurple mb-4">Voice Biomarkers We Analyze</h2>
                  
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2">Spectral Centroid</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Represents the "center of mass" of the spectrum, indicating the brightness of voice.
                        Research shows diabetes can affect voice brightness due to changes in vocal cord tissue elasticity.
                      </p>
                      <div className="w-full bg-sweetvoice-gray h-6 rounded-md overflow-hidden">
                        <div className="bg-gradient-to-r from-sweetvoice-light to-sweetvoice-purple h-full w-3/4"></div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2">Spectral Bandwidth</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Measures the frequency range where most voice energy is concentrated.
                        Diabetic neuropathy may cause narrower bandwidth due to reduced vocal muscle control.
                      </p>
                      <div className="w-full bg-sweetvoice-gray h-6 rounded-md overflow-hidden">
                        <div className="bg-gradient-to-r from-sweetvoice-light to-sweetvoice-purple h-full w-2/3"></div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2">Zero Crossing Rate</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Indicates how often the signal crosses the zero amplitude, related to voice stability.
                        Elevated glucose can affect neural control, causing subtle voice instability.
                      </p>
                      <div className="w-full bg-sweetvoice-gray h-6 rounded-md overflow-hidden">
                        <div className="bg-gradient-to-r from-sweetvoice-light to-sweetvoice-purple h-full w-4/5"></div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2">MFCCs (Mel-Frequency Cepstral Coefficients)</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Represents voice timbre and articulation patterns.
                        Studies show diabetic changes in vocal tract tissues alter these coefficients.
                      </p>
                      <div className="w-full bg-sweetvoice-gray h-6 rounded-md overflow-hidden">
                        <div className="bg-gradient-to-r from-sweetvoice-light to-sweetvoice-purple h-full w-9/12"></div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2">Harmonic-to-Noise Ratio</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Measures the ratio of harmonic (periodic) to noise (aperiodic) components in voice.
                        Diabetic changes can reduce this ratio due to decreased vocal cord coordination.
                      </p>
                      <div className="w-full bg-sweetvoice-gray h-6 rounded-md overflow-hidden">
                        <div className="bg-gradient-to-r from-sweetvoice-light to-sweetvoice-purple h-full w-7/12"></div>
                      </div>
                    </div>
                  </div>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold text-sweetvoice-darkPurple mb-4">Our Machine Learning Model</h2>
                  <p className="text-muted-foreground mb-4">
                    We use a sophisticated machine learning pipeline based on a Random Forest Classifier,
                    which has been trained on thousands of voice samples from both diabetic and non-diabetic individuals.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2">Model Training</h3>
                      <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
                        <li>Trained on 5,000+ voice samples</li>
                        <li>Balanced dataset of diabetic and non-diabetic speakers</li>
                        <li>Cross-validated for reliability</li>
                        <li>Regularly updated with new data</li>
                      </ul>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2">Model Performance</h3>
                      <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
                        <li>Accuracy: 87% in clinical validation</li>
                        <li>Sensitivity: 85% (true positive rate)</li>
                        <li>Specificity: 89% (true negative rate)</li>
                        <li>Constantly improving through research</li>
                      </ul>
                    </div>
                  </div>
                </section>
                
                <div className="bg-muted/30 p-4 rounded-lg mt-6">
                  <h2 className="text-lg font-semibold text-sweetvoice-darkPurple mb-2">Important Note on Accuracy</h2>
                  <p className="text-sm text-muted-foreground">
                    While our technology shows promising results, it's important to understand that SweetVoice 
                    is a screening tool, not a diagnostic device. Voice-based analysis is intended to complement, 
                    not replace, traditional diabetes testing methods like blood glucose measurements. Always 
                    consult with healthcare professionals for proper diagnosis and treatment.
                  </p>
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

export default HowItWorks;
