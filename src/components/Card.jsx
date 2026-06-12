import React, { useState, useEffect } from 'react';
import AddWord from './AddWord.jsx';

export default function Card({ initialEmotions, initialWords, initialConnectors, initialImages }) {
  const [currentEmotion, setCurrentEmotion] = useState(initialEmotions[0]?.id || 'felicidad');
  
  // Estado de palabras: combina las de la DB con las guardadas en LocalStorage
  const [words, setWords] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('metamorfosis_custom_words');
      if (saved) {
        const localWords = JSON.parse(saved);
        return [...initialWords, ...localWords];
      }
    }
    return initialWords;
  });

  const [selectedWordA, setSelectedWordA] = useState('');
  const [selectedConnector, setSelectedConnector] = useState('');
  const [selectedWordB, setSelectedWordB] = useState('');
  const [bgImage, setBgImage] = useState('');

  const filteredWords = words.filter(w => w.emotionId === currentEmotion);
  const filteredConnectors = initialConnectors.filter(c => c.emotionId === currentEmotion);
  const filteredImages = initialImages.filter(i => i.emotionId === currentEmotion);

  const shuffleVerses = () => {
    if (filteredWords.length > 0) {
      const randomWA = filteredWords[Math.floor(Math.random() * filteredWords.length)].content;
      const randomWB = filteredWords[Math.floor(Math.random() * filteredWords.length)].content;
      setSelectedWordA(randomWA);
      setSelectedWordB(randomWB);
    }
    if (filteredConnectors.length > 0) {
      const randomC = filteredConnectors[Math.floor(Math.random() * filteredConnectors.length)].content;
      setSelectedConnector(randomC);
    }
    if (filteredImages.length > 0) {
      const randomImg = filteredImages[Math.floor(Math.random() * filteredImages.length)].url;
      setBgImage(randomImg);
    }
  };

  useEffect(() => {
    shuffleVerses();
  }, [currentEmotion, words]);

  // Esta función se ejecuta al dar ENTER en el input
  const handleAddNewWord = (newWord) => {
    // 1. La agregamos al estado visual para que ruede ya mismo
    setWords((prevWords) => [...prevWords, newWord]);

    // 2. La guardamos en el LocalStorage para que no se borre al recargar la página
    const saved = localStorage.getItem('metamorfosis_custom_words');
    const currentLocal = saved ? JSON.parse(saved) : [];
    const updatedLocal = [...currentLocal, newWord];
    localStorage.setItem('metamorfosis_custom_words', JSON.stringify(updatedLocal));
  };

  const currentBgClass = initialEmotions.find(e => e.id === currentEmotion)?.bgClass || 'rgba(0,0,0,0.4)';

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center font-sans transition-all duration-1000 ease-in-out bg-zinc-950/70">
      <p className="text-zinc-400 text-sm tracking-widest uppercase mb-3 font-mono">Metamorfosis Poética</p>
      
      {bgImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out opacity-40 scale-105"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      )}

      <div 
        className="absolute inset-0 transition-all duration-1000 ease-in-out pointer-events-none"
        style={{ backgroundColor: currentBgClass }}
      />

      <div className="relative z-10 w-11/12 max-w-xl p-8 rounded-2xl bg-zinc-900/30 border border-zinc-600/50 backdrop-blur-md shadow-2xl text-center space-y-8">
        
        <div className="flex flex-wrap justify-center gap-2">
          {initialEmotions.map((emotion) => (
            <button
              key={emotion.id}
              onClick={() => setCurrentEmotion(emotion.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 border ${
                currentEmotion === emotion.id
                  ? 'bg-zinc-100 text-zinc-950 border-zinc-100 shadow-md scale-105'
                  : 'bg-zinc-900/50 text-zinc-400 border-zinc-800 hover:text-zinc-200 hover:border-zinc-700'
              }`}
            >
              {emotion.name}
            </button>
          ))}
        </div>

        <div className="py-12 px-4 border-y border-zinc-800/50">
          <div className="space-y-3">
            <span className="block text-3xl md:text-4xl text-zinc-100 font-serif font-semibold italic capitalize tracking-wide transition-all duration-500">
              {selectedWordA}
            </span>
            <span className="block text-lg md:text-xl text-zinc-400 font-serif italic transition-all duration-500">
              {selectedConnector}
            </span>
            <span className="block text-3xl md:text-4xl text-zinc-200 font-serif font-semibold italic tracking-wide transition-all duration-500">
              {selectedWordB}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <button
            onClick={shuffleVerses}
            className="px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-medium tracking-wide border border-zinc-700 transition-all active:scale-95 shadow-lg"
          >
            Mutar Verso ✦
          </button>

          <AddWord 
            emotionId={currentEmotion} 
            onWordAdded={handleAddNewWord} 
          />
        </div>
      </div>
    </div>
  );
}