FROM node:18-slim
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
COPY src ./
COPY test ./
COPY app.yml ./
COPY .env ./
RUN npm ci --production
RUN npm cache clean --force
ENV NODE_ENV="production"
RUN ls -a && pwd && cat .env
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]
