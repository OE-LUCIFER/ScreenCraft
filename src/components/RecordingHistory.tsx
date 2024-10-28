import React from 'react';
import { Clock, HardDrive, Trash2, Download, Share2 } from 'lucide-react';
import { useRecordingStore } from '../store/recordingStore';

export default function RecordingHistory() {
  const { recordings, removeRecording } = useRecordingStore();

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
  };

  if (recordings.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recording History</h2>
        <p className="text-gray-500 text-center py-4">No recordings yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Recording History</h2>
      <div className="space-y-4">
        {recordings.map((recording) => (
          <div
            key={recording.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                <Clock size={14} />
                <span>{formatDate(recording.timestamp)}</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>{recording.quality}</span>
                <span>{recording.format.toUpperCase()}</span>
                <div className="flex items-center gap-1">
                  <Clock size={12} />
                  <span>{formatDuration(recording.duration)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <HardDrive size={12} />
                  <span>{formatFileSize(recording.fileSize)}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => window.open(recording.url, '_blank')}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Download"
              >
                <Download size={18} />
              </button>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'Screen Recording',
                      url: recording.url
                    });
                  }
                }}
                className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                title="Share"
              >
                <Share2 size={18} />
              </button>
              <button
                onClick={() => removeRecording(recording.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}