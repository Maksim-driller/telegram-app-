# Dockerfile для Vite + React приложения
FROM node:22-slim

# Устанавливаем рабочую директорию
WORKDIR /app

# Сначала копируем package.json для кеширования зависимостей
COPY package.json ./
COPY package-lock.json* ./

# Устанавливаем зависимости
RUN npm ci

# Копируем все остальные файлы
COPY . .

# Собираем приложение
RUN npm run build

# Устанавливаем nginx для раздачи статических файлов
RUN apt-get update && apt-get install -y nginx && rm -rf /var/lib/apt/lists/*

# Копируем собранные файлы
RUN cp -r dist/* /var/www/html/

# Создаем конфигурацию nginx
RUN echo 'server { \
    listen 80; \
    server_name _; \
    root /var/www/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/sites-available/default

# Открываем порт
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]