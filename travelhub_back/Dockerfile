# Google Cloud SDK가 포함된 기본 이미지 사용
FROM google/cloud-sdk:latest

# 필요한 추가 패키지 설치 (예: git 등)
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

# AI Platform API를 사용할 수 있도록 설정
RUN gcloud components install beta

# AI 관련 API 활성화 (예: Vertex AI)
RUN gcloud services enable aiplatform.googleapis.com

# Google Cloud 프로젝트 설정을 위한 환경 변수 (필요에 따라 설정)
# ENV PROJECT_ID=your_project_id
# ENV GOOGLE_APPLICATION_CREDENTIALS=/path/to/credentials.json

# 작업 디렉토리 설정
WORKDIR /workspace

# 컨테이너가 시작되면 gcloud CLI를 사용할 수 있도록 쉘로 시작
CMD ["bash"]

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
