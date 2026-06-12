import React, { useState, useEffect } from 'react';
import AddWord from './AddWord.jsx'; // 1. Importamos tu componente sutil

export default function Card({ initialEmotions, initialWords, initialConnectors, initialImages }) {
  // Estados dinámicos para mutar el contenido
  const [currentEmotion, setCurrentEmotion] = useState(initialEmotions[0]?.id || 'felicidad');
  const [words, setWords] = useState(initialWords); // Estado mutable para reflejar palabras nuevas al instante
  const [selectedWordA, setSelectedWordA] = useState('');
  const [selectedConnector, setSelectedConnector] = useState('');
  const [selectedWordB, setSelectedWordB] = useState('');
  const [bgImage, setBgImage] = useState('');

  // Filtrar los datos locales según la emoción elegida
  const filteredWords = words.filter(w => w.emotionId === currentEmotion);
  const filteredConnectors = initialConnectors.filter(c => c.emotionId === currentEmotion);
  const filteredImages = initialImages.filter(i => i.emotionId === currentEmotion);

  // Mezcla de versos automática e instantánea (Aleatoriedad Total)
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

  // Cada vez que cambie la emoción, reiniciamos el ecosistema visual
  useEffect(() => {
    shuffleVerses();
  }, [currentEmotion, words]);

  const currentBgClass = initialEmotions.find(e => e.id === currentEmotion)?.bgClass || 'rgba(0,0,0,0.4)';
  const currentEmotionName = initialEmotions.find(e => e.id === currentEmotion)?.name || '...';

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center font-sans transition-all duration-1000 ease-in-out bg-zinc-950/70">
      <p className="text-zinc-400 text-sm tracking-widest uppercase mb-3 font-mono">Metamorfosis Poética</p>
      
      {/* Imagen de Fondo Dinámica */}
      {bgImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out opacity-40 scale-105"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      )}

      {/* Capa de Color Emocional */}
      <div 
        className="absolute inset-0 transition-all duration-1000 ease-in-out pointer-events-none"
        style={{ backgroundColor: currentBgClass }}
      />

      {/* Contenedor Principal */}
      <div className="relative z-10 w-11/12 max-w-xl p-8 rounded-2xl bg-zinc-900/30 border border-zinc-600/50 backdrop-blur-md shadow-2xl text-center space-y-8">
        
        {/* Selector de Emociones */}
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

        {/* El Verso Poético Generado Completamente */}
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

        {/* Botones de Acción */}
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={shuffleVerses}
            className="px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-medium tracking-wide border border-zinc-700 transition-all active:scale-95 shadow-lg"
          >
            Mutar Verso ✦
          </button>

          {/* 2. Tu input minimalista integrado armónicamente abajo */}
          <AddWord 
            emotionId={currentEmotion} 
            onWordAdded={(newWord) => setWords([...words, newWord])} 
          />
        </div>
      </div>
    </div>
  );
}