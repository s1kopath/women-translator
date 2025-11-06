import { useState } from 'react';
import { Mic, MicOff, Sparkles } from 'lucide-react';
import { TranslationResult } from './components/TranslationResult';
import { TranslationHistory } from './components/TranslationHistory';
import { interpretText } from './services/ai-interpreter';

interface Translation {
  id: string;
  original: string;
  interpretation: string;
  timestamp: Date;
}

function App() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interpretation, setInterpretation] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [history, setHistory] = useState<Translation[]>([]);
  const [error, setError] = useState('');

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setError('');
      setTranscript('');
      setInterpretation('');
    };

    recognition.onresult = async (event: any) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      setIsProcessing(true);

      try {
        const result = await interpretText(text);
        setInterpretation(result);

        const newTranslation: Translation = {
          id: Date.now().toString(),
          original: text,
          interpretation: result,
          timestamp: new Date(),
        };
        setHistory([newTranslation, ...history]);
      } catch (err) {
        setError('Failed to interpret the text. Please try again.');
      } finally {
        setIsProcessing(false);
      }
    };

    recognition.onerror = (event: any) => {
      setIsListening(false);
      setError(`Error: ${event.error}`);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const stopListening = () => {
    setIsListening(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-pink-500" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              What She Really Means
            </h1>
            <Sparkles className="w-8 h-8 text-purple-500" />
          </div>
          <p className="text-gray-600 text-lg">
            Press the button and let the AI decode the hidden message!
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex flex-col items-center gap-6">
            <button
              onClick={isListening ? stopListening : startListening}
              disabled={isProcessing}
              className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-105 ${
                isListening
                  ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                  : isProcessing
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-br from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg'
              }`}
            >
              {isListening ? (
                <MicOff className="w-16 h-16 text-white" />
              ) : (
                <Mic className="w-16 h-16 text-white" />
              )}
              {isListening && (
                <span className="absolute -bottom-8 text-sm font-medium text-red-500">
                  Listening...
                </span>
              )}
            </button>

            {isProcessing && (
              <div className="flex items-center gap-2 text-purple-600">
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                <span className="ml-2">Decoding the hidden meaning...</span>
              </div>
            )}

            {error && (
              <div className="w-full p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}
          </div>

          <TranslationResult
            transcript={transcript}
            interpretation={interpretation}
            isProcessing={isProcessing}
          />
        </div>

        <TranslationHistory history={history} />
      </div>
    </div>
  );
}

export default App;
