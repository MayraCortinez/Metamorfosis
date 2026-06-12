import type { APIRoute } from 'astro';
import { db, Word } from 'astro:db';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { emotionId, content } = body;

    if (!emotionId || !content) {
      return new Response(JSON.stringify({ error: 'Faltan campos' }), { status: 400 });
    }

    // Insertamos la nueva palabra poética en la base de datos
    const newWord = await db.insert(Word).values({
      emotionId,
      content: content.toLowerCase().trim()
    });

    return new Response(JSON.stringify({ success: true, newWord }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error en el servidor' }), { status: 500 });
  }
};