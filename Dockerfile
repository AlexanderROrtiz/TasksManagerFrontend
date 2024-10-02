# Fase de construcción
FROM node:16 AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de configuración y las dependencias
COPY package.json package-lock.json ./
RUN npm install

# Copiar el resto de la aplicación y construirla
COPY . .
RUN npm run build --prod

# Fase de producción
FROM nginx:alpine

# Copiar los archivos construidos desde la fase de construcción
COPY --from=build /app/dist/tu-nombre-de-aplicacion /usr/share/nginx/html

# Exponer el puerto que utilizará Nginx
EXPOSE 80

# Comando por defecto para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
