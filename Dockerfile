## Will create a node environment in the container
FROM node
## Will create a directory app and switch to that directory
WORKDIR /app
## Will Copy package.json file to /app directory
COPY package.json .
## Will Run npm install to create node_modules for the app
RUN npm i
## Will Copy the source code to /app directory
COPY . .

## Exposes the port to access the app from outside the container i.e from the browser
EXPOSE 8080
## Executes npm run dev to start the server
CMD ["npm", "run", "dev"]