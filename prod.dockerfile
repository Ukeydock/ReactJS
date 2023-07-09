# 빌드 스테이지
FROM node:18.16.1 AS node
WORKDIR /app

RUN mkdir build

COPY build build

# 실행 스테이지
FROM nginx:latest
COPY --from=node /app/build /usr/share/nginx/html