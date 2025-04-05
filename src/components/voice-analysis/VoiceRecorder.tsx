
import React, { useState, useRef } from 'react';
import { Mic, StopCircle, Upload } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { Card, CardContent } from "@/components/ui/card";

interface VoiceRecorderProps {
  onAudioCaptured: (audioData: Blob) => void;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onAudioCaptured }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        onAudioCaptured(audioBlob);
        
        // Stop all tracks to release the microphone
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      toast.success('Recording started');
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast.error('Failed to access microphone. Please check your browser permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsProcessing(true);
      
      // Simulate processing time
      setTimeout(() => {
        setIsProcessing(false);
        toast.success('Recording processed successfully');
      }, 2000);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'audio/wav' || file.type === 'audio/mpeg' || file.type === 'audio/mp3') {
        setIsProcessing(true);
        
        // Read the file and convert it to a Blob
        const reader = new FileReader();
        reader.onload = () => {
          const arrayBuffer = reader.result as ArrayBuffer;
          const audioBlob = new Blob([arrayBuffer], { type: file.type });
          onAudioCaptured(audioBlob);
          
          // Simulate processing time
          setTimeout(() => {
            setIsProcessing(false);
            toast.success('Audio file processed successfully');
          }, 2000);
        };
        
        reader.onerror = () => {
          toast.error('Error reading file');
          setIsProcessing(false);
        };
        
        reader.readAsArrayBuffer(file);
      } else {
        toast.error('Please upload a WAV or MP3 file');
      }
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="flex flex-col items-center justify-center gap-4">
            <h2 className="text-xl font-semibold text-center">Voice Sample</h2>
            <p className="text-sm text-muted-foreground text-center max-w-md">
              Record your voice or upload an audio file. For best results, please speak clearly 
              for at least 10 seconds in a quiet environment.
            </p>
          </div>
          
          {isRecording && (
            <div className="wave-animation">
              <div className="wave-bar"></div>
              <div className="wave-bar"></div>
              <div className="wave-bar"></div>
              <div className="wave-bar"></div>
              <div className="wave-bar"></div>
            </div>
          )}
          
          {isProcessing && (
            <div className="flex justify-center">
              <div className="animate-pulse text-sweetvoice-purple">
                Processing audio...
              </div>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {!isRecording ? (
              <Button 
                onClick={startRecording} 
                className="bg-sweetvoice-purple hover:bg-sweetvoice-darkPurple"
                disabled={isProcessing}
              >
                <Mic className="mr-2 h-4 w-4" />
                Record Voice
              </Button>
            ) : (
              <Button 
                onClick={stopRecording} 
                variant="destructive"
              >
                <StopCircle className="mr-2 h-4 w-4" />
                Stop Recording
              </Button>
            )}
            
            <Button 
              onClick={triggerFileUpload} 
              variant="outline"
              disabled={isRecording || isProcessing}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Audio
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".wav,.mp3"
              className="hidden"
            />
          </div>
          
          <div className="text-xs text-muted-foreground text-center">
            Supported formats: WAV, MP3
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceRecorder;
