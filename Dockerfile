# Стадия сборки
FROM node:18-alpine as builder

WORKDIR /app

# Копируем package файлы
COPY package.json package-lock.json* ./

# Устанавливаем зависимости (без production флага, нужны dev-зависимости для сборки)
RUN npm ci

# Копируем исходный код
COPY . .

# АНАЛИЗ РАЗМЕРА ДО СБОРКИ
RUN echo "=== Размер node_modules до очистки ===" && \
    du -sh node_modules/

# Очистка ненужных файлов из node_modules
RUN find node_modules -name "*.md" -delete && \
    find node_modules -name "*.ts" -type f ! -name "*.d.ts" -delete && \
    find node_modules -name "*.map" -delete && \
    find node_modules -name "*.test.*" -delete && \
    find node_modules -name "test" -type d -exec rm -rf {} + 2>/dev/null || true && \
    find node_modules -name "docs" -type d -exec rm -rf {} + 2>/dev/null || true && \
    find node_modules -name "examples" -type d -exec rm -rf {} + 2>/dev/null || true

RUN echo "=== Размер node_modules после очистки ===" && \
    du -sh node_modules/

# Сборка приложения
RUN npm run build

# ОЧИСТКА после сборки - удаляем source maps и ненужные файлы
RUN echo "=== Размер dist до очистки ===" && \
    du -sh dist/ && \
    echo "=== Содержимое dist ===" && \
    ls -lh dist/

RUN find dist -name "*.map" -delete && \
    find dist -name "*.txt" -delete && \
    find dist -name "*.md" -delete && \
    rm -rf dist/.git 2>/dev/null || true

RUN echo "=== Размер dist после очистки ===" && \
    du -sh dist/ && \
    echo "=== Файлы в dist ===" && \
    find dist -type f -exec ls -lh {} \; | sort -k5 -hr | head -20

# Финальная стадия - минимальный образ
FROM nginx:alpine

# Копируем ТОЛЬКО собранные статические файлы
COPY --from=builder /app/dist /usr/share/nginx/html

# Дополнительная очистка в финальном образе
RUN find /usr/share/nginx/html -name "*.map" -delete 2>/dev/null || true && \
    echo "=== Финальный размер статических файлов ===" && \
    du -sh /usr/share/nginx/html/

# Конфиг nginx для SPA (React Router поддержка)
RUN echo 'server { \
    listen 80; \
    server_name _; \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    # Кэширование статических файлов \
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ { \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
    } \
    \
    # Для SPA - все маршруты ведут на index.html \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    \
    # Без кэширования для HTML \
    location ~* \.html$ { \
        expires -1; \
        add_header Cache-Control "no-cache"; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Оптимизация nginx
RUN echo "worker_processes 1;" > /etc/nginx/nginx.conf && \
    echo "events { worker_connections 1024; }" >> /etc/nginx/nginx.conf && \
    echo "http { include /etc/nginx/conf.d/*.conf; }" >> /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]