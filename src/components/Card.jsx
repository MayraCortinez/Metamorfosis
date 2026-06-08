import React, { useState, useEffect } from 'react';

export default function Card({ initialEmotions, initialWords, initialConnectors, initialImages }) {
  // Estados para controlar la interactividad
  const [currentEmotion, setCurrentEmotion] = useState(initialEmotions[0]?.id || 'alegria');
  const [selectedWord, setSelectedWord] = useState('');
  const [selectedConnector, setSelectedConnector] = useState('');
  const [bgImage, setBgImage] = useState('');

  // Filtrar los datos de la DB según la emoción elegida
  const filteredWords = initialWords.filter(w => w.emotionId === currentEmotion);
  const filteredConnectors = initialConnectors.filter(c => c.emotionId === currentEmotion);
  const filteredImages = initialImages.filter(i => i.emotionId === currentEmotion);

  // Cada vez que cambie la emoción, actualizamos el fondo y reiniciamos las selecciones
  useEffect(() => {
    if (filteredImages.length > 0) {
      // Elige una imagen al azar de las disponibles para esa emoción
      const randomImg = filteredImages[Math.floor(Math.random() * filteredImages.length)].url;
      setBgImage(randomImg);
    }
    // Inicializamos con la primera palabra y conector disponibles
    setSelectedWord(filteredWords[0]?.content || '...');
    setSelectedConnector(filteredConnectors[0]?.content || '...');
  }, [currentEmotion]);

  // Función para mezclar versos de forma aleatoria dentro de la misma emoción
  const shuffleVerses = () => {
    if (filteredWords.length > 0) {
      const randomW = filteredWords[Math.floor(Math.random() * filteredWords.length)].content;
      setSelectedWord(randomW);
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

  // Obtener el color de fondo semitransparente configurado en la DB
  const currentBgClass = initialEmotions.find(e => e.id === currentEmotion)?.bgClass || 'rgba(0,0,0,0.4)';

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center font-sans transition-all duration-1000 ease-in-out bg-zinc-950">
      
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
      <div className="relative z-10 w-11/12 max-w-xl p-8 rounded-2xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-md shadow-2xl text-center space-y-8">
        
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

        {/* El Verso Poético Generado */}
        <div className="py-12 px-4 border-y border-zinc-800/50">
          <p className="text-zinc-400 text-sm tracking-widest uppercase mb-3 font-mono">Metamorfosis Poética</p>
          <div className="space-y-2">
            <span className="block text-3xl md:text-4xl text-zinc-100 font-serif font-semibold italic capitalize tracking-wide transition-all duration-500">
              {selectedWord}
            </span>
            <span className="block text-lg md:text-xl text-zinc-400 font-serif italic transition-all duration-500">
              {selectedConnector}
            </span>
            <span className="block text-3xl md:text-4xl text-zinc-200 font-serif font-semibold italic tracking-wide transition-all duration-500">
              {currentEmotion}
            </span>
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="flex justify-center">
          <button
            onClick={shuffleVerses}
            className="px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-medium tracking-wide border border-zinc-700 transition-all active:scale-95 shadow-lg"
          >
            Mutar Verso ✦
          </button>
        </div>
      </div>
    </div>
  );
}