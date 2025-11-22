import { MessageSquare, Lightbulb, Play, Pause } from 'lucide-react';

interface TranslationResultProps {
  transcript: string;
  interpretation: string;
  isProcessing: boolean;
  isSpeaking: boolean;
  onPlay: () => void;
  onPause: () => void;
}

export function TranslationResult({ 
  transcript, 
  interpretation, 
  isProcessing,
  isSpeaking,
  onPlay,
  onPause
}: TranslationResultProps) {
  if (!transcript && !isProcessing) {
    return null;
  }

  const hasAudioControls = interpretation && interpretation.length > 0;

  return (
    <div className="mt-8 space-y-4">
      {transcript && (
        <div className="bg-pink-50 rounded-xl p-6 border-2 border-pink-200">
          <div className="flex items-start gap-3">
            <MessageSquare className="w-6 h-6 text-pink-500 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 mb-2">What She Said:</h3>
              <p className="text-gray-700 text-lg italic">"{transcript}"</p>
            </div>
          </div>
        </div>
      )}

      {interpretation && (
        <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200 animate-fadeIn">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-800">What She Really Means:</h3>
                {hasAudioControls && (
                  <div className="flex items-center gap-2">
                    {isSpeaking ? (
                      <button
                        onClick={onPause}
                        className="p-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition-colors"
                        title="Pause"
                      >
                        <Pause className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={onPlay}
                        className="p-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition-colors"
                        title="Play"
                      >
                        <Play className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}
              </div>
              <p className="text-gray-700 text-lg">{interpretation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
