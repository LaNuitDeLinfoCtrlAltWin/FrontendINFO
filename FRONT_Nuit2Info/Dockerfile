FROM node:lts-alpine3.18

# copie 'package.json' et 'package-lock.json' (si disponible)
COPY ["FRONT_Nuit2Info/package*.json", "./"]
COPY ["FRONT_Nuit2Info/index.html" , "./"]
COPY ["FRONT_Nuit2Info/package.json" , "./"]
COPY ["FRONT_Nuit2Info/public" , "./public"]
COPY ["FRONT_Nuit2Info/src" , "./src "]
COPY ["FRONT_Nuit2Info/tsconfig.json" , "./"]
COPY ["FRONT_Nuit2Info/tsconfig.node.json" , "./"]
COPY ["FRONT_Nuit2Info/.prettierrc.json" , "./"]
COPY ["FRONT_Nuit2Info/eslint.config.js" , "./"]
COPY ["FRONT_Nuit2Info/vite.config.ts" , "./"]

# installe les dépendances du projet
RUN npm install --loglevel verbose

# copie les fichiers et dossiers du projet dans le dossier de travail (par exemple : le dossier 'app')
COPY FRONT_Nuit2Info/ ./

# Compile TypeScript to JavaScript
RUN npm run build

# Expose the port on which the application runs
EXPOSE 5173
# Start the application
CMD ["npm", "run", "dev"]