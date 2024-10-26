FROM node

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . . 
EXPOSE 3005

RUN npx prisma generate
CMD node server.js
