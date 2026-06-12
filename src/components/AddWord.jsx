import { useState } from 'react';

export default function AddWord({ emotionId, onWordAdded }) {
  const [text, setText] = useState('');

  const handleKeyDown = async (e) => {
    // Se guarda automáticamente al presionar ENTER
    if (e.key === 'Enter' && text.trim()) {
      e.preventDefault();
      const wordToSend = text.trim();
      setText(''); // Limpia el espacio al instante para dar fluidez

      try {
        const response = await fetch('/api/add-word', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ emotionId, content: wordToSend })
        });

        if (response.ok) {
          const data = await response.json();
          if (onWordAdded) onWordAdded(data.newWord);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="flex justify-center mt-6">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="+ añadir palabra..."
        className="w-40 bg-transparent border-b border-white/30 text-white text-center text-sm placeholder-white/40 focus:outline-none focus:border-white/80 transition-all italic py-1 tracking-wider"
      />
    </div>
  );
}