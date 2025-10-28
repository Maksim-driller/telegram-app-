import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react({
      // Отключаем SWC и используем Babel
      babel: {
        presets: [
          [
            "@babel/preset-react",
            {
              runtime: "automatic",
            },
          ],
        ],
      },
    }),
  ],
  optimizeDeps: {
    exclude: ["@swc/core"],
  },
  // ДОБАВЬТЕ ЭТУ СЕКЦИЮ ДЛЯ ОПТИМИЗАЦИИ РАЗМЕРА
  build: {
    outDir: "dist",
    // Отключаем source maps - экономит много места
    sourcemap: false,
    // Минификация кода
    minify: "esbuild",
    // Оптимизация разделения кода
    rollupOptions: {
      output: {
        // Разделяем vendor библиотеки
        manualChunks: {
          vendor: ["react", "react-dom"],
          telegram: ["@telegram-apps/sdk"]
        },
        // Оптимизация имен файлов
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]"
      }
    },
    // Уменьшаем размер вывода
    target: "es2015",
    // Чистим выходную директорию
    emptyOutDir: true
  },
  server: {
    host: "0.0.0.0", // Слушать на всех интерфейсах
    port: 5173, // Стандартный порт Vite
    strictPort: false, // Если порт занят, попробовать следующий
    open: false, // Не открывать браузер автоматически
  },
});