# Стадия сборки
FROM node:22-alpine as builder

WORKDIR /app
COPY package.json package-lock.json* ./

# Устанавливаем ВСЕ зависимости (нужны dev для сборки)
RUN npm ci

COPY . .

# Собираем приложение
RUN npm run build

# ПРОВЕРЯЕМ РАЗМЕР
RUN du -sh dist/ && ls -lh dist/

# Финальная стадия - ТОЛЬКО nginx
FROM nginx:alpine

# Копируем ТОЛЬКО собранные файлы
COPY --from=builder /app/dist /usr/share/nginx/html

# Конфиг nginx для SPA
RUN echo 'server { \
    listen 80; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files \$uri \$uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80