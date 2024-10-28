import React from 'react';
import { Settings, Layers, Clock } from 'lucide-react';

interface RecordingSettingsProps {
  quality: string;
  frameRate: number;
  countdown: number;
  onQualityChange: (quality: string) => void;
  onFrameRateChange: (fps: number) => void;
  onCountdownChange: (seconds: number) => void;
  isRecording: boolean;
}

export default function RecordingSettings({
  quality,
  frameRate,
  countdown,
  onQualityChange,
  onFrameRateChange,
  onCountdownChange,
  isRecording,
}: RecordingSettingsProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <Settings size={20} className="text-indigo-600" />
        <h2 className="text-lg font-semibold text-gray-900">Recording Settings</h2>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Layers size={16} className="text-gray-500" />
            <label className="text-sm font-medium text-gray-700">Quality:</label>
          </div>
          <select
            value={quality}
            onChange={(e) => onQualityChange(e.target.value)}
            disabled={isRecording}
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="high">High (1080p)</option>
            <option value="medium">Medium (720p)</option>
            <option value="low">Low (480p)</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-gray-500" />
            <label className="text-sm font-medium text-gray-700">Frame Rate:</label>
          </div>
          <select
            value={frameRate}
            onChange={(e) => onFrameRateChange(Number(e.target.value))}
            disabled={isRecording}
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="60">60 FPS</option>
            <option value="30">30 FPS</option>
            <option value="24">24 FPS</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-gray-500" />
            <label className="text-sm font-medium text-gray-700">Start Countdown:</label>
          </div>
          <select
            value={countdown}
            onChange={(e) => onCountdownChange(Number(e.target.value))}
            disabled={isRecording}
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="0">No Countdown</option>
            <option value="3">3 Seconds</option>
            <option value="5">5 Seconds</option>
            <option value="10">10 Seconds</option>
          </select>
        </div>
      </div>
    </div>
  );
}