# Dockerfile для Vite + React приложения
FROM node:22-slim

# Устанавливаем рабочую директорию
WORKDIR /app

# Сначала копируем package.json для кеширования зависимостей
COPY package.json package-lock.json* ./

# Устанавливаем зависимости (включая devDependencies для сборки)
RUN npm ci

# Копируем все остальные файлы
COPY . .

# Собираем приложение
RUN npm run build

# Устанавливаем nginx для раздачи статических файлов
RUN apt-get update && apt-get install -y nginx && rm -rf /var/lib/apt/lists/*

# Копируем собранные файлы в nginx
RUN cp -r dist/* /var/www/html/

# Создаем конфигурацию nginx
RUN echo 'server { \
    listen 80; \
    server_name _; \
    root /var/www/html; \
    index index.html; \
    \
    # Для SPA роутинга \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    \
    # Кэширование статических файлов \
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ { \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
    } \
}' > /etc/nginx/sites-available/default

# Копируем конфиг и включаем сайт
RUN ln -sf /etc/nginx/sites-available/default /etc/nginx/sites-enabled/

# Открываем порт
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]