# Frontend Dockerfile
# 1. Node.js 이미지를 베이스로 사용
FROM node:16-alpine as build

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. 종속성 설치
COPY package.json package-lock.json ./
RUN npm install

# 4. 애플리케이션 빌드
COPY . .
RUN npm run build

# 5. Nginx를 사용해 정적 파일 제공
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# 6. 포트 노출
EXPOSE 80
