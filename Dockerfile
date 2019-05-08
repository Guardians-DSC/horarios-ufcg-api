FROM node:latest
WORKDIR /build
COPY . .
ENV PORT 4000
RUN npm install && npm run build
EXPOSE $PORT
ENTRYPOINT ["npm", "start"]