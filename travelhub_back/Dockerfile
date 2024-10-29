# Google Cloud SDK가 포함된 최신 이미지 사용
FROM google/cloud-sdk:latest

# 추가 패키지 설치 (curl 등)
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Google Cloud SDK 및 필요한 구성 요소 업데이트
RUN gcloud components update && gcloud components install beta

# AI 관련 API 활성화 - Render에서 실제 인증을 통해 활성화 필요 시 참고
RUN gcloud services enable aiplatform.googleapis.com || echo "Warning: API enable may not work during Docker build phase"

# 작업 디렉토리 설정
WORKDIR /workspace

# GOOGLE_APPLICATION_CREDENTIALS 환경 변수 설정 및 서비스 계정 인증
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
