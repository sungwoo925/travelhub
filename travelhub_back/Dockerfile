# Google Cloud SDK가 포함된 기본 이미지 사용
FROM google/cloud-sdk:latest

# 필요한 추가 패키지 설치
RUN apt-get update && apt-get install -y curl

# Google Cloud SDK 구성 업데이트
RUN gcloud components update && \
    gcloud components install beta

# AI 관련 API 활성화 - Render에서 실행될 때 인증을 위해 환경 변수로 설정된 키 사용
RUN gcloud services enable aiplatform.googleapis.com

# 작업 디렉토리 설정
WORKDIR /workspace

# GOOGLE_APPLICATION_CREDENTIALS 환경 변수에 설정된 서비스 계정 키 파일로 인증
# 컨테이너가 실행될 때 GOOGLE_APPLICATION_CREDENTIALS를 통해 인증 적용
ENTRYPOINT ["sh", "-c", "gcloud auth activate-service-account --key-file=$GOOGLE_APPLICATION_CREDENTIALS && exec bash"]

# 1단계: Maven을 사용하여 애플리케이션 빌드
FROM maven:3.8.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# 2단계: JAR 파일을 포함한 최종 이미지
FROM openjdk:17-jdk-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

# 3. 포트 노출
EXPOSE 8080

# 4. Spring Boot 애플리케이션 실행
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
