import React from 'react';
import { Clock, HardDrive } from 'lucide-react';

interface RecordingStatsProps {
  duration: number;
  fileSize: number;
  isRecording: boolean;
}

export default function RecordingStats({ duration, fileSize, isRecording }: RecordingStatsProps) {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  if (!isRecording && fileSize === 0) return null;

  return (
    <div className="absolute bottom-4 right-4 bg-black/75 backdrop-blur-sm rounded-lg px-4 py-2 text-white flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Clock size={16} />
        <span>{formatDuration(duration)}</span>
      </div>
      {fileSize > 0 && (
        <div className="flex items-center gap-2">
          <HardDrive size={16} />
          <span>{formatFileSize(fileSize)}</span>
        </div>
      )}
    </div>
  );
}