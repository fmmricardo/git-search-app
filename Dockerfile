# pull official base image
FROM node:latest

# maintainer
LABEL author="fmmricardo"

ENV APP_ENV=production
ENV PORT=3000
 
COPY ./var/www
COPY package.json ./
COPY yarn.lock ./
# set working directory
WORKDIR /var/www

VOLUME ["/var/www"]

# install app dependencies
RUN yarn add --silent
RUN yarn add react-scripts@3.4.1 -g --silent

# port to run the app
EXPOSE $PORT 

# when the conainter starts it up what is the entry point to fire up the containter 
ENTRYPOINT ["yarn","start"]

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# add app
COPY . ./

# start app
CMD ["yarn", "start"]

