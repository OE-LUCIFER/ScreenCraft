import { create } from 'zustand';

interface RecordingState {
  recordings: Recording[];
  addRecording: (recording: Recording) => void;
  removeRecording: (id: string) => void;
  clearRecordings: () => void;
}

interface Recording {
  id: string;
  url: string;
  timestamp: number;
  duration: number;
  fileSize: number;
  quality: string;
  format: string;
}

export const useRecordingStore = create<RecordingState>((set) => ({
  recordings: [],
  addRecording: (recording) =>
    set((state) => ({
      recordings: [...state.recordings, recording],
    })),
  removeRecording: (id) =>
    set((state) => ({
      recordings: state.recordings.filter((r) => r.id !== id),
    })),
  clearRecordings: () => set({ recordings: [] }),
}));