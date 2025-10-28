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
  server: {
    host: "0.0.0.0", // Слушать на всех интерфейсах
    port: 5173, // Стандартный порт Vite
    strictPort: false, // Если порт занят, попробовать следующий
    open: false, // Не открывать браузер автоматически
  },
});
