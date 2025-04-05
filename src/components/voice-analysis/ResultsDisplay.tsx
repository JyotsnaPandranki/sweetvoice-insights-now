
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, ChevronRight, Droplets, HeartPulse, LineChart, Shield } from 'lucide-react';

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
    if (score < 30) return { 
      text: 'Low Risk', 
      color: 'text-sweetvoice-glucose-normal',
      bgColor: 'bg-sweetvoice-glucose-lowBg',
      icon: Shield
    };
    if (score < 70) return { 
      text: 'Medium Risk', 
      color: 'text-sweetvoice-yellow',
      bgColor: 'bg-sweetvoice-glucose-mediumBg',
      icon: HeartPulse
    };
    return { 
      text: 'High Risk', 
      color: 'text-sweetvoice-glucose-high',
      bgColor: 'bg-sweetvoice-glucose-highBg',
      icon: Droplets
    };
  };

  const riskLevel = getRiskLevel(results.risk_score);

  const getProgressColor = (score: number) => {
    if (score < 30) return 'bg-gradient-to-r from-sweetvoice-glucose-normal to-sweetvoice-blue';
    if (score < 70) return 'bg-gradient-to-r from-sweetvoice-yellow to-sweetvoice-orange';
    return 'bg-gradient-to-r from-sweetvoice-orange to-sweetvoice-glucose-high';
  };

  const isFeatureNormal = (feature: FeatureData) => {
    return feature.value >= feature.normal_range[0] && feature.value <= feature.normal_range[1];
  };

  const getFeatureColor = (feature: FeatureData) => {
    if (isFeatureNormal(feature)) {
      return {
        text: 'text-sweetvoice-glucose-normal',
        bg: 'bg-sweetvoice-glucose-normal',
        bgLight: 'bg-sweetvoice-glucose-lowBg',
        border: 'border-sweetvoice-glucose-normal/30'
      };
    } else {
      const deviation = Math.abs(
        (feature.value < feature.normal_range[0]) 
          ? feature.value - feature.normal_range[0]
          : feature.value - feature.normal_range[1]
      ) / feature.normal_range[1];
      
      if (deviation < 0.2) {
        return {
          text: 'text-sweetvoice-yellow',
          bg: 'bg-sweetvoice-yellow',
          bgLight: 'bg-sweetvoice-glucose-mediumBg',
          border: 'border-sweetvoice-yellow/30'
        };
      } else {
        return {
          text: 'text-sweetvoice-glucose-high',
          bg: 'bg-sweetvoice-glucose-high',
          bgLight: 'bg-sweetvoice-glucose-highBg',
          border: 'border-sweetvoice-glucose-high/30'
        };
      }
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-primary/20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sweetvoice-glucose-normal via-sweetvoice-blue to-sweetvoice-purple"></div>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-center flex items-center justify-center gap-2">
            <LineChart className="h-5 w-5 text-sweetvoice-purple" />
            Analysis Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-6">
            <div className="flex items-center justify-center w-full">
              <div className="text-center">
                <div className={`${riskLevel.bgColor} p-4 rounded-lg mb-4 w-full max-w-md mx-auto`}>
                  <div className="text-3xl font-bold mb-2 flex items-center justify-center">
                    {results.prediction === 'normal' ? (
                      <CheckCircle className="mr-2 h-6 w-6 text-sweetvoice-glucose-normal" />
                    ) : (
                      <AlertTriangle className="mr-2 h-6 w-6 text-sweetvoice-glucose-high" />
                    )}
                    <span className={riskLevel.color}>{riskLevel.text}</span>
                  </div>
                  <div className="text-sm text-muted-foreground mb-4">
                    {results.prediction === 'normal' 
                      ? 'Voice biomarkers suggest normal glucose patterns' 
                      : 'Voice biomarkers suggest possible glucose fluctuations'}
                  </div>
                </div>
                
                <div className="w-full max-w-md mb-2">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Low</span>
                    <span>Medium</span>
                    <span>High</span>
                  </div>
                  <Progress 
                    value={results.risk_score} 
                    className={`h-3 ${getProgressColor(results.risk_score)}`}
                  />
                </div>
              </div>
            </div>

            <div className="w-full mt-6">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <riskLevel.icon className={`h-5 w-5 mr-2 ${riskLevel.color}`} />
                Voice Biomarkers
              </h3>
              <div className="space-y-4">
                {results.features.map((feature, index) => {
                  const colorSet = getFeatureColor(feature);
                  return (
                    <div key={index} className={`space-y-1 p-3 rounded-lg ${colorSet.bgLight} ${colorSet.border} border`}>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium flex items-center">
                          <ChevronRight className={`h-4 w-4 mr-1 ${colorSet.text}`} />
                          {feature.name}
                        </span>
                        <span className={`text-sm font-mono ${colorSet.text} font-bold`}>
                          {feature.value.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-2 bg-gray-200 rounded-full flex-1">
                          <div 
                            className={`h-2 rounded-full ${colorSet.bg}`}
                            style={{ 
                              width: `${Math.min(100, Math.max(0, (feature.value / feature.normal_range[1]) * 100))}%` 
                            }}
                          ></div>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap font-mono">
                          {feature.normal_range[0].toFixed(1)} - {feature.normal_range[1].toFixed(1)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="w-full bg-sweetvoice-light/40 p-4 rounded-lg text-sm border border-sweetvoice-light">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-4 w-4 rounded-full animate-breathe bg-gradient-to-r from-sweetvoice-purple to-sweetvoice-blue"></div>
                <p className="font-medium">Model Confidence: {results.confidence.toFixed(0)}%</p>
              </div>
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
