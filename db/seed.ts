import { db, Emotion, Word, Connector, Image } from 'astro:db';

export default async function() {
  // 1. Insertar Emociones
  await db.insert(Emotion).values([
    { id: 'alegria', name: 'Alegría', bgClass: 'rgba(249, 115, 22, 0.2)' },
    { id: 'rabia', name: 'Rabia', bgClass: 'rgba(185, 28, 28, 0.2)' },
    { id: 'calma', name: 'Calma', bgClass: 'rgba(45, 212, 191, 0.2)' },
    { id: 'nostalgia', name: 'Nostalgia', bgClass: 'rgba(49, 46, 129, 0.2)' }
  ]);

  // 2. Insertar Palabras
  await db.insert(Word).values([
    { id: 1, emotionId: 'alegría', content: 'luz' },
    { id: 2, emotionId: 'alegría', content: 'vuelo' },
    { id: 3, emotionId: 'alegría', content: 'risa' },
    { id: 4, emotionId: 'rabia', content: 'fuego' },
    { id: 5, emotionId: 'rabia', content: 'grieta' },
    { id: 6, emotionId: 'rabia', content: 'trueno' },
    { id: 7, emotionId: 'calma', content: 'lago' },
    { id: 8, emotionId: 'calma', content: 'brisa' },
    { id: 9, emotionId: 'calma', content: 'silencio' },
    { id: 10, emotionId: 'nostalgia', content: 'ayer' },
    { id: 11, emotionId: 'nostalgia', content: 'eco' },
    { id: 12, emotionId: 'nostalgia', content: 'neblina' }
  ]);

  // 3. Insertar Conectores
  await db.insert(Connector).values([
    { id: 1, emotionId: 'alegria', content: 'enciende' },
    { id: 2, emotionId: 'alegria', content: 'danza sobre' },
    { id: 3, emotionId: 'rabia', content: 'rompe' },
    { id: 4, emotionId: 'rabia', content: 'quema' },
    { id: 5, emotionId: 'calma', content: 'abraza' },
    { id: 6, emotionId: 'calma', content: 'reposa en' },
    { id: 7, emotionId: 'nostalgia', content: 'se esconde en' },
    { id: 8, emotionId: 'nostalgia', content: 'dibuja' }
  ]);

  // 4. Insertar Imágenes de Fondo de Alta Calidad
  await db.insert(Image).values([
    { id: 1, emotionId: 'alegria', url: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=1200' },
    { id: 2, emotionId: 'alegria', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200' },
    { id: 3, emotionId: 'rabia', url: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=1200' },
    { id: 4, emotionId: 'rabia', url: 'https://images.unsplash.com/photo-1606161836109-1a986eb16262?w=1200' },
    { id: 5, emotionId: 'calma', url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200' },
    { id: 6, emotionId: 'calma', url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1200' },
    { id: 7, emotionId: 'nostalgia', url: 'https://images.unsplash.com/photo-1437419764061-2473afe69fc2?w=1200' },
    { id: 8, emotionId: 'nostalgia', url: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=1200' }
  ]);
}