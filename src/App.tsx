import React, { useState, useCallback, useRef, useEffect } from 'react';
import Header from './components/Header';
import RecordingControls from './components/RecordingControls';
import PreviewWindow from './components/PreviewWindow';
import RecordingSettings from './components/RecordingSettings';
import { useHotkeys } from './hooks/useHotkeys';
import { useMediaRecorder } from './hooks/useMediaRecorder';

function App() {
  const [recordingMode, setRecordingMode] = useState<'screen' | 'window' | 'mobile'>('screen');
  const [webcamStream, setWebcamStream] = useState<MediaStream | null>(null);
  const {
    isRecording,
    isPaused,
    stream,
    recordedVideo,
    duration,
    fileSize,
    quality,
    frameRate,
    countdown,
    countdownValue,
    webcamEnabled,
    audioEnabled,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    setQuality,
    setFrameRate,
    setCountdown,
    toggleWebcam,
    toggleAudio
  } = useMediaRecorder();

  // Setup hotkeys
  useHotkeys({
    'Space': () => {
      if (isRecording) {
        isPaused ? resumeRecording() : pauseRecording();
      }
    },
    'Escape': () => {
      if (isRecording) {
        stopRecording();
      }
    }
  });

  const downloadRecording = useCallback(() => {
    if (recordedVideo) {
      const format = quality === 'high' ? 'webm' : 'mp4';
      const a = document.createElement('a');
      a.href = recordedVideo;
      a.download = `screencraft-${new Date().toISOString()}.${format}`;
      a.click();
    }
  }, [recordedVideo, quality]);

  const shareRecording = useCallback(async () => {
    if (recordedVideo) {
      try {
        const blob = await fetch(recordedVideo).then(r => r.blob());
        const file = new File([blob], 'recording.webm', { type: 'video/webm' });
        
        if (navigator.share) {
          await navigator.share({
            title: 'Screen Recording',
            files: [file]
          });
        } else {
          alert('Sharing is not supported on this device/browser');
        }
      } catch (error) {
        console.error('Error sharing:', error);
        alert('Failed to share recording');
      }
    }
  }, [recordedVideo]);

  const discardRecording = useCallback(() => {
    if (recordedVideo) {
      URL.revokeObjectURL(recordedVideo);
      setWebcamStream(null);
      window.location.reload(); // Clean reload to reset all states
    }
  }, [recordedVideo]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <Header />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <PreviewWindow
              stream={stream}
              recordedVideo={recordedVideo}
              isRecording={isRecording}
              duration={duration}
              fileSize={fileSize}
              countdown={countdownValue}
              recordingMode={recordingMode}
              webcamStream={webcamStream}
            />
            
            <RecordingControls
              isRecording={isRecording}
              isPaused={isPaused}
              hasRecording={!!recordedVideo}
              webcamEnabled={webcamEnabled}
              audioEnabled={audioEnabled}
              recordingMode={recordingMode}
              onStartRecording={startRecording}
              onStopRecording={stopRecording}
              onPauseRecording={pauseRecording}
              onResumeRecording={resumeRecording}
              onToggleWebcam={toggleWebcam}
              onToggleAudio={toggleAudio}
              onDownload={downloadRecording}
              onDiscard={discardRecording}
              onModeChange={setRecordingMode}
              onShareRecording={shareRecording}
            />
          </div>

          <div className="space-y-6">
            <RecordingSettings
              quality={quality}
              frameRate={frameRate}
              countdown={countdown}
              onQualityChange={setQuality}
              onFrameRateChange={setFrameRate}
              onCountdownChange={setCountdown}
              isRecording={isRecording}
              recordingMode={recordingMode}
            />

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Tips</h2>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Press Space to pause/resume</li>
                <li>• Press Esc to stop recording</li>
                <li>• Use high quality for best resolution</li>
                <li>• Enable webcam for picture-in-picture</li>
                <li>• Mobile view perfect for app demos</li>
                <li>• Share directly to social media</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;