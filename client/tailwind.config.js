export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        ai: "#6366f1",
        eco: "#16a34a",
        "ai-dark": "#4f46e5",
        "eco-dark": "#15803d",
      },
      backgroundImage: {
        "gradient-ai": "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
        "gradient-eco": "linear-gradient(135deg, #16a34a 0%, #22c55e 100%)",
        "gradient-hero": "linear-gradient(135deg, #eef2ff 0%, #ecfdf5 50%, #f0fdf4 100%)",
        "gradient-glass": "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)",
      },
      boxShadow: {
        "glass": "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
        "glass-lg": "0 8px 32px 0 rgba(31, 38, 135, 0.2)",
        "glow-ai": "0 0 20px rgba(99, 102, 241, 0.3)",
        "glow-eco": "0 0 20px rgba(22, 163, 74, 0.3)",
      },
      animation: {
        "spin-slow": "spin 1s linear infinite",
        "pulse-soft": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    }
  },
  plugins: [],
}