import React, { useRef, useEffect } from 'react';
import RecordingStats from './RecordingStats';
import { Smartphone, Monitor, MonitorSmartphone } from 'lucide-react';

interface PreviewWindowProps {
  stream: MediaStream | null;
  recordedVideo: string | null;
  isRecording: boolean;
  duration: number;
  fileSize: number;
  countdown: number;
  recordingMode: 'screen' | 'window' | 'mobile';
  webcamStream: MediaStream | null;
}

export default function PreviewWindow({ 
  stream, 
  recordedVideo, 
  isRecording,
  duration,
  fileSize,
  countdown,
  recordingMode,
  webcamStream
}: PreviewWindowProps) {
  const liveVideoRef = useRef<HTMLVideoElement>(null);
  const recordedVideoRef = useRef<HTMLVideoElement>(null);
  const webcamVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (liveVideoRef.current && stream) {
      liveVideoRef.current.srcObject = stream;
    }
  }, [stream]);

  useEffect(() => {
    if (webcamVideoRef.current && webcamStream) {
      webcamVideoRef.current.srcObject = webcamStream;
    }
  }, [webcamStream]);

  const getPreviewClassName = () => {
    const baseClass = "relative w-full max-w-4xl bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden shadow-xl border border-gray-700";
    if (recordingMode === 'mobile') {
      return `${baseClass} aspect-[9/16] md:max-w-sm mx-auto`;
    }
    return `${baseClass} aspect-video`;
  };

  return (
    <div className={getPreviewClassName()}>
      {isRecording && stream && (
        <video
          ref={liveVideoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-contain"
        />
      )}
      
      {!isRecording && recordedVideo && (
        <video
          ref={recordedVideoRef}
          src={recordedVideo}
          controls
          className="w-full h-full object-contain"
        />
      )}
      
      {webcamStream && (
        <div className="absolute bottom-4 right-4 w-48 h-36 rounded-lg overflow-hidden shadow-lg border-2 border-white/20 bg-black/30 backdrop-blur-sm">
          <video
            ref={webcamVideoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      {!stream && !recordedVideo && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
          <div className="w-16 h-16 mb-4 rounded-full bg-indigo-600/20 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-indigo-600/40 flex items-center justify-center">
              {recordingMode === 'screen' && <Monitor size={24} className="text-white animate-pulse" />}
              {recordingMode === 'window' && <MonitorSmartphone size={24} className="text-white animate-pulse" />}
              {recordingMode === 'mobile' && <Smartphone size={24} className="text-white animate-pulse" />}
            </div>
          </div>
          <p className="text-xl font-medium text-center">Ready to Record {recordingMode === 'mobile' ? 'Mobile View' : recordingMode === 'window' ? 'Window' : 'Full Screen'}</p>
          <p className="text-sm text-gray-400 mt-2 text-center">Click "Start Recording" to begin</p>
        </div>
      )}
      
      {isRecording && (
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
          <span className="text-white text-sm font-medium px-2 py-1 bg-black/50 rounded-md backdrop-blur-sm">
            Recording
          </span>
        </div>
      )}

      {countdown > 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <span className="text-7xl font-bold text-white animate-pulse">
            {countdown}
          </span>
        </div>
      )}

      <RecordingStats
        duration={duration}
        fileSize={fileSize}
        isRecording={isRecording}
      />
    </div>
  );
}