import { useState, useEffect } from 'react';

export default function AddWord({ emotionId, onWordAdded }) {
  const [text, setText] = useState('');
  const [lastAdded, setLastAdded] = useState('');

  useEffect(() => {
    if (lastAdded) {
      const timer = setTimeout(() => setLastAdded(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [lastAdded]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && text.trim()) {
      e.preventDefault();
      const wordToSend = text.trim().toLowerCase();
      setText('');

      // Creamos un formato de objeto idéntico al que viene de la base de datos
      const fakeNewWord = {
        id: Date.now(), // ID único temporal
        emotionId: emotionId,
        content: wordToSend
      };

      setLastAdded(wordToSend);
      if (onWordAdded) onWordAdded(fakeNewWord);
    }
  };

  return (
    <div className="flex flex-col items-center mt-6">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="+ añadir palabra..."
        className="w-40 bg-transparent border-b border-white/30 text-white text-center text-sm placeholder-white/40 focus:outline-none focus:border-white/80 transition-all italic py-1 tracking-wider"
      />

      {lastAdded && (
        <p className="text-xs text-zinc-400 italic mt-2">
          Palabra añadida: "{lastAdded}"
        </p>
      )}
    </div>
  );
}