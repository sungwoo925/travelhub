# Backend Dockerfile

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
