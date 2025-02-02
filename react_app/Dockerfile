FROM node:22-alpine

WORKDIR /react

COPY package*.json ./

RUN npm install -g vite && npm install

COPY . .

EXPOSE 5173

# CMD npm run build && npm run dev
# CMD [ "npm", "run", "dev" ]

# rm  ~/.docker/config.json 
# https://stackoverflow.com/questions/66912085/why-is-docker-compose-failing-with-error-internal-load-metadata-suddenly