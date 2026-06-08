import { defineDb, defineTable, column } from 'astro:db';

const Emotion = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text(),
    bgClass: column.text(), // Para los estilos de fondo reactivos
  }
});

const Word = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    emotionId: column.text({ references: () => Emotion.columns.id }),
    content: column.text(),
  }
});

const Connector = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    emotionId: column.text({ references: () => Emotion.columns.id }),
    content: column.text(),
  }
});

const Image = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    emotionId: column.text({ references: () => Emotion.columns.id }),
    url: column.text(),
  }
});

export default defineDb({
  tables: { Emotion, Word, Connector, Image }
});