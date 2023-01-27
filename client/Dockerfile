# node version 
FROM node:18.13.0  

# Work from projeto_final_lti/client folder
WORKDIR /app/client

RUN apt-get update

#copy package.json file
COPY package.json ./

# copy all to projeto_final_lti/client
COPY . ./

# install dependencies 
RUN npm install
 

# install dependencies
CMD ["npm", "start"]





