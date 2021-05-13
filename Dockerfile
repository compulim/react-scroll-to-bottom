FROM node:alpine

EXPOSE 80
RUN npm install serve -g
WORKDIR /var/web/
ENTRYPOINT ["npx", "--no-install", "serve", "-c", "serve.json", "-p", "80", "/var/web/"]

RUN echo {}>/var/web/package.json

ADD __tests__/*.html /var/web/
ADD __tests__/assets/ /var/web/assets/
ADD __tests__/favicon.ico /var/web/
ADD __tests__/serve.json /var/web/
ADD packages/component/dist/ /var/web/
