import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react({
      babel: {
        presets: [["@babel/preset-react", { runtime: "automatic" }]],
      },
    }),
  ],
  build: {
    outDir: "dist",
    sourcemap: false, // ВЫКЛЮЧИТЬ source maps - экономит 10-20 МБ!
    minify: "terser", // Более агрессивная минификация
    terserOptions: {
      compress: {
        drop_console: true, // Удалить console.log
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          telegram: ["@telegram-apps/sdk"]
        },
        // Оптимизация имен файлов
        chunkFileNames: "js/[name]-[hash].js",
        entryFileNames: "js/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]"
      }
    },
    // Уменьшаем target для лучшей совместимости и размера
    target: "es2015",
    // Включаем brotli сжатие
    reportCompressedSize: true,
  },
  optimizeDeps: {
    exclude: ["@swc/core"],
  },
});