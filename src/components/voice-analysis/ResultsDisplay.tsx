
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle } from 'lucide-react';

export interface FeatureData {
  name: string;
  value: number;
  normal_range: [number, number];
  description: string;
}

export interface ResultsData {
  risk_score: number;
  prediction: 'normal' | 'potential_diabetes';
  features: FeatureData[];
  confidence: number;
}

interface ResultsDisplayProps {
  results: ResultsData | null;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  if (!results) return null;

  const getRiskLevel = (score: number) => {
    if (score < 30) return { text: 'Low Risk', color: 'text-sweetvoice-green' };
    if (score < 70) return { text: 'Medium Risk', color: 'text-sweetvoice-yellow' };
    return { text: 'High Risk', color: 'text-sweetvoice-red' };
  };

  const riskLevel = getRiskLevel(results.risk_score);

  const getProgressColor = (score: number) => {
    if (score < 30) return 'bg-sweetvoice-green';
    if (score < 70) return 'bg-sweetvoice-yellow';
    return 'bg-sweetvoice-red';
  };

  const isFeatureNormal = (feature: FeatureData) => {
    return feature.value >= feature.normal_range[0] && feature.value <= feature.normal_range[1];
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-center">Analysis Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-6">
            <div className="flex items-center justify-center w-full">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2 flex items-center justify-center">
                  {results.prediction === 'normal' ? (
                    <CheckCircle className="mr-2 h-6 w-6 text-sweetvoice-green" />
                  ) : (
                    <AlertTriangle className="mr-2 h-6 w-6 text-sweetvoice-red" />
                  )}
                  <span className={riskLevel.color}>{riskLevel.text}</span>
                </div>
                <div className="text-sm text-muted-foreground mb-4">
                  {results.prediction === 'normal' 
                    ? 'Voice biomarkers suggest normal glucose patterns' 
                    : 'Voice biomarkers suggest possible glucose fluctuations'}
                </div>
                <div className="w-full max-w-md mb-2">
                  <Progress 
                    value={results.risk_score} 
                    className={`h-2 ${getProgressColor(results.risk_score)}`}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                </div>
              </div>
            </div>

            <div className="w-full mt-6">
              <h3 className="text-lg font-medium mb-4">Voice Biomarkers</h3>
              <div className="space-y-4">
                {results.features.map((feature, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{feature.name}</span>
                      <span className={`text-sm ${isFeatureNormal(feature) ? 'text-sweetvoice-green' : 'text-sweetvoice-red'}`}>
                        {feature.value.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-2 bg-gray-200 rounded-full flex-1">
                        <div 
                          className={`h-2 rounded-full ${isFeatureNormal(feature) ? 'bg-sweetvoice-green' : 'bg-sweetvoice-red'}`}
                          style={{ 
                            width: `${Math.min(100, Math.max(0, (feature.value / feature.normal_range[1]) * 100))}%` 
                          }}
                        ></div>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {feature.normal_range[0].toFixed(1)} - {feature.normal_range[1].toFixed(1)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full bg-muted/50 p-4 rounded-lg text-sm">
              <p className="font-medium mb-2">Model Confidence: {results.confidence.toFixed(0)}%</p>
              <p className="text-xs text-muted-foreground">
                This analysis is based on preliminary research and should not replace professional medical diagnosis.
                Please consult with a healthcare provider for accurate diabetes screening and diagnosis.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsDisplay;
