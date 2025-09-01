# Étape 1 : Compilation de l'application Angular
FROM node:18 AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances depuis le sous-dossier
COPY gestionrhfront/package.json gestionrhfront/package-lock.json ./
RUN npm install

# Copier le reste du code Angular
COPY gestionrhfront/ ./

# Compiler l'application pour la production
RUN npm run build -- --configuration production

# Étape 2 : Nginx pour servir l'application Angular
FROM nginx:alpine

# Supprimer la configuration par défaut de Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copier la configuration personnalisée de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copier le build Angular compilé depuis l'étape de build
COPY --from=build /app/dist/gestionrhfront/ /usr/share/nginx/html

# Exposer le port
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]
