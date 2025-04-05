
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle, ArrowRight, Droplet, Heart, Activity, Shield } from 'lucide-react';

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
      icon: Heart
    };
    return { 
      text: 'High Risk', 
      color: 'text-sweetvoice-glucose-high',
      bgColor: 'bg-sweetvoice-glucose-highBg',
      icon: Droplet
    };
  };

  const riskLevel = getRiskLevel(results.risk_score);

  const getProgressColor = (score: number) => {
    if (score < 30) return 'bg-sweetvoice-glucose-normal';
    if (score < 70) return 'bg-sweetvoice-yellow';
    return 'bg-sweetvoice-glucose-high';
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
      <Card className="border-2 border-primary/20 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-center flex items-center justify-center gap-2">
            <Activity className="h-5 w-5 text-sweetvoice-purple" />
            Your Voice Analysis Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-6">
            <div className="flex items-center justify-center w-full">
              <div className="text-center">
                <div className={`${riskLevel.bgColor} p-4 rounded-lg mb-4 w-full max-w-md mx-auto`}>
                  <div className="text-2xl font-bold mb-2 flex items-center justify-center">
                    {results.prediction === 'normal' ? (
                      <CheckCircle className="mr-2 h-6 w-6 text-sweetvoice-glucose-normal" />
                    ) : (
                      <AlertCircle className="mr-2 h-6 w-6 text-sweetvoice-glucose-high" />
                    )}
                    <span className={riskLevel.color}>{riskLevel.text}</span>
                  </div>
                  <div className="text-base mb-4">
                    {results.prediction === 'normal' 
                      ? 'Your voice analysis suggests normal glucose patterns' 
                      : 'Your voice analysis suggests possible glucose fluctuations'}
                  </div>
                </div>
                
                <div className="w-full max-w-md mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">Low Risk</span>
                    <span className="font-medium">Medium Risk</span>
                    <span className="font-medium">High Risk</span>
                  </div>
                  <Progress 
                    value={results.risk_score} 
                    className={`h-4 ${getProgressColor(results.risk_score)}`}
                  />
                </div>
              </div>
            </div>

            <div className="w-full mt-6">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <riskLevel.icon className={`h-5 w-5 mr-2 ${riskLevel.color}`} />
                Voice Features Analyzed
              </h3>
              <div className="space-y-4">
                {results.features.map((feature, index) => {
                  const colorSet = getFeatureColor(feature);
                  return (
                    <div key={index} className={`space-y-1 p-3 rounded-lg ${colorSet.bgLight} ${colorSet.border} border`}>
                      <div className="flex justify-between items-center">
                        <span className="text-base font-medium flex items-center">
                          <ArrowRight className={`h-4 w-4 mr-1 ${colorSet.text}`} />
                          {feature.name}
                        </span>
                        <span className={`text-base font-medium ${colorSet.text}`}>
                          {feature.value.toFixed(1)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-3 bg-gray-200 rounded-full flex-1">
                          <div 
                            className={`h-3 rounded-full ${colorSet.bg}`}
                            style={{ 
                              width: `${Math.min(100, Math.max(0, (feature.value / feature.normal_range[1]) * 100))}%` 
                            }}
                          ></div>
                        </div>
                        <span className="text-sm whitespace-nowrap">
                          Normal: {feature.normal_range[0].toFixed(1)} - {feature.normal_range[1].toFixed(1)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="w-full bg-sweetvoice-light/40 p-4 rounded-lg text-base border border-sweetvoice-light">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-4 w-4 rounded-full bg-sweetvoice-purple"></div>
                <p className="font-medium">Confidence Level: {results.confidence.toFixed(0)}%</p>
              </div>
              <p className="text-sm">
                This analysis is preliminary and should not replace medical advice.
                Please consult your doctor for proper diabetes screening.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsDisplay;
