FROM node:20-alpine3.19

WORKDIR /app

# Copy frontend source code
COPY package*.json .

#install the app dependecies
RUN npm install

COPY . .

#expose the port so our computer can access it
EXPOSE 3000

#run the app
CMD ["npm", "start"]

