import { MessageSquare, Lightbulb } from 'lucide-react';

interface TranslationResultProps {
  transcript: string;
  interpretation: string;
  isProcessing: boolean;
}

export function TranslationResult({ transcript, interpretation, isProcessing }: TranslationResultProps) {
  if (!transcript && !isProcessing) {
    return null;
  }

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
              <h3 className="font-semibold text-gray-800 mb-2">What She Really Means:</h3>
              <p className="text-gray-700 text-lg">{interpretation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
