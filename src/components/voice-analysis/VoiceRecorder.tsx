
import React, { useState, useRef } from 'react';
import { Mic, StopCircle, Upload, MicOff, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface VoiceRecorderProps {
  onAudioCaptured: (audioData: Blob) => void;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onAudioCaptured }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<number | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      setRecordingDuration(0);

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
        
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
      toast.success('Recording started');
      
      // Start timer
      timerRef.current = window.setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
      
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
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
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

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="w-full border-2 border-sweetvoice-light overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sweetvoice-glucose-normal via-sweetvoice-blue to-sweetvoice-purple"></div>
      <CardHeader className="pt-6 pb-2">
        <CardTitle className="text-xl font-semibold text-center flex items-center justify-center gap-2">
          <span className="bg-sweetvoice-light p-1.5 rounded-full">
            <Mic className="h-4 w-4 text-sweetvoice-darkPurple" />
          </span>
          Voice Sample
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-6">
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-sm text-muted-foreground text-center max-w-md bg-sweetvoice-light/30 p-3 rounded-lg border border-sweetvoice-light/50 flex items-start gap-2">
              <Info className="h-4 w-4 mt-0.5 shrink-0 text-sweetvoice-blue" />
              <span>
                Record your voice or upload an audio file. For best results, please speak clearly 
                for at least 10 seconds in a quiet environment.
              </span>
            </p>
          </div>
          
          {isRecording && (
            <div className="flex flex-col items-center">
              <div className="wave-animation mb-2">
                <div className="wave-bar bg-sweetvoice-glucose-normal"></div>
                <div className="wave-bar bg-sweetvoice-blue"></div>
                <div className="wave-bar bg-sweetvoice-purple"></div>
                <div className="wave-bar bg-sweetvoice-blue"></div>
                <div className="wave-bar bg-sweetvoice-glucose-normal"></div>
              </div>
              <div className="text-xl font-mono text-sweetvoice-darkPurple">
                {formatTime(recordingDuration)}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {recordingDuration < 10 ? 
                  "Please continue speaking..." : 
                  "Recording duration good, you may continue or stop"}
              </div>
            </div>
          )}
          
          {isProcessing && (
            <div className="flex flex-col justify-center items-center">
              <div className="w-12 h-12 rounded-full border-4 border-sweetvoice-light border-t-sweetvoice-purple animate-spin"></div>
              <div className="animate-pulse text-sweetvoice-darkPurple mt-4 font-medium">
                Processing audio...
              </div>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {!isRecording ? (
              <Button 
                onClick={startRecording} 
                className="bg-gradient-to-r from-sweetvoice-glucose-normal to-sweetvoice-blue hover:from-sweetvoice-blue hover:to-sweetvoice-purple transition-all duration-300 group"
                disabled={isProcessing}
              >
                <Mic className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Record Voice
              </Button>
            ) : (
              <Button 
                onClick={stopRecording} 
                variant="destructive"
                className="bg-gradient-to-r from-sweetvoice-orange to-sweetvoice-red hover:from-sweetvoice-red hover:to-sweetvoice-orange transition-all duration-300"
              >
                <StopCircle className="mr-2 h-4 w-4" />
                Stop Recording
              </Button>
            )}
            
            <Button 
              onClick={triggerFileUpload} 
              variant="outline"
              disabled={isRecording || isProcessing}
              className="border-sweetvoice-purple/30 text-sweetvoice-darkPurple hover:bg-sweetvoice-light/50 transition-all duration-300"
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
          
          <div className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1.5">
            <span className="bg-sweetvoice-light rounded-full px-2 py-0.5">WAV</span>
            <span className="bg-sweetvoice-light rounded-full px-2 py-0.5">MP3</span>
            <span className="text-muted-foreground">formats supported</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceRecorder;
