import React from 'react';
import { 
  Pause, Play, Square, Video, VideoOff, Mic, MicOff, 
  Camera, CameraOff, Download, Trash2, Settings2, 
  MonitorSmartphone, Smartphone, Monitor, Share2
} from 'lucide-react';

interface RecordingControlsProps {
  isRecording: boolean;
  isPaused: boolean;
  hasRecording: boolean;
  webcamEnabled: boolean;
  audioEnabled: boolean;
  recordingMode: 'screen' | 'window' | 'mobile';
  onStartRecording: () => void;
  onStopRecording: () => void;
  onPauseRecording: () => void;
  onResumeRecording: () => void;
  onToggleWebcam: () => void;
  onToggleAudio: () => void;
  onDownload: () => void;
  onDiscard: () => void;
  onModeChange: (mode: 'screen' | 'window' | 'mobile') => void;
  onShareRecording: () => void;
}

export default function RecordingControls({
  isRecording,
  isPaused,
  hasRecording,
  webcamEnabled,
  audioEnabled,
  recordingMode,
  onStartRecording,
  onStopRecording,
  onPauseRecording,
  onResumeRecording,
  onToggleWebcam,
  onToggleAudio,
  onDownload,
  onDiscard,
  onModeChange,
  onShareRecording,
}: RecordingControlsProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex flex-col space-y-4">
        {/* Recording Mode Selection */}
        <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-gray-100">
          <button
            onClick={() => onModeChange('screen')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              recordingMode === 'screen'
                ? 'bg-indigo-100 text-indigo-700'
                : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <Monitor size={18} />
            <span className="hidden sm:inline">Full Screen</span>
          </button>
          <button
            onClick={() => onModeChange('window')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              recordingMode === 'window'
                ? 'bg-indigo-100 text-indigo-700'
                : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <MonitorSmartphone size={18} />
            <span className="hidden sm:inline">Window</span>
          </button>
          <button
            onClick={() => onModeChange('mobile')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              recordingMode === 'mobile'
                ? 'bg-indigo-100 text-indigo-700'
                : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <Smartphone size={18} />
            <span className="hidden sm:inline">Mobile View</span>
          </button>
        </div>

        {/* Main Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {!isRecording && !hasRecording && (
            <button
              onClick={onStartRecording}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg"
            >
              <Video size={20} />
              <span>Start Recording</span>
            </button>
          )}
          
          {isRecording && (
            <>
              <button
                onClick={isPaused ? onResumeRecording : onPauseRecording}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition-all shadow-md hover:shadow-lg"
              >
                {isPaused ? <Play size={20} /> : <Pause size={20} />}
                <span>{isPaused ? 'Resume' : 'Pause'}</span>
              </button>
              
              <button
                onClick={onStopRecording}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-all shadow-md hover:shadow-lg"
              >
                <Square size={20} />
                <span>Stop</span>
              </button>
            </>
          )}

          {/* Input Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onToggleWebcam}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all shadow-sm hover:shadow-md ${
                webcamEnabled 
                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              title={webcamEnabled ? 'Disable Webcam' : 'Enable Webcam'}
            >
              {webcamEnabled ? <Camera size={20} /> : <CameraOff size={20} />}
              <span className="hidden sm:inline">Webcam</span>
            </button>

            <button
              onClick={onToggleAudio}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all shadow-sm hover:shadow-md ${
                audioEnabled 
                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              title={audioEnabled ? 'Disable Audio' : 'Enable Audio'}
            >
              {audioEnabled ? <Mic size={20} /> : <MicOff size={20} />}
              <span className="hidden sm:inline">Audio</span>
            </button>
          </div>
        </div>

        {/* Recording Actions */}
        {hasRecording && (
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-gray-100">
            <button
              onClick={onDownload}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all shadow-md hover:shadow-lg"
            >
              <Download size={20} />
              <span>Download</span>
            </button>
            
            <button
              onClick={onShareRecording}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-all shadow-md hover:shadow-lg"
            >
              <Share2 size={20} />
              <span>Share</span>
            </button>
            
            <button
              onClick={onDiscard}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-all shadow-md hover:shadow-lg"
            >
              <Trash2 size={20} />
              <span>Discard</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}