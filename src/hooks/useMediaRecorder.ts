import { useState, useCallback, useRef, useEffect } from 'react';

export function useMediaRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null);
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [duration, setDuration] = useState(0);
  const [fileSize, setFileSize] = useState(0);
  const [quality, setQuality] = useState('high');
  const [frameRate, setFrameRate] = useState(60);
  const [countdown, setCountdown] = useState(3);
  const [countdownValue, setCountdownValue] = useState(0);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const durationIntervalRef = useRef<number>();

  useEffect(() => {
    if (isRecording && !isPaused) {
      durationIntervalRef.current = window.setInterval(() => {
        setDuration(d => d + 1);
      }, 1000);
    } else {
      clearInterval(durationIntervalRef.current);
    }
    return () => clearInterval(durationIntervalRef.current);
  }, [isRecording, isPaused]);

  const getVideoConstraints = useCallback(() => {
    const constraints: MediaTrackConstraints = {
      frameRate: frameRate,
    };
    
    if (quality === 'high') {
      constraints.width = 1920;
      constraints.height = 1080;
    } else if (quality === 'medium') {
      constraints.width = 1280;
      constraints.height = 720;
    } else {
      constraints.width = 854;
      constraints.height = 480;
    }
    
    return constraints;
  }, [quality, frameRate]);

  const startRecording = useCallback(async () => {
    try {
      if (countdown > 0) {
        setCountdownValue(countdown);
        for (let i = countdown; i > 0; i--) {
          setCountdownValue(i);
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
        setCountdownValue(0);
      }

      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: getVideoConstraints(),
        audio: audioEnabled,
      });

      let combinedStream = screenStream;

      if (webcamEnabled) {
        try {
          const webcamStream = await navigator.mediaDevices.getUserMedia({
            video: {
              width: 1280,
              height: 720,
              facingMode: 'user'
            },
            audio: false,
          });
          combinedStream = new MediaStream([
            ...screenStream.getTracks(),
            ...webcamStream.getTracks(),
          ]);
        } catch (error) {
          console.error('Webcam error:', error);
          alert('Failed to access webcam. Recording will continue without it.');
        }
      }

      setStream(combinedStream);
      
      const mediaRecorder = new MediaRecorder(combinedStream, {
        mimeType: 'video/webm;codecs=vp9',
      });

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
          setFileSize(current => current + event.data.size);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        setRecordedVideo(URL.createObjectURL(blob));
        chunksRef.current = [];
        setStream(null);
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start(1000);
      setDuration(0);
      setFileSize(0);
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Failed to start recording. Please ensure you have granted the necessary permissions.');
    }
  }, [webcamEnabled, audioEnabled, countdown, quality, frameRate, getVideoConstraints]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      stream?.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      setIsPaused(false);
    }
  }, [stream]);

  const pauseRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
    }
  }, []);

  const resumeRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'paused') {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
    }
  }, []);

  const toggleWebcam = useCallback(() => {
    if (isRecording) {
      alert('Cannot toggle webcam while recording');
      return;
    }
    setWebcamEnabled(prev => !prev);
  }, [isRecording]);

  const toggleAudio = useCallback(() => {
    if (isRecording) {
      alert('Cannot toggle audio while recording');
      return;
    }
    setAudioEnabled(prev => !prev);
  }, [isRecording]);

  return {
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
  };
}