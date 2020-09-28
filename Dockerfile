# pull official base image
FROM node:latest

# maintainer
LABEL author="fmmricardo"

ENV APP_ENV=production
ENV PORT=3001
 
COPY . /var/www

# set working directory
WORKDIR /var/www

# install app dependencies
RUN yarn install --silent

# port to run the app
EXPOSE $PORT 

# when the conainter starts it up what is the entry point to fire up the containter 
ENTRYPOINT ["yarn","start"]

