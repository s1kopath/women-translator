import { Clock, MessageSquare, Lightbulb } from 'lucide-react';

interface Translation {
  id: string;
  original: string;
  interpretation: string;
  timestamp: Date;
}

interface TranslationHistoryProps {
  history: Translation[];
}

export function TranslationHistory({ history }: TranslationHistoryProps) {
  if (history.length === 0) {
    return null;
  }

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Clock className="w-6 h-6 text-purple-500" />
        Translation History
      </h2>

      <div className="space-y-4">
        {history.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
          >
            <div className="text-xs text-gray-500 mb-3 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatTime(item.timestamp)}
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MessageSquare className="w-4 h-4 text-pink-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-medium text-gray-600">What she said:</span>
                  <p className="text-sm text-gray-700 italic">"{item.original}"</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-medium text-gray-600">What she meant:</span>
                  <p className="text-sm text-gray-700">{item.interpretation}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
