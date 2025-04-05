
import React from 'react';
import Header from '@/components/Header';
import TabNavigation from '@/components/TabNavigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <TabNavigation />
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-sweetvoice-darkPurple mb-2">About SweetVoice</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Learn about our mission, the science behind voice-based diabetes detection, and our team.
            </p>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <section>
                  <h2 className="text-xl font-semibold text-sweetvoice-darkPurple mb-3">Our Mission</h2>
                  <p className="text-muted-foreground">
                    SweetVoice aims to revolutionize diabetes screening by making it non-invasive, accessible, 
                    and affordable. Our voice analysis technology detects subtle vocal biomarkers that may 
                    indicate glucose metabolism irregularities, potentially identifying diabetes risk factors 
                    before traditional symptoms appear.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold text-sweetvoice-darkPurple mb-3">The Science</h2>
                  <p className="text-muted-foreground mb-4">
                    Recent research has shown that diabetes can cause subtle changes in voice patterns due to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>
                      <span className="font-medium text-foreground">Neuropathy:</span> Affects the nerves that control vocal cords
                    </li>
                    <li>
                      <span className="font-medium text-foreground">Glycation:</span> Protein changes in vocal tissues due to elevated glucose
                    </li>
                    <li>
                      <span className="font-medium text-foreground">Microvascular changes:</span> Affecting blood flow to voice-producing structures
                    </li>
                    <li>
                      <span className="font-medium text-foreground">Central nervous system impacts:</span> Affecting speech coordination
                    </li>
                  </ul>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold text-sweetvoice-darkPurple mb-3">Research Background</h2>
                  <p className="text-muted-foreground mb-2">
                    Our technology is based on multiple peer-reviewed studies that have demonstrated correlations 
                    between vocal biomarkers and diabetes:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>
                      Studies have shown classification accuracy of 85-91% in identifying individuals with diabetes 
                      through voice analysis alone
                    </li>
                    <li>
                      Multiple vocal features including spectral, harmonic, and timbral measurements showed 
                      significant differences between diabetes patients and healthy controls
                    </li>
                    <li>
                      Voice analysis has been particularly effective in detecting early-stage metabolic changes 
                      that may precede clinical diagnosis
                    </li>
                  </ul>
                </section>
                
                <div className="bg-muted/30 p-4 rounded-lg mt-6">
                  <h2 className="text-lg font-semibold text-sweetvoice-darkPurple mb-2">Important Note</h2>
                  <p className="text-sm text-muted-foreground">
                    SweetVoice is currently a research prototype and not intended for clinical diagnosis. 
                    Our technology is under development and validation through clinical trials. 
                    Always consult healthcare professionals for proper medical advice and diagnosis.
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

export default About;
