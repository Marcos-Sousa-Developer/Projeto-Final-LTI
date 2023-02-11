# node version 
FROM node:18.13.0  

# Work from projeto_final_lti/server folder
WORKDIR /app/server 

RUN apt-get update

#copy package.json file
COPY package.json ./

#copy package-lock.json file
COPY package-lock.json ./

# copy all to /projeto_final_lti/server 
COPY . ./

# install dependencies 
RUN npm install 

# install dependencies
CMD ["npm", "run", "dev"]