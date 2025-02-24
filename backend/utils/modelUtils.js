export const models = [
  {
    id: "gpt-4o-mini",
    name: "OpenAI GPT-4o Mini",
    capability: "High-quality text generation",
    usage: 50,
    available: true,
  },
  {
    id: "gpt-3.5-turbo",
    name: "OpenAI GPT-3.5 Turbo",
    capability: "Efficient text generation",
    usage: 40,
    available: true,
  },
  {
    id: "llama-3.3-70b-versatile",
    name: "Groq Llama 3.3 70B Versatile",
    capability: "Versatile and powerful",
    usage: 30,
    available: true,
  },
  {
    id: "llama-3.1-8b-instant",
    name: "Groq Llama 3.1 8B Instant",
    capability: "Fast and lightweight",
    usage: 20,
    available: true,
  },
  {
    id: "gemma2-9b-it",
    name: "Groq Gemma2 9B IT",
    capability: "Optimized for IT tasks",
    usage: 25,
    available: true,
  },
  {
    id: "gemini-1.5-flash",
    name: "Gemini 1.5 Flash",
    capability: "High-speed processing",
    usage: 35,
    available: true,
  },
  {
    id: "gemini-1.5-pro",
    name: "Gemini 1.5 Pro",
    capability: "Professional-grade performance",
    usage: 45,
    available: true,
  },
  {
    id: "text-embedding-004",
    name: "Gemini Text Embedding 004",
    capability: "Advanced text embedding",
    usage: 60,
    available: true,
  },
];

export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
